import React from "react";
import { SiCyberdefenders } from "react-icons/si";
import lock from "../imgs/lock.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const InfoHeader = () => {
  return (
    <div className="w-full mx-2 mt-[3rem] mb-0 flex flex-col justify-center fade-in-effect">
      <div className="flex flex-col px-4 py-2 md:flex-row slide-in-effect justify-center md:pb-[8rem]">
        <div className="flex flex-col max-w-[830px] md:flex-row">
          <div className="flex flex-col justify-center md:ml-[2rem] px-3 md:pl-[1.5rem] md:pr-0 md:pb-[3rem]">
            <p className="flex font-semibold text-[15px] text-white sm:text-base md:text-lg">
              WebAppWarfare: Your Gateway to Cybersecurity Mastery
              <SiCyberdefenders className="text-4xl mr-3 ml-2 xs:text-xl text-orange-400" />
            </p>
            <p className="text-[12px] mt-1 text-slate-300 sm:text-sm md:max-w-[600px] md:text-base">
              Dive into a world of interactive guides, expert insights, and
              hands-on learning experiences, designed to sharpen your skills in
              web application security. Elevate your knowledge and become a
              formidable force in the realm of cybersecurity. Join us on a
              journey where education meets innovation, a nd mastery is just a
              click away.
            </p>
          </div>
          <div className="flex justify-center py-[2rem] m-0">
            <img
              src={lock}
              className="slide-in-effect w-1/2 h-auto max-w-[500px] opacity-100 transition-opacity duration-1000 ease-in-out"
            ></img>
          </div>
        </div>
      </div>
      <div className="flex text-white justify-center pb-2">
        <div className="flex">
          <a href="https://www.linkedin.com/in/logan-gibler/">
            <AiFillLinkedin className="mx-2 mb-2  text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
          </a>
          <a href="">
            <AiFillTwitterCircle className="mx-2 mb-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
          </a>
          <a href="">
            <AiFillFacebook className="mx-2 mb-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
          </a>
          <a href="">
            <AiFillInstagram className="mx-2 mb-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
          </a>
          <a href="">
            <AiFillYoutube className="mx-2 mb-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
