import React, { useState } from "react";
import { CiSquareInfo } from "react-icons/ci";

const Footer = () => {
  const [showFooterError, setShowFooterError] = useState(false);
  return (
    <div className="bottom-0 flex justify-center border-t border-slate-700/40" style={{background: "rgba(2,4,15,0.95)"}}>
      <div className="flex flex-col p-6 md:max-w-[770px] xl:max-w-[770px] w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-white text-base font-semibold mb-1">
              Threats are on the rise.
            </h1>
            <h4 className="text-slate-400 text-sm">
              Subscribe to get notified of new guides.
            </h4>
          </div>
          <div className="flex flex-col gap-2 sm:max-w-[360px] flex-1">
            <div className="flex gap-2">
              <input
                placeholder="Your email address"
                className="input-dark px-3 py-2 text-sm flex-1 rounded-lg"
              ></input>
              <button
                className="btn-primary px-4 py-2 text-sm whitespace-nowrap"
                onClick={() => setShowFooterError(true)}
              >
                Subscribe
              </button>
            </div>
            {showFooterError ? (
              <p className="text-xs text-slate-400 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2">
                This is a demo subscription box — your email has not been saved.
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-slate-700/30 text-xs text-slate-600 flex flex-col sm:flex-row sm:justify-between gap-1">
          <p>© 2023 WebAppWarfare. All rights reserved.</p>
          <p>
            We're committed to your privacy.{" "}
            <span className="text-blue-400/70 hover:cursor-pointer hover:text-blue-300 transition-colors">
              Privacy policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
