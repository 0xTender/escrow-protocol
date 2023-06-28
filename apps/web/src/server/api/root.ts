import { createTRPCRouter } from "@app/server/api/trpc";
import { exampleRouter } from "@app/server/api/routers/example";
import { escrowRouter } from "@app/server/api/routers/escrow";
import { tokenRouter } from "./routers/tokens";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  escrow: escrowRouter,
  token: tokenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
