import React, { useEffect, useState } from "react";
import defaultGuidePFP from "../imgs/default.jpg";
import {
  getUserDataByID,
  getUsersBookmarkedGuidesData,
  removeGuideFromBookmarks,
  getUsersGuides,
} from "../api/user";
import {
  approveGuide,
  getPublishedUnapprovedGuides,
  publishGuide,
  unpublishGuide,
} from "../api/guide";
import defaultPFP from "../imgs/default.jpg";
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { CiSquareInfo } from "react-icons/ci";
import { IoBookmarksSharp } from "react-icons/io5";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Spinner from "./Spinner";

import { useNavigate } from "react-router-dom";

const Dashboard = ({ activeUser, pfps, userDetails, adminStatus }) => {
  const [userID, setUserID] = useState("");
  const [userGuides, setUserGuides] = useState([]);
  const [usersBookmarkedGuides, setUsersBookmarkedGuides] = useState([]);
  const [anyGuidesPublic, setAnyGuidesPublic] = useState(false);
  const [reviewGuides, setReviewGuides] = useState([]);
  const user = JSON.parse(localStorage.getItem("username"));
  const [isLoading, setIsLoading] = useState(true);
  let list = [];

  const navigate = useNavigate();

  async function fetchUsersPersonalGuides(userID) {
    const foundGuides = await getUsersGuides(userID);
    // console.log(foundGuides.foundGuides);
    setUserGuides(foundGuides.foundGuides);
  }

  async function fetchUsersBookmarkedGuides(userID) {
    const fetchedBookmarkedGuides = await getUsersBookmarkedGuidesData(userID);
    setUsersBookmarkedGuides(fetchedBookmarkedGuides.foundGuides);
  }

  const handleClickButtonUnBookmark = async (e, userID, guideID) => {
    e.stopPropagation();
    await removeGuideFromBookmarks(userID, guideID);
    await fetchUsersBookmarkedGuides(userID);
  };

  const handlePublishClick = async (e, guideID) => {
    e.stopPropagation();
    await publishGuide(guideID);
    await fetchUsersPersonalGuides(userID);
  };

  const handleUnpublishClick = async (e, guideID) => {
    e.stopPropagation();
    await unpublishGuide(guideID);
    await fetchUsersPersonalGuides(userID);
  };

  const handleApproval = async (e, guideID) => {
    e.stopPropagation();
    await approveGuide(guideID);
    fetchPublishedUnapprovedGuides();
  };

  const handleRejection = async (e, guideID) => {
    e.stopPropagation();
    await unpublishGuide(guideID);
    fetchPublishedUnapprovedGuides();
  };

  // async function fetchUserDetails() {
  //   const fetchedUserDetails = await getUserDataByID(userID);
  //   fetchedUserDetails.foundUser.admin && fetchPublishedUnapprovedGuides();
  //   setUserDetails(fetchedUserDetails.foundUser);
  // }

  async function fetchPublishedUnapprovedGuides() {
    const guides = await getPublishedUnapprovedGuides(userID);
    setReviewGuides(guides.publishedUnapprovedGuides);
  }

  function breakLongWords(text, maxLength) {
    if (text === undefined) {
      return;
    }
    const words = text.split(" ");
    const result = words.map((word) =>
      word.length > maxLength ? breakLongWord(word, maxLength) : word
    );
    return result.join(" ");
  }

  function breakLongWord(word, maxLength) {
    const result = [];
    for (let i = 0; i < word.length; i += maxLength) {
      result.push(word.substr(i, maxLength));
    }
    return result.join(" ");
  }

  useEffect(() => {
    setUserID(activeUser);
    adminStatus && fetchPublishedUnapprovedGuides();
    fetchUsersBookmarkedGuides(activeUser);
    fetchUsersPersonalGuides(activeUser);
    setIsLoading(false);
  }, [activeUser]);

  return (
    <div className="w-full flex justify-center px-2 text-slate-200 slide-in-effect mt-5">
      <div className="flex flex-col grow mx-3 fade-in-effect max-w-[800px] min-h-[700px] border-b-[1px] border-orange-600 pb-[8rem]">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex text-sm xs:text-base mt-[0rem] border-b-[1px] pb-2 pt-2 border-slate-500">
              ~/&nbsp;Dashboard&nbsp;/&nbsp;{" "}
              <p className="text-orange-400 whitespace-nowrap max-w-[95px] xs:max-w-none overflow-hidden text-ellipsis">
                {user}
              </p>
              &nbsp;/&nbsp;Guides
              <div className="flex grow justify-end">
                {userGuides.length ? (
                  <button
                    className="bg-orange-600 px-1 xs:px-2 rounded-md flex"
                    onClick={() => navigate("/createGuide")}
                  >
                    Create
                    <HiOutlineDocumentAdd className="text-base mt-0.5 ml-1 xs:text-xl" />
                  </button>
                ) : null}
              </div>
            </div>
            {!userGuides.length ? (
              <div className="flex flex-col p-2 justify-center text-sm text-slate-400">
                <p>
                  This is where you will edit all your unpublished Guides. Once
                  published, you will have to unpublish in order to edit again.
                  Once published, the guide will be sent to a developer to
                  approve, then the guide will be available to all users. Any
                  personal guides can be unpublished and deleted at any time.
                </p>
                <div className="flex mt-[2rem] justify-center">
                  <p className="mt-[3px] mr-2">Create your first guide here:</p>
                  <button
                    className="bg-orange-600 text-white px-2 py-1 rounded-sm"
                    onClick={(e) => navigate("/createGuide")}
                  >
                    Create Guide
                  </button>
                </div>
              </div>
            ) : (
              userGuides.map((guide, index) => {
                if (guide.difficulty === "Easy") {
                  var diffClass =
                    "text-[14px] mr-[15px] sm:text-sm md:text-[15px] md:mt-0.5 text-green-400";
                } else if (guide.difficulty === "Medium") {
                  var diffClass =
                    "text-[14px] mr-[15px] sm:text-sm md:text-[15px] md:mt-0.5 text-blue-300 ";
                } else if (guide.difficulty === "Hard") {
                  var diffClass =
                    "text-[14px] mr-[15px] sm:text-sm md:text-[15px] md:mt-0.5 text-red-400 ";
                } else if (guide.difficulty === "Insane") {
                  var diffClass =
                    "text-[14px] mr-[15px] sm:text-sm md:text-[15px] md:mt-0.5 text-purple-500";
                }

                let guideDescription = breakLongWords(guide.description, 35);

                return (
                  <div className="flex flex-col" key={index}>
                    <div
                      className="flex flex-col px-2 py-1 mt-2 rounded-sm  border-slate-600 border-[1px] grow sm:grow sm:min-w-[390px] sm:mx-1 sm:mt-3 hover:cursor-pointer hover:border-slate-400"
                      onClick={() => {
                        if (guide.approved || guide.published) {
                          navigate("/guide/" + guide._id);
                        } else {
                          navigate("/editGuide/" + guide._id);
                        }
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
                                    className="border-[1px] border-slate-500 outline-none w-[55px] h-[55px] sm:w-[60px] sm:h-[60px]  mt-1 mb-1 rounded-sm"
                                  />
                                );
                              }
                            })
                          : null}

                        {!list.includes(guide._id) ? (
                          <img
                            src={defaultGuidePFP}
                            className="border-[1px] border-slate-500 outline-none w-[55px] h-[55px] sm:w-[60px] sm:h-[60px]  mt-1 mb-1 rounded-sm"
                          />
                        ) : null}
                        <div className="flex flex-col text-slate-400 px-2 grow">
                          <div className="flex">
                            <h1 className="text-white text-[15px] sm:text-base whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis sm:max-w-[300px]">
                              {guide.vmtitle}
                            </h1>

                            <div className="flex grow justify-end">
                              <p className={diffClass}>{guide.difficulty}</p>
                              {guide.system == "Hidden" && (
                                <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base" />
                              )}
                              {guide.system == "Linux" && (
                                <FcLinux className="text-slate-100 text-[19px] mt-[0px] md:text-[24px]" />
                              )}
                              {guide.system == "Windows" && (
                                <FaWindows className="text-slate-100 text-sm mt-1 md:text-lg md:mt-0.5" />
                              )}
                              {!guide.system && (
                                <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base md:mt-1.5" />
                              )}
                            </div>
                          </div>
                          <div className="mt-0 flex text-sm">
                            <p className="truncated-text-sm text-xs sm:text-sm">
                              {guideDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex text-xs text-slate-400 mb-0.5 mt-0 sm:text-sm">
                        <div className="flex mt-[2px]">{guide.date}</div>
                        {guide.published && guide.approved ? (
                          <div className="mt-[1px] ml-2 sm:mt-[3px] flex">
                            <p className="rounded-lg px-2 font-semibold mt-[1px] text-orange-500 text-xs whitespace-nowrap md:text-sm md:mt-[0px]">
                              Public
                            </p>
                            <FaLock className="mt-0.5 text-slate-400" />
                            <IoEyeOutline className="mt-[1px] ml-1.5 text-base text-slate-400" />
                          </div>
                        ) : null}
                        {!guide.published && !guide.approved ? (
                          <div className="mt-[1px] ml-2 sm:mt-[3px]">
                            <p className="rounded-lg px-2 font-semibold mt-[1px] text-orange-500 text-xs whitespace-nowrap md:text-sm md:mt-[0px]">
                              Private
                            </p>
                          </div>
                        ) : null}
                        {guide.published && guide.approved === false ? (
                          <div className="mt-[1px] ml-2 sm:mt-[3px] flex">
                            <p className=" rounded-lg px-2 font-semibold mt-[1px] text-orange-500 text-xs whitespace-nowrap md:text-sm md:mt-[0px]">
                              Under review
                            </p>
                            <FaLock className="mt-0.5 text-slate-400" />
                          </div>
                        ) : null}
                        {guide.published ? (
                          <div className="flex grow justify-end">
                            <button
                              className="text-white bg-orange-800  px-2 text-xs rounded-md py-[1px] hover:cursor-pointer"
                              onClick={(e) =>
                                handleUnpublishClick(e, guide._id)
                              }
                            >
                              Unpublish
                            </button>
                          </div>
                        ) : (
                          <div className="flex grow justify-end">
                            <button
                              className="text-white bg-orange-600 px-2 text-xs rounded-md py-[1px] hover:cursor-pointer"
                              onClick={(e) => handlePublishClick(e, guide._id)}
                            >
                              Publish
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            {anyGuidesPublic ? (
              <div className="flex justify-center mt-3">
                <p>
                  <CiSquareInfo className="text-orange-400 text-xl" />
                </p>
                <p className="text-xs text-slate-400 ml-1 mt-[1px]">
                  Published guides must be unpublished to be edited
                </p>
              </div>
            ) : null}

            <div className="flex mt-[3rem] text-sm xs:text-base border-b-[1px] pb-2 border-slate-500">
              ~/&nbsp;Dashboard&nbsp;/&nbsp;
              <p className="text-orange-400 whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px]">
                {user}
              </p>
              &nbsp;/&nbsp;BookmarkedGuides
            </div>
            <div className="flex flex-wrap mt-1">
              {usersBookmarkedGuides.length ? (
                usersBookmarkedGuides.map((guide, index) => {
                  if (guide === null) {
                    return;
                  }
                  // console.log(usersBookmarkedGuides);
                  if (guide.difficulty === "Easy") {
                    var diffClass =
                      "text-[14px] mr-[10px] sm:text-sm md:mt-0.5 text-green-400";
                  } else if (guide.difficulty === "Medium") {
                    var diffClass =
                      "text-[14px] mr-[10px] sm:text-sm md:mt-0.5 text-blue-300 ";
                  } else if (guide.difficulty === "Hard") {
                    var diffClass =
                      "text-[14px] mr-[10px] sm:text-sm md:mt-0.5 text-red-400 ";
                  } else if (guide.difficulty === "Insane") {
                    var diffClass =
                      "text-[14px] mr-[10px] sm:text-sm md:mt-0.5 text-purple-500";
                  }
                  return (
                    <div
                      key={index}
                      className="flex px-2 py-1 mt-2 rounded-sm  border-slate-600 border-[1px] grow sm:grow sm:min-w-[390px] sm:mx-1 sm:mt-3 hover:cursor-pointer hover:border-slate-400"
                      onClick={() => {
                        navigate("/guide/" + guide._id);
                      }}
                    >
                      <img
                        className="w-[50px] rounded-sm h-[50px] border-orange-600 border-[1px]"
                        src={defaultPFP}
                      ></img>
                      <div className="flex flex-col text-slate-400 px-2 grow">
                        <div className="flex">
                          <h1 className="text-white text-[15px] max-w-[135px] sm:max-w-[300px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {guide.vmtitle}
                          </h1>

                          <div className="flex grow justify-end">
                            <p className={diffClass}>{guide.difficulty}</p>
                            {guide.system == "hidden" && (
                              <FaQuestion className="text-slate-100 text-xs mt-1 mr-[2px] md:text-base" />
                            )}
                            {guide.system == "Linux" && (
                              <FcLinux className="text-slate-100 text-[19px] mt-[0px] md:text-[24px]" />
                            )}
                            {guide.system == "Windows" && (
                              <FaWindows className="text-slate-100 text-sm mt-1 md:text-lg md:mt-0.5" />
                            )}
                            {!guide.system && (
                              <FaQuestion className="text-slate-100 text-xs mt-0.5 mr-[2px] md:text-base md:mt-1.5" />
                            )}
                            <IoBookmarksSharp
                              className="text-orange-500 mt-[3px] ml-3 md:text-lg"
                              onClick={(e) =>
                                handleClickButtonUnBookmark(
                                  e,
                                  userID,
                                  guide._id
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="flex text-sm">
                          <p>{guide.author}</p>
                          <p className="ml-3">{guide.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center grow">
                  <h1 className="mt-3 text-sm text-slate-400 text-center">
                    You have no bookmarked Guides.
                  </h1>
                </div>
              )}
            </div>

            <div className="flex mt-[3rem] text-sm xs:text-base border-b-[1px] pb-2 border-slate-500">
              ~/&nbsp;Dashboard /&nbsp;RecentlyPosted
            </div>
            <div className="flex p-2 justify-center text-sm text-slate-400">
              <p className="mt-5">Feature Coming soon.</p>
            </div>

            {adminStatus ? (
              <div>
                {/* {console.log(reviewGuides)} */}
                <div className="flex mt-[2rem] text-sm xs:text-base border-b-[1px] pb-2 border-slate-500">
                  ~/&nbsp;Dev /&nbsp;Tasks&nbsp;/&nbsp;
                  <p className="text-orange-400">Review</p>
                </div>

                {reviewGuides.length
                  ? reviewGuides.map((guide, index) => {
                      return (
                        <div
                          key={index}
                          className="flex text-sm text-slate-400 mt-2 border-[1px] border-slate-600 px-1 py-2 sm:py-2 rounded-sm hover:cursor-pointer"
                          onClick={() => {
                            navigate("/guide/" + guide._id);
                          }}
                        >
                          <h1 className="text-white ml-1 sm:text-base">
                            {guide.vmtitle}
                          </h1>
                          {/* <p className="ml-4 sm:text-base">{guide.author}</p> */}
                          <div className="grow flex justify-end text-white">
                            <button
                              className="bg-orange-600 px-2 mx-1 rounded-md sm:text-base"
                              onClick={(e) => {
                                handleApproval(e, guide._id);
                              }}
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-800 px-2 mx-1 rounded-md sm:text-base"
                              onClick={(e) => {
                                handleRejection(e, guide._id);
                              }}
                            >
                              {/* handleUnpublishButton, "unpublishGuide(guide._id)" */}
                              Reject
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
