import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../imgs/logoBlue.png";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";

const Nav = ({
  menuActive,
  setMenuActive,
  activeSession,
  setActiveSession,
}) => {
  const handleMenuChange = () => {
    setMenuActive(!menuActive);
  };

  const navigate = useNavigate();

  async function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <div className="nav-glass w-full sticky top-0 z-50 px-4 sm:px-8 lg:px-[6rem] py-3 flex items-center">
      <div className="text-white flex items-center">
        <img className="w-[30px] h-auto md:w-[38px]" src={logo}></img>
        <h1
          className="ml-2.5 font-bold text-sm md:text-base tracking-wide hover:cursor-pointer hover:text-orange-400 transition-colors duration-150"
          onClick={() => {
            navigate("/");
          }}
        >
          WebAppWarfare
        </h1>
      </div>

      <div className="hidden md:flex grow mr-4 justify-end items-center gap-1 lg:gap-2">
        {[
          { label: "Guides", path: "/Guides" },
          ...(activeSession ? [{ label: "Dashboard", path: "/Dashboard" }] : []),
          { label: "About Us", path: "/AboutUs" },
        ].map(({ label, path }) => (
          <p
            key={path}
            className="px-3 py-1 text-slate-300 text-sm lg:text-[15px] rounded-md hover:cursor-pointer hover:text-white hover:bg-white/5 transition-all duration-150"
            onClick={() => navigate(path)}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="text-white text-sm flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
        {!activeSession ? (
          <button
            className="btn-primary px-3 py-1 text-sm"
            onClick={() => navigate("/Login")}
          >
            Sign in
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden xs:block">
              <p className="font-semibold text-orange-400 text-sm">
                {JSON.parse(localStorage.getItem("username"))}
              </p>
            </div>
            <button
              className="px-3 py-1 text-sm rounded-md border border-orange-600/60 text-orange-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-150"
              onClick={async () => {
                await deleteAllCookies();
                await setActiveSession(false);
                await setMenuActive(false);
                navigate("/");
                window.location.reload();
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center ml-3 md:hidden">
        {!menuActive ? (
          <RiMenu3Line
            className="text-slate-300 text-xl hover:text-white cursor-pointer transition-colors"
            onClick={handleMenuChange}
          />
        ) : (
          <RiCloseLine
            className="text-slate-300 text-xl hover:text-white cursor-pointer transition-colors"
            onClick={handleMenuChange}
          />
        )}
      </div>
    </div>
  );
};

export default Nav;
