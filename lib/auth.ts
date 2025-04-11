import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      profilePic: string;
      email: string;
    };
  }

  interface User {
    id: string;
    username: string;
    profilePic: string;
    email: string;
    user_role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          username: user.username,
          profilePic: user.profilePic,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.profilePic = user.profilePic;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.profilePic = token.profilePic as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
