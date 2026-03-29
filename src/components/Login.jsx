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
    <div className="flex flex-col justify-center min-h-[calc(100vh-60px)]">
      <div className="flex justify-center slide-in-effect px-4">
        <form
          className="login-card px-7 pt-6 pb-8 rounded-xl flex flex-col mt-[2rem] lg:mt-[3rem] fade-in-effect w-full max-w-[340px]"
          type="submit"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              let token = await loginUser(username, password);
              if (!token) {
                alert("Login Failed.");
                return;
              }
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
          <div className="flex justify-center mb-3">
            <IoPersonCircleSharp className="text-[70px] text-orange-500/80" />
          </div>
          <div className="flex justify-center mt-0 mb-4">
            <h2 className="font-bold text-xl text-white tracking-wide">Sign in</h2>
          </div>

          <div className="flex items-center input-dark mt-1.5 px-3 py-2 gap-2">
            <BiSolidUserRectangle className="text-slate-400 text-[22px] flex-shrink-0" />
            <input
              placeholder="Username"
              className="border-none outline-none bg-transparent text-white text-sm w-full placeholder:text-slate-500"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center input-dark mt-3 px-3 py-2 gap-2">
            <FaEyeSlash className="text-slate-400 text-[20px] flex-shrink-0" />
            <input
              placeholder="Password"
              type="password"
              className="outline-none border-none bg-transparent text-white text-sm w-full placeholder:text-slate-500"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          {showLoginError ? (
            <div className="flex items-center justify-center mt-3 gap-1.5 bg-red-900/20 border border-red-700/30 rounded-md px-3 py-2">
              <IoIosWarning className="text-orange-400 text-base flex-shrink-0" />
              <p className="text-xs text-slate-300">
                Username or password incorrect.
              </p>
            </div>
          ) : null}

          <button
            className="btn-primary w-full py-2 mt-4 text-sm"
            type="submit"
          >
            Login
          </button>

          <div className="mt-4 rounded-md bg-slate-800/50 border border-slate-700/50 px-3 py-2">
            <p className="text-[11px] text-slate-500 text-center mb-1">Demo credentials</p>
            <div className="flex flex-col text-[11px] text-slate-400 text-center gap-0.5">
              <p>User: <span className="text-slate-300">SampleUser1</span></p>
              <p>Pass: <span className="text-slate-300">SampleUserPass1</span></p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 gap-2">
            <p className="text-slate-500 text-sm">Need an account?</p>
            <button
              className="text-orange-500 text-sm font-medium hover:text-orange-400 transition-colors"
              type="button"
              onClick={() => navigate("/Register")}
            >
              Sign up →
            </button>
          </div>
        </form>
      </div>
      <div className="text-center w-full mt-6 pb-4">
        <p className="text-slate-600 text-xs">
          © 2023 WebAppWarfare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
