import React, { useState } from "react";
import logo from "../imgs/logoBlue.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api/user";
import { IoIosWarning } from "react-icons/io";

const Login = ({ setSessionActive }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center slide-in-effect">
        <form
          className="flex flex-col pb-[15rem] mt-[5rem] lg:mt-[7rem] fade-in-effect"
          type="submit"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              // console.log("form submitted");
              let token = await loginUser(username, password);
              if (!token) {
                alert("Login Failed.");
                return;
              }
              // console.log("this is token", token);
              localStorage.setItem("username", JSON.stringify(username));
              setUsername("");
              setPassword("");

              navigate("/Guides");
              window.location.reload();
            } catch (error) {
              setShowLoginError(true);
            }
          }}
        >
          <div className="flex justify-center mb-2">
            <img src={logo} className="w-[50px] h-auto ml-4"></img>

            <h1 className="text-white font-semibold mt-0 mx-4 text-lg md:text-xl border-b-[1px] border-slate-400 pb-1 px-3">
              Sign in
            </h1>
          </div>
          {showLoginError ? (
            <div className="flex justify-center">
              <p className="flex justify-center">
                <IoIosWarning className="text-orange-500 text-xl" />
              </p>
              <p className="text-xs ml-1 mt-[2px] text-slate-300">
                Username or password not found.
              </p>
            </div>
          ) : null}
          <div className="flex bg-white mt-1.5 rounded-sm">
            <BiSolidUserRectangle className="p-0.5 text-[35px] outline-none  mt-0" />
            <input
              placeholder="Username"
              className="border-2 border-gray-400 border-none p-1 mt-0 md:w-[250px]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex bg-white mt-2 rounded-sm">
            <FaEyeSlash className="bg-white text-[34px] p-1 outline-none  mt-0" />
            <input
              placeholder="Password"
              type="password"
              className="border-2 border-gray-400 border-none  p-1 mt-0 md:w-[250px]"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="border-none rounded-sm p-1 mt-2 text-white bg-orange-600"
            type="submit"
          >
            Login
          </button>

          <div className="flex justify-center mt-5">
            <p className="text-slate-300 text-sm pt-[3px]">Need an account?</p>
            <button
              className="text-slate-300 text-sm border-[1px] border-slate-300 mr-1.5 rounded-md py-[2px] ml-2 px-1 hover:cursor-pointer"
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
