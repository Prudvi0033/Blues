"use client";
import { BiSolidUpvote } from "react-icons/bi";
import { Stream } from "./MusicBox";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const rale = Montserrat({ subsets: ["latin"] });

interface StreamListProps {
  streams: Stream[];
  onVote: (id: string) => void; 
}

const StreamList: React.FC<StreamListProps> = ({ streams, onVote }) => {
  return (
    <div className="bg-white/60 mt-6 text-cyan-800 p-4 rounded-2xl max-h-[600px] w-full overflow-y-auto custom-scroll">
      <h1 className={`${rale.className} font-semibold text-lg mb-4`}>
        Upcoming Streams
      </h1>

      <div className="space-y-4">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="flex items-center bg-white/70 rounded-xl p-3 shadow-sm gap-4 flex-wrap sm:flex-nowrap"
          >
            {/* Thumbnail */}
            <div className="w-24 h-24 lg:w-32 lg:h-14 flex items-center justify-center sm:justify-start px-2 relative rounded-lg overflow-hidden shrink-0">
              <Image
                src={stream.thumbnail}
                alt={stream.title}
                width={128} // lg:w-32 equivalent
                height={56}  // lg:h-14 equivalent
                className="object-cover w-full h-full max-h-24 rounded-md"
                sizes="(max-width: 1024px) 96px, 128px"
                priority={false}
              />
            </div>

            {/* Title and Voting */}
            <div className={`flex-1 min-w-0 ${rale.className}`}>
              <h3 className="text-[12px] font-medium truncate">{stream.title}</h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs">{stream.upvotes}</span>
                <button
                  className="p-1 rounded hover:bg-cyan-100 transition"
                  onClick={() => onVote(stream.id)}
                >
                  <BiSolidUpvote
                    className={`text-lg ${
                      stream.hasUpvoted ? "text-cyan-800" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamList;