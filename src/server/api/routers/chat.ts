import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  findUnique: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.chat.findUnique({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return; // Printers can't make messages

      const chat = await ctx.prisma.chat.create({
        data: { members: { connect: [{ id: ctx.session.user.id }] } },
      });

      return await ctx.prisma.printerProfile.update({
        where: { userId: input.recipientId },
        data: { messageRequests: { connect: [{ id: chat.id }] } },
      });
    }),
});
