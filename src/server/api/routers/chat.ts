import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { canAccess, checkConnected, checkRequested } from "~/utils/trpcHelpers";

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

  findChats: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.chat.findMany({
      where: {
        printer_id: undefined,
        members: { some: { id: ctx.session.user.id } },
      },
      include: { members: true },
    });
  }),

  checkRequested: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await checkRequested(
        ctx.prisma,
        ctx.session.user,
        input.recipientId
      );
    }),

  create: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return; // Printers can't make messages
      console.log("not printer");

      const requested = await checkRequested(
        ctx.prisma,
        ctx.session.user,
        input.recipientId
      );

      const connected = await checkConnected(
        ctx.prisma,
        ctx.session.user,
        input.recipientId
      );

      console.log("shit", connected);
      if (requested || connected) return;

      console.log("doesnt already exist");

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

  getDesignerFromId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const members = await ctx.prisma.chat.findUnique({
        where: { id: input.id },
        select: {
          members: {
            where: { printerProfile: null },
          },
        },
      });
      return members?.members[0];
    }),

  getOtherUserInChat: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!canAccess(ctx.prisma, ctx.session.user, input.id)) return null;

      const members = await ctx.prisma.chat.findUnique({
        where: { id: input.id },
        select: {
          members: {
            where: { printerProfile: null },
          },
        },
      });

      if (members?.members.length === 0) return null;
      if (members?.members.length === 1) return members.members[0];

      if (members?.members[0]?.id === ctx.session.user.id)
        return members.members[1];
      return members?.members[0];
    }),

  canAccess: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return canAccess(ctx.prisma, ctx.session.user, input.id);
    }),
});
