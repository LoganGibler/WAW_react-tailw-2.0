import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import defaultGuidePFP from "../imgs/default.jpg";
import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getGuideById, forceGetGuideById } from "../api/guide";

const GuideView = ({ pfps, adminStatus }) => {
  // console.log(pfps)
  const [guide, setGuide] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepImagesList, setStepImagesList] = useState([]);
  const { id } = useParams();
  const pfpListCheck = [];
  let stepIndex = 0;
  let counter = 0;
  let stepCounter = 0;
  const stepImagesRef = ref(storage, "/images/" + id);
  const navigate = useNavigate();

  async function fetchGuide(id) {
    const fetchedGuide = await getGuideById(id);
    setGuide(fetchedGuide.data.guide[0]);
    setSteps(fetchedGuide.data.guide[0].steps);
  }

  async function forceFetchGuide(id) {
    // console.log("force get is running.");
    const fetchedGuide = await forceGetGuideById(id);
    // console.log(fetchedGuide.data.guide[0]);
    setGuide(fetchedGuide.data.guide[0]);
    setSteps(fetchedGuide.data.guide[0].steps);
  }

  function breakLongWords(text, maxLength) {
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
    // console.log("adminStatus:", adminStatus);
    !adminStatus ? fetchGuide(id) : forceFetchGuide(id);
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
  }, []);

  if (guide === undefined) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex justify-center text-center h-screen">
          <h1 className="text-slate-300 mt-[3rem]">
            This guide is not available for viewing. Please consult your
            administrator.
          </h1>
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

  return (
    <div className="w-full flex justify-center text-slate-300 mt-5 slide-in-effect">
      <div className="flex flex-col mx-2 px-1 text-sm max-w-[800px] fade-in-effect">
        <div className="flex px-1">
          {pfps.length
            ? pfps.map((pfp, index) => {
                let guide_id = pfp.split("_")[1];
                pfpListCheck.push(guide_id);
                if (guide._id === guide_id) {
                  return (
                    <img
                      key={index}
                      className="border-[1px] border-slate-500 outline-none w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]  mt-1 mb-2 rounded-sm"
                      src={pfp}
                    ></img>
                  );
                }
              })
            : null}
          {!pfpListCheck.includes(guide._id) ? (
            <img
              src={defaultGuidePFP}
              className="border-[1px] border-slate-500 outline-none w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]  mt-1 mb-2 rounded-sm"
            ></img>
          ) : null}
          <div className="flex flex-col ml-3 grow">
            <div className="flex">
              <h1 className="text-xl xs:text-2xl xs:mt-1.5 mt-2.5 text-white">
                {guide.vmtitle}
              </h1>
              <div className="flex grow justify-end mt-3 mr-4">
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
                  <FaQuestion className="text-slate-100 text-sm mt-1 mr-[2px] md:text-base md:mt-1.5" />
                )}
              </div>
            </div>

            <div className="flex mt-2">
              <p className={diffClass}>{guide.difficulty}</p>
              <p className="px-5 whitespace-nowrap max-w-[130px] xs:max-w-[250px] overflow-hidden text-ellipsis">
                {guide.hostedby}
              </p>
              <p>{guide.author}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-1 mt-4">
          <p className="p-1">{guide.description}</p>
        </div>

        <div className="flex flex-col justify-center mx-1 mt-2 border-b-2 pb-3">
          {steps.map((step, index) => {
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
              <div className="flex flex-col mt-[2rem] mb-3" key={index}>
                <p className="whitespace-nowrap mb-2 sm:hidden">
                  Step {stepIndex}:
                </p>
                <div className="flex">
                  <p className="hidden sm:whitespace-nowrap sm:flex">
                    Step {stepIndex}:
                  </p>
                  <div className="flex justify-center grow">
                    <p className="ml-2 whitespace-pre-line mb-4">
                      {wrappedText}
                    </p>
                  </div>
                </div>

                {stepImagesList.length
                  ? stepImagesList.map((image, index) => {
                      let stepName = image.split("!")[1];

                      if (stepName === stepCounterIndex.toString()) {
                        return (
                          <img
                            key={index}
                            className="md:p-4 outline-none h-auto mt-1 mb-2 rounded-sm"
                            src={image}
                          ></img>
                        );
                      }
                    })
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuideView;
