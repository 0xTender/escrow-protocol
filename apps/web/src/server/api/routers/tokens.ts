import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";
import { AddressType, isAddr } from "@app/utils/web3";

export const tokenRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        addresses: z
          .custom<AddressType>()
          .refine(...isAddr)
          .array()
          .optional(),
      })
    )
    .query(({ input, ctx }) => {
      if (input.addresses === undefined) {
        return [];
      }
      return ctx.prisma.contract_pm.findMany({
        where: {
          address: {
            in: input.addresses,
          },
        },
        select: {
          address: true,
          name: true,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.e_EscrowExtensionUpdated_Escrow.findMany();
  }),
});
