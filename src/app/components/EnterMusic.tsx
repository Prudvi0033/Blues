'use client';
import React, { useState } from "react";
import Snote from "./Snote";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import MusicBox from "./MusicBox";

const EnterMusic = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnterMusic = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <div
          onClick={handleEnterMusic}
          className="relative w-16 h-16 flex items-center justify-center cursor-pointer"
        >
          {/* Subtle Ripple Animation */}
          <motion.div
            className="absolute w-full h-full rounded-full bg-blue-300"
            style={{ opacity: 0.1 }}
            animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute w-full h-full rounded-full bg-blue-300"
            style={{ opacity: 0.1 }}
            animate={{ scale: [1, 1.8], opacity: [0.1, 0] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />

          {/* Main Icon Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-blue-300 to-indigo-600 rounded-full p-3"
          >
            <div className="scale-[0.45]">
              <Snote />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full mx-4"
            >
              <MusicBox onClose={handleCloseModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnterMusic;
