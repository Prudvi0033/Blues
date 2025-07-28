"use client";
import Image from "next/image";
import { useState } from "react";
import { Inter } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaStepForward } from "react-icons/fa";
import { FaBackwardStep, FaRepeat, FaShuffle } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import ProgressBar from "./ProgressBar";

const inter = Inter({ subsets: ["latin"] });

const MercuryCard = () => {
  const [isExpanded, setExpanded] = useState(true);
  const [isPlaying, setIsplaying] = useState(false);

  return (
    <motion.div
      layout
      transition={{ 
        layout: { 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1],
          type: "tween"
        } 
      }}
      className="bg-white/60 relative rounded-2xl border shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] border-blue-100/40 backdrop-blur-sm cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            onClick={() => setExpanded(false)}
            className="h-auto w-[18.5rem] py-1 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-y-5 w-full">
              {/* Album Art and Info */}
              <div className="flex gap-x-4 pr-2">
                <motion.div 
                  layoutId="album-image"
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    type: "tween"
                  }}
                >
                  <Image
                    src="/mercury.webp"
                    alt="mercury"
                    height={88}
                    width={88}
                    className="rounded-xl shadow-lg"
                  />
                </motion.div>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col justify-center">
                      <motion.h1
                        layoutId="song-title"
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.16, 1, 0.3, 1],
                          type: "tween"
                        }}
                        className={`${inter.className} text-[14px] font-semibold text-slate-700`}
                      >
                        Mercury
                      </motion.h1>
                      <motion.p
                        layoutId="artist-name"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ 
                          duration: 0.3, 
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.1
                        }}
                        className={`${inter.className} text-[12px] font-medium text-slate-700/80`}
                      >
                        Steve Lacy
                      </motion.p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15
                    }}
                  >
                    <ProgressBar sliderValue={20} />
                  </motion.div>

                  {/* Control Buttons */}
                  <motion.div 
                    className="flex items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2
                    }}
                  >
                    <motion.div
                      layoutId="shuffle-btn"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1],
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="text-slate-600/70 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <FaShuffle size={13} />
                    </motion.div>

                    <motion.div
                      layoutId="prev-btn"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1],
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="text-slate-600/70 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaBackwardStep size={13} />
                    </motion.div>

                    <motion.div
                      layoutId="play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsplaying(!isPlaying);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1],
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="bg-neutral-800 text-white rounded-full p-2 hover:shadow-xl transition-all duration-200 cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        {isPlaying ? (
                          <motion.div
                            key="pause"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <FaPause size={11} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="play"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="ml-0.5"
                          >
                            <FaPlay size={9} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      layoutId="next-btn"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1],
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="text-slate-600/70 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                    >
                      <FaStepForward size={13} />
                    </motion.div>

                    <motion.div
                      layoutId="repeat-btn"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1],
                        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="text-slate-600/70 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      <FaRepeat size={13} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            onClick={() => setExpanded(true)}
            className="flex gap-x-8 items-center justify-center px-1.5 py-[4px]"
          >
            <motion.div 
              layoutId="album-image"
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1],
                type: "tween"
              }}
            >
              <Image
                src="/mercury.webp"
                alt="mercury"
                height={44}
                width={44}
                className="rounded-full shadow-lg"
              />
            </motion.div>
            <div className="flex flex-col items-center gap-1 pr-8">
              <motion.h1
                layoutId="song-title"
                transition={{ 
                  duration: 0.4, 
                  ease: [0.16, 1, 0.3, 1],
                  type: "tween"
                }}
                className={`${inter.className} text-[12px] font-semibold text-slate-700/80`}
              >
                Mercury
              </motion.h1>
              <div className="flex gap-x-5">
                <motion.div
                  layoutId="prev-btn"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.15, 
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="text-slate-600/70 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  <FaBackwardStep size={14} />
                </motion.div>
                <motion.div
                  layoutId="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsplaying(!isPlaying);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.15, 
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="text-slate-600/70 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause-collapsed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <FaPause size={14} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play-collapsed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <FaPlay size={14} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  layoutId="next-btn"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.15, 
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="text-slate-600/70 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  <FaStepForward size={14} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MercuryCard;