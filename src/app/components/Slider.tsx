"use client";
import { Raleway } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TextShimmer from "./TextShimmer";
import { AnimatePresence, motion } from "motion/react";
import { handleSignIn } from "../lib/auth";
import { ImSpinner2 } from "react-icons/im";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const rale = Raleway({ subsets: ["latin"] });

const Slider = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/musicpanel");
    }
  }, [status, session, router]);

  // Don't render anything while checking authentication status
  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="slider-card"
            ref={constraintsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="bg-white/60 w-2/3 relative rounded-full border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 px-2 py-4 backdrop-blur-sm overflow-hidden"
          >
            <motion.div
              key="slider-thumb"
              initial={{ opacity: 0, left: 8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 10, right: 352 }}
              dragElastic={0.1}
              dragMomentum={true}
              whileDrag={{ scale: 1.05 }}
              onDragEnd={(_, info) => {
                if (info.point.x > 340) {
                  setLoading(true);
                  setTimeout(() => setVisible(false), 200); // Animate exit
                  handleSignIn();
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-lg flex items-center justify-center cursor-pointer z-10"
            >
              {loading ? (
                <ImSpinner2 className="animate-spin text-white text-lg" />
              ) : (
                <IoIosArrowForward className="text-white text-lg z-10" />
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent z-[-1]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className={`text-sm text-center text-slate-600/70 tracking-wider font-medium ${rale.className}`}
            >
              <TextShimmer>Slide to signin</TextShimmer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Slider;