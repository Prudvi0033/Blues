import React from 'react';
import { IoMusicalNotes, IoChevronUp, IoChevronDown } from 'react-icons/io5';

interface Song {
  id: number;
  title: string;
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
    <div className="bg-white/60 rounded-2xl p-4 mb-3 shadow-[inset_2px_2px_4px_#e0e0e0,_inset_-2px_-2px_4px_#ffffff] transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow text-white">
          <IoMusicalNotes className="text-lg" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-neutral-800 truncate text-sm">{song.title}</h4>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onVote(song.id, 'up')}
            className="p-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors duration-200"
          >
            <IoChevronUp className="text-sm" />
          </button>
          <span className="text-xs font-medium text-green-600 min-w-[20px] text-center">
            {song.upvotes}
          </span>

          <button
            onClick={() => onVote(song.id, 'down')}
            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
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
