import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import splashImage from "../imgs/splash.png";
import "../App.css";

const Header = () => {
  return (
    <div className="w-full flex mt-4 pb-2 fade-in-effect sm:mt-8 justify-center">
      <div className="flex flex-row justify-center p-2 max-w-[820px]">
        <img
          id="splash-img"
          src={splashImage}
          className="slide-in-effect w-2/5 h-auto max-w-[400px] opacity-100 transition-opacity duration-1000 ease-in-out"
        ></img>
        <div
          id="splash-desc"
          className="slide-in-effect flex flex-col text-center pr-2 max-w-[500px] opacity-100 transition-opacity duration-100 ease-in-out"
        >
          <div className="flex mt-5 font-semibold text-white text-center justify-center text-xl xs:text-2xl sm:text-2xl md:text-3xl md:mt-[3rem] lg:text-[38px]">
            <p className="">Lets.</p>
            <p className=" ml-1 lg:ml-3 md:ml-2">Get.</p>
            <p className=" ml-1 lg:ml-3 md:ml-2">Hacking.</p>
          </div>
          <p className="text-white text-xs mt-1 sm:text-sm">(Ethically)</p>
          <p className="text-slate-300 text-xs mt-2 xs:text-sm xs:mt-[2rem] sm:text-base md:text-base">
            Unleash your potential with WebAppWarfare, a cutting-edge platform
            dedicated to empowering cybersecurity enthusiasts.
          </p>
          <div className="mt-2">
            <button className="rounded-md text-sm bg-orange-600 text-white px-2 py-0.5 sm:text-base md:text-lg md:mt-1">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
