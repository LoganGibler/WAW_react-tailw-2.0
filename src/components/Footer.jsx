import React, { useState } from "react";
import { CiSquareInfo } from "react-icons/ci";

const Footer = () => {
  const [showFooterError, setShowFooterError] = useState(false);
  return (
    <div className="bottom-0 flex bg-orange-600 justify-center">
      <div className="flex flex-col p-4 md:max-w-[770px] xl:max-w-[770px] justify-center">
        <h1 className="text-white text-base font-semibold">
          Threats are on the rise. Start learning now.
        </h1>
        <h4 className="text-gray-200 text-sm">
          Subscribe to get the notified of new released guides
        </h4>
        <label className="mt-2 ml-1 text-sm text-gray-200">Email Address</label>
        <div className="flex ml-1">
          <input
            placeholder="Your email address"
            className="px-1 py-0.5 rounded-md grow max-w-[500px]"
          ></input>
          <button
            className=" ml-2 w-[100px] header-gradient text-white rounded-md py-0.5"
            onClick={(e) => {
              setShowFooterError(true);
            }}
          >
            Subscribe
          </button>
        </div>
        {showFooterError ? (
          <div className="flex text-xs text-white px-1 mt-1">
            {/* <CiSquareInfo className="xl" /> */}
            <p>
              This is a fake subscription box for a mock website. Your email has
              not been saved and you will not be receiving any newsletters, but
              thank you for attempting to subscribe.
            </p>
          </div>
        ) : null}
        <div className="ml-1 text-xs text-white mt-1 p-0">
          We're commited to your privacy. WebAppWarfare uses the information you
          provide to us to contact you regarding the lastest news regarding
          WebAppWarfare. You may unsubscribe from this service at any time. For
          more information, please check out our
          <ul className="inline ml-1 hover:cursor-pointer text-blue-200">
            privacy policy.
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
