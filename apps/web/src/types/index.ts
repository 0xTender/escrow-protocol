export enum EscrowState {
  NONE,
  BEGUN,
  COMPLETED,
  CANCELLED,
}

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
