import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";
import { AddressType, isAddr } from "@app/utils/web3";

enum EscrowState {
  NONE,
  BEGUN,
  COMPLETED,
  CANCELLED,
}

export const escrowRouter = createTRPCRouter({
  salesAndPurchases: publicProcedure
    .input(
      z.object({
        address: z
          .custom<AddressType>()
          .refine(...isAddr)
          .optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.address === undefined) {
        return [0, 0];
      }
      const instances = await Promise.all([
        ctx.prisma.e_EscrowStateUpdate_Escrow.count({
          where: {
            A_sender: input.address,
            A_escrowState: `${EscrowState.BEGUN}`,
          },
        }),
        ctx.prisma.e_SwapStateChanged_SwapERC20Extension.count({
          where: {
            A_counter: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
        }),
      ]);

      return instances;
    }),

  purchases: publicProcedure
    .input(
      z.object({
        address: z
          .custom<AddressType>()
          .refine(...isAddr)
          .optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.address === undefined) {
        return { instances: [] };
      }
      const instances =
        await ctx.prisma.e_SwapStateChanged_SwapERC20Extension.findMany({
          where: {
            A_counter: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
        });
      return { instances };
    }),
});
