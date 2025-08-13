import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./server/db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db),
    providers: [
//     GitHub({
//     clientId: process.env.AUTH_GITHUB_ID!,
//     clientSecret: process.env.AUTH_GITHUB_SECRET!,
//   }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
],
    session: { strategy: "jwt"},
    callbacks: {
    async jwt({ token, user }) {
      // `user` is only available on first sign in
      if (user) {
        token.id = user.id; // store user.id in token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token values to session
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
})