import React from "react";
import { useNavigate } from "react-router-dom";

const FooterLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full justify-center pb-[0rem]">
      <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center text-slate-400 px-2 mx-2 pt-[1.5rem]">
        <div className="flex text-sm sm:text-base flex-col px-[2rem] border-b-[1px] pb-[1rem] mx-[1rem] sm:border-r-[1px] sm:border-b-0 border-slate-600 lg:px-[4rem]">
          <h1 className="text-slate-200  font-semibold mt-1">Contact</h1>
          <a
            href="https://www.linkedin.com/in/logan-gibler/"
            className="text-slate-300 mt-2"
          >
            LinkedIn
          </a>
          <p className="">Jacksonville, FL</p>
          <p>St. Augustine, FL</p>
          <p>Zip code: 32095</p>
          <p>Logan.Gibler5@gmail.com</p>
        </div>
        <div className="flex text-sm sm:text-base flex-col px-[2rem] border-b-[1px] sm:border-b-0 mx-[1rem] pb-[1rem] md:border-r-[1px] border-slate-600 lg:pr-[6rem] lg:pl-[5rem] mt-4 sm:mt-0">
          <h1 className="text-slate-200 font-semibold mt-1">Menu</h1>
          <p
            className="mt-2hover: cursor-pointer mt-2"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p
            className="hover: cursor-pointer mt-1"
            onClick={() => {
              navigate("/AboutUs");
            }}
          >
            {" "}
            About
          </p>
          <p
            className="hover: cursor-pointer mt-1"
            onClick={() => {
              navigate("/Guides");
              // navigate(0);
            }}
          >
            Guides
          </p>
          <p
            className="whitespace-nowraphover: cursor-pointer mt-1"
            onClick={() => navigate("/Register")}
          >
            Sign Up
          </p>
        </div>
        <div className="flex text-sm sm:text-base flex-col px-[3rem] mt-0 md:mt-0 md+:mt-0 lg:px-[4rem]">
          <h1 className="text-slate-200  font-semibold mt-1">Recent Posts</h1>
          <p
            className="mt-2 hover:cursor-pointer"
            onClick={() => navigate("/guide/6538a99209367c8919dc2294")}
          >
            Cap
          </p>
          <p
            className="hover: cursor-pointer mt-1"
            onClick={() => navigate("/guide/651f27fd6ac0e1388190eb63")}
          >
            Wifinetic
          </p>
          <p
            className="hover: cursor-pointer mt-1"
            onClick={() => navigate("/guide/65242b11bcfb0775ddb0d9dc")}
          >
            Lame
          </p>
          <p
            className="hover: cursor-pointer mt-1"
            onClick={() => navigate("/guide/6524684ebcfb0775ddb0da58")}
          >
            Bashed
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-8 pb-2">
        <p className="text-slate-200 text-sm sm:text-base">
          © 2023 WebAppWarfare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterLinks;
