import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const characterRouter = createTRPCRouter({
    create: protectedProcedure
    .input(
        z.object({ 
            title: z.string(), 
            campaignId: z.string(),
            stats: z.object({
                level: z.number(),
            })
        }),
    )
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.create({
            data: {
                title: input.title,
                campaignId: input.campaignId,
                stats: {
                    create: {
                        level: input.stats.level,
                    },
                },
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
    .input(z.object({ campaignId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.character.findMany({
            where: {
                campaignId: input.campaignId,
            },
            include: {
                stats: true,
            }
        });
    }),
});