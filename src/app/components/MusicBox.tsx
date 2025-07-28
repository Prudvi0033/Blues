import React from 'react'
import Nav from './Nav'

const MusicBox = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-[70%] h-[90vh] rounded-2xl bg-white/60 border border-gray-300/80 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#c8d4e6]'>
            <div><Nav/></div>
        </div>
    </div>
  )
}

export default MusicBox