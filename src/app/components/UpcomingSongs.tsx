import React from 'react';
import { IoMusicalNotes } from 'react-icons/io5';
import SongItem from './SongItem';

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
    <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 mb-4 shadow-sm flex-1 overflow-hidden">
      <h3 className="text-lg font-medium text-blue-800 mb-4">Upcoming Songs</h3>
      <div className="h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-blue-300/50 scrollbar-track-transparent">
        {songs.length === 0 ? (
          <div className="text-center text-blue-500 py-8">
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