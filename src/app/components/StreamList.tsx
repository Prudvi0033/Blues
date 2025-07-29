// components/StreamList.tsx
"use client";
import { BiUpvote } from "react-icons/bi";
import { Stream } from "./MusicBox";
import { Montserrat } from "next/font/google";

const rale = Montserrat({ subsets: ["latin"] });

interface StreamListProps {
  streams: Stream[];
  onVote: (id: number) => void;
}

const StreamList: React.FC<StreamListProps> = ({ streams, onVote }) => {
  return (
    <div className="bg-white/60 mt-6 text-cyan-800 p-4 rounded-2xl max-h-[400px] overflow-y-auto custom-scroll">
      <h1 className={`${rale.className} font-semibold text-lg mb-2`}>
        Upcoming Streams
      </h1>
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="flex items-center h-16 bg-white/60 rounded-xl mt-2"
        >
          <div className={`flex gap-4 items-center w-full ${rale.className}`}>
            <div className="w-24 h-24 flex items-center px-2 relative rounded-lg overflow-hidden shrink-0">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="object-cover w-[100%] h-fit rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[12px] font-medium">{stream.title}</h3>
              <div className="flex items-center gap-3 ">
                <span className="text-[10px]">{stream.upvotes}</span>
                <button
                  className="px-3 py-1 bg-cyan-700 rounded text-sm hover:bg-cyan-800 text-white"
                  onClick={() => onVote(stream.id)}
                >
                  <BiUpvote />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamList;
