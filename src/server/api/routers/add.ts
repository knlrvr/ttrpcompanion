import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

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

export const removeCharacterFromCampaign = z.object({
    characterId: z.string(),
    campaignId: z.string(),
});

export const removeCharFromCampRouter = createTRPCRouter({
    removeChararacterFromCampaign: protectedProcedure
    .input(removeCharacterFromCampaign)
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.update({
            where: { id: input.characterId },
            data: {
                campaignId: null,
            },
        });
    }),
});

export const removeCharacterFromUser = z.object({
    characterId: z.string(),
    userId: z.string(),
});

export const removeCharFromUserRouter = createTRPCRouter({
    removeCharacterFromUser: protectedProcedure
    .input(removeCharacterFromUser)
    .mutation(async ({ ctx, input }) => {
        return ctx.prisma.character.update({
            where: { id: input.characterId },
            data: {
                userId: null,
            },
        });
    }),
});