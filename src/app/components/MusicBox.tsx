import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Nav from './Nav';
import AddSong from './AddSong';
import UpcomingSongs from './UpcomingSongs';
import NowPlaying from './NowPlaying';

export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

export interface MusicBoxProps {
  onClose: () => void;
}

const MusicBox: React.FC<MusicBoxProps> = ({ onClose }) => {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      image: '',
      upvotes: 15,
      downvotes: 2,
    },
    {
      id: 2,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      image: '',
      upvotes: 12,
      downvotes: 1,
    },
    {
      id: 3,
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      image: '',
      upvotes: 8,
      downvotes: 3,
    },
  ]);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const addSong = (title: string, artist: string) => {
    const newSong: Song = {
      id: Date.now(),
      title,
      artist,
      image: '',
      upvotes: 0,
      downvotes: 0,
    };
    setSongs([...songs, newSong]);
  };

  const handleVote = (id: number, type: 'up' | 'down') => {
    setSongs(
      songs.map((song) =>
        song.id === id
          ? {
              ...song,
              [type === 'up' ? 'upvotes' : 'downvotes']:
                song[type === 'up' ? 'upvotes' : 'downvotes'] + 1,
            }
          : song
      )
    );
  };

  const playNext = () => {
    if (songs.length > 0) {
      const nextSong = songs[0];
      setCurrentSong(nextSong);
      setSongs(songs.slice(1));
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-[95%] max-w-6xl h-[90vh] rounded-2xl backdrop-blur-md border/60 border-white shadow-2xl relative overflow-hidden"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent z-0 pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gradient-to-tl from-cyan-500 via-cyan-700 to-cyan-900 text-white shadow-lg transition-all duration-200 hover:scale-105"
        >
          <IoClose className="text-lg" />
        </button>

        <div className="relative z-10 h-full flex flex-col">
          <Nav />

          {/* 🔹 AddSong Section (Row 1) */}
          <div className="p-4">
            <AddSong onAddSong={addSong} />
          </div>

          {/* 🔹 Upcoming + Now Playing (Row 2) */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 h-full">
              <div className="flex-1 overflow-y-auto">
                <UpcomingSongs songs={songs} onVote={handleVote} />
              </div>
              <div className="w-full md:w-[40%]">
                <NowPlaying currentSong={currentSong} onPlayNext={playNext} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicBox;
