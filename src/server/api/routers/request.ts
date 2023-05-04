import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { checkConnected } from "~/utils/trpcHelpers";

export const requestRouter = createTRPCRouter({
  getMyRequests: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.printerProfile)
      return await ctx.prisma.printRequest.findMany({
        where: { requesterId: ctx.session.user.id },
      });

    return await ctx.prisma.printRequest.findMany({
      where: { printerId: ctx.session.user.id },
    });
  }),

  request: protectedProcedure
    .input(
      z.object({
        printerId: z.string(),
        colorChoice: z.string(),
        link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return;
      if (!checkConnected(ctx.prisma, ctx.session.user, input.printerId))
        return;
      return ctx.prisma.printRequest.create({
        data: {
          printer: { connect: { userId: input.printerId } },
          colorChoice: input.colorChoice,
          link: input.link,
          requester: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
