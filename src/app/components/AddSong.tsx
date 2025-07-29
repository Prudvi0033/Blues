import React, { useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { Montserrat } from 'next/font/google';
import { BiPlus } from 'react-icons/bi';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const rale = Montserrat({ subsets: ['latin'] });

interface StreamDataProps {
  creatorId: string,
  url: string
}
interface AddSongProps {
  onAddSong: (streamData: StreamDataProps) => void; 
}

const AddSong: React.FC<AddSongProps> = ({ onAddSong }) => {
  const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!url.trim() || !session?.user?.email || loading) {
    return;
  }

  setLoading(true);

  try {
    // Get the user ID first
    const userResponse = await axios.get("/api/streams/me", {
      withCredentials: true
    });
    
    // Extract the userId from the response data
    const userId = userResponse.data.userId;
    
    if (!userId) {
      console.error('No user ID received');
      return;
    }

    // Now make the POST request with the correct userId
    const res = await axios.post("/api/streams", {
      creatorId: userId,  // ✅ Now passing the actual user ID string
      url: url.trim()
    });

    if (res.data.stream) {
      onAddSong(res.data);
      setUrl(''); 
      console.log('Stream added successfully:', res.data);
    }
  } catch (error) {
    console.error('Failed to add stream:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    }
  } finally {
    setLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="">
      <h3 className={`text-sm ${rale.className} font-semibold text-cyan-500 mb-3 flex items-center`}>
        <BiPlus className="mr-1 size-4 rotate-180" />
        Add New Song
      </h3>
      <div className="flex items-center space-x-3 relative">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading || !session}
          className={`flex-1 ${rale.className} px-4 py-2 placeholder:text-cyan-700 border-none focus:outline-none bg-white/75 backdrop-blur-md border border-cyan-200/50 rounded-4xl p-4 shadow-[inset_3px_3px_6px_#ffffff90,_inset_-3px_-3px_6px_#d0faff] disabled:opacity-50`}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !url.trim() || !session}
          className="p-2 absolute right-3 bg-gradient-to-r from-cyan-500 to-cyan-900 hover:scale-95 cursor-pointer rounded-full transition-all duration-200 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <IoArrowForward className="text-lg text-white/80" />
          )}
        </button>
      </div>
      {!session && (
        <p className="text-xs text-red-500 mt-2">Please sign in to add songs</p>
      )}
    </div>
  );
};

export default AddSong;