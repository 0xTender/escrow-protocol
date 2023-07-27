/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Escrow, EscrowInterface } from "../../contracts/Escrow";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IEscrowExtension",
        name: "escrowExtension",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "EscrowExtensionUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum Escrow.EscrowState",
        name: "escrowState",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "contract IEscrowExtension",
        name: "escrowExtension",
        type: "address",
      },
    ],
    name: "EscrowStateUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IEscrowExtension",
        name: "escrowExtension",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "beginEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "cancelEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "completeEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IEscrowExtension",
        name: "",
        type: "address",
      },
    ],
    name: "escrowExtensions",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "escrowState",
    outputs: [
      {
        internalType: "enum Escrow.EscrowState",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IEscrowExtension",
        name: "escrowExtension",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "updateEscrowExtension",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611be58061010d6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b1461011f578063c1ce75521461013d578063d913ddb214610159578063f2fde38b14610175578063f8efe3941461019157610093565b80632ea89b43146100985780633ffdfb4e146100b4578063715018a6146100e457806387e75b0c146100ee575b600080fd5b6100b260048036038101906100ad9190610fd9565b6101ad565b005b6100ce60048036038101906100c991906110a9565b6104af565b6040516100db91906110f1565b60405180910390f35b6100ec6104cf565b005b6101086004803603810190610103919061110c565b6104e3565b6040516101169291906111bf565b60405180910390f35b610127610544565b60405161013491906111e8565b60405180910390f35b61015760048036038101906101529190611203565b61056d565b005b610173600480360381019061016e9190610fd9565b6107d9565b005b61018f600480360381019061018a919061128f565b610ada565b005b6101ab60048036038101906101a691906112e8565b610b5d565b005b600160038111156101c1576101c0611139565b5b6003600085815260200190815260200160002060009054906101000a900460ff1660038111156101f4576101f3611139565b5b14610234576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022b906113ab565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166004600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036102d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102cd90611417565b60405180910390fd5b6000806004600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663aab53d74610330610dbc565b86866040518463ffffffff1660e01b815260040161035093929190611495565b6000604051808303816000875af115801561036f573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906103989190611627565b915091508181906103df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d691906116c7565b60405180910390fd5b5060026003600087815260200190815260200160002060006101000a81548160ff0219169083600381111561041757610416611139565b5b021790555084610425610dbc565b73ffffffffffffffffffffffffffffffffffffffff167ff1c58eb120759c9a0731a7eb6031896ec8e8cccdb714bbb87d896332ae596e496002600460008a815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040516104a0929190611748565b60405180910390a35050505050565b60016020528060005260406000206000915054906101000a900460ff1681565b6104d7610dc4565b6104e16000610e42565b565b6000806003600084815260200190815260200160002060009054906101000a900460ff166004600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691509150915091565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f0906117e3565b60405180910390fd5b6106036002610f06565b600061060f6002610f1c565b905060016003600083815260200190815260200160002060006101000a81548160ff0219169083600381111561064857610647611139565b5b0217905550836004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000808573ffffffffffffffffffffffffffffffffffffffff166313cd09216106c6610dbc565b8588886040518563ffffffff1660e01b81526004016106e89493929190611812565b6000604051808303816000875af1158015610707573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906107309190611627565b91509150818190610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076e91906116c7565b60405180910390fd5b5082610781610dbc565b73ffffffffffffffffffffffffffffffffffffffff167ff1c58eb120759c9a0731a7eb6031896ec8e8cccdb714bbb87d896332ae596e496001896040516107c9929190611748565b60405180910390a3505050505050565b600160038111156107ed576107ec611139565b5b6003600085815260200190815260200160002060009054906101000a900460ff1660038111156108205761081f611139565b5b14610860576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610857906113ab565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166004600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610902576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f990611417565b60405180910390fd5b6000806004600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634f7d85e861095c610dbc565b86866040518463ffffffff1660e01b815260040161097c93929190611495565b6000604051808303816000875af115801561099b573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906109c49190611627565b91509150818190610a0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0291906116c7565b60405180910390fd5b50600380600087815260200190815260200160002060006101000a81548160ff02191690836003811115610a4257610a41611139565b5b021790555084610a50610dbc565b73ffffffffffffffffffffffffffffffffffffffff167ff1c58eb120759c9a0731a7eb6031896ec8e8cccdb714bbb87d896332ae596e496003600460008a815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610acb929190611748565b60405180910390a35050505050565b610ae2610dc4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b48906118c4565b60405180910390fd5b610b5a81610e42565b50565b610b65610dc4565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bd4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcb90611956565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c39906119e8565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166301ffc9a77ff605b1bd000000000000000000000000000000000000000000000000000000006040518263ffffffff1660e01b8152600401610c9b9190611a43565b602060405180830381865afa158015610cb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cdc9190611a5e565b610d1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1290611b23565b60405180910390fd5b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508015158273ffffffffffffffffffffffffffffffffffffffff167fee12763144c60d055aa33f037d3d37faa84d51a96007e04252b974c211a3266660405160405180910390a35050565b600033905090565b610dcc610dbc565b73ffffffffffffffffffffffffffffffffffffffff16610dea610544565b73ffffffffffffffffffffffffffffffffffffffff1614610e40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e3790611b8f565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610f5181610f3e565b8114610f5c57600080fd5b50565b600081359050610f6e81610f48565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610f9957610f98610f74565b5b8235905067ffffffffffffffff811115610fb657610fb5610f79565b5b602083019150836001820283011115610fd257610fd1610f7e565b5b9250929050565b600080600060408486031215610ff257610ff1610f34565b5b600061100086828701610f5f565b935050602084013567ffffffffffffffff81111561102157611020610f39565b5b61102d86828701610f83565b92509250509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061106482611039565b9050919050565b600061107682611059565b9050919050565b6110868161106b565b811461109157600080fd5b50565b6000813590506110a38161107d565b92915050565b6000602082840312156110bf576110be610f34565b5b60006110cd84828501611094565b91505092915050565b60008115159050919050565b6110eb816110d6565b82525050565b600060208201905061110660008301846110e2565b92915050565b60006020828403121561112257611121610f34565b5b600061113084828501610f5f565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6004811061117957611178611139565b5b50565b600081905061118a82611168565b919050565b600061119a8261117c565b9050919050565b6111aa8161118f565b82525050565b6111b981611059565b82525050565b60006040820190506111d460008301856111a1565b6111e160208301846111b0565b9392505050565b60006020820190506111fd60008301846111b0565b92915050565b60008060006040848603121561121c5761121b610f34565b5b600061122a86828701611094565b935050602084013567ffffffffffffffff81111561124b5761124a610f39565b5b61125786828701610f83565b92509250509250925092565b61126c81611059565b811461127757600080fd5b50565b60008135905061128981611263565b92915050565b6000602082840312156112a5576112a4610f34565b5b60006112b38482850161127a565b91505092915050565b6112c5816110d6565b81146112d057600080fd5b50565b6000813590506112e2816112bc565b92915050565b600080604083850312156112ff576112fe610f34565b5b600061130d85828601611094565b925050602061131e858286016112d3565b9150509250929050565b600082825260208201905092915050565b7f457363726f773a20457363726f77206e6f7420696e20424547554e207374617460008201527f6500000000000000000000000000000000000000000000000000000000000000602082015250565b6000611395602183611328565b91506113a082611339565b604082019050919050565b600060208201905081810360008301526113c481611388565b9050919050565b7f457363726f773a20457363726f7720657874656e73696f6e206e6f7420736574600082015250565b6000611401602083611328565b915061140c826113cb565b602082019050919050565b60006020820190508181036000830152611430816113f4565b9050919050565b600082825260208201905092915050565b82818337600083830152505050565b6000601f19601f8301169050919050565b60006114748385611437565b9350611481838584611448565b61148a83611457565b840190509392505050565b60006040820190506114aa60008301866111b0565b81810360208301526114bd818486611468565b9050949350505050565b6000815190506114d6816112bc565b92915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61151982611457565b810181811067ffffffffffffffff82111715611538576115376114e1565b5b80604052505050565b600061154b610f2a565b90506115578282611510565b919050565b600067ffffffffffffffff821115611577576115766114e1565b5b61158082611457565b9050602081019050919050565b60005b838110156115ab578082015181840152602081019050611590565b60008484015250505050565b60006115ca6115c58461155c565b611541565b9050828152602081018484840111156115e6576115e56114dc565b5b6115f184828561158d565b509392505050565b600082601f83011261160e5761160d610f74565b5b815161161e8482602086016115b7565b91505092915050565b6000806040838503121561163e5761163d610f34565b5b600061164c858286016114c7565b925050602083015167ffffffffffffffff81111561166d5761166c610f39565b5b611679858286016115f9565b9150509250929050565b600081519050919050565b600061169982611683565b6116a38185611328565b93506116b381856020860161158d565b6116bc81611457565b840191505092915050565b600060208201905081810360008301526116e1818461168e565b905092915050565b6000819050919050565b600061170e61170961170484611039565b6116e9565b611039565b9050919050565b6000611720826116f3565b9050919050565b600061173282611715565b9050919050565b61174281611727565b82525050565b600060408201905061175d60008301856111a1565b61176a6020830184611739565b9392505050565b7f457363726f773a20457363726f7720657874656e73696f6e206e6f7420656e6160008201527f626c656400000000000000000000000000000000000000000000000000000000602082015250565b60006117cd602483611328565b91506117d882611771565b604082019050919050565b600060208201905081810360008301526117fc816117c0565b9050919050565b61180c81610f3e565b82525050565b600060608201905061182760008301876111b0565b6118346020830186611803565b8181036040830152611847818486611468565b905095945050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006118ae602683611328565b91506118b982611852565b604082019050919050565b600060208201905081810360008301526118dd816118a1565b9050919050565b7f457363726f773a20457363726f7720657874656e73696f6e2063616e6e6f742060008201527f6265207a65726f20616464726573730000000000000000000000000000000000602082015250565b6000611940602f83611328565b915061194b826118e4565b604082019050919050565b6000602082019050818103600083015261196f81611933565b9050919050565b7f457363726f773a20457363726f7720657874656e73696f6e2063616e6e6f742060008201527f62652073616d65206164647265737320617320657363726f7700000000000000602082015250565b60006119d2603983611328565b91506119dd82611976565b604082019050919050565b60006020820190508181036000830152611a01816119c5565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611a3d81611a08565b82525050565b6000602082019050611a586000830184611a34565b92915050565b600060208284031215611a7457611a73610f34565b5b6000611a82848285016114c7565b91505092915050565b7f457363726f773a20457363726f7720657874656e73696f6e20646f6573206e6f60008201527f7420737570706f72742049457363726f77457874656e73696f6e20696e74657260208201527f6661636500000000000000000000000000000000000000000000000000000000604082015250565b6000611b0d604483611328565b9150611b1882611a8b565b606082019050919050565b60006020820190508181036000830152611b3c81611b00565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611b79602083611328565b9150611b8482611b43565b602082019050919050565b60006020820190508181036000830152611ba881611b6c565b905091905056fea2646970667358221220810a9e792384767f4bd0b201ae7f8389b3c31c73e1d35756b46b43e0150879da64736f6c63430008120033";

type EscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Escrow__factory extends ContractFactory {
  constructor(...args: EscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Escrow> {
    return super.deploy(overrides || {}) as Promise<Escrow>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Escrow {
    return super.attach(address) as Escrow;
  }
  override connect(signer: Signer): Escrow__factory {
    return super.connect(signer) as Escrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowInterface {
    return new utils.Interface(_abi) as EscrowInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Escrow {
    return new Contract(address, _abi, signerOrProvider) as Escrow;
  }
}
