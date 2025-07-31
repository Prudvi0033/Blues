"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { IoClose, IoPower, IoShareSocial } from "react-icons/io5";
import AddSong from "./AddSong";
import StreamList from "./StreamList";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import NowPlaying from "./NowPlaying";

// Updated interface to match Prisma schema (string IDs)
export interface Stream {
  id: string; // Changed from number to string
  title: string;
  thumbnail: string;
  upvotes: number;
  hasUpvoted: boolean;
}

export interface MusicBoxProps {
  onClose: () => void;
  creatorId?: string;
}

const REFRESH_INTERVAL = 10 * 1000;

const MusicBox: React.FC<MusicBoxProps> = ({ onClose, creatorId }) => {
  const { data: session, status } = useSession();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  const isMyStreams = !creatorId;

  // Wrap fetchStreams in useCallback to fix the dependency warning
  const fetchStreams = useCallback(async () => {
    try {
      const endpoint = isMyStreams
        ? "/api/streams/my"
        : `/api/streams/creator/${creatorId}`;
      const res = await axios.get(endpoint);

      const parsed: Stream[] = res.data.streams.map((stream: Stream) => ({
        id: stream.id, // Now properly handles string IDs
        title: stream.title,
        thumbnail: stream.thumbnail,
        upvotes: stream.upvotes,
        hasUpvoted: stream.hasUpvoted,
      }));

      setStreams(parsed);
    } catch (error) {
      console.error("Failed to fetch streams", error);
    }
  }, [isMyStreams, creatorId]); // Dependencies that fetchStreams uses

  const handleShare = async () => {
    try {
      const shareURL = `${window.location.origin}/creator/${
        creatorId || session?.user?.email
      }`;
      await navigator.clipboard.writeText(shareURL);
      toast.success("Link Copied");
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  // Updated to handle string IDs
  const handleVote = async (id: string) => {
    const targetStream = streams.find((s) => s.id === id);
    if (!targetStream) return;

    const alreadyUpvoted = targetStream.hasUpvoted;

    setStreams((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              hasUpvoted: !alreadyUpvoted,
              upvotes: s.upvotes + (alreadyUpvoted ? -1 : 1),
            }
          : s
      )
    );

    try {
      const route = alreadyUpvoted
        ? "/api/streams/downvotes"
        : "/api/streams/upvotes";

      await axios.post(route, { streamId: id }, { withCredentials: true });
    } catch (error) {
      console.error("Voting error", error);
      // Revert optimistic update on error
      setStreams((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                hasUpvoted: alreadyUpvoted,
                upvotes: s.upvotes + (alreadyUpvoted ? 1 : -1),
              }
            : s
        )
      );
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchStreams();
      const interval = setInterval(fetchStreams, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [status, fetchStreams]); // Now includes fetchStreams properly

  useEffect(() => {
    if (!creatorId || creatorId === session?.user?.email) {
      setIsOwner(true);
    }
  }, [creatorId, session]);

  if (status === "unauthenticated") {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <button
          onClick={() => signIn()}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
          title="Sign In"
        >
          <IoPower className="text-4xl" />
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="text-white text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

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

        {isOwner && (
          <button
            onClick={handleShare}
            className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-gradient-to-tl from-green-500 via-green-600 to-green-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
            title="Share your page"
          >
            <IoShareSocial className="text-lg" />
          </button>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-11 z-20 p-2.5 rounded-full bg-gradient-to-tl from-cyan-500 via-cyan-700 to-cyan-900 text-white shadow-lg transition-all duration-200 hover:scale-105"
        >
          <IoClose className="text-lg" />
        </button>

        <div className="relative z-10 h-full flex flex-col p-8 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
          <div className="mb-6">
            <AddSong />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {streams.length === 0 ? (
                <div className="text-center text-white/70 text-lg mt-20">
                  No streams yet.
                </div>
              ) : (
                <StreamList streams={streams} onVote={handleVote} />
              )}
            </div>
            <div>
              <NowPlaying isOwner={isOwner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicBox;