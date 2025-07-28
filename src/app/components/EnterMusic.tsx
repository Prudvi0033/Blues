'use client'
import React from "react";
import Snote from "./Snote";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EnterMusic = () => {
    const {data: session} = useSession()
    const router = useRouter();
  return (
    <div className="flex items-center justify-center mt-4">
      <div 
      onClick={() => {
        if(session){
            router.push("/musicpanel")
        }
        else{
            toast.error("Signin to continue")
        }
      }}
      className="relative w-20 h-20 flex items-center justify-center cursor-pointer">
        {/* Ripple animation */}
        <motion.div
          className="absolute w-full h-full rounded-full bg-blue-200 opacity-20"
          animate={{
            scale: [1, 1.3],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <div className="bg-gradient-to-b from-blue-300 to-indigo-600 rounded-full">
          <div className="scale-[0.4]">
            <Snote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterMusic;
