import React from "react";
import { Lobster, Montserrat, Raleway } from "next/font/google";
import Symphony from "./Symphony";
import MusicNote from "./MusicNote";
import Snote from "./Snote";

const rale = Raleway({ subsets: ["latin"] });
const monte = Montserrat({ subsets: ["latin"] });
const pari = Lobster({ subsets: ["latin"], weight: "400" });

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-[40rem] py-24 h-screen relative">
        <div className="flex items-center justify-center">
          <div className="bg-white/60 rounded-2xl border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 px-3 py-1 flex gap-x-2 items-center backdrop-blur-sm">
            <div className="bg-gradient-to-tr from-blue-400 to-blue-300 h-4 w-4 rounded-full shadow-lg"></div>
            <div className={`text-slate-700/80 ${monte.className} text-sm font-medium`}>
              Blues
            </div>
          </div>
        </div>
        
        <div className="text-7xl relative flex flex-col -space-y-1 items-center justify-start">
          {/* Music notes - hidden on mobile (md:block = show on medium screens and up) */}
          <div className="absolute -top-8 left-6 opacity-90 -rotate-12 scale-35 hidden md:block">
            <MusicNote />
          </div>
          
          <div className="absolute -top-2 right-16 opacity-80 rotate-20 scale-60 hidden md:block">
            <Snote />
          </div>
          
          <h1 className={`font-extrabold ${rale.className} text-neutral-800/90`}>
            A new
          </h1>
          
          <div className="opacity-90 px-1 py-1 scale-[1.2]">
            <Symphony />
          </div>
          
          <div className="absolute top-28 left-4 opacity-90 rotate-35 scale-35 hidden md:block">
            <Snote />
          </div>
          
          <h1 className={`${rale.className} font-extrabold text-neutral-800/90`}>
            through united
          </h1>
          
          <div className="absolute top-40 -left-8 opacity-60 -rotate-25 scale-65 hidden md:block">
            <MusicNote />
          </div>
          
          <h1 className={`${rale.className} font-extrabold text-neutral-800/90`}>
            soundspaces.
          </h1>
          
          <div className="absolute bottom-2 right-6 opacity-85 rotate-30 scale-70 hidden md:block">
            <Snote />
          </div>
          
          <div className="absolute bottom-8 left-20 opacity-45 -rotate-15 scale-40 hidden md:block">
            <MusicNote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;