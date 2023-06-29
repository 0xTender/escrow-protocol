export enum EscrowState {
  NONE,
  BEGUN,
  COMPLETED,
  CANCELLED,
}

export enum Extensions {
  SwapERC20Extension = "SwapERC20Extension",
  MultiSwapExtension = "MultiSwapExtension",
}

export enum ExchangeType {
  ERC20,
  ERC721,
}

export const ExchangeNames = ["ERC20", "ERC721"] as const;

export const getValueForEscrowState = (state: number) => {
  switch (state) {
    case EscrowState.NONE:
      return "None";
    case EscrowState.BEGUN:
      return "Initialized";
    case EscrowState.COMPLETED:
      return "Completed";
    case EscrowState.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export enum AgreementStatus {
  Active = "Active",
  Cancelled = "Cancelled",
  Completed = "Completed",
  Expired = "Expired",
}
