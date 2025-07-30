'use client'
import MusicBox from "@/app/components/MusicBox";


export default function Page({ params } : {params : {creatorId: string}}) {
  return (
    <MusicBox
      creatorId={params.creatorId}
      onClose={() => {}} // 
    />
  );
}
