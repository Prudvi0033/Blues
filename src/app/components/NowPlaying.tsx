import React from 'react';
import { BsSkipForward } from 'react-icons/bs';
import { IoPlay, IoMusicalNotes } from 'react-icons/io5';

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
    <div className="bg-gradient-to-r from-blue-100/80 to-blue-200/80 backdrop-blur-sm border border-blue-300/50 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-medium text-blue-800 mb-3">Now Playing</h3>
      
      {currentSong ? (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <IoMusicalNotes className="text-white text-2xl" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-blue-900 truncate">{currentSong.title}</h4>
            <p className="text-blue-700 text-sm truncate">{currentSong.artist}</p>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-3 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white shadow-lg transition-all duration-200 hover:scale-105">
              <IoPlay className="text-lg" />
            </button>
            <button
              onClick={onPlayNext}
              className="p-3 rounded-full bg-blue-400/80 hover:bg-blue-500/80 text-white shadow-lg transition-all duration-200 hover:scale-105"
            >
              <BsSkipForward className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-blue-600 py-6">
          <IoMusicalNotes className="text-4xl mx-auto mb-3 opacity-50" />
          <p className="text-sm">No song currently playing</p>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;