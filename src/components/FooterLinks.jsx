import React from "react";

const FooterLinks = () => {
  return (
    <div className="w-full justify-center pb-[3rem]">
      <div className="flex flex-col sm:flex-wrap sm:flex-row max-w-[980] justify-center text-slate-400 px-2 mx-2 pt-[1.5rem]">
        <div className="flex text-sm sm:text-base flex-col px-[2rem] border-b-[1px] pb-[1rem] mx-[1rem] sm:border-r-[1px] sm:border-b-0 border-slate-600 lg:px-[4rem]">
          <h1 className="text-slate-200  font-semibold mt-1">Contact</h1>
          <p className="mt-2">Jacksonville, FL</p>
          <p>St. Augustine, FL</p>
          <p>Zip code: 32095</p>
          <p>Phone: (+1)757-739-7721</p>
          <p>Email: Logan.Gibler5@gmail.com</p>
        </div>
        <div className="flex text-sm sm:text-base flex-col px-[2rem] border-b-[1px] sm:border-b-0 mx-[1rem] pb-[1rem] md:border-r-[1px] border-slate-600 lg:pr-[6rem] lg:pl-[5rem] mt-4 sm:mt-0">
          <h1 className="text-slate-200 font-semibold mt-1">Menu</h1>
          <p className="mt-2hover: cursor-pointer mt-2">Home</p>
          <p className="hover: cursor-pointer mt-1"> About</p>
          <p className="hover: cursor-pointer mt-1">Guides</p>
          <p className="whitespace-nowraphover: cursor-pointer mt-1">Sign Up</p>
        </div>
        <div className="flex text-sm sm:text-base flex-col px-[3rem] mt-4 md:mt-3 md+:mt-0 lg:px-[4rem]">
          <h1 className="text-slate-200  font-semibold mt-1">Recent Posts</h1>
          <p className="mt-2 hover:cursor-pointer">Mr. Robot</p>
          <p className="hover: cursor-pointer mt-1">Wifinetic</p>
          <p className="hover: cursor-pointer mt-1">Lame</p>
          <p className="hover: cursor-pointer mt-1">Bashed</p>
        </div>
      </div>
      <div className="flex justify-center mt-8 pb-2">
        <p className="text-slate-200 text-sm sm:text-base">
          © 2023 WebAppWarfare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterLinks;
