import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const campaignRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.campaign.findMany({
                where: {
                    ownerId: ctx.session.user.id,
            },
        });
    }),

    create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.campaign.create({
            data: {
                title: input.title,
                ownerId: ctx.session.user.id,
            },
        });
    }),

    delete: protectedProcedure 
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.campaign.delete({
            where: {
                id: input.id,
            },
        });
    }),
})

export const addCharacterToCampaign = z.object({
    characterId: z.string(),
    campaignId: z.string(),
});

export const addCharacterToCampaignRouter = createTRPCRouter({
    addCharacterToCampaign: protectedProcedure
    .input(addCharacterToCampaign)
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.update({
            where: { id: input.characterId},
            data: {
                campaignId: input.campaignId,
            },
        });
    }),
});

export const addCharacterToUser = z.object({
    characterId: z.string(),
    userId: z.string(),
});

export const addCharacterToUserRouter = createTRPCRouter({
    addCharacterToUser: protectedProcedure
    .input(addCharacterToUser)
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.update({
            where: { id: input.characterId},
            data: {
                userId: input.userId,
            },
        });
    }),
});