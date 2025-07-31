import prisma from "@/app/lib/prisma";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;

      try {
        await prisma.listner.create({
          data: {
            email: user.email,
            provider: "Google",
          },
        });
      } catch (error) {
        // Probably user already exists, so just continue
        console.error("Error adding user:", error);
        return true; // or `false` if you want to block login on error
      }

      return true;
    },
  },
};
