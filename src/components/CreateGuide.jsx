import React from "react";
import logo from "../imgs/logoBlue.png";
import { GrHost } from "react-icons/gr";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { MdTitle } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { CiSquareInfo } from "react-icons/ci";

const CreateGuide = () => {
  return (
    <div className="flex w-full justify-center slide-in-effect mt-2 sm:mt-8">
      <div className="flex max-w-[550px] grow mt-4 min-h-screen mx-3 fade-in-effect">
        <form className="flex flex-col text-slate-300 grow">
          <div className="flex flex-start">
            <img src={logo} className="w-[55px] h-auto"></img>
            <h1 className="text-white mt-1 ml-3 grow border-b-[1px] border-slate-400 pb-1">
              Guide Submission Form
            </h1>
          </div>

          <div className="flex mt-4 mb-1">
            <MdTitle className="mt-1 mr-2 text-orange-500" />
            <label>Vulnerable Box Title</label>
          </div>
          <input
            className=" bg-inherit py-1 pl-2 mt-2 rounded-sm text-slate-400 border-[1px] border-slate-400"
            placeholder="Enter VM title here..."
            maxLength={12}
          ></input>

          <div className="flex mt-4 ">
            <FaSortAmountUp className="mt-1 mr-2 text-orange-500" />
            <label>Difficulty Rating</label>
          </div>

          <select
            name="difficulty"
            className="bg-inherit py-1 border-b-[1px] mt-2 border-slate-400"
          >
            <option value="easy" className="text-black">
              Easy
            </option>
            <option value="medium" className="text-black">
              Medium
            </option>
            <option value="hard" className="text-black">
              Hard
            </option>
            <option value="insane" className="text-black">
              Insane
            </option>
          </select>
          <div className="flex mt-4">
            <GrSystem className="mt-1 mr-2 text-orange-500" />
            <label>Box Operating System</label>
          </div>
          <select
            name="system"
            className="bg-inherit mt-2 text-slate-300 border-b-[1px] border-slate-400 py-1"
          >
            <option value="hidden" className="text-black">
              Hidden
            </option>
            <option value="Linux" className="text-black">
              Linux
            </option>
            <option value="Windows" className="text-black">
              Windows
            </option>
          </select>
          <div className="flex mt-4">
            <MdOutlineDescription className="mt-1 mr-2 text-orange-500" />
            <label className="">Description</label>
          </div>
          <textarea
            maxLength={700}
            className="mt-3 text-sm p-2 bg-inherit border-[1px] h-[150px] border-slate-400 rounded-sm"
            placeholder="Brief summary of what a user would encounter when attempting this box. Don't give too much away!"
          ></textarea>
          <div className="flex text-sm  text-slate-300 mt-5 justify-center">
            <CiSquareInfo className="text-xl text-orange-400 mr-2" />
            <p>All Information here can be updated later.</p>
          </div>
          <div className="hidden xs:flex justify-end grow">
            <div className="">
              <button className="hidden xs:flex bg-orange-600 text-sm text-white px-2 py-1 rounded-md">
                Submit
              </button>
            </div>
          </div>

          <button className="xs:hidden bg-orange-600 text-sm text-white px-2 py-1 rounded-md mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuide;
