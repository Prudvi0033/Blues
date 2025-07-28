import React from 'react';
import { IoMusicalNotes, IoChevronUp, IoChevronDown } from 'react-icons/io5';

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

interface SongItemProps {
  song: Song;
  onVote: (id: number, type: 'up' | 'down') => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onVote }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/70">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <IoMusicalNotes className="text-white text-lg" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-blue-900 truncate text-sm">{song.title}</h4>
          <p className="text-blue-600 text-xs truncate">{song.artist}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onVote(song.id, 'up')}
            className="p-1.5 rounded-lg bg-green-100/70 hover:bg-green-200/70 text-green-600 transition-colors duration-200"
          >
            <IoChevronUp className="text-sm" />
          </button>
          <span className="text-xs font-medium text-green-600 min-w-[20px] text-center">
            {song.upvotes}
          </span>
          
          <button
            onClick={() => onVote(song.id, 'down')}
            className="p-1.5 rounded-lg bg-red-100/70 hover:bg-red-200/70 text-red-600 transition-colors duration-200"
          >
            <IoChevronDown className="text-sm" />
          </button>
          <span className="text-xs font-medium text-red-600 min-w-[20px] text-center">
            {song.downvotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongItem;