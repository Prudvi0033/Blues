import React from 'react';
import { IoMusicalNotes, IoThumbsUp, IoThumbsDown } from 'react-icons/io5';
import { Montserrat } from 'next/font/google';

const rale = Montserrat({ subsets: ['latin'] });

interface Stream {
  id: string;
  userId: string;
  url: string;
  extractedId: string;
  type: string;
  title: string;
  thumbnail: string;
  createdAt?: string;
  upvotes?: number;
  downvotes?: number;
}

interface StreamItemProps {
  stream: Stream;
  onVote: (id: string, type: 'up' | 'down') => void;
}

const StreamItem: React.FC<StreamItemProps> = ({ stream, onVote }) => {
  return (
    <div className={`bg-white/60 backdrop-blur-sm border border-cyan-200/30 rounded-xl p-3 hover:bg-white/80 transition-all duration-200 shadow-[inset_2px_2px_4px_#ffffff70,_inset_-2px_-2px_4px_#d0faff70] ${rale.className}`}>
      <div className="flex items-center space-x-3">
        {/* Thumbnail */}
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
          {stream.thumbnail ? (
            <img 
              src={stream.thumbnail} 
              alt={stream.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <IoMusicalNotes className="text-white text-lg" />
          )}
        </div>

        {/* Stream Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-cyan-900 text-sm truncate">
            {stream.title}
          </h4>
          <p className="text-cyan-600 text-xs truncate">
            {stream.type}
          </p>
        </div>

        {/* Vote Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onVote(stream.id, 'up')}
            className="p-1.5 rounded-full bg-green-100/80 hover:bg-green-200/80 text-green-600 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <IoThumbsUp className="text-xs" />
          </button>
          <span className="text-xs font-medium text-green-600 min-w-[16px] text-center">
            {stream.upvotes || 0}
          </span>
          
          <button
            onClick={() => onVote(stream.id, 'down')}
            className="p-1.5 rounded-full bg-red-100/80 hover:bg-red-200/80 text-red-600 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <IoThumbsDown className="text-xs" />
          </button>
          <span className="text-xs font-medium text-red-600 min-w-[16px] text-center">
            {stream.downvotes || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreamItem;