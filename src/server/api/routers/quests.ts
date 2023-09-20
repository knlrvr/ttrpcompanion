import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const updateQuestsInput = z.object({
    campaignId: z.string(),
    id: z.string(),
    title: z.string(),
    type: z.string(),
    body: z.string(),
    assigned: z.string(),
    gpReward: z.number(),
    invReward: z.string(),
    completed: z.boolean(),
});

export const questRouter = createTRPCRouter({
    create: protectedProcedure
    .input(
        z.object({
            campaignId: z.string(),
            title: z.string(),
            type: z.string(),
            body: z.string(),
            assigned: z.string(),
            gpReward: z.number(),
            invReward: z.string(),
            completed: z.boolean(),
        }),
    )

    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.quests.create({
            data: {
                campaignId: input.campaignId,
                title: input.title,
                type: input.type,
                body: input.body,
                assigned: input.assigned,
                gpReward: input.gpReward,
                invReward: input.invReward,
                completed: input.completed,

            },
        });
    }),

    getAll: protectedProcedure
    .input(z.object({ campaignId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.quests.findMany({
            where: {
                campaignId: input.campaignId,
            },
        });
    }),


    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.quests.delete({
            where: {
                id: input.id, 
            },
        });
    }),
    
}); 