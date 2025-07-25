import prisma from "@/app/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks : {
    //@ts-ignore
    async signIn({user}){
      
      if(!user.email){
        return false
      }
      try {
        await prisma.listner.create({
          data: {
            email: user.email,
            provider: "Google"
          }
        })
      } catch (error) {
        return Response.json({
          message :"Error in adding user"
        })
      }
      return true;
    }
  },
};

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
