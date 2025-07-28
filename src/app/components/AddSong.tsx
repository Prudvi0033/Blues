import React, { useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { Montserrat } from 'next/font/google';
import { BiPlus } from 'react-icons/bi';

const rale = Montserrat({ subsets: ['latin'] });

interface AddSongProps {
  onAddSong: (title: string) => void;
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddSong(title.trim());
      setTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className=" ">
      <h3 className={`text-sm ${rale.className} font-semibold text-cyan-500 mb-3 flex items-center`}>
        <BiPlus className="mr-1 size-4 rotate-180" />
        Add New Song
      </h3>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Enter URL"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`flex-1 ${rale.className} px-4 py-2 placeholder: text-cyan-700 relative border-none focus: outline-none bg-white/75 backdrop-blur-md border border-cyan-200/50 rounded-4xl p-4 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#d0faff]`}
        />
        <button
          onClick={handleSubmit}
          className="p-2 absolute right-13 bg-gradient-to-r from-cyan-500 to-cyan-900 hover:scale-95 cursor-pointer rounded-full transition-all duration-200 flex items-center justify-center shadow-md"
        >
          <IoArrowForward className="text-lg text-white/80" />
        </button>
      </div>
    </div>
  );
};

export default AddSong;
