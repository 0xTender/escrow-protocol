import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";
import { type AddressType, isAddr } from "@app/utils/web3";
import { EscrowState, AgreementStatus } from "@app/types";
import { TRPCError } from "@trpc/server";
import {
  type E_SwapStateChanged_MultiSwapExtension,
  type E_SwapStateChanged_SwapERC20Extension,
} from "@prisma/client";

const getUniqueByKey = <T>(instances: T[], key: keyof T) => {
  const arrayUniqueByKey = [
    ...new Map(instances.map((item) => [item[key], item])).values(),
  ];

  return arrayUniqueByKey;
};

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
        (
          await ctx.prisma.e_EscrowStateUpdate_Escrow.findMany({
            distinct: ["A_escrowId"],
            where: {
              A_sender: input.address,
              A_escrowState: `${EscrowState.BEGUN}`,
            },
          })
        ).length,
        (
          await ctx.prisma.e_SwapStateChanged_MultiSwapExtension.findMany({
            distinct: ["A_escrowId"],
            where: {
              A_counter: input.address,
              A_state: `${EscrowState.BEGUN}`,
            },
          })
        ).length +
          (
            await ctx.prisma.e_SwapStateChanged_SwapERC20Extension.findMany({
              distinct: "A_escrowId",
              where: {
                A_counter: input.address,
                A_state: `${EscrowState.BEGUN}`,
              },
            })
          ).length,
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
      const swapERC20 = getUniqueByKey(
        await ctx.prisma.e_SwapStateChanged_SwapERC20Extension.findMany({
          where: {
            A_counter: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        "A_escrowId"
      );

      const multiSwap = getUniqueByKey(
        await ctx.prisma.e_SwapStateChanged_MultiSwapExtension.findMany({
          where: {
            A_counter: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        "A_escrowId"
      );

      const tokenAddresses = Array.from(
        new Set(
          [...swapERC20, ...multiSwap]
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
        [...swapERC20, ...multiSwap].map(async (e) => {
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
            initiatorTokenName:
              tokens.get(e.A_initiatorToken) ?? e.A_initiatorToken,
            counterTokenName: tokens.get(e.A_counterToken) ?? e.A_counterToken,
          };
        }),
      };
    }),

  sales: publicProcedure
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
      const swapERC20 = getUniqueByKey(
        await ctx.prisma.e_SwapStateChanged_SwapERC20Extension.findMany({
          where: {
            A_initiator: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        "A_escrowId"
      );

      const multiSwap = getUniqueByKey(
        await ctx.prisma.e_SwapStateChanged_MultiSwapExtension.findMany({
          where: {
            A_initiator: input.address,
            A_state: `${EscrowState.BEGUN}`,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        "A_escrowId"
      );

      const tokenAddresses = Array.from(
        new Set(
          swapERC20
            .map((e) => [e.A_initiatorToken, e.A_counterToken])
            .reduce((acc, val) => acc.concat(val), [])
            .concat(
              multiSwap
                .map((e) => [e.A_initiatorToken, e.A_counterToken])
                .reduce((acc, val) => acc.concat(val), [])
            )
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
        [...swapERC20, ...multiSwap].map(async (e) => {
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
            initiatorTokenName:
              tokens.get(e.A_initiatorToken) ?? e.A_initiatorToken,
            counterTokenName: tokens.get(e.A_counterToken) ?? e.A_counterToken,
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

      let returnData:
        | {
            extensionName: "MultiSwapExtension";
            details: E_SwapStateChanged_MultiSwapExtension;
          }
        | {
            extensionName: "SwapERC20Extension";
            details: E_SwapStateChanged_SwapERC20Extension;
          }
        | undefined;

      if (extensionName?.name === "MultiSwapExtension") {
        returnData = {
          extensionName: "MultiSwapExtension",
          details:
            await prisma.e_SwapStateChanged_MultiSwapExtension.findFirstOrThrow(
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
      }

      if (extensionName?.name === "SwapERC20Extension") {
        returnData = {
          extensionName: "SwapERC20Extension",
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
      }
      if (returnData !== undefined) {
        return returnData;
      }

      {
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "Extension is not supported or not found",
        });
      }
    }),
});
