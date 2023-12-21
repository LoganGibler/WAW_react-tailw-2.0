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
} from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testingProtectedRoute } from "./middleware/auth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [activeUser, setActiveUser] = useState("");

  const fetchSession = async () => {
    const sessionStatus = await testingProtectedRoute();
    // console.log("THIS IS sessionStatus", sessionStatus);
    setActiveUser(sessionStatus.userID);
    setActiveSession(sessionStatus);
  };

  useEffect(() => {
    fetchSession();
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
                <GuideView key="guideview-guideview" />,
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
                <ProtectedRoute element={Dashboard} key="protected-Dash" />,
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
