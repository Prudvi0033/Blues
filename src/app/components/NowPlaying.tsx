"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { IoPlaySkipForward, IoPause } from "react-icons/io5";
import { toast } from "react-toastify";
import { Montserrat } from "next/font/google";

const rale = Montserrat({ subsets: ["latin"] });
interface CurrentStream {
  userId: string;
  streamId: string;
  stream: {
    id: string;
    type: "Youtube";
    url: string;
    extractedId: string;
    title: string;
    thumbnail: string;
    active: boolean;
    userId: string;
  };
}

interface NowPlayingProps {
  isOwner?: boolean;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isOwner = false }) => {
  const [currentStream, setCurrentStream] = useState<CurrentStream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCurrentStream = async () => {
    try {
      const res = await axios.get("/api/streams/current");
      setCurrentStream(res.data.activeStream || null);
    } catch (error) {
      console.error("Failed to fetch current stream", error);
    }
  };

  const playNextSong = async () => {
    if (!isOwner) return;
    
    setLoading(true);
    try {
      const res = await axios.post("/api/streams/next");
      if (res.data.mostUpvotedStream) {
        await fetchCurrentStream();
        setIsPlaying(true);
        toast.success("Playing next song!");
      }
    } catch (error) {
      console.error("Failed to play next song", error);
      toast.error("No more songs in queue");
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getYouTubeEmbedUrl = (url: string, extractedId: string) => {
    // If we have extracted ID, use it directly
    if (extractedId) {
      return `https://www.youtube.com/embed/${extractedId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1&disablekb=1`;
    }
    
    // Fallback: extract from URL
    const videoId = url.includes('v=') 
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('/').pop();
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1&disablekb=1`;
  };


  useEffect(() => {
    fetchCurrentStream();
    
    // Refresh current stream periodically
    const interval = setInterval(fetchCurrentStream, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!currentStream) {
    return (
      <div className={`bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 ${rale.className}`}>
        <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">Now Playing</h2>
        <div className="text-center text-cyan-700">
          <p>No song currently playing</p>
          {isOwner && (
            <button
              onClick={playNextSong}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 text-white"
            >
              {loading ? "Loading..." : "Start Playing"}
            </button>
          )}
        </div>
      </div>
    );
  }

  const { stream } = currentStream;

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">Now Playing</h2>
      
      <div className="space-y-4">
        {/* Player Embed */}
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={getYouTubeEmbedUrl(stream.url, stream.extractedId)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Controls */}
        {isOwner && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full hover:scale-105 transition-transform text-white"
            >
              {isPlaying ? (
                <IoPause className="text-xl" />
              ) : (
                <BiRefresh className="text-xl" />
              )}
            </button>
            
            <button
              onClick={playNextSong}
              disabled={loading}
              className="p-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full hover:scale-105 transition-transform disabled:opacity-50 text-white"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <IoPlaySkipForward className="text-xl" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlaying;