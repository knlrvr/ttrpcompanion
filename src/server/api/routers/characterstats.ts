import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const characterStatsRouter = createTRPCRouter({
    create: protectedProcedure
    .input(
        z.object({ title: z.string(), characterId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.characterStats.create({
            data: {
                characterId: input.characterId,
            },
        });
    }),

    delete: protectedProcedure 
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.delete({
            where: {
                id: input.id,
            },
        });
    }),

    getAll: protectedProcedure
    .input(z.object({ characterId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.character.findMany({
            where: {
                characterId: input.characterId,
            },
        });
    }),
});