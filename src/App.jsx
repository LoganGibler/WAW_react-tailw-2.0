import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Nav,
  Menu,
  Header,
  InfoHeader,
  Footer,
  FooterLinks,
  Login,
  Register,
  Dashboard,
  Guides,
  AboutUs,
  GuideView,
  EditGuide,
  CreateGuide,
} from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testingProtectedRoute } from "./middleware/auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function App() {
  let guidePFPRef = ref(storage, "/guidepfp/");
  const [menuActive, setMenuActive] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [adminStatus, setAdminStatus] = useState(false);
  const [pfps, setPfps] = useState([]);

  const fetchSession = async () => {
    const sessionStatus = await testingProtectedRoute();
    console.log(sessionStatus);
    setActiveUser(sessionStatus.userID);
    setUserDetails(sessionStatus.username);
    setAdminStatus(sessionStatus.adminStatus);
    setActiveSession(sessionStatus);
  };

  const fetchPfpImgs = async () => {
    try {
      const res = await listAll(guidePFPRef);
      const urlPromises = res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      });
      const urls = await Promise.all(urlPromises);
      setPfps(urls);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchSession();
    fetchPfpImgs();
  }, []);

  return (
    <main className="">
      <BrowserRouter>
        <div className="header-gradient">
          {/* unprotected Routes */}
          <Routes>
            <Route
              path="/"
              id="home"
              key="home"
              element={[
                <Nav
                  key="home-nav"
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                />,
                <Header key="home-header" />,
                <InfoHeader key="home-info" />,
                <Footer key="home-footer" />,
                <FooterLinks key="home-links" />,
              ]}
            />
          </Routes>
        </div>
        <Routes>
          <Route
            path="/Login"
            key="login"
            element={[
              <Nav
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
                key={"login-nav"}
              />,
              <Login key="login-form" setSessionActive={setActiveSession} />,
            ]}
          />
          <Route
            path="/Register"
            key="register"
            element={[
              <Nav
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
                key="register-nav"
              />,
              <Register
                activeSession={activeSession}
                setActiveSession={setActiveSession}
                key="register-form"
              />,
            ]}
          />

          <Route
            path="/Guides"
            element={[
              <div className="guides-gradient-bg min-h-screen" key="guide-bg">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="guides-nav"
                />
                ,
                <Guides
                  key="public-guides"
                  activeSession={activeSession}
                  activeUser={activeUser}
                  pfps={pfps}
                />
                ,
                <Footer key="guides-footer" />,
                <FooterLinks key="guides-footerlinks" />
              </div>,
            ]}
          />

          <Route
            path="AboutUs"
            element={[
              <div className="guides-gradient-bg min-h-screen" key="guide-bg">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="aboutus-nav"
                />
                ,
                <AboutUs key="aboutus" />,
                <Footer key="aboutus-footer" />,
                <FooterLinks key="aboutus-footerlinks" />,
              </div>,
            ]}
          />

          <Route
            path="/guide/:id"
            element={[
              <div className="guides-gradient-bg" key="guideview-bg">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="guideview-nav"
                />
                ,
                <GuideView key="guideview-guideview" pfps={pfps} />,
                <FooterLinks key="guideview-footerlinks" />,
              </div>,
            ]}
          />
          {/* end unprotected Routes */}

          {/* here are protected Routes */}
          <Route
            path="/Dashboard"
            element={[
              <div className="header-gradient" key="dashboard-div">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="dash-nav"
                />
                ,
                <ProtectedRoute
                  element={Dashboard}
                  key="protected-Dash"
                  activeUser={activeUser}
                  pfps={pfps}
                  adminStatus={adminStatus}
                />
                ,
                <FooterLinks key="dashboard-footerlinks" />,
              </div>,
            ]}
          ></Route>
          <Route
            path="/editGuide/:id"
            element={[
              <div className="guides-gradient-bg" key="editguide-div">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="dash-nav"
                />
                ,
                <ProtectedRoute
                  element={EditGuide}
                  key="protected-Dash1"
                  pfps={pfps}
                  activeUser={activeUser}
                />
                ,
                <FooterLinks key="dashboard-footerlinks" />,
              </div>,
            ]}
          ></Route>
          <Route
            path="/createGuide"
            element={[
              <div className="guides-gradient-bg" key="editguide-div">
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                  key="dash-nav"
                />
                ,
                <ProtectedRoute
                  element={CreateGuide}
                  key="protected-Dash1"
                  activeUser={activeUser}
                  userDetails={userDetails}
                />
                ,
                <FooterLinks key="dashboard-footerlinks" />,
              </div>,
            ]}
          ></Route>
        </Routes>
        <Menu
          menuActive={menuActive}
          setMenuActive={setMenuActive}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
        />
      </BrowserRouter>
    </main>
  );
}

export default App;
