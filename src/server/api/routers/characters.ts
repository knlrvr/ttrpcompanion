import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";


const updateCharacterStatsInput = z.object({
    id: z.string(),
    stats: z.object({
        level: z.number(),
        charClass: z.string(),
        charRace: z.string(),
        totalSessions: z.number(),
        totalTime: z.number(),
        totalXp: z.number(),
        dmgDealt: z.number(),
        dmgTaken: z.number(),
        critHits: z.number(),
        totalKills: z.number(),
        spellsCast: z.number(),
        totalHealingOthers: z.number(),
        totalHealingSelf: z.number(),
        totalDeaths: z.number(),
        turnsNoDmg: z.number(),
        combatTime: z.number(),
        natTwenty: z.number(),
        natOne: z.number(),
        totalKo: z.number(),
    }),
});

export const characterRouter = createTRPCRouter({
    create: protectedProcedure
    .input(
        z.object({ 
            title: z.string(), 
            campaignId: z.string(),
            stats: z.object({
                level: z.number(),
                charClass: z.string(),
                charRace: z.string(),
                totalSessions: z.number(),
                totalTime: z.number(),
                totalXp: z.number(),
                dmgDealt: z.number(),
                dmgTaken: z.number(),
                critHits: z.number(),
                totalKills: z.number(),
                spellsCast: z.number(),
                totalHealingOthers: z.number(),
                totalHealingSelf: z.number(),
                totalDeaths: z.number(),
                turnsNoDmg: z.number(),
                // added 
                combatTime: z.number(),
                natTwenty: z.number(),
                natOne: z.number(),
                totalKo: z.number(),
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
                        charClass: input.stats.charClass,
                        charRace: input.stats.charRace,
                        totalSessions: input.stats.totalSessions,
                        totalTime: input.stats.totalTime,
                        totalXp: input.stats.totalXp,
                        dmgDealt: input.stats.dmgDealt,
                        dmgTaken: input.stats.dmgTaken,
                        critHits: input.stats.critHits,
                        totalKills: input.stats.totalKills,
                        spellsCast: input.stats.spellsCast,
                        totalHealingOthers: input.stats.totalHealingOthers,
                        totalHealingSelf: input.stats.totalHealingSelf,
                        totalDeaths: input.stats.totalDeaths,
                        turnsNoDmg: input.stats.turnsNoDmg,
                        // added
                        combatTime: input.stats.combatTime,
                        natTwenty: input.stats.natTwenty,
                        natOne: input.stats.natOne,
                        totalKo: input.stats.totalKo,
                    },
                },
            },
        });
    }),

    update: protectedProcedure
    .input(updateCharacterStatsInput)
    .mutation(async ({ ctx, input }) => {
      const { id, stats } = input;
      return ctx.prisma.characterStats.updateMany({
        where: { characterId: id },
        data: stats,
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