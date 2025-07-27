"use client";
import { Raleway } from "next/font/google";
import React, { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TextShimmer from "./TextShimmer";
import { motion } from "motion/react";

const rale = Raleway({ subsets: ["latin"] });

const Slider = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="text-black flex items-center justify-center mt-4">
      <div
        ref={constraintsRef}
        className="bg-white/60 w-2/3 relative rounded-full border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 px-2 py-4 backdrop-blur-sm overflow-hidden"
      >
        <motion.div
          initial={{left: 7}}
          drag="x"
          dragConstraints={{left: 10, right: 352}}
          dragElastic={0.1}
          dragMomentum={true}
          whileDrag={{ scale: 1.05 }}
          onDragEnd={(e, info) => {
            if(info.point.x > 340){
              console.log("Trigger Signin");
              
            }
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-lg flex items-center justify-center cursor-pointer z-10"
        >
          <IoIosArrowForward className="text-white text-lg z-10" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent z-[-1]" />
        </motion.div>

        <div
          className={`text-sm text-center text-slate-600/70 tracking-wider opacity-50 font-medium ${rale.className}`}
        >
          <TextShimmer>Slide to signin</TextShimmer>
        </div>
      </div>
    </div>
  );
};

export default Slider;
