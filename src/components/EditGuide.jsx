import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsersGuideByID } from "../api/guide";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import defaultGuidePFP from "../imgs/default.jpg";
import { CiSquareInfo } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";

const EditGuide = ({ activeUser, pfps }) => {
  const { id } = useParams();
  const [guide, setGuide] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepImagesList, setStepImagesList] = useState([]);
  const navigate = useNavigate();
  const stepImagesRef = ref(storage, "/images/" + id);
  let list = [];

  async function fetchGuide(activeUser, id) {
    const guide = await getUsersGuideByID(activeUser, id);
    console.log(guide.data.guide);
    setGuide(guide.data.guide);
    setSteps(guide.data.guide.steps);
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
    <div className="flex flex-col w-full slide-in-effect">
      <div className="flex flex-col fade-in-effect mb-4 mx-4 min-h-screen">
        <div className="flex ">
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
            <div className="flex text-white text-lg mt-1">
              <h1>{guide.vmtitle}</h1>
              <div className="flex grow justify-end mt-1 pr-4">
                <p className="text-sm">Edit Header </p>
                <AiFillEdit className="text-orange-400" />
              </div>
            </div>
            <div className="flex text-slate-400 text-sm mt-2">
              <p className={diffClass}>{guide.difficulty}</p>
              <p className="ml-[1rem]">{guide.hostedby}</p>
              <p className="ml-[1rem]">{guide.system}</p>
            </div>
          </div>
        </div>
        <div className="flex text-sm text-slate-200 mt-1 justify-center">
          <CiSquareInfo className="text-xl text-orange-400 mr-2" />
          <p>Click on bodies of text to edit them.</p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-slate-400">{guide.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EditGuide;
