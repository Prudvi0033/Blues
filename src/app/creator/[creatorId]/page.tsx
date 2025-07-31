'use client'
import { useEffect, useState } from 'react';
import MusicBox from "@/app/components/MusicBox";

export default function Page(context: { params: Promise<{ creatorId: string }> }) {
  const [creatorId, setCreatorId] = useState<string>('');

  useEffect(() => {
    // Extract the creatorId from params in useEffect
    context.params.then(({ creatorId }) => {
      setCreatorId(creatorId);
    });
  }, [context.params]);

  // Don't render until we have the creatorId
  if (!creatorId) {
    return <div>Loading...</div>;
  }

  return (
    <MusicBox
      creatorId={creatorId}
      onClose={() => {}} 
    />
  );
}