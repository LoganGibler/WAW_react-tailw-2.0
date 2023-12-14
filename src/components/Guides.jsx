import React, { useEffect, useState } from "react";
import { getPublishedApprovedGuides, searchGuides } from "../api/guide";

import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchGuides() {
    const guides = await getPublishedApprovedGuides();
    console.log(guides);
    setGuides(guides);
  }

  async function sortAlphaDown() {
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const titleA = a.vmtitle.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      const titleB = b.vmtitle.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    // console.log(guides);
    setGuides(sortedGuides);
  }

  async function sortAlphaUp() {
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const titleA = a.vmtitle.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      const titleB = b.vmtitle.toUpperCase();

      if (titleA < titleB) {
        return 1;
      }
      if (titleA > titleB) {
        return -1;
      }
      return 0;
    });
    // console.log(guides);
    setGuides(sortedGuides);
  }

  async function sortDifficultyDown() {
    const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3, Insane: 4 };
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const difficultyA = difficultyOrder[a.difficulty];
      const difficultyB = difficultyOrder[b.difficulty];

      return difficultyA - difficultyB;
    });
    setGuides(sortedGuides);
  }

  async function sortDifficultyUp() {
    const difficultyOrder = { Easy: 4, Medium: 3, Hard: 2, Insane: 1 };
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const difficultyA = difficultyOrder[a.difficulty];
      const difficultyB = difficultyOrder[b.difficulty];

      return difficultyA - difficultyB;
    });
    setGuides(sortedGuides);
  }

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div className="p-2 mt-[1rem] flex flex-wrap justify-center slide-in-effect">
      <div className="w-full text-slate-400 border-t-[1px] border-slate-600 border-b-[1px] mb-3 text-sm xs:text-base md:text-[17px] fade-in-effect">
        <div className="flex justify-center">
          <div className="flex pr-2">
            <FaSortAlphaDown
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white"
              onClick={async () => {
                await sortAlphaDown();
              }}
            />
            <FaSortAlphaUpAlt
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white"
              onClick={async () => {
                await sortAlphaUp();
              }}
            />
          </div>
          <input
            placeholder="Search Guides Here"
            className="border-l-[1px] border-r-[1px] border-slate-600 bg-inherit pl-2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
          <button
            className="border-r-[2px] outline-none border-slate-600 ml-2 pr-2 "
            onClick={async () => {
              const searchedGuides = await searchGuides(searchTerm);
              console.log(
                "this is searched guides on frontend: ",
                searchedGuides
              );
              setGuides(searchedGuides);
            }}
          >
            Search
          </button>
          <div className="flex pl-2">
            <FaSortAmountDownAlt
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white"
              onClick={async () => {
                await sortDifficultyDown();
              }}
            />
            <FaSortAmountUp
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white"
              onClick={async () => {
                await sortDifficultyUp();
              }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-[600px] md:max-w-[700px] lg:max-w-[980px] flex flex-wrap justify-center">
        {guides.length ? (
          guides.map((guide) => {
            if (guide.difficulty === "Easy") {
              var diffClass =
                "text-sm md:text-base text-green-400 md:mt-[1.5px]";
            } else if (guide.difficulty === "Medium") {
              var diffClass =
                "text-sm md:text-base text-blue-300 md:mt-[1.5px]";
            } else if (guide.difficulty === "Hard") {
              var diffClass = "text-sm md:text-base text-red-400 md:mt-[1.5px]";
            } else if (guide.difficulty === "Insane") {
              var diffClass =
                "text-sm md:text-base text-purple-500 md:mt-[1.5px]";
            }

            return (
              <div className="flex flex-col py-1.5 px-4 border-[1px] border-slate-500 w-[150px] md:w-[184px] lg:w-[235px] m-2 rounded-sm fade-in-effect hover:cursor-pointer">
                <div className="flex justify-center">
                  <img
                    src=""
                    className="border-[1px] border-slate-500 outline-none w-[100px] h-[100px] md:h-[130px] md:w-[130px] mt-1 mb-2 rounded-sm"
                  ></img>
                </div>

                <h1 className="text-white text-sm text-ellipsis font-semibold overflow-hidden md:text-base">
                  {guide.vmtitle}
                </h1>

                <div className="flex mt-1">
                  <p className={diffClass}>{guide.difficulty}</p>
                  <div className="flex grow justify-end mt-0">
                    {guide.system == "hidden" && (
                      <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base" />
                    )}
                    {guide.system == "Linux" && (
                      <FcLinux className="text-slate-100 text-[19px] md:text-[24px]" />
                    )}
                    {guide.system == "Windows" && (
                      <FaWindows className="text-slate-100 text-sm mt-1 md:text-lg md:mb-1" />
                    )}
                    {!guide.system && (
                      <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-sm md:mt-1.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-slate-300 min-h-screen">No Guides Found.</div>
        )}
      </div>
    </div>
  );
};

export default Guides;
