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
})