import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";
import { AddressType, isAddr } from "@app/utils/web3";
import { EscrowState, AgreementStatus } from "@app/types";
import { TRPCError } from "@trpc/server";

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
      const swapERC20 =
        await ctx.prisma.e_SwapStateChanged_SwapERC20Extension.findMany({
          where: {
            A_counter: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
        });

      const tokenAddresses = Array.from(
        new Set(
          swapERC20
            .map((e) => [e.A_initiatorToken, e.A_counterToken])
            .reduce((acc, val) => acc.concat(val), [])
        )
      );

      const tokens = (
        await ctx.prisma.contract_pm.findMany({
          where: {
            address: {
              in: tokenAddresses,
            },
          },
          select: {
            address: true,
            name: true,
          },
        })
      ).reduce((acc, val) => {
        acc.set(val.address, val.name);
        return acc;
      }, new Map<string, string>());

      // check if cancelled
      const instances = await Promise.all(
        swapERC20.map(async (e) => {
          if (parseInt(e.A_deadline) * 1000 < Date.now()) {
            return { ...e, status: AgreementStatus["Expired"] };
          }
          const isCancelledOrCompleted =
            await ctx.prisma.e_EscrowStateUpdate_Escrow.findFirst({
              where: {
                A_escrowId: e.A_escrowId,
                A_escrowState: {
                  not: `${EscrowState.BEGUN}`,
                },
              },
            });
          if (
            isCancelledOrCompleted?.A_escrowState === `${EscrowState.COMPLETED}`
          ) {
            return { ...e, status: AgreementStatus["Completed"] };
          }
          if (
            isCancelledOrCompleted?.A_escrowState === `${EscrowState.CANCELLED}`
          ) {
            return { ...e, status: AgreementStatus["Cancelled"] };
          }
          return { ...e, status: AgreementStatus["Active"] };
        })
      );
      return {
        instances: instances.map((e) => {
          return {
            ...e,
            initiatorTokenName: tokens.get(e.A_initiatorToken) ?? "",
            counterTokenName: tokens.get(e.A_counterToken) ?? "",
          };
        }),
      };
    }),

  details: publicProcedure
    .input(z.object({ escrowId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const currentState =
        await prisma.e_EscrowStateUpdate_Escrow.findFirstOrThrow({
          where: {
            A_escrowId: input.escrowId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      const extensionName = await ctx.prisma.contract_pm.findFirst({
        where: {
          address: currentState.A_escrowExtension,
        },
      });

      if (extensionName?.name === "SwapERC20Extension") {
        return {
          details:
            await prisma.e_SwapStateChanged_SwapERC20Extension.findFirstOrThrow(
              {
                where: {
                  A_escrowId: input.escrowId,
                },
                orderBy: {
                  createdAt: "desc",
                },
              }
            ),
        };
      } else {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "Extension is not supported or not found",
        });
      }
    }),
});
