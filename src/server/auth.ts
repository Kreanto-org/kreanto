/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { customSlugify } from "~/utils/customSlugify";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.age = user.age;
        session.user.lastActive = user.lastActive;
        session.user.avgRespTime = user.avgRespTime;
        session.user.name = user.name;
        session.user.location = user.location;
        session.user.avgRespTime = user.avgRespTime;
        session.user.numResponses = user.numResponses;
        session.user.hasSignedUp = user.hasSignedUp;

        const printerProfile = await prisma.printerProfile.findUnique({
          where: { userId: user.id },
        });
        session.user.printerProfile = printerProfile ?? undefined;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: async (profile, _tokens) => {
        const slug = customSlugify(profile.name as string);

        const hasNameCollision = await prisma.user.findUnique({
          where: { slug },
        });
        let count = 2;
        // check if a person with the slug already exists
        if (hasNameCollision) {
          while (true) {
            if (
              !(await prisma.user.findUnique({
                where: { slug: slug + "-" + count.toString() },
              }))
            ) {
              break;
            }
            count++;
          }
        }

        return {
          id: profile.sub as string,
          name: profile.name as string,
          email: profile.email as string,
          slug: hasNameCollision ? slug + "-" + count.toString() : slug,
          age: 0,
          lastActive: new Date(),
          avgRespTime: 0,
          numResponses: 0,
          hasSignedUp: false,
          emailVerified: new Date(),
        };
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
