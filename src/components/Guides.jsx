import React, { useEffect, useState } from "react";
import { getPublishedApprovedGuides } from "../api/guide";

import { FcLinux } from "react-icons/fc";
import { FaWindows } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";

const Guides = () => {
  const [guides, setGuides] = useState([]);

  async function fetchGuides() {
    const guides = await getPublishedApprovedGuides();
    console.log(guides);
    setGuides(guides);
  }

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <div className="p-2 mt-[5rem] flex flex-wrap justify-center fade-in-effect">
      {guides.length ? (
        guides.map((guide) => {
          if (guide.difficulty === "Easy") {
            var diffClass = "text-sm text-green-400";
          } else if (guide.difficulty === "Medium") {
            var diffClass = "text-sm text-blue-300";
          } else if (guide.difficulty === "Hard") {
            var diffClass = "text-sm text-red-400";
          } else if (guide.difficulty === "Insane") {
            var diffClass = "text-sm text-purple-500";
          }

          return (
            <div className="flex flex-col p-2 border-[1px] border-white w-[100px] m-2 rounded-sm slide-in-effect hover:cursor-pointer">
              <h1 className="text-white text-sm text-ellipsis overflow-hidden">
                {guide.vmtitle}
              </h1>

              <div className="flex">
                <p className={diffClass}>{guide.difficulty}</p>
                <div className="flex grow justify-end mt-1">
                  {guides.system === null && (
                    <FaQuestion className="text-slate-100 text-xs" />
                  )}
                  {guides.system === "hidden" && (
                    <FaQuestion className="text-slate-100 text-xs" />
                  )}
                  {guides.system === "linux" && (
                    <FcLinux className="text-slate-100 text-xs" />
                  )}
                  {guides.system === "windows" && (
                    <FaWindows className="text-slate-100 text-xs" />
                  )}
                  {!guides.system && (
                    <FaQuestion className="text-slate-100 text-xs" />
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Guides Found. Please contact Administrator.</div>
      )}
    </div>
  );
};

export default Guides;
