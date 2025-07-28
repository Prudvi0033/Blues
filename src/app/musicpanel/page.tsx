"use client";
import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MusicBox from '../components/MusicBox';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading, don't do anything yet
    
    if (status === "unauthenticated" || !session) {
      router.push("/"); // Redirect to home page if not authenticated
    }
  }, [status, session, router]);

  // Show skeleton loading while checking authentication
  if (status === "loading") {
    return (
      <div 
        className="relative overflow-hidden h-screen"
        style={{
          background:
            "radial-gradient(at 27% 54%, #ebf0f6 0px, transparent 50%), radial-gradient(at 37% 42%, #98ccd3 0px, transparent 50%), radial-gradient(at 82% 100%, #364e68 0px, transparent 50%), radial-gradient(at 94% 10%, #132238 0px, transparent 50%), #ebf0f6",
        }}
      >
        <div className='flex items-center justify-center h-screen'>
          <div className='w-[80%] h-[90vh] rounded-2xl bg-white/40 backdrop-blur-sm border border-blue-100/40 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] animate-pulse'>
            
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return null;
  }

  return (
    <div
      className="relative overflow-hidden h-screen"
      style={{
        background:
          "radial-gradient(at 27% 54%, #ebf0f6 0px, transparent 50%), radial-gradient(at 37% 42%, #98ccd3 0px, transparent 50%), radial-gradient(at 82% 100%, #364e68 0px, transparent 50%), radial-gradient(at 94% 10%, #132238 0px, transparent 50%), #ebf0f6",
      }}
    >
      <MusicBox/>
    </div>
  );
};

export default Page;