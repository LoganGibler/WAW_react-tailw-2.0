import React, { useEffect, useState } from "react";
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import { IoBookmarksSharp } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import defaultGuidePFP from "../imgs/default.jpg";
import { useNavigate } from "react-router-dom";
import {
  getFeaturedGuides,
  getPublishedApprovedGuides,
  searchGuides,
} from "../api/guide";
import {
  addGuideToUserBookmarks,
  getUsersBookmarkedGuides,
  removeGuideFromBookmarks,
} from "../api/user";
import "../App.css";

const Guides = ({ activeSession, activeUser, pfps }) => {
  const [guides, setGuides] = useState([]);
  const [featuredGuides, setFeaturedGuides] = useState([]);
  const [usersBookmarkedGuides, setUsersBookmarkedGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  let list = [];

  const handleClickButtonBookmark = async (event, activeUser, id) => {
    event.stopPropagation();
    await addGuideToUserBookmarks(activeUser, id);
    await fetchUsersBookmarkedGuides(activeUser);
  };

  const handleClickButtonUnBookmark = async (event, activeUser, id) => {
    event.stopPropagation();
    await removeGuideFromBookmarks(activeUser, id);
    await fetchUsersBookmarkedGuides(activeUser);
  };

  async function fetchGuides() {
    const guides = await getPublishedApprovedGuides();
    setGuides(guides);
  }

  async function fetchFeaturedGuides() {
    const guides = await getFeaturedGuides();
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
    setFeaturedGuides([]);
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
    setFeaturedGuides([]);
    setGuides(sortedGuides);
  }

  async function sortDifficultyDown() {
    const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3, Insane: 4 };
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const difficultyA = difficultyOrder[a.difficulty];
      const difficultyB = difficultyOrder[b.difficulty];

      return difficultyA - difficultyB;
    });
    setFeaturedGuides([]);
    setGuides(sortedGuides);
  }

  async function sortDifficultyUp() {
    const difficultyOrder = { Easy: 4, Medium: 3, Hard: 2, Insane: 1 };
    const sortedGuides = Array.from(guides).sort((a, b) => {
      const difficultyA = difficultyOrder[a.difficulty];
      const difficultyB = difficultyOrder[b.difficulty];

      return difficultyA - difficultyB;
    });
    setFeaturedGuides([]);
    setGuides(sortedGuides);
  }

  async function fetchUsersBookmarkedGuides(activeUser) {
    const usersBookmarkedGuides = await getUsersBookmarkedGuides(activeUser);
    setUsersBookmarkedGuides(usersBookmarkedGuides.bookmarks);
  }

  useEffect(() => {
    fetchGuides();
    fetchFeaturedGuides();
    activeSession && fetchUsersBookmarkedGuides(activeUser);
  }, [activeSession, activeUser]);

  return (
    <div className="p-2 w-full min-h-screen mt-[0rem] flex justify-center slide-in-effect">
      <div>
        <div className="pb-0  max-w-[600px] md:max-w-[700px] lg:max-w-[800px] flex flex-col justify-center hover:cursor-pointer">
          <div className="flex justify-end text-orange-400 max-h-[23px] mb-1">
            <div className="flex pt-1.5 text-sm sm:text-base">
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
                className="border-l-[1px] border-r-[1px] w-[140px] sm:w-[180px] border-slate-600 bg-inherit pl-2 h-[23px]"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              ></input>
              <button
                className="border-r-[2px] outline-none border-slate-600 ml-2 pr-2 mr-[38px] h-[23px]"
                onClick={async () => {
                  const searchedGuides = await searchGuides(searchTerm);
                  setFeaturedGuides([]);
                  setGuides(searchedGuides);
                }}
              >
                Search
              </button>
            </div>

            <HiMiniMagnifyingGlassCircle
              className="text-orange-500 text-4xl absolute"
              onClick={async () => {
                const searchedGuides = await searchGuides(searchTerm);
                setFeaturedGuides([]);
                setGuides(searchedGuides);
              }}
            />
          </div>
          {/* <div className="pt-3"> */}
          {featuredGuides.length ? (
            <div className="pb-4 mt-2">
              {featuredGuides.length &&
                featuredGuides.map((featuredGuide, index) => {
                  if (featuredGuide.difficulty === "Easy") {
                    var diffClass = "text-[13px] sm:text-sm text-green-400";
                  } else if (featuredGuide.difficulty === "Medium") {
                    var diffClass = "text-[13px] sm:text-sm text-blue-300 ";
                  } else if (featuredGuide.difficulty === "Hard") {
                    var diffClass = "text-[13px] sm:text-sm text-red-400 ";
                  } else if (featuredGuide.difficulty === "Insane") {
                    var diffClass = "text-[13px] sm:text-sm text-purple-500";
                  }
                  return (
                    <div className="flex flex-col px-1 mt-2 mb-0" key={index}>
                      <div className="flex flex-start">
                        <label className="text-white bg-orange-600 pl-1 pr-4 text-xs sm:text-sm rounded-tr-[10px] ">
                          Featured
                        </label>
                      </div>

                      <div
                        className="p-2 flex border-[1px] border-slate-600 text-slate-400 hover:cursor-pointer hover:text-slate-300 hover:border-slate-400"
                        onClick={(e) => {
                          navigate("/guide/" + featuredGuide._id);
                        }}
                      >
                        {pfps.length
                          ? pfps.map((image, index) => {
                              let featuredGuide_id = image.split("_")[1];
                              list.push(featuredGuide_id);
                              if (featuredGuide_id === featuredGuide._id) {
                                return (
                                  <img
                                    key={index}
                                    src={image}
                                    className="border-[1px] border-slate-500 outline-none w-[70px] h-[70px] sm:w-[74px] sm:h-[74px]  mt-1 mb-0 rounded-sm"
                                  />
                                );
                              }
                            })
                          : null}

                        {!list.includes(featuredGuide._id) ? (
                          <img
                            src={defaultGuidePFP}
                            className="border-[1px] border-slate-500 outline-none w-[70px] h-[70px] sm:w-[74px] sm:h-[74px]  mt-1 mb-0 rounded-sm"
                          />
                        ) : null}

                        <div className="pl-3 grow">
                          <div className="flex">
                            <div className="flex grow mt-0 mr-2">
                              <h1 className="text-white text-[15px] sm:text-base text-ellipsis overflow-hidden">
                                {featuredGuide.vmtitle}
                              </h1>
                              <div className="flex grow justify-end">
                                {featuredGuide.system == "hidden" && (
                                  <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base" />
                                )}
                                {featuredGuide.system == "Linux" && (
                                  <FcLinux className="text-slate-100 text-[19px] md:text-[24px]" />
                                )}
                                {featuredGuide.system == "Windows" && (
                                  <FaWindows className="text-slate-100 text-sm mt-1 md:text-lg md:mb-1" />
                                )}
                                {!featuredGuide.system && (
                                  <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base md:mt-1.5" />
                                )}
                                {activeSession ? (
                                  <>
                                    {!usersBookmarkedGuides.includes(
                                      featuredGuide._id
                                    ) ? (
                                      <IoBookmarksOutline
                                        className="text-orange-500 text-lg mt-[3px] ml-2"
                                        onClick={(e) =>
                                          handleClickButtonBookmark(
                                            e,
                                            activeUser,
                                            featuredGuide._id
                                          )
                                        }
                                      />
                                    ) : (
                                      <IoBookmarksSharp
                                        className="text-orange-500 text-lg mt-[3px] ml-2"
                                        onClick={(e) =>
                                          handleClickButtonUnBookmark(
                                            e,
                                            activeUser,
                                            featuredGuide._id
                                          )
                                        }
                                      />
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <p className={diffClass}>
                            {featuredGuide.difficulty}
                          </p>
                          <p className=" mt-1 text-xs truncated-text-sm">
                            {featuredGuide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </div>

        <div className="max-w-[600px] mb-[5rem] md:max-w-[695px] lg:max-w-[795px] flex flex-col sm:flex-wrap sm:flex-row  justify-center hover:cursor-pointer mt-3">
          {guides.length ? (
            guides.map((guide, index) => {
              if (guide.difficulty === "Easy") {
                var diffClass =
                  "text-[13px] sm:text-sm text-green-400 md:mt-[1.5px]";
              } else if (guide.difficulty === "Medium") {
                var diffClass =
                  "text-[13px] sm:text-sm text-blue-300 md:mt-[1.5px]";
              } else if (guide.difficulty === "Hard") {
                var diffClass =
                  "text-[13px] sm:text-sm  text-red-400 md:mt-[1.5px]";
              } else if (guide.difficulty === "Insane") {
                var diffClass =
                  "text-[13px] sm:text-sm text-purple-500 md:mt-[1.5px]";
              }
              return (
                <div
                  key={index}
                  className="grow flex sm:w-[300px] flex-col py-1.5 sm:ml-1 my-1 px-4 border-[1px] border-slate-600 text-slate-400 rounded-sm fade-in-effect hover:cursor-pointer hover:text-slate-300 hover:border-slate-400"
                  onClick={() => {
                    navigate("/guide/" + guide._id);
                  }}
                >
                  <div className="flex">
                    {pfps.length
                      ? pfps.map((image, index) => {
                          let guide_id = image.split("_")[1];
                          list.push(guide_id);
                          if (guide_id === guide._id) {
                            return (
                              <img
                                key={index}
                                src={image}
                                className="border-[1px] border-slate-500 outline-none w-[40px] h-[40px]  mt-1 mb-2 rounded-sm"
                              />
                            );
                          }
                        })
                      : null}

                    {!list.includes(guide._id) ? (
                      <img
                        src={defaultGuidePFP}
                        className="border-[1px] border-slate-500 outline-none w-[40px] h-[40px]  mt-1 mb-2 rounded-sm"
                      />
                    ) : null}
                    <div className="flex flex-col px-3">
                      <h1 className="text-white text-sm text-ellipsis overflow-hidden md:text-base">
                        {guide.vmtitle}
                      </h1>
                      <p className={diffClass}>{guide.difficulty}</p>
                    </div>
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
                        <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base md:mt-1.5" />
                      )}
                      {activeSession ? (
                        <>
                          {!usersBookmarkedGuides.includes(guide._id) ? (
                            <IoBookmarksOutline
                              className="text-orange-500 text-lg mt-[3px] ml-2"
                              onClick={(e) =>
                                handleClickButtonBookmark(
                                  e,
                                  activeUser,
                                  guide._id
                                )
                              }
                            />
                          ) : (
                            <IoBookmarksSharp
                              className="text-orange-500 text-lg mt-[3px] ml-2"
                              onClick={(e) =>
                                handleClickButtonUnBookmark(
                                  e,
                                  activeUser,
                                  guide._id
                                )
                              }
                            />
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                  <p className=" mt-1 text-xs truncated-text-sm">
                    {guide.description}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-slate-300 min-h-screen grow">
              No Guides Found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guides;
