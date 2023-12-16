import React, { useEffect, useState } from "react";
import {
  getFeaturedGuides,
  getPublishedApprovedGuides,
  searchGuides,
} from "../api/guide";
import "../App.css";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";

const Guides = () => {
  let imageListReg = ref(storage, "/guidepfp/");
  const [guides, setGuides] = useState([]);
  const [featuredGuides, setFeaturedGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [urlList, setUrlList] = useState([]);

  let list = [];

  async function fetchGuides() {
    const guides = await getPublishedApprovedGuides();
    // console.log(guides);
    setGuides(guides);
  }

  async function fetchFeaturedGuides() {
    const guides = await getFeaturedGuides();
    console.log("Featured guides:", guides);
    setFeaturedGuides(guides);
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
    fetchFeaturedGuides();
    const fetchImages = async () => {
      try {
        const res = await listAll(imageListReg);
        const urlPromises = res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        });
        const urls = await Promise.all(urlPromises);
        setUrlList(urls);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-2 mt-[1rem] flex flex-wrap justify-center slide-in-effect">
      <div className="w-full text-slate-400 mb-3 text-sm xs:text-base md:text-[17px] fade-in-effect justify-center"></div>
      <div className="pb-5 max-w-[600px] md:max-w-[700px] lg:max-w-[800px] flex flex-col flex-wrap justify-center hover:cursor-pointer">
        <div className="flex justify-end text-orange-400 max-h-[23px]">
          <div className="flex pt-1.5">
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
            <FaSortAmountDownAlt
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white"
              onClick={async () => {
                await sortDifficultyDown();
              }}
            />
            <FaSortAmountUp
              className="mx-1 mt-1 hover:cursor-pointer hover:text-white mr-2"
              onClick={async () => {
                await sortDifficultyUp();
              }}
            />

            <input
              placeholder="Search Guides Here"
              className="border-l-[1px] border-r-[1px] border-slate-600 bg-inherit pl-2 h-[23px]"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            ></input>
            <button
              className="border-r-[2px] outline-none border-slate-600 ml-2 pr-2 mr-[38px] h-[23px]"
              onClick={async () => {
                const searchedGuides = await searchGuides(searchTerm);
                setGuides(searchedGuides);
              }}
            >
              Search
            </button>
          </div>

          <HiMiniMagnifyingGlassCircle
            className="text-orange-400 text-4xl absolute"
            onClick={async () => {
              const searchedGuides = await searchGuides(searchTerm);
              setGuides(searchedGuides);
            }}
          />
        </div>
        {featuredGuides.length &&
          featuredGuides.map((featuredGuide) => {
            if (featuredGuide.difficulty === "Easy") {
              var diffClass = "text-sm md:text-sm text-green-400";
            } else if (featuredGuide.difficulty === "Medium") {
              var diffClass = "text-sm md:text-sm text-blue-300 ";
            } else if (featuredGuide.difficulty === "Hard") {
              var diffClass = "text-sm md:text-sm text-red-400 ";
            } else if (featuredGuide.difficulty === "Insane") {
              var diffClass = "text-sm md:text-sm text-purple-500";
            }
            return (
              <div className="flex flex-col px-1 my-1">
                <div className="flex flex-start">
                  <label className="text-white bg-orange-600 pl-1 pr-4 text-sm rounded-tr-[10px]">
                    Featured
                  </label>
                </div>

                <div className="p-2 flex border-[1px] border-slate-600">
                  <div>
                    {" "}
                    <img
                      src={""}
                      className="w-[100px] h-[100px] border-[1px] border-slate-600"
                    ></img>
                  </div>
                  <div className="pl-3">
                    <h1 className="text-white text-ellipsis overflow-hidden">
                      {featuredGuide.vmtitle}
                    </h1>
                    <p className={diffClass}>{featuredGuide.difficulty}</p>
                    <p className="text-slate-400 mt-1 text-xs truncated-text">
                      {featuredGuide.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* <div className="max-w-[600px] md:max-w-[700px] lg:max-w-[900px] flex flex-wrap justify-center hover:cursor-pointer">
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
              <div className="flex flex-col py-1.5 px-4 border-[1px] border-slate-500 w-[150px] md:w-[180px] m-3 rounded-sm fade-in-effect hover:cursor-pointer">
                <div className="flex justify-center">
                  {urlList.length &&
                    urlList.map((image) => {
                      let guide_id = image.split("_")[1];
                      list.push(guide_id);
                      if (guide_id === guide._id) {
                        return (
                          <img
                            src={image}
                            className="border-[1px] border-slate-500 outline-none w-[90px] h-[90px] md:h-[115px] md:w-[115px] mt-1 mb-2 rounded-sm"
                          />
                        );
                      }
                    })}
                </div>
                <div className="flex justify-center">
                  {!list.includes(guide._id) && (
                    <img
                      src="https://www.ecpi.edu/sites/default/files/whitehat.png"
                      className="border-[1px] border-slate-500 outline-none w-[90px] h-[90px] md:h-[115px] md:w-[115px] mt-1 mb-2 rounded-sm"
                    />
                  )}
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
      </div> */}
    </div>
  );
};

export default Guides;
