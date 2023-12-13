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
} from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testingProtectedRoute } from "./middleware/auth";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [activeSession, setActiveSession] = useState(false);

  const headersTemp = document.cookie.split(";");
  const finalHeaders = {};
  console.log(headersTemp[0]);
  if (headersTemp[0] !== "") {
    headersTemp.forEach((header) => {
      const headerTemp = header.split("=");
      finalHeaders[headerTemp[0].trim()] = headerTemp[1].trim(); // save on object to access using keys.
    });
  }
  const fetchSession = async () => {
    const sessionStatus = await testingProtectedRoute();
    setActiveSession(sessionStatus);
  };

  useEffect(() => {
    // fetchSession();
  }, []);

  return (
    <main>
      <BrowserRouter>
        <div className="header-gradient">
          <Routes>
            <Route
              path="/"
              element={[
                <Nav
                  menuActive={menuActive}
                  setMenuActive={setMenuActive}
                  activeSession={activeSession}
                  setActiveSession={setActiveSession}
                />,
                <Header />,
                <InfoHeader />,
                <Footer />,
                <FooterLinks />,
              ]}
            />
          </Routes>
        </div>
        <Routes>
          <Route
            path="/Login"
            element={[
              <Nav
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
              />,
              <Login />,
            ]}
          />
          <Route
            path="/Register"
            element={[
              <Nav
                menuActive={menuActive}
                setMenuActive={setMenuActive}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
              />,
              <Register
                activeSession={activeSession}
                setActiveSession={setActiveSession}
              />,
            ]}
          />
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
