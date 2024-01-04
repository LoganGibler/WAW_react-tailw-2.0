import React, { useState } from "react";
import logo from "../imgs/logoBlue.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api/user";
import { IoIosWarning } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";

const Login = ({ setSessionActive }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center slide-in-effect">
        <form
          className="bg-white px-7 pt-4 pb-8 rounded-sm shadow-lg flex flex-col mt-[3rem] lg:mt-[5rem] fade-in-effect"
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

              navigate("/Dashboard");
              window.location.reload();
            } catch (error) {
              setShowLoginError(true);
            }
          }}
        >
          <div className="flex justify-center mb-2">
            {/* <img src={logo} className="w-[50px] h-auto ml-2"></img> */}
            <IoPersonCircleSharp className="text-[80px] rounded-full" />
            {/* <h1 className="pb-1 px-3  font-semibold mt-0 mx-4 text-black text-xl md:text-xl border-b-[1px] border-slate-400">
              Login
            </h1> */}
          </div>
          <div className="flex justify-center mt-0">
            <h2 className="font-bold text-lg">Sign in</h2>
          </div>

          <div className="flex bg-inherit mt-1.5 border-b-[2px] pb-0.5 border-slate-400">
            <BiSolidUserRectangle className="p-0.5 text-[33px] outline-none  mt-0" />
            <input
              placeholder="Username"
              className=" border-none outline-none bg-inherit p-1 mt-0 md:w-[250px]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex bg-inherit mt-2 border-b-[2px] pb-0.5 border-slate-400">
            <FaEyeSlash className="bg-inherit text-[34px] p-1 outline-none  mt-0" />
            <input
              placeholder="Password"
              type="password"
              className="outline-none border-none  p-1 mt-0 md:w-[250px] bg-inherit"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          {showLoginError ? (
            <div className="flex justify-center mt-3">
              <p className="flex justify-center">
                <IoIosWarning className="text-orange-500 text-xl" />
              </p>
              <p className="text-xs ml-1 mt-[2px] text-slate-400">
                Username or password incorrect.
              </p>
            </div>
          ) : null}
          <button
            className="border-none rounded-sm p-1 mt-2 text-white bg-orange-600"
            type="submit"
          >
            Login
          </button>

          <div className="flex justify-center mt-4">
            <div className="flex flex-col text-[12px] sm:text-[16px] text-slate-400">
              <p>SampleUser: SampleUser1</p>
              <p>SamplePass: SampleUserPass1</p>
            </div>
          </div>

          <div className="flex justify-center mt-5 ">
            <p className="text-slate-400 text-sm pt-[3px]">Need an account?</p>
            <button
              className="text-orange-600 text-sm border-[1px] border-orange-600 mr-1.5 rounded-md py-[2px] ml-2 px-1 hover:cursor-pointer"
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
