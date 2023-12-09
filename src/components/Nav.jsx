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

  return (
    <div className="w-full px-2 pt-2 flex sm:px-8 pt-4">
      <div className="text-white flex ml-6">
        <img className="w-[33px] h-auto md:w-[42px]" src={logo}></img>
        <h1 className="ml-2 font-semibold md:text-lg hover:cursor-pointer hover:text-orange-600">
          WebAppWarfare
        </h1>
      </div>

      <div className="hidden sm:flex grow mr-6 mt-[1px] py-[2px] justify-end text-white">
        <p className="mx-1.5 text-sm  md:text-base hover:cursor-pointer hover:text-orange-600">
          Guides
        </p>
        <p className="mx-1.5 text-sm md:text-base  hover:cursor-pointer hover:text-orange-600">
          Profile
        </p>
        <p className="mx-1.5 text-sm   md:text-base hover:cursor-pointer hover:text-orange-600">
          Create Guide
        </p>
      </div>
      <div className="text-white text-sm flex grow justify-end mr-2 sm:grow-0">
        {!activeSession ? (
          <button className="border-[1.5px] rounded-md border-orange-600 bg-orange-600 px-2 py-[1px] mt-[1px]">
            Sign in
          </button>
        ) : (
          <div className="mr-1 flex">
            {/* grab user from local */}
            <div className="hidden xs:flex mt-[3px] mr-1.5">
              <p className="font-semibold text-orange-400">Username</p>
            </div>
            <button className="border-[1.5px] rounded-md border-orange-600 bg-orange-600 px-2 py-[1px]">
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="flex mr-2 mt-0.5 sm:hidden">
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