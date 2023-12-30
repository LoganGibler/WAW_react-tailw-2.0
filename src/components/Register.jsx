import React, { useState } from "react";
import logo from "../imgs/logoBlue.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

import { createUser, loginUser } from "../api/user";

const Register = ({ activeSession, setActiveSession }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassRequirements, setShowPassRequirements] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passUpperChar, setPassUpperChar] = useState(false);
  const [showRegistrationError, setRegistrationError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center slide-in-effect">
        <form
          className="flex flex-col pb-[15rem] mt-[5rem] lg:mt-[7rem] fade-in-effect"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (username.length < 4) {
                alert("Please use at least 5 characters in username.");
                return;
              } else if (password.length < 6) {
                alert("Please use at least 7 characters for your password.");
                return;
              } else if (!/\p{Lu}/u.test(password)) {
                alert("Please include a capital letter in your password.");
                return;
              } else if (!/\d/.test(password)) {
                alert("Please include one number in your password.");
                return;
              } else {
                let user = await createUser(username, password);
                console.log(user);
                if (user.user) {
                  let token = await loginUser(username, password);
                  // console.log("this is token", token);
                  localStorage.setItem("username", JSON.stringify(username));
                  alert("Sign up successful");
                  setActiveSession(true);
                  setUsername("");
                  setPassword("");
                  navigate("/");
                  window.location.reload();
                } else {
                  setRegistrationError(true);
                }
              }
            } catch (error) {
              throw error;
            }
          }}
        >
          <div className="flex justify-center mb-2">
            <img src={logo} className="w-[50px] h-auto"></img>
            <h1 className="text-white font-semibold mt-0 mx-4 text-lg md:text-xl border-b-[1px] border-slate-400 pb-1 px-3">
              Sign up
            </h1>
          </div>
          {showRegistrationError ? (
            <div className="flex justify-center">
              <p className="flex justify-center">
                <IoIosWarning className="text-orange-500 text-xl" />
              </p>
              <p className="text-xs ml-1 mt-[2px] text-slate-300">
                Username already in use.
              </p>
            </div>
          ) : null}
          <div className="flex bg-white mt-1.5 rounded-sm">
            <MdEmail className="p-[3px] text-[35px] outline-none mt-0" />
            <input
              type="text"
              placeholder="Email"
              maxLength={20}
              value={email}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onClick={() => {
                setShowPassRequirements(false);
              }}
              className="grow p-0 mt-0 md:w-[250px] indent-1"
            ></input>
          </div>
          <div className="flex bg-white mt-2 rounded-sm">
            <BiSolidUserRectangle className="p-[3px] text-[35px] outline-none mt-0" />
            <input
              type="text"
              placeholder="*Username"
              maxLength={12}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onClick={() => {
                setShowPassRequirements(false);
              }}
              className="p-0 indent-1 grow mt-0 md:w-[250px]"
            ></input>
          </div>
          <div className="flex bg-white mt-2 rounded-sm">
            <FaEyeSlash className="text-[34px] p-[4px] outline-none mt-0" />
            <input
              placeholder="*Password"
              type="password"
              maxLength={50}
              value={password}
              onChange={(e) => {
                setShowPassRequirements(true);
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
              className="indent-1 p-0 mt-0 md:w-[250px]"
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
          <button
            className="border-none rounded-sm p-1 mt-2 text-white bg-orange-600"
            type="submit"
          >
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
