import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  findUnique: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.chat.findUnique({ where: { id: input.id } });
    }),

  findRequests: protectedProcedure
    .input(
      z.object({
        printerId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.chat.findMany({
        where: { printer_id: input.printerId },
        include: { members: true },
      });
    }),

  checkRequested: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return false; // Printers can't make messages

      const chat_exists = await ctx.prisma.chat.findMany({
        where: {
          printer_id: input.recipientId,
          members: { some: { id: ctx.session.user.id } },
        },
      });

      return !!chat_exists;
    }),

  create: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return; // Printers can't make messages

      const chat_exists = await ctx.prisma.chat.findMany({
        where: {
          printer_id: input.recipientId,
          members: { some: { id: ctx.session.user.id } },
        },
      });

      if (chat_exists) return;

      const chat = await ctx.prisma.chat.create({
        data: {
          members: { connect: [{ id: ctx.session.user.id }] },
          creator_id: ctx.session.user.id,
        },
      });

      return await ctx.prisma.printerProfile.update({
        where: { userId: input.recipientId },
        data: { messageRequests: { connect: [{ id: chat.id }] } },
      });
    }),

  printerJoin: protectedProcedure
    .input(z.object({ creator_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.chat.update({
        where: {
          creator_id_printer_id: {
            creator_id: input.creator_id,
            printer_id: ctx.session.user.id,
          },
        },

        data: {
          printer: {
            disconnect: true,
          },
          members: {
            connect: [{ id: ctx.session.user.id }],
          },
        },
      });
    }),
});
