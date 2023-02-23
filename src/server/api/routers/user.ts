import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        id: z.string(),
        age: z.number(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          hasSignedUp: true,
          age: input.age,
          location: input.location,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
