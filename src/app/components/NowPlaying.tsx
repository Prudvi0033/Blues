"use client";
import React from "react";
import { BsSkipForward } from "react-icons/bs";
import { IoPlay, IoMusicalNotes } from "react-icons/io5";
import { Montserrat } from "next/font/google";

const rale = Montserrat({ subsets: ["latin"] });

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

interface NowPlayingProps {
  currentSong: Song | null;
  onPlayNext: () => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ currentSong, onPlayNext }) => {
  return (
    <div
      className={`bg-white/75 backdrop-blur-md mt-6 border border-cyan-200/50 rounded-xl p-4 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#d0faff] ${rale.className}`}
    >
      <h3 className="text-sm font-semibold text-cyan-700 mb-3 flex items-center">
        <IoMusicalNotes className="mr-1" />
        Now Playing
      </h3>

      {currentSong ? (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg flex items-center justify-center">
            {currentSong.image ? (
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <IoMusicalNotes className="text-white text-2xl" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-cyan-900 truncate">
              {currentSong.title}
            </h4>
            <p className="text-cyan-600 text-sm truncate">{currentSong.artist}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-3 rounded-full bg-cyan-500/80 hover:bg-cyan-600/80 text-white shadow-md transition-transform duration-200 hover:scale-105"
              aria-label="Play"
            >
              <IoPlay className="text-lg" />
            </button>
            <button
              onClick={onPlayNext}
              className="p-3 rounded-full bg-cyan-400/80 hover:bg-cyan-500/80 text-white shadow-md transition-transform duration-200 hover:scale-105"
              aria-label="Skip to next"
            >
              <BsSkipForward className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-cyan-600 py-6">
          <IoMusicalNotes className="text-4xl mx-auto mb-3 opacity-50" />
          <p className="text-sm">No song currently playing</p>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
