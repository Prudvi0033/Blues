import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import {z} from 'zod'

const streamSchema = z.object({
    creatorId: z.string(),
    url: z.string() 
})

export async function POST(req: NextRequest){
    try {
        const data = streamSchema.parse(req.json())
        const isNotUrl = data.url.includes("youtube") || data.url.includes("spotify")

        if(!isNotUrl){
            return Response.json({
                message: "Check your URL"
            })
        }

        const extractedId = data.url.split("?v=")[1]

        await prisma.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })
    } catch (error) {
        
    }
}