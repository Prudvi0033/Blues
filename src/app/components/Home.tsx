import React from "react";
import { Lobster, Montserrat, Raleway } from "next/font/google";
const rale = Raleway({ subsets: ["latin"] });
const monte = Montserrat({ subsets: ["latin"] });
const pari = Lobster({ subsets: ["latin"], weight: "400" });
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[40rem] py-36  h-screen">
        <div className="flex items-center justify-center">
          <div className=" bg-white/50 rounded-2xl border shadow-[inset_2px_2px_4px_#ffffff80,_inset_-2px_-2px_4px_#d1d5db] border-gray-200 px-2 flex gap-x-2 items-center">
            <div className=" bg-gradient-to-tr from-blue-300 to-blue-200 h-4 w-4 rounded-full shadow-2xl"></div>
            <div className={`text-blue-900/50 ${monte.className} text-sm font-medium`}>blues</div>
          </div>
        </div>
        <div className="text-7xl flex flex-col -space-y-3 items-center justify-start">
          <h1
            className={` font-extrabold ${rale.className} text-neutral-800/95`}
          >
            A new
          </h1>
          <h1
            style={{ font: "" }}
            className={`${pari.className}   font-extrabold text-neutral-800/90`}
          >
            Symphony
          </h1>
          <h1
            className={`${rale.className} font-extrabold pt-3 text-neutral-800/85`}
          >
            through united
          </h1>
          <h1
            className={`${rale.className} pt-1 font-extrabold text-neutral-800/80`}
          >
            soundspaces.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
