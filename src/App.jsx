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
} from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testingProtectedRoute } from "./middleware/auth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [activeSession, setActiveSession] = useState(false);

  const fetchSession = async () => {
    const sessionStatus = await testingProtectedRoute();
    setActiveSession(sessionStatus);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <main>
      <BrowserRouter>
        <div className="header-gradient">
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
              <Login key="login-form" />,
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
            path="/Dashboard"
            element={[
              <Nav
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
                key="register-nav"
              />,
              <ProtectedRoute element={Dashboard} key="protected-Dash" />,
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
