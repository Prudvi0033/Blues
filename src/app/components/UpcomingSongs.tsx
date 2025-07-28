import React from 'react';
import { IoMusicalNotes } from 'react-icons/io5';
import SongItem from './SongItem';
import { Montserrat } from 'next/font/google';

const rale = Montserrat({ subsets: ['latin'] });

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

interface UpcomingSongsProps {
  songs: Song[];
  onVote: (id: number, type: 'up' | 'down') => void;
}

const UpcomingSongs: React.FC<UpcomingSongsProps> = ({ songs, onVote }) => {
  return (
    <div className={`bg-white/75 backdrop-blur-md border border-cyan-200/40 rounded-2xl p-4 mb-4 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#d0faff] flex-1 overflow-hidden`}>
      <h3 className={`text-sm font-semibold text-cyan-700 mb-4 ${rale.className}`}>
        Upcoming Songs
      </h3>

      <div className="h-72 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-cyan-300/60 scrollbar-track-transparent pr-1">
        {songs.length === 0 ? (
          <div className="text-center text-cyan-500 py-8">
            <IoMusicalNotes className="text-3xl mx-auto mb-2 opacity-50" />
            <p className="text-sm">No songs in queue</p>
          </div>
        ) : (
          songs.map((song) => (
            <SongItem key={song.id} song={song} onVote={onVote} />
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingSongs;
