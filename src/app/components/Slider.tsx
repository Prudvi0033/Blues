"use client";
import { Raleway } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TextShimmer from "./TextShimmer";
import { AnimatePresence, motion } from "motion/react";
import { handleSignIn } from "../lib/auth";
import { ImSpinner2 } from "react-icons/im";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const rale = Raleway({ subsets: ["latin"] });

const Slider = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session && isSigningIn) {
      // Show success toast and hide slider
      toast.success("Signed in successfully!");
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
        setIsSigningIn(false);
      }, 1000);
    }
  }, [status, session, isSigningIn]);

  const handleSliderSignIn = async () => {
    try {
      setTimeout(() => {
        setVisible(false)
      }, 2000)
      setLoading(true);
      setIsSigningIn(true);
      await handleSignIn();
    } catch (error) {
      setLoading(false);
      setIsSigningIn(false);
      toast.error("Sign in failed. Please try again.");
    }
  };

  if (status === "loading" || (status === "authenticated" && session)) {
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
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 w-2/3 relative rounded-full border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 px-2 py-4 backdrop-blur-sm overflow-hidden"
          >
            <motion.div
              key="slider-thumb"
              initial={{ opacity: 0, left: 8 }}
              animate={{ 
                opacity: 1,
                left: loading ? 352 : 8 // Move to end if loading
              }}
              exit={{ opacity: 0 }}
              drag={!loading ? "x" : false} // Disable drag when loading
              dragConstraints={{ left: 10, right: 352 }}
              dragElastic={0.1}
              dragMomentum={true}
              whileDrag={{ scale: 1.05 }}
              transition={{
                left: { duration: loading ? 0.3 : 0, ease: "easeOut" }
              }}
              onDragEnd={(_, info) => {
                if (info.point.x > 340 && !loading) {
                  handleSliderSignIn();
                }
              }}
              className="absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 shadow-lg flex items-center justify-center cursor-pointer z-10"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="spinner"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImSpinner2 className="animate-spin text-white text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="arrow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoIosArrowForward className="text-white text-lg z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent z-[-1]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0.3 : 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-sm text-center text-slate-600/70 tracking-wider font-medium ${rale.className}`}
            >
              <TextShimmer>
                {loading ? "Signing in..." : "Slide to signin"}
              </TextShimmer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Slider;