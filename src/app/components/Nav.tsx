import React from "react";
import { Montserrat } from "next/font/google";
import Snote from "./Snote";
const rale = Montserrat({ subsets: ["latin"] });

const Nav: React.FC = () => {
  return (
    <nav className="flex items-center px-4 py-2 rounded-t-2xl">
      <div className={`flex items-center justify-between ${rale.className}`}>
        <div className="flex items-center -space-x-5">
          <div className=" scale-[0.3]"><Snote/></div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 to-cyan-900 bg-clip-text text-transparent">
            MusicBox
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
