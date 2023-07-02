import { ColorType, PrintTime } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        id: z.string(),
        age: z.coerce.number(),
        location: z.string(),
        printer: z
          .object({
            printTime: z.nativeEnum(PrintTime).default("LOW"),
            colorType: z.nativeEnum(ColorType).default("SINGLE"),
            colors: z.array(z.string()),
            length: z.coerce.number(),
            width: z.coerce.number(),
            height: z.coerce.number(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          hasSignedUp: true,
          age: input.age,
          location: input.location,
          printerProfile: input.printer
            ? {
                create: {
                  ...input.printer,
                  colors: {
                    create: input.printer.colors.map((color) => ({
                      colorName: color,
                    })),
                  },
                },
              }
            : undefined,
        },
      });
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  findUnique: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { slug: input.slug },
        include: { printerProfile: true },
      });
    }),
  getPrinters: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: { NOT: [{ printerProfile: null }] },
      include: { printerProfile: true },
    });
  }),

  lastActive: protectedProcedure.mutation(async ({ ctx }) => {
    const lastTime = ctx.session.user.lastActive.toDateString();
    if (lastTime === new Date().toDateString()) return;

    return await ctx.prisma.user.update({
      where: { id: ctx.session.user.id },
      data: { lastActive: new Date() },
    });
  }),

  hasStarred: protectedProcedure
    .input(z.object({ printerId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return;

      return await ctx.prisma.starredPrinter.findUnique({
        where: {
          designerId_printerId: {
            designerId: ctx.session.user.id,
            printerId: input.printerId,
          },
        },
      });
    }),

  starPrinter: protectedProcedure
    .input(z.object({ printerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return;

      return await ctx.prisma.starredPrinter.create({
        data: {
          designerId: ctx.session.user.id,
          printerId: input.printerId,
        },
      });
    }),

  unStarPrinter: protectedProcedure
    .input(z.object({ printerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.printerProfile) return;

      return await ctx.prisma.starredPrinter.delete({
        where: {
          designerId_printerId: {
            designerId: ctx.session.user.id,
            printerId: input.printerId,
          },
        },
      });
    }),
});
