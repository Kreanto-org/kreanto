import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const colorRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const colors = await ctx.prisma.color.findMany({
      orderBy: { index: "asc" },
    });
    return colors;
  }),
});
