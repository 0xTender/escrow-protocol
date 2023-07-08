/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SwapERC20Extension,
  SwapERC20ExtensionInterface,
} from "../../contracts/SwapERC20Extension";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_escrowAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "escrowAddress",
        type: "address",
      },
    ],
    name: "EscrowAddressUpdated",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "counter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "initiatorToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initiatorAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "counterToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "counterAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum SwapERC20Extension.EscrowState",
        name: "state",
        type: "uint8",
      },
    ],
    name: "SwapStateChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
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
    name: "begin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "cancel",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cancelledSwaps",
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
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "complete",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "escrowAddress",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "swapStructs",
    outputs: [
      {
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "address",
        name: "counter",
        type: "address",
      },
      {
        internalType: "address",
        name: "initiatorToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initiatorAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "counterToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "counterAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "address",
        name: "_escrowAddress",
        type: "address",
      },
    ],
    name: "updateEscrowAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620027f6380380620027f68339818101604052810190620000379190620001d7565b80620000586200004c620000a160201b60201c565b620000a960201b60201c565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000209565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200019f8262000172565b9050919050565b620001b18162000192565b8114620001bd57600080fd5b50565b600081519050620001d181620001a6565b92915050565b600060208284031215620001f057620001ef6200016d565b5b60006200020084828501620001c0565b91505092915050565b6125dd80620002196000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80634f7d85e8116100715780634f7d85e814610179578063715018a6146101aa5780638da5cb5b146101b4578063aab53d74146101d2578063f074599514610203578063f2fde38b14610239576100a9565b806301ffc9a7146100ae5780630d5defa4146100de57806313cd0921146100fc5780632bd5be7f1461012d57806341e59c281461015d575b600080fd5b6100c860048036038101906100c39190611708565b610255565b6040516100d59190611750565b60405180910390f35b6100e66102cf565b6040516100f391906117ac565b60405180910390f35b6101166004803603810190610111919061188e565b6102f5565b604051610124929190611992565b60405180910390f35b610147600480360381019061014291906119c2565b610765565b6040516101549190611750565b60405180910390f35b610177600480360381019061017291906119ef565b610785565b005b610193600480360381019061018e9190611a1c565b610808565b6040516101a1929190611992565b60405180910390f35b6101b2610c09565b005b6101bc610c1d565b6040516101c991906117ac565b60405180910390f35b6101ec60048036038101906101e79190611a1c565b610c46565b6040516101fa929190611992565b60405180910390f35b61021d600480360381019061021891906119c2565b611000565b6040516102309796959493929190611a8b565b60405180910390f35b610253600480360381019061024e91906119ef565b6110c2565b005b60007ff605b1bd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806102c857506102c782611145565b5b9050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610389576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038090611b6c565b60405180910390fd5b6000848481019061039a9190611cc0565b9050600073ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff161415801561040e5750600073ffffffffffffffffffffffffffffffffffffffff16816080015173ffffffffffffffffffffffffffffffffffffffff1614155b61044d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044490611d5f565b60405180910390fd5b60008160600151118015610465575060008160a00151115b6104a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049b90611df1565b60405180910390fd5b806000015173ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614610516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050d90611e83565b60405180910390fd5b428160c001511161055c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055390611f15565b60405180910390fd5b61059187308360600151846040015173ffffffffffffffffffffffffffffffffffffffff166111af909392919063ffffffff16565b806003600088815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003015560808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816005015560c08201518160060155905050857fedb2ca3dec011aae6e9181a6777dd0aa591f6267b92d3dfecc8d197bc29bb7af826000015183602001518460400151856060015186608001518760a001518860c00151600160405161073d989796959493929190611fac565b60405180910390a2600160405180602001604052806000815250925092505094509492505050565b60026020528060005260406000206000915054906101000a900460ff1681565b61078d611238565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fb2442191962f8c50b10334ee24125a16163923eeef4f44972cbbeef1f9952e02816040516107fd91906117ac565b60405180910390a150565b60006060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461089c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089390611b6c565b60405180910390fd5b600084848101906108ad91906119c2565b90506000600360008381526020019081526020016000209050600015156002600084815260200190815260200160002060009054906101000a900460ff1615151461092d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109249061209c565b60405180910390fd5b80600601544211156109d0578060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff16146109cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c29061212e565b60405180910390fd5b610a63565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614610a62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a59906121c0565b60405180910390fd5b5b60016002600084815260200190815260200160002060006101000a81548160ff021916908315150217905550610b068160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166112b69092919063ffffffff16565b817fedb2ca3dec011aae6e9181a6777dd0aa591f6267b92d3dfecc8d197bc29bb7af8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876005015488600601546003604051610be1989796959493929190611fac565b60405180910390a2600160405180602001604052806000815250935093505050935093915050565b610c11611238565b610c1b600061133c565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006060600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd190611b6c565b60405180910390fd5b60008484810190610ceb91906119c2565b905060006003600083815260200190815260200160002090508060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614610d96576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8d906121c0565b60405180910390fd5b610e0f8160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff163083600501548460040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166111af909392919063ffffffff16565b610e868160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600301548360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166112b69092919063ffffffff16565b610efd8160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600501548360040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166112b69092919063ffffffff16565b817fedb2ca3dec011aae6e9181a6777dd0aa591f6267b92d3dfecc8d197bc29bb7af8260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685600301548660040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876005015488600601546002604051610fd8989796959493929190611fac565b60405180910390a2600160405180602001604052806000815250935093505050935093915050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050154908060060154905087565b6110ca611238565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611139576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113090612252565b60405180910390fd5b6111428161133c565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b611232846323b872dd60e01b8585856040516024016111d093929190612272565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611400565b50505050565b6112406114c7565b73ffffffffffffffffffffffffffffffffffffffff1661125e610c1d565b73ffffffffffffffffffffffffffffffffffffffff16146112b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ab906122f5565b60405180910390fd5b565b6113378363a9059cbb60e01b84846040516024016112d5929190612315565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611400565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000611462826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166114cf9092919063ffffffff16565b90506000815111156114c25780806020019051810190611482919061236a565b6114c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b890612409565b60405180910390fd5b5b505050565b600033905090565b60606114de84846000856114e7565b90509392505050565b60608247101561152c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115239061249b565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516115559190612502565b60006040518083038185875af1925050503d8060008114611592576040519150601f19603f3d011682016040523d82523d6000602084013e611597565b606091505b50915091506115a8878383876115b4565b92505050949350505050565b6060831561161657600083510361160e576115ce85611629565b61160d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160490612565565b60405180910390fd5b5b829050611621565b611620838361164c565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60008251111561165f5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116939190612585565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6116e5816116b0565b81146116f057600080fd5b50565b600081359050611702816116dc565b92915050565b60006020828403121561171e5761171d6116a6565b5b600061172c848285016116f3565b91505092915050565b60008115159050919050565b61174a81611735565b82525050565b60006020820190506117656000830184611741565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117968261176b565b9050919050565b6117a68161178b565b82525050565b60006020820190506117c1600083018461179d565b92915050565b6117d08161178b565b81146117db57600080fd5b50565b6000813590506117ed816117c7565b92915050565b6000819050919050565b611806816117f3565b811461181157600080fd5b50565b600081359050611823816117fd565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261184e5761184d611829565b5b8235905067ffffffffffffffff81111561186b5761186a61182e565b5b60208301915083600182028301111561188757611886611833565b5b9250929050565b600080600080606085870312156118a8576118a76116a6565b5b60006118b6878288016117de565b94505060206118c787828801611814565b935050604085013567ffffffffffffffff8111156118e8576118e76116ab565b5b6118f487828801611838565b925092505092959194509250565b600081519050919050565b600082825260208201905092915050565b60005b8381101561193c578082015181840152602081019050611921565b60008484015250505050565b6000601f19601f8301169050919050565b600061196482611902565b61196e818561190d565b935061197e81856020860161191e565b61198781611948565b840191505092915050565b60006040820190506119a76000830185611741565b81810360208301526119b98184611959565b90509392505050565b6000602082840312156119d8576119d76116a6565b5b60006119e684828501611814565b91505092915050565b600060208284031215611a0557611a046116a6565b5b6000611a13848285016117de565b91505092915050565b600080600060408486031215611a3557611a346116a6565b5b6000611a43868287016117de565b935050602084013567ffffffffffffffff811115611a6457611a636116ab565b5b611a7086828701611838565b92509250509250925092565b611a85816117f3565b82525050565b600060e082019050611aa0600083018a61179d565b611aad602083018961179d565b611aba604083018861179d565b611ac76060830187611a7c565b611ad4608083018661179d565b611ae160a0830185611a7c565b611aee60c0830184611a7c565b98975050505050505050565b7f457363726f77457874656e73696f6e3a204f6e6c7920657363726f7720636f6e60008201527f74726163742063616e2063616c6c20746869732066756e6374696f6e00000000602082015250565b6000611b56603c8361190d565b9150611b6182611afa565b604082019050919050565b60006020820190508181036000830152611b8581611b49565b9050919050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611bc982611948565b810181811067ffffffffffffffff82111715611be857611be7611b91565b5b80604052505050565b6000611bfb61169c565b9050611c078282611bc0565b919050565b600060e08284031215611c2257611c21611b8c565b5b611c2c60e0611bf1565b90506000611c3c848285016117de565b6000830152506020611c50848285016117de565b6020830152506040611c64848285016117de565b6040830152506060611c7884828501611814565b6060830152506080611c8c848285016117de565b60808301525060a0611ca084828501611814565b60a08301525060c0611cb484828501611814565b60c08301525092915050565b600060e08284031215611cd657611cd56116a6565b5b6000611ce484828501611c0c565b91505092915050565b7f537761704552433230457874656e73696f6e3a20746f6b656e732063616e6e6f60008201527f74206265207a65726f2061646472657373000000000000000000000000000000602082015250565b6000611d4960318361190d565b9150611d5482611ced565b604082019050919050565b60006020820190508181036000830152611d7881611d3c565b9050919050565b7f537761704552433230457874656e73696f6e3a20616d6f756e74732063616e6e60008201527f6f74206265207a65726f00000000000000000000000000000000000000000000602082015250565b6000611ddb602a8361190d565b9150611de682611d7f565b604082019050919050565b60006020820190508181036000830152611e0a81611dce565b9050919050565b7f537761704552433230457874656e73696f6e3a2073656e646572206d7573742060008201527f626520696e69746961746f72546f6b656e000000000000000000000000000000602082015250565b6000611e6d60318361190d565b9150611e7882611e11565b604082019050919050565b60006020820190508181036000830152611e9c81611e60565b9050919050565b7f537761704552433230457874656e73696f6e3a20646561646c696e65206d757360008201527f7420626520696e20667574757265000000000000000000000000000000000000602082015250565b6000611eff602e8361190d565b9150611f0a82611ea3565b604082019050919050565b60006020820190508181036000830152611f2e81611ef2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60048110611f7557611f74611f35565b5b50565b6000819050611f8682611f64565b919050565b6000611f9682611f78565b9050919050565b611fa681611f8b565b82525050565b600061010082019050611fc2600083018b61179d565b611fcf602083018a61179d565b611fdc604083018961179d565b611fe96060830188611a7c565b611ff6608083018761179d565b61200360a0830186611a7c565b61201060c0830185611a7c565b61201d60e0830184611f9d565b9998505050505050505050565b7f537761704552433230457874656e73696f6e3a207377617020616c726561647960008201527f2063616e63656c6c656400000000000000000000000000000000000000000000602082015250565b6000612086602a8361190d565b91506120918261202a565b604082019050919050565b600060208201905081810360008301526120b581612079565b9050919050565b7f537761704552433230457874656e73696f6e3a2073656e646572206d7573742060008201527f626520696e69746961746f720000000000000000000000000000000000000000602082015250565b6000612118602c8361190d565b9150612123826120bc565b604082019050919050565b600060208201905081810360008301526121478161210b565b9050919050565b7f537761704552433230457874656e73696f6e3a2073656e646572206d7573742060008201527f626520636f756e74657200000000000000000000000000000000000000000000602082015250565b60006121aa602a8361190d565b91506121b58261214e565b604082019050919050565b600060208201905081810360008301526121d98161219d565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061223c60268361190d565b9150612247826121e0565b604082019050919050565b6000602082019050818103600083015261226b8161222f565b9050919050565b6000606082019050612287600083018661179d565b612294602083018561179d565b6122a16040830184611a7c565b949350505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006122df60208361190d565b91506122ea826122a9565b602082019050919050565b6000602082019050818103600083015261230e816122d2565b9050919050565b600060408201905061232a600083018561179d565b6123376020830184611a7c565b9392505050565b61234781611735565b811461235257600080fd5b50565b6000815190506123648161233e565b92915050565b6000602082840312156123805761237f6116a6565b5b600061238e84828501612355565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b60006123f3602a8361190d565b91506123fe82612397565b604082019050919050565b60006020820190508181036000830152612422816123e6565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b600061248560268361190d565b915061249082612429565b604082019050919050565b600060208201905081810360008301526124b481612478565b9050919050565b600081519050919050565b600081905092915050565b60006124dc826124bb565b6124e681856124c6565b93506124f681856020860161191e565b80840191505092915050565b600061250e82846124d1565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b600061254f601d8361190d565b915061255a82612519565b602082019050919050565b6000602082019050818103600083015261257e81612542565b9050919050565b6000602082019050818103600083015261259f8184611959565b90509291505056fea2646970667358221220c0eb3bb409fe4274c19e3e53608e641bd8ddf43964a842969101a6ef087a909064736f6c63430008120033";

type SwapERC20ExtensionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwapERC20ExtensionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SwapERC20Extension__factory extends ContractFactory {
  constructor(...args: SwapERC20ExtensionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _escrowAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SwapERC20Extension> {
    return super.deploy(
      _escrowAddress,
      overrides || {}
    ) as Promise<SwapERC20Extension>;
  }
  override getDeployTransaction(
    _escrowAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_escrowAddress, overrides || {});
  }
  override attach(address: string): SwapERC20Extension {
    return super.attach(address) as SwapERC20Extension;
  }
  override connect(signer: Signer): SwapERC20Extension__factory {
    return super.connect(signer) as SwapERC20Extension__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwapERC20ExtensionInterface {
    return new utils.Interface(_abi) as SwapERC20ExtensionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwapERC20Extension {
    return new Contract(address, _abi, signerOrProvider) as SwapERC20Extension;
  }
}
