import React, { useState } from "react";
import logo from "../imgs/logoBlue.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <form className="flex flex-col pb-[15rem] mt-[5rem] lg:mt-[7rem]">
          <div className="flex justify-center mb-2">
            <img src={logo} className="w-[50px] h-auto"></img>
            <h1 className="text-white font-semibold mt-1 mx-4 text-lg md:text-xl lg:text-2xl">
              Sign in
            </h1>
          </div>
          <div className="flex">
            <BiSolidUserRectangle className="bg-white p-0.5 text-[35px] outline-none rounded-tl-md rounded-bl-md mt-2" />
            <input
              placeholder="Username"
              className="border-2 border-gray-400 rounded-tr-md border-none rounded-br-md p-1 mt-2 md:w-[250px] lg:w-[300px]"
            ></input>
          </div>
          <div className="flex">
            <FaEyeSlash className="bg-white text-[34px] p-1 outline-none rounded-tl-md rounded-bl-md mt-2" />
            <input
              placeholder="Password"
              type="password"
              className="border-2 border-gray-400 rounded-tr-md border-none rounded-br-md p-1 mt-2 md:w-[250px] lg:w-[300px]"
            ></input>
          </div>
          <button className="border-none rounded-md p-1 mt-2 text-white bg-orange-600">
            Login
          </button>

          <div className="flex justify-center mt-5">
            <p className="text-slate-100 text-sm pt-[3px]">Need an account?</p>
            <button
              className="text-slate-100 text-sm border-[1px] border-slate-100 mr-1.5 rounded-md py-[2px] ml-2 px-1 hover:cursor-pointer"
              onClick={() => {
                navigate("/Register");
              }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-4 text-center w-full">
        <p className="text-slate-100 text-xs sm:text-base">
          © 2023 WebAppWarfare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
