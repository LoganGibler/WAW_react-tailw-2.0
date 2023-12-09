import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import splashImage from "../imgs/splash.png";
import "../App.css";

const Header = () => {
  useEffect(() => {}, []);

  return (
    <div className="w-full mt-4 pb-2 fade-in-effect sm:mt-8">
      <div className="flex flex-row justify-center p-2">
        <img
          id="splash-img"
          src={splashImage}
          className="slide-in-effect w-1/2 h-auto max-w-[400px] opacity-100 transition-opacity duration-1000 ease-in-out"
        ></img>
        <div
          id="splash-desc"
          className="slide-in-effect flex flex-col text-center pr-2 max-w-[500px] opacity-100 transition-opacity duration-100 ease-in-out"
        >
          <div className="flex mt-5 text-white text-center justify-center text-xl xs:text-2xl sm:text-3xl md:text-4xl md:mt-[3rem]">
            <p className="">Lets.</p>
            <p className=" ml-1">Get.</p>
            <p className=" ml-1 typewriter">Hacking.</p>
          </div>
          <p className="text-white text-xs mt-1 sm:text-sm">(Ethically)</p>
          <p className="text-slate-300 text-xs mt-2 xs:text-sm xs:mt-[2rem] sm:text-base md:text-lg">
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

{
  /* <p className="text-white text-xs">
            In an increasingly interconnected world, learning cybersecurity is
            your key to safeguarding personal information, defending against
            cyber threats, and ensuring the security of businesses and nations.
            Discover the essential skills to protect data, preserve privacy, and
            contribute to a secure digital landscape. Prepare for the challenges
            of today and tomorrow by becoming a guardian of the digital realm
            through cybersecurity education.

            
"WebAppWarfare: Your Gateway to Cybersecurity Mastery

Unleash your potential with WebAppWarfare, a cutting-edge platform dedicated to empowering cybersecurity enthusiasts. 
Dive into a world of interactive guides, expert insights, and hands-on learning experiences, designed to sharpen your skills in web application security. 
Elevate your knowledge and become a formidable force in the realm of cybersecurity. Join us on a journey where education meets innovation, a
nd mastery is just a click away."
          </p> */
}
export default Header;
