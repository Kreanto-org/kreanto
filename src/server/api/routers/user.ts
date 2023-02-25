import { ColorType, PrintTime, Prisma } from "@prisma/client";
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
      console.log(input);

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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
