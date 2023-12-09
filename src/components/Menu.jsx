import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";
import "../App.css";
import "../index.css";

const Menu = ({ menuActive, activeSession, setActiveSession }) => {
  useEffect(() => {
    console.log("comp rerendering!");
    console.log("MenuActiveStatus:", menuActive);
  });

  const menuClass = `absolute left-[0px] top-9 h-full w-[150px] text-white hamburger-menu-gradient border-r-[1px] border-orange-600 ${
    menuActive
      ? "transition-all duration-500 delay-70 translate-x-[180px] origin-left"
      : "transition-all duration-500 delay-70 translate-x-[-180px] origin-right"
  } `;

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
      <div className="absolute top-0 h-full w-[150px] text-white hamburger-menu-gradient">
        <p className="text-sm mb-2 pl-3 pb-0 pt-2 mt-[1px] border-orange-600 border-t-[1px]  hover:cursor-pointer">
          Home
        </p>
        <p className="text-sm mb-2 pl-3 pb-2 pt-2 mt-[1px] border-orange-600 border-b-[1px] border-t-[1px]  hover:cursor-pointer">
          Guides
        </p>
        <p className="text-sm my-2 pl-3 pb-2 border-orange-600 border-b-[1px] hover:cursor-pointer">
          Profile
        </p>
        <p className="text-sm my-2 pl-3 pb-2 border-orange-600 border-b-[1px] hover:cursor-pointer">
          CreateGuide
        </p>
        {!activeSession ? (
          <button className="bg-orange-600 rounded-md text-sm justify-center ml-9 px-4 py-0.5">
            Sign in
          </button>
        ) : (
          <button className="bg-orange-600 rounded-md text-sm justify-center ml-7 px-4 py-0.5">
            Sign out
          </button>
        )}
      </div>
    </Transition>
  );
};

export default Menu;
