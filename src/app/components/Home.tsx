import React from "react";
import { Montserrat, Raleway } from "next/font/google";
import Symphony from "./Symphony";
import MusicNote from "./MusicNote";
import Snote from "./Snote";
import Slider from "./Slider";
import MercuryCard from "./MercuryCard";
import EnterMusic from "./EnterMusic";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const rale = Raleway({ subsets: ["latin"] });
const monte = Montserrat({ subsets: ["latin"] });

const Home = async() => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center relative pt-18">
        <div className="absolute top-5">
          <MercuryCard/>
        </div>
        <div className="w-full max-w-[40rem] py-12 relative px-4 select-none">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white/60 rounded-2xl border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 px-2 py-0.5 flex gap-x-1 items-center backdrop-blur-sm">
              <div className="bg-gradient-to-tr from-blue-400 to-blue-300 h-[10px] w-[10px] rounded-full shadow-lg"></div>
              <div
                className={`text-slate-700/80 ${monte.className} text-[11px] font-semibold`}
              >
                Blues
              </div>
            </div>
          </div>

          <div className="lg:text-7xl text-6xl relative flex flex-col -space-y-1 items-center justify-start mb-12">
            {/* Top left music note - positioned above "A new" */}
            <div className="absolute -top-12 -left-4 lg:-left-8 opacity-70 -rotate-12 scale-50 lg:scale-60">
              <MusicNote />
            </div>

            {/* Top right music note - positioned above "A new" */}
            <div className="absolute -top-8 -right-2 lg:-right-6 opacity-75 rotate-15 scale-45 lg:scale-55">
              <Snote />
            </div>

            <h1
              className={`font-extrabold ${rale.className} text-neutral-800/90`}
            >
              A new
            </h1>

            <div className="opacity-90 px-1 py-1 scale-[1] lg:scale-[1.2]">
              <Symphony />
            </div>

            {/* Left side music note - next to "through united" */}
            <div className="absolute top-20 lg:top-24 -left-6 lg:-left-12 opacity-65 rotate-25 scale-55 lg:scale-65">
              <Snote />
            </div>

            {/* Right side music note - next to "through united" */}
            <div className="absolute top-16 lg:top-20 -right-4 lg:-right-10 opacity-30 -rotate-20 scale-50 lg:scale-60">
              <MusicNote />
            </div>

            <h1
              className={`${rale.className} font-extrabold text-neutral-800/90`}
            >
              through united
            </h1>

            <h1
              className={`${rale.className} font-extrabold text-neutral-800/90`}
            >
              soundspaces.
            </h1>

            <div className="absolute -bottom-28 -left-2 lg:-left-8 opacity-35 -rotate-40 scale-45 lg:scale-55">
              <MusicNote />
            </div>

            <div className="absolute -bottom-6 -right-4 lg:-right-8 opacity-70 rotate-35 scale-60 lg:scale-70">
              <Snote />
            </div>
          </div>

          <div className="w-full">
            {session?.user?.email ?  <EnterMusic/> : <Slider/>}
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
