import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const campaignRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(async ({ ctx }) => {
        return ctx.prisma.campaign.findMany({
            where: {
                OR: [
                    {
                        ownerId: ctx.session.user.id,
                    },
                    {
                        members: {
                            some: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                ],
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

    join: protectedProcedure
    .input(z.object({ campaignId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const { user } = ctx.session;
        const campaign = await ctx.prisma.campaign.findUnique({
            where: {
                id: input.campaignId,
            },
        });

        if (!campaign) {
            throw new Error("Campaign not found!")
        }

        // already a member?

        await ctx.prisma.campaign.update({
            where: {
                id: input.campaignId,
            },
            data: {
                members: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return "Joined campaign successfully!";
    }),


    getMembers: protectedProcedure
    .input(z.object({ campaignId: z.string() })) // Input takes the campaignId
    .query(async ({ ctx, input }) => {
        const campaign = await ctx.prisma.campaign.findUnique({
            where: {
                id: input.campaignId,
            },
            include: {
                members: true, // Include the members of the campaign
            },
        });

        if (!campaign) {
            throw new Error("Campaign not found!");
        }
        return campaign.members;
    }),

    getOwner: protectedProcedure
    .input(z.object({ campaignId: z.string() }))
    .query(async ({ ctx, input }) => {
        const campaign = await ctx.prisma.campaign.findUnique({
            where: {
                id: input.campaignId,
            },
            include: {
                owner: true, 
            },
        });

        if (!campaign) {
            throw new Error("Campaign not found!");
        }
        return campaign.owner;
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
});