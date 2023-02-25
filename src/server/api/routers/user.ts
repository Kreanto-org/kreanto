import { ColorType, PrintTime } from "@prisma/client";
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
        printer: z
          .object({
            printTime: z.nativeEnum(PrintTime).default("LOW"),
            colorType: z.nativeEnum(ColorType).default("SINGLE"),
            colors: z.array(z.string()),
            length: z.number(),
            width: z.number(),
            height: z.number(),
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
          printerProfile: {
            create: {
              ...input.printer,
              colors: {
                connect: input.printer?.colors.map((colorName) => {
                  return {
                    printerId_colorName: {
                      printerId: input.id,
                      colorName: colorName,
                    },
                  };
                }),
              },
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
