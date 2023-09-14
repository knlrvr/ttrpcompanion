import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { campaignRouter } from "./routers/campaign";
import { characterRouter } from "./routers/characters";
import { addCharacterToCampaignRouter } from "./routers/add";
import { addCharacterToUserRouter } from "./routers/add";
import { removeCharFromCampRouter } from "./routers/add";
import { removeCharFromUserRouter } from "./routers/add";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    campaign: campaignRouter,
    character: characterRouter,
    addCharacterToCampaignRouter: addCharacterToCampaignRouter,
    addCharacterToUserRouter: addCharacterToUserRouter,
    removeCharFromCampRouter: removeCharFromCampRouter,
    removeCharFromUserRouter: removeCharFromUserRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
