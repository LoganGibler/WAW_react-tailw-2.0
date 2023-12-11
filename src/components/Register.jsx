import React, { useState } from "react";
import logo from "../imgs/logoBlue.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { BiX } from "react-icons/bi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassRequirements, setShowPassRequirements] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passUpperChar, setPassUpperChar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <form className="flex flex-col pb-[15rem] mt-[5rem] lg:mt-[7rem]">
          <div className="flex justify-center mb-2">
            <img src={logo} className="w-[50px] h-auto"></img>
            <h1 className="text-white font-semibold mt-1 mx-4 text-lg md:text-xl lg:text-2xl">
              Sign Up
            </h1>
          </div>
          <div className="flex">
            <BiSolidUserRectangle className="bg-white p-0.5 text-[35px] outline-none rounded-tl-md rounded-bl-md mt-2" />
            <input
              type="text"
              placeholder="Username"
              maxLength={12}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onClick={() => {
                setShowPassRequirements(false);
              }}
              className="border-2 border-gray-400 rounded-tr-md border-none rounded-br-md p-1 mt-2 md:w-[250px] lg:w-[300px]"
            ></input>
          </div>
          <div className="flex">
            <FaEyeSlash className="bg-white text-[34px] p-1 outline-none rounded-tl-md rounded-bl-md mt-2" />
            <input
              placeholder="Password"
              type="password"
              maxLength={50}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length > 6) {
                  setPassLength(true);
                } else {
                  setPassLength(false);
                }
                if (/\p{Lu}/u.test(e.target.value)) {
                  setPassUpperChar(true);
                } else {
                  setPassUpperChar(false);
                }
                if (/\d/.test(e.target.value)) {
                  setPassNum(true);
                } else {
                  setPassNum(false);
                }
              }}
              onClick={() => {
                setShowPassRequirements(true);
              }}
              className="border-2 border-gray-400 rounded-tr-md border-none rounded-br-md p-1 mt-2 md:w-[250px] lg:w-[300px]"
            ></input>
          </div>
          {showPassRequirements && (
            <div className="flex flex-col mt-2 text-slate-100">
              {/* <p className="ml-2">Please include the below in your password:</p> */}
              <div className="flex">
                <li className="mt-[4px] text-sm">At least 7 characters long</li>
                {passLength ? (
                  <FaCheck className="text-green-500 text-lg mt-[5px] ml-2" />
                ) : (
                  <BiX className="text-red-600 text-3xl ml-1" />
                )}
              </div>

              <div className="flex">
                <li className="mt-1 text-sm">Capital Letter </li>
                {passUpperChar ? (
                  <FaCheck className="text-green-500 text-lg mt-1.5 ml-2" />
                ) : (
                  <BiX className="text-red-600 text-3xl ml-1" />
                )}
              </div>

              <div className="flex pb-2">
                <li className="mt-1 text-sm">Number</li>
                {passNum ? (
                  <FaCheck className="text-green-500 text-lg mt-1.5 ml-2" />
                ) : (
                  <BiX className="text-red-600 text-3xl ml-1" />
                )}
              </div>
            </div>
          )}
          <button className="border-none rounded-md p-1 mt-2 text-white bg-orange-600">
            Register
          </button>

          <div className="flex justify-center mt-5">
            <p className="text-slate-100 text-sm pt-[3px]">Have an account?</p>
            <button
              className="text-slate-100 text-sm border-[1px] border-slate-100 mr-1.5 rounded-md py-[2px] ml-2 px-1 hover:cursor-pointer"
              onClick={() => {
                navigate("/Login");
              }}
            >
              Sign in
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

export default Register;
