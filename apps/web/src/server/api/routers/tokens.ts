import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";
import { type AddressType, isAddr } from "@app/utils/web3";

export const tokenRouter = createTRPCRouter({
  fetchTokens: publicProcedure
    .input(
      z.object({
        exchange: z.enum(["ERC20", "ERC721"]),
      })
    )
    .query(async ({ input, ctx }) => {
      const exchange = input.exchange;
      if (exchange === "ERC20") {
        return await ctx.prisma.contract_pm.findMany({
          where: {
            name: {
              in: ["Tether", "WrappedEther"],
            },
          },
          select: {
            address: true,
            name: true,
          },
        });
      } else {
        return await ctx.prisma.contract_pm.findMany({
          where: {
            name: {
              in: ["TestNFT"],
            },
          },
          select: {
            address: true,
            name: true,
          },
        });
      }
    }),
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
