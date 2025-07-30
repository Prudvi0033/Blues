// components/MusicBox.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import AddSong from "./AddSong";
import { Montserrat } from "next/font/google";
import StreamList from "./StreamList";
import NowPlaying from "./NowPlaying";

const rale = Montserrat({ subsets: ["latin"] });

export interface Stream {
  id: number;
  title: string;
  thumbnail: string;
  upvotes: number;
  hasUpvoted: boolean;
}

export interface MusicBoxProps {
  onClose: () => void;
}

const REFRESH_INTERVAL = 10 * 1000;

const MusicBox: React.FC<MusicBoxProps> = ({ onClose }) => {
  const [streams, setStreams] = useState<Stream[]>([]);

  const fetchStreams = async () => {
    try {
      const res = await axios.get("/api/streams/my", { withCredentials: true });
      const { streams } = res.data;
      const parsed: Stream[] = streams.map((stream: Stream) => ({
        id: stream.id,
        title: stream.title,
        thumbnail: stream.thumbnail,
        upvotes: stream.upvotes,
        hasUpvoted: stream.hasUpvoted,
      }));
      setStreams(parsed);
      console.log(streams);
    } catch (error) {
      console.error("Failed to fetch streams", error);
    }
  };

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(fetchStreams, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (id: number) => {
    setStreams((prev) =>
      prev.map((stream) =>
        stream.id === id
          ? {
              ...stream,
              upvotes: stream.upvotes + (stream.hasUpvoted ? -1 : 1),
              hasUpvoted: !stream.hasUpvoted,
            }
          : stream
      )
    );

    try {
      const stream = streams.find((s) => s.id == id);
      if(!stream) return;

      const route = stream.hasUpvoted ? "/api/streams/downvotes" : "/api/streams/upvotes"
      
      await axios.post(route, 
        {streamId: id},
        {withCredentials: true}
      )
    } catch (error) {
      console.log("Error in votes", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-[95%] max-w-6xl h-[90vh] rounded-2xl backdrop-blur-md border/60 border-white shadow-2xl relative overflow-hidden"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent z-0 pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-11 z-20 p-2.5 rounded-full bg-gradient-to-tl from-cyan-500 via-cyan-700 to-cyan-900 text-white shadow-lg transition-all duration-200 hover:scale-105"
        >
          <IoClose className="text-lg" />
        </button>

        <div className="relative z-10 h-full flex flex-col p-8 text-white">
          <div className="mt-4">
            <AddSong />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StreamList streams={streams} onVote={handleVote} />
            {/* <NowPlaying currentSong={""} onPlayNext={""} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicBox;
