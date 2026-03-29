import React, { useEffect, useState } from "react";
import splashImage from "../imgs/splash.png";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex mt-6 pb-8 fade-in-effect sm:mt-10 justify-center px-4">
      <div className="flex flex-row items-center justify-center gap-4 max-w-[950px] w-full">
        <img
          id="splash-img"
          src={splashImage}
          className="slide-in-effect w-2/5 h-auto max-w-[360px] drop-shadow-2xl"
        ></img>
        <div
          id="splash-desc"
          className="slide-in-effect flex flex-col text-center pr-2 max-w-[500px]"
        >
          <h1 className="gradient-text font-extrabold text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl md:mt-8 leading-tight tracking-tight">
            Let's Get Hacking.
          </h1>
          <p className="text-orange-400/70 text-xs mt-1 sm:text-sm font-medium tracking-widest uppercase">
            Ethically
          </p>
          <p className="text-slate-400 text-xs mt-3 xs:text-sm xs:mt-5 sm:text-base leading-relaxed">
            Unleash your potential with WebAppWarfare, a cutting-edge platform
            dedicated to empowering cybersecurity enthusiasts.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              className="btn-primary px-5 py-2 text-sm sm:text-base"
              onClick={() => navigate("/register")}
            >
              Get Started →
            </button>
            <button
              className="px-5 py-2 text-sm sm:text-base rounded-md border border-slate-600 text-slate-300 hover:border-orange-500/50 hover:text-white transition-all duration-200"
              onClick={() => navigate("/Guides")}
            >
              Browse Guides
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Free to use
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
              Community guides
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
              Beginner friendly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
