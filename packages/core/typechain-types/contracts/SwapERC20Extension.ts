/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface SwapERC20ExtensionInterface extends utils.Interface {
  functions: {
    "begin(address,uint256,bytes)": FunctionFragment;
    "cancel(address,bytes)": FunctionFragment;
    "cancelledSwaps(uint256)": FunctionFragment;
    "complete(address,bytes)": FunctionFragment;
    "escrowAddress()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "swapStructs(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateEscrowAddress(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "begin"
      | "cancel"
      | "cancelledSwaps"
      | "complete"
      | "escrowAddress"
      | "owner"
      | "renounceOwnership"
      | "supportsInterface"
      | "swapStructs"
      | "transferOwnership"
      | "updateEscrowAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "begin",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cancel",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelledSwaps",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "complete",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "escrowAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "swapStructs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEscrowAddress",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "begin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelledSwaps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "complete", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "escrowAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapStructs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEscrowAddress",
    data: BytesLike
  ): Result;

  events: {
    "EscrowAddressUpdated(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SwapStateChanged(uint256,address,address,address,uint256,address,uint256,uint256,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EscrowAddressUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapStateChanged"): EventFragment;
}

export interface EscrowAddressUpdatedEventObject {
  escrowAddress: string;
}
export type EscrowAddressUpdatedEvent = TypedEvent<
  [string],
  EscrowAddressUpdatedEventObject
>;

export type EscrowAddressUpdatedEventFilter =
  TypedEventFilter<EscrowAddressUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface SwapStateChangedEventObject {
  escrowId: BigNumber;
  initiator: string;
  counter: string;
  initiatorToken: string;
  initiatorAmount: BigNumber;
  counterToken: string;
  counterAmount: BigNumber;
  deadline: BigNumber;
  state: number;
}
export type SwapStateChangedEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    number
  ],
  SwapStateChangedEventObject
>;

export type SwapStateChangedEventFilter =
  TypedEventFilter<SwapStateChangedEvent>;

export interface SwapERC20Extension extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SwapERC20ExtensionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    begin(
      sender: PromiseOrValue<string>,
      escrowId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancel(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelledSwaps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    complete(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    escrowAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    swapStructs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, BigNumber, BigNumber] & {
        initiator: string;
        counter: string;
        initiatorToken: string;
        initiatorAmount: BigNumber;
        counterToken: string;
        counterAmount: BigNumber;
        deadline: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateEscrowAddress(
      _escrowAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  begin(
    sender: PromiseOrValue<string>,
    escrowId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancel(
    sender: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelledSwaps(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  complete(
    sender: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  escrowAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  swapStructs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, string, BigNumber, BigNumber] & {
      initiator: string;
      counter: string;
      initiatorToken: string;
      initiatorAmount: BigNumber;
      counterToken: string;
      counterAmount: BigNumber;
      deadline: BigNumber;
    }
  >;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateEscrowAddress(
    _escrowAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    begin(
      sender: PromiseOrValue<string>,
      escrowId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    cancel(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    cancelledSwaps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    complete(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    escrowAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    swapStructs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, BigNumber, BigNumber] & {
        initiator: string;
        counter: string;
        initiatorToken: string;
        initiatorAmount: BigNumber;
        counterToken: string;
        counterAmount: BigNumber;
        deadline: BigNumber;
      }
    >;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEscrowAddress(
      _escrowAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "EscrowAddressUpdated(address)"(
      escrowAddress?: null
    ): EscrowAddressUpdatedEventFilter;
    EscrowAddressUpdated(escrowAddress?: null): EscrowAddressUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "SwapStateChanged(uint256,address,address,address,uint256,address,uint256,uint256,uint8)"(
      escrowId?: PromiseOrValue<BigNumberish> | null,
      initiator?: null,
      counter?: null,
      initiatorToken?: null,
      initiatorAmount?: null,
      counterToken?: null,
      counterAmount?: null,
      deadline?: null,
      state?: null
    ): SwapStateChangedEventFilter;
    SwapStateChanged(
      escrowId?: PromiseOrValue<BigNumberish> | null,
      initiator?: null,
      counter?: null,
      initiatorToken?: null,
      initiatorAmount?: null,
      counterToken?: null,
      counterAmount?: null,
      deadline?: null,
      state?: null
    ): SwapStateChangedEventFilter;
  };

  estimateGas: {
    begin(
      sender: PromiseOrValue<string>,
      escrowId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancel(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelledSwaps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    complete(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    escrowAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapStructs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateEscrowAddress(
      _escrowAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    begin(
      sender: PromiseOrValue<string>,
      escrowId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancel(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelledSwaps(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    complete(
      sender: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    escrowAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapStructs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateEscrowAddress(
      _escrowAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}