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

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <div className="w-full px-2 flex sm:px-8 lg:px-[6rem] pt-4">
      <div className="text-white flex ml-6">
        <img className="w-[33px] h-auto md:w-[42px]" src={logo}></img>
        <h1
          className="ml-2 font-semibold lg:text-lg lg:pl-5 hover:cursor-pointer hover:text-orange-600"
          onClick={() => {
            navigate("/");
          }}
        >
          WebAppWarfare
        </h1>
      </div>

      <div className="hidden md:flex grow mr-6 mt-[2px] py-[2px] justify-end text-white">
        <p
          className="mx-1.5  lg:mx-3 text-sm  lg:text-[16px] hover:cursor-pointer hover:text-orange-600"
          onClick={() => {
            navigate("/Guides");
          }}
        >
          Guides
        </p>
        {activeSession && (
          <p
            className="mx-1.5 lg:mx-3 text-sm lg:text-[16px]  hover:cursor-pointer hover:text-orange-600"
            onClick={() => {
              navigate("/Dashboard");
            }}
          >
            Dashboard
          </p>
        )}

        {/* {activeSession && (
          <p
            className="mx-1.5 lg:mx-3 text-sm   lg:text-[16px] hover:cursor-pointer hover:text-orange-600"
            onClick={() => {
              navigate("/CreateGuide");
            }}
          >
            Create Guide
          </p>
        )} */}
        <p
          className="mx-1.5 lg:mx-3 text-sm   lg:text-[16px] hover:cursor-pointer hover:text-orange-600"
          onClick={() => {
            navigate("/AboutUs");
          }}
        >
          About Us
        </p>
      </div>
      <div className="text-white text-sm flex grow justify-end mr-2 md:grow-0">
        {!activeSession ? (
          <button
            className="border-[1.5px] rounded-md border-orange-600 bg-orange-600 px-2 py-[1px] mt-[1px]"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Sign in
          </button>
        ) : (
          <div className="mr-1 flex">
            {/* grab user from local */}
            <div className="hidden xs:flex mt-[2px] md:mt-[3.5px] mr-1.5 sm:">
              <p className="font-semibold text-orange-400">
                {JSON.parse(localStorage.getItem("username"))}
              </p>
            </div>
            <button
              className="border-[1.5px] rounded-md border-orange-600 bg-orange-600 px-2 py-[1px]"
              onClick={async () => {
                deleteAllCookies();
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
      <div className="flex mr-2 mt-0.5 md:hidden">
        {!menuActive ? (
          <RiMenu3Line
            className="text-white text-xl"
            onClick={handleMenuChange}
          />
        ) : (
          <RiCloseLine
            className="text-white text-xl"
            onClick={handleMenuChange}
          />
        )}
      </div>
    </div>
  );
};

export default Nav;
