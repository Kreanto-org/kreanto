import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { canAccess } from "~/utils/trpcHelpers";

export const messageRouter = createTRPCRouter({
  findUnique: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.message.findUnique({ where: { id: input.id } });
    }),
  send: protectedProcedure
    .input(z.object({ chatId: z.string(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const allowed = canAccess(ctx.prisma, ctx.session.user, input.chatId);
      if (!allowed) return;

      return await ctx.prisma.message.create({
        data: {
          text: input.text,
          userId: ctx.session.user.id,
          chat: { connect: { id: input.chatId } },
        },
      });
    }),
});
