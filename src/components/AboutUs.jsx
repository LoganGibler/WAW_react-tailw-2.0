import React from "react";
import office1 from "../imgs/office1.png";
import office2 from "../imgs/office2.png";
import office3 from "../imgs/office3.png";
import office4 from "../imgs/office4.png";
import lock from "../imgs/lockAboutSmaller.png";
import globe from "../imgs/globe.png";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const AboutUs = () => {
  return (
    <div className="w-full slide-in-effect">
      <div className="flex justify-center mt-[5rem] fade-in-effect">
        <div className="flex flex-col mx-2 px-2 max-w-[800px]">
          <div className="flex justify-center">
            <div className="flex flex-col md:mt-2 md:pl-[2rem]">
              <h1 className="text-sm text-white xs:text-base sm:text-lg md:text-lg">
                {" "}
                Welcome to WebAppWarfare
              </h1>
              <p className="text-xs text-slate-400 xs:mt-2 sm:pr-5  xs:text-sm sm:text-base sm:mt-1 md:text-[16px] md:mt-4">
                Your go-to platform for comprehensive training and expert guides
                in the world of web applications. We are passionate about
                empowering individuals with the knowledge and skills to navigate
                the ever-evolving landscape of web development and
                cybersecurity.
              </p>
              <div className="hidden xs:flex justify-center text-orange-500 md:mt-2">
                <a href="https://www.linkedin.com/in/logan-gibler/">
                  <AiFillLinkedin className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
                </a>
                <a href="">
                  <AiFillTwitterCircle className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
                </a>
                <a href="">
                  <AiFillFacebook className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
                </a>
                <a href="">
                  <AiFillInstagram className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
                </a>
                <a href="">
                  <AiFillYoutube className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
                </a>
              </div>
            </div>
            <img
              src={office2}
              className="max-h-[150px] xs:max-h-none w-2/5 max-w-[190px] rounded-full h-auto opacity-100 transition-opacity duration-1000 ease-in-out"
            ></img>
          </div>
          <div className="flex justify-center mt-3 text-orange-500 xs:hidden">
            <a href="https://www.linkedin.com/in/logan-gibler/">
              <AiFillLinkedin className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
            </a>
            <a href="">
              <AiFillTwitterCircle className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
            </a>
            <a href="">
              <AiFillFacebook className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
            </a>
            <a href="">
              <AiFillInstagram className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
            </a>
            <a href="">
              <AiFillYoutube className="mx-2 mt-2 text-lg xs:text-xl sm:text-2xl md:4xl hover:cursor-pointer" />
            </a>
          </div>
          <div className="w-full mt-[5rem] ">
            <div className="flex flex-col px-2 py-1 md:px-8 md:py-6 mx-1 shadow-md shadow-white">
              <h1 className="text-white text-sm xs:text-base sm:text-lg md:text-lg px-2 mt-2">
                Our Mission
              </h1>
              <p className="text-slate-400 text-xs xs:mt-2 px-2 pb-3 xs:text-sm sm:text-base">
                At WebAppWarfare, our mission is to provide access to
                high-quality education in web application security. We believe
                that everyone, regardless of their background, should have the
                opportunity to learn and master the essential skills needed to
                build secure and robust web applications.
              </p>
            </div>
          </div>

          <div className="w-full mt-[7rem] mb-[7rem]">
            <div className="flex justify-center">
              <img
                src={office4}
                className="max-h-[150px] rounded-full mr-2 xs:max-h-none slide-in-effect w-2/5 max-w-[190px] h-auto opacity-100 transition-opacity duration-1000 ease-in-out"
              ></img>
              <div className="flex flex-col md:ml-3 border-b-[1px] border-slate-600">
                <h1 className="text-white text-sm xs:text-base sm:text-lg">
                  What Sets Us Apart
                </h1>
                <p className="text-slate-400 text-xs xs:text-sm sm:text-base xs:mt-2 sm:mt-4 md:mt-5">
                  What makes WebAppWarfare unique is our commitment to
                  practical, hands-on learning. Our platform is designed to
                  provide real-world insights and scenarios, allowing users to
                  not only understand theoretical concepts but also apply them
                  in practical situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
