import React, { useState } from "react";
import "./App.css";
import {
  Nav,
  Menu,
  Header,
  InfoHeader,
  Footer,
  FooterLinks,
} from "./components";
import { BrowserRouter } from "react-router-dom";
import { Transition } from "@headlessui/react";

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
          <Header />
          <InfoHeader />
        </div>
        <Footer />
        <FooterLinks />
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
