import React from 'react'
import Nav from './Nav'
import { IoClose } from 'react-icons/io5'

interface MusicBoxProps {
  onClose: () => void;
}

const MusicBox : React.FC<MusicBoxProps> = ({ onClose }) => {
  return (
    <div className='w-full h-[95vh] rounded-2xl bg-gray-300/90 border border-gray-300/80 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6] relative'>
      <button
        onClick={onClose}
        className="absolute top-6 right-4 z-10 p-3 rounded-full bg-blue-600/80 hover:bg-blue-500 cursor-pointer flex items-center justify-center shadow-lg transition-colors duration-200 group"
      >
        <IoClose className="text-white text-lg group-hover:scale-110 transition-transform duration-200" />
      </button>
      
      <div>
        <Nav />
      </div>
    </div>
  )
}

export default MusicBox