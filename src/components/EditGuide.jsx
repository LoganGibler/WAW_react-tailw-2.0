import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUsersGuideByID } from "../api/guide";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import defaultGuidePFP from "../imgs/default.jpg";
import { CiSquareInfo } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { RiUploadCloudLine } from "react-icons/ri";
import { FaImage } from "react-icons/fa";
import { BiSolidCommentAdd } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteGuide } from "../api/guide";

const EditGuide = ({ activeUser, pfps }) => {
  const { id } = useParams();
  const [guide, setGuide] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepImagesList, setStepImagesList] = useState([]);
  const navigate = useNavigate();
  const stepImagesRef = ref(storage, "/images/" + id);
  let list = [];
  let stepIndex = 0;
  let counter = 0;
  let stepCounter = 0;

  const [editDescription, setEditDescription] = useState(false);
  const [editHeader, setEditHeader] = useState(false);
  const [editedStep, setEditedStep] = useState("");
  const [newStepCreation, setNewStepCreation] = useState(false);

  async function fetchGuide(activeUser, id) {
    const guide = await getUsersGuideByID(activeUser, id);
    console.log(guide.data.guide);
    setGuide(guide.data.guide);
    setSteps(guide.data.guide.steps);
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
    fetchGuide(activeUser, id);
    const fetchStepImages = async () => {
      try {
        const res = await listAll(stepImagesRef);
        const urlPromises = res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        });
        const urls = await Promise.all(urlPromises);
        setStepImagesList(urls);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };
    fetchStepImages();
  }, [activeUser]);

  function AutoStretchTextarea({ defaultValue }) {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [defaultValue]);

    return (
      <div className="flex flex-col w-full grow">
        <textarea
          ref={textareaRef}
          className="w-full px-1 pt-1 pb-2 rounded-sm bg-inherit border-[1px] border-slate-400"
          defaultValue={defaultValue}
          maxLength={800}
        ></textarea>
        <div className="flex grow justify-end">
          <button className="bg-orange-600 text-sm px-2 py-0.5 rounded-md mr-0 text-white mt-1 flex">
            Update <RiUploadCloudLine className="text-lg mt-[1px] ml-2" />
          </button>
        </div>
      </div>
    );
  }

  function AutoStretchTextareaStep({ defaultValue }) {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [defaultValue]);

    return (
      <div className="flex flex-col w-full grow">
        <textarea
          ref={textareaRef}
          className="w-full px-1 pt-1 text-slate-300 pb-2 rounded-sm bg-inherit border-[1px] border-slate-400"
          defaultValue={defaultValue}
          maxLength={1000}
        ></textarea>
        <div className="flex grow justify-end">
          <button className="bg-orange-600 px-2 py-1 rounded-md mr-0 text-white mt-1 flex">
            Update <RiUploadCloudLine className="text-lg mt-[1px] ml-2" />
          </button>
        </div>
      </div>
    );
  }

  if (guide.difficulty === "Easy") {
    var diffClass = "text-green-400";
  } else if (guide.difficulty === "Medium") {
    var diffClass = " text-blue-300 ";
  } else if (guide.difficulty === "Hard") {
    var diffClass = "text-red-400 ";
  } else if (guide.difficulty === "Insane") {
    var diffClass = "text-purple-500";
  }

  let guideDescription = breakLongWords(guide.description, 44);

  // const wrappedText = breakLongWords(guideDescription, 40);

  return (
    <div className="w-full flex justify-center text-slate-300 mt-5 slide-in-effect min-h-screen">
      <div className="flex flex-col mx-2 px-1 text-sm max-w-[800px] fade-in-effect grow">
        <div className="flex">
          {pfps.length
            ? pfps.map((pfp, index) => {
                let guide_id = pfp.split("_")[1];
                // console.log(guide_id);
                list.push(guide_id);
                if (guide._id === guide_id) {
                  return (
                    <img
                      key={index}
                      className="border-[1px] border-slate-500 outline-none w-[64px] h-[64px] sm:w-[80px] sm:h-[80px]  mt-1 mb-2 rounded-sm"
                      src={pfp}
                    ></img>
                  );
                }
              })
            : null}
          {!list.includes(guide._id) ? (
            <img
              src={defaultGuidePFP}
              className="border-[1px] border-slate-500 outline-none w-[64px] h-[64px] sm:w-[80px] sm:h-[80px]  mt-1 mb-2 rounded-sm"
            ></img>
          ) : null}
          <div className="flex flex-col ml-3 grow">
            {!editHeader ? (
              <div>
                <div className="flex text-white text-lg mt-1">
                  <h1 className="whitespace-nowrap max-w-[130px] overflow-hidden text-ellipsis">
                    {guide.vmtitle}
                  </h1>
                  <div
                    className="flex grow justify-end mt-[4px] pr-4 hover:cursor-pointer"
                    onClick={() => setEditHeader(true)}
                  >
                    <p className="text-sm pr-2 text-slate-300">Edit Header </p>
                    <AiFillEdit className="text-orange-400" />
                  </div>
                </div>
                <div className="flex text-slate-400 text-sm mt-2">
                  <p className={diffClass}>{guide.difficulty}</p>
                  <p className="ml-[1rem] whitespace-nowrap max-w-[130px] overflow-hidden text-ellipsis">
                    {guide.hostedby}
                  </p>
                  <p className="ml-[1rem]">{guide.system}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex text-black mt-1 mr-0">
                  <input
                    defaultValue={guide.vmtitle}
                    className=" ml-1 bg-inherit pb-1 text-white border-b-[1px] border-slate-400 text-base max-w-[140px] xs:max-w-[240px] sm:text-lg"
                  ></input>
                  <div className="flex grow justify-end">
                    <div className="pr-0">
                      <button className="bg-orange-600 px-2 text-sm rounded-md mr-0 py-0.5 text-white flex">
                        <p className="sm:mt-[0px]">Update</p>
                        <RiUploadCloudLine className="text-lg sm:mt-[1px] ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex text-slate-200 text-sm sm:text-base mt-2 sm:mt-4">
                  <select
                    name="difficulty"
                    className="bg-inherit border-b-[1px] border-slate-400"
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

                  <input
                    className="bg-inherit w-[116px] border-b-[1px] pl-1 mx-1 sm:mx-4 border-slate-400 sm:w-[200px]"
                    defaultValue={guide.hostedby}
                  ></input>
                  <select
                    name="system"
                    className="bg-inherit text-slate-200 border-b-[1px] border-slate-400 pb-1"
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
                </div>
              </div>
            )}
          </div>
        </div>
        {editHeader ? (
          <div className="flex justify-start text-white text-xs mb-3">
            <p className="text-2xl text-orange-500 mr-1">
              <FaImage className="" />
            </p>
            <input
              type="file"
              className="mt-0.5 file:rounded-md file:bg-inherit file:outline-none file:border-[1px] file:border-slate-400 file:text-slate-200"
            ></input>
          </div>
        ) : null}
        <div className="flex text-sm  text-slate-300 mt-5 justify-center">
          <CiSquareInfo className="text-xl text-orange-400 mr-2" />
          <p>Click on bodies of text to edit them.</p>
        </div>
        {!editDescription ? (
          <div
            className="flex mt-3 text-sm sm:text-base text-slate-400 hover:cursor-pointer hover:text-slate-200"
            onClick={() => setEditDescription(true)}
          >
            <p className="">{guideDescription}</p>
          </div>
        ) : (
          <div className="flex mt-3 w-full text-sm sm:text-base">
            <AutoStretchTextarea defaultValue={guideDescription} />
          </div>
        )}

        <div className="flex flex-col justify-center mx-1 mt-2 pb-3">
          {steps.length ? (
            steps.map((step, index) => {
              if (step === null || step.step === null) {
                stepCounter += 1;
                var stepCounterIndex = stepCounter - 1;
                return;
              }
              var stepCounterIndex = stepCounter;
              stepCounter += 1;
              stepIndex += 1;
              const wrappedText = breakLongWords(step.step, 40);

              return (
                <div
                  className="flex flex-col text-slate-400 mt-[3rem] hover:text-slate-300 hover:cursor-pointer"
                  key={index}
                  onClick={() => setEditedStep(index)}
                >
                  {editedStep === index ? (
                    <div>
                      <AutoStretchTextareaStep defaultValue={step.step} />
                      <div className="flex justify-center">
                        {stepImagesList.length
                          ? stepImagesList.map((image, index) => {
                              let stepName = image.split("!")[1];

                              if (stepName === stepCounterIndex.toString()) {
                                return (
                                  <img
                                    key={index}
                                    className="outline-none h-auto p-4 mt-1 mb-1 rounded-sm"
                                    src={image}
                                  ></img>
                                );
                              }
                            })
                          : null}
                      </div>

                      <div className="flex grow justify-end text-white text-xs mb-3">
                        <p className="text-[23px] mr-1">
                          <FaImage className="" />
                        </p>
                        <input
                          type="file"
                          className="mt-0.5 file:rounded-md file:bg-inherit file:outline-none file:border-[1px] file:border-slate-400 file:text-slate-200 w-[180px]"
                        ></input>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="whitespace-nowrap mb-2 sm:hidden">
                        Step {stepIndex}:
                      </p>
                      <div className="flex">
                        {" "}
                        <p className="hidden sm:whitespace-nowrap sm:flex">
                          Step {stepIndex}:
                        </p>
                        <div className="flex justify-center grow">
                          <p className="ml-2 whitespace-pre-line mb-4">
                            {wrappedText}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        {stepImagesList.length
                          ? stepImagesList.map((image, index) => {
                              let stepName = image.split("!")[1];

                              if (stepName === stepCounterIndex.toString()) {
                                return (
                                  <img
                                    key={index}
                                    className="outline-none h-auto md:p-4 mt-1 mb-2 rounded-sm"
                                    src={image}
                                  ></img>
                                );
                              }
                            })
                          : null}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center text-slate-300">
              <CiSquareInfo className="text-xl text-orange-400 mr-2" />
              <p>No steps created yet.</p>
            </div>
          )}
        </div>
        {newStepCreation ? (
          <div className="flex flex-col justify-center grow text-sm mt-3 mb-[18rem]">
            <textarea className="p-1 w-full min-h-[200px] bg-inherit border-[1px] border-slate-400 rounded-sm"></textarea>
            <div className="flex grow justify-end text-white text-xs mb-3 mt-1">
              <p className="text-[23px] mr-1">
                <FaImage className="" />
              </p>
              <input
                type="file"
                className="mt-0.5 file:rounded-md file:bg-inherit file:outline-none file:border-[1px] file:border-slate-400 file:text-slate-200 w-[170px]"
              ></input>
              <button className="bg-orange-600 px-2 py-0.5 rounded-md">
                AddStep
              </button>
            </div>
          </div>
        ) : null}
        {!newStepCreation ? (
          <div className="flex grow justify-end mb-[0rem]">
            <div className="flex flex-col">
              <div className="flex justify-end">
                <button
                  className="flex bg-orange-600 text-white px-2 py-1 rounded-md"
                  onClick={() => setNewStepCreation(true)}
                >
                  New Step
                  <BiSolidCommentAdd className="text-lg ml-1 mt-0.5" />
                </button>
              </div>
              <div className="mt-10">
                <button
                  className="bg-red-700 px-2 py-1 text-white rounded-md flex"
                  onClick={async (e) => {
                    await deleteGuide(guide._id);
                    navigate("/Dashboard");
                  }}
                >
                  Delete Guide{" "}
                  <FaRegTrashAlt className="text-[16px] mt-0.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditGuide;
