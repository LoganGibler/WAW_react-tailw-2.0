import React, { Fragment, useState } from "react";
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

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [activeSession, setActiveSession] = useState(false);

  return (
    <main>
      <BrowserRouter>
        <div className="header-gradient">
          <Nav
            menuActive={menuActive}
            setMenuActive={setMenuActive}
            activeSession={activeSession}
            setActiveSession={setActiveSession}
          />
          <Routes>
            <Route
              path="/"
              element={[
                <Header />,
                <InfoHeader />,
                <Footer />,
                <FooterLinks />,
              ]}
            />
          </Routes>
        </div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
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
