import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

interface AddSongProps {
  onAddSong: (title: string, artist: string) => void;
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = () => {
    if (title.trim() && artist.trim()) {
      onAddSong(title.trim(), artist.trim());
      setTitle('');
      setArtist('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-xl p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
        <IoAdd className="mr-2" />
        Add New Song
      </h3>
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Song title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 bg-white/70 border border-blue-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-blue-900 placeholder-blue-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Artist name..."
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 bg-white/70 border border-blue-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent text-blue-900 placeholder-blue-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
        >
          Add Song
        </button>
      </div>
    </div>
  );
};

export default AddSong;