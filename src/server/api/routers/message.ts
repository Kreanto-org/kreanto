/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import { sendMessageRealTime } from "~/pages/api/pusher";
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

      sendMessageRealTime(input.chatId, ctx.session.user);

      return await ctx.prisma.message.create({
        data: {
          text: input.text,
          userId: ctx.session.user.id,
          chat: { connect: { id: input.chatId } },
        },
      });
    }),

  getMessages: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allowed = canAccess(ctx.prisma, ctx.session.user, input.chatId);
      if (!allowed) return;

      return await ctx.prisma.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { sentOn: "asc" },
      });
    }),
  getLastMessage: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allowed = canAccess(ctx.prisma, ctx.session.user, input.chatId);
      if (!allowed) return;

      return await ctx.prisma.message.findFirst({
        where: { chatId: input.chatId },
        orderBy: { sentOn: "asc" },
      });
    }),

  infiniteQuery: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.date().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.message.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: { chatId: input.chatId },
        cursor: cursor
          ? { chatId_sentOn: { chatId: input.chatId, sentOn: cursor } }
          : undefined,
        orderBy: {
          sentOn: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.sentOn;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
