import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";

const Menu = ({
  menuActive,
  setMenuActive,
  activeSession,
  setActiveSession,
}) => {
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
    <Transition
      appear={true}
      show={menuActive}
      enter="transition-all duration-400"
      enterFrom="-ml-[20rem]"
      enterTo=""
      leave="transition-all duration-400"
      leaveTo="-ml-[20rem]"
    >
      <div className="fixed top-0 bottom-0 h-[100%] w-[150px] text-white hamburger-menu-gradient">
        <div className="flex justify-end">
          <RiCloseLine
            className="mt-2 mb-1.5 mr-3 text-xl"
            onClick={() => {
              setMenuActive(false);
            }}
          />
        </div>

        <p
          className="text-sm mb-2 pl-3 pb-0 pt-2 mt-[1px] border-orange-600 border-t-[1px]  hover:cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuActive(false);
          }}
        >
          Home
        </p>
        <p
          className="text-sm mb-2 pl-3 pb-2 pt-2 mt-[1px] border-orange-600 border-b-[1px] border-t-[1px]  hover:cursor-pointer"
          onClick={() => {
            navigate("/Guides");
            setMenuActive(false);
          }}
        >
          Guides
        </p>
        {activeSession && (
          <p
            className="text-sm my-2 pl-3 pb-2 border-orange-600 border-b-[1px] hover:cursor-pointer"
            onClick={() => {
              navigate("/Dashboard");
              setMenuActive(false);
            }}
          >
            Dashboard
          </p>
        )}
        {activeSession && (
          <p
            className="text-sm my-2 pl-3 pb-2 border-orange-600 border-b-[1px] hover:cursor-pointer"
            onClick={() => {
              navigate("/CreateGuide");
              setMenuActive(false);
            }}
          >
            Create Guide
          </p>
        )}

        <p
          className="text-sm my-2 pl-3 pb-2 border-orange-600 border-b-[1px] hover:cursor-pointer"
          onClick={() => {
            navigate("/AboutUs");
            setMenuActive(false);
          }}
        >
          About Us
        </p>
        {!activeSession ? (
          <button
            className="bg-orange-600 rounded-md text-sm justify-center ml-9 px-4 py-0.5"
            onClick={() => {
              navigate("/Login");
              setMenuActive(false);
            }}
          >
            Sign in
          </button>
        ) : (
          <button
            className="bg-orange-600 rounded-md text-sm justify-center ml-7 px-4 py-0.5"
            onClick={() => {
              navigate("/");
              setMenuActive(false);
              setActiveSession(false);
              deleteAllCookies();
              window.location.reload();
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </Transition>
  );
};

export default Menu;
