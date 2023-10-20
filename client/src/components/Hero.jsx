import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/storeHero.jpg";

const Hero = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-6 px-3 py-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Shop the best <span className="text-slate-500">deals</span>
            <br />
            all in one place.
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            An online marketplace that connects consumers with millions of{" "}
            <br /> sellers, manufacturers and brands around the world with the
            mission to empower them to live their best lives.
          </div>
          {/* <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            Click to browse...
          </Link> */}
        </div>
        <img
          src={img}
          alt="store backsplash"
          className="max-h-80 rounded-md border-4 border-gray-800"
        />
      </div>
    </>
  );
};

export default Hero;
