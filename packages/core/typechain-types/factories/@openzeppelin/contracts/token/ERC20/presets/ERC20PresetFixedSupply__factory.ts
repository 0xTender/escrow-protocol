/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  ERC20PresetFixedSupply,
  ERC20PresetFixedSupplyInterface,
} from "../../../../../../@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f0738038062001f07833981810160405281019062000037919062000425565b838381600390816200004a919062000716565b5080600490816200005c919062000716565b5050506200007181836200007b60201b60201c565b5050505062000918565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620000ed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000e4906200085e565b60405180910390fd5b6200010160008383620001e860201b60201c565b8060026000828254620001159190620008af565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001c89190620008fb565b60405180910390a3620001e460008383620001ed60201b60201c565b5050565b505050565b505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200025b8262000210565b810181811067ffffffffffffffff821117156200027d576200027c62000221565b5b80604052505050565b600062000292620001f2565b9050620002a0828262000250565b919050565b600067ffffffffffffffff821115620002c357620002c262000221565b5b620002ce8262000210565b9050602081019050919050565b60005b83811015620002fb578082015181840152602081019050620002de565b60008484015250505050565b60006200031e6200031884620002a5565b62000286565b9050828152602081018484840111156200033d576200033c6200020b565b5b6200034a848285620002db565b509392505050565b600082601f8301126200036a576200036962000206565b5b81516200037c84826020860162000307565b91505092915050565b6000819050919050565b6200039a8162000385565b8114620003a657600080fd5b50565b600081519050620003ba816200038f565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003ed82620003c0565b9050919050565b620003ff81620003e0565b81146200040b57600080fd5b50565b6000815190506200041f81620003f4565b92915050565b60008060008060808587031215620004425762000441620001fc565b5b600085015167ffffffffffffffff81111562000463576200046262000201565b5b620004718782880162000352565b945050602085015167ffffffffffffffff81111562000495576200049462000201565b5b620004a38782880162000352565b9350506040620004b687828801620003a9565b9250506060620004c9878288016200040e565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200052857607f821691505b6020821081036200053e576200053d620004e0565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005a87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000569565b620005b4868362000569565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005f7620005f1620005eb8462000385565b620005cc565b62000385565b9050919050565b6000819050919050565b6200061383620005d6565b6200062b6200062282620005fe565b84845462000576565b825550505050565b600090565b6200064262000633565b6200064f81848462000608565b505050565b5b8181101562000677576200066b60008262000638565b60018101905062000655565b5050565b601f821115620006c657620006908162000544565b6200069b8462000559565b81016020851015620006ab578190505b620006c3620006ba8562000559565b83018262000654565b50505b505050565b600082821c905092915050565b6000620006eb60001984600802620006cb565b1980831691505092915050565b6000620007068383620006d8565b9150826002028217905092915050565b6200072182620004d5565b67ffffffffffffffff8111156200073d576200073c62000221565b5b6200074982546200050f565b620007568282856200067b565b600060209050601f8311600181146200078e576000841562000779578287015190505b620007858582620006f8565b865550620007f5565b601f1984166200079e8662000544565b60005b82811015620007c857848901518255600182019150602085019450602081019050620007a1565b86831015620007e85784890151620007e4601f891682620006d8565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062000846601f83620007fd565b915062000853826200080e565b602082019050919050565b60006020820190508181036000830152620008798162000837565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620008bc8262000385565b9150620008c98362000385565b9250828201905080821115620008e457620008e362000880565b5b92915050565b620008f58162000385565b82525050565b6000602082019050620009126000830184620008ea565b92915050565b6115df80620009286000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342966c681161008c57806395d89b411161006657806395d89b4114610226578063a457c2d714610244578063a9059cbb14610274578063dd62ed3e146102a4576100cf565b806342966c68146101be57806370a08231146101da57806379cc67901461020a576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce56714610170578063395093511461018e575b600080fd5b6100dc6102d4565b6040516100e99190610d6b565b60405180910390f35b61010c60048036038101906101079190610e26565b610366565b6040516101199190610e81565b60405180910390f35b61012a610389565b6040516101379190610eab565b60405180910390f35b61015a60048036038101906101559190610ec6565b610393565b6040516101679190610e81565b60405180910390f35b6101786103c2565b6040516101859190610f35565b60405180910390f35b6101a860048036038101906101a39190610e26565b6103cb565b6040516101b59190610e81565b60405180910390f35b6101d860048036038101906101d39190610f50565b610402565b005b6101f460048036038101906101ef9190610f7d565b610416565b6040516102019190610eab565b60405180910390f35b610224600480360381019061021f9190610e26565b61045e565b005b61022e61047e565b60405161023b9190610d6b565b60405180910390f35b61025e60048036038101906102599190610e26565b610510565b60405161026b9190610e81565b60405180910390f35b61028e60048036038101906102899190610e26565b610587565b60405161029b9190610e81565b60405180910390f35b6102be60048036038101906102b99190610faa565b6105aa565b6040516102cb9190610eab565b60405180910390f35b6060600380546102e390611019565b80601f016020809104026020016040519081016040528092919081815260200182805461030f90611019565b801561035c5780601f106103315761010080835404028352916020019161035c565b820191906000526020600020905b81548152906001019060200180831161033f57829003601f168201915b5050505050905090565b600080610371610631565b905061037e818585610639565b600191505092915050565b6000600254905090565b60008061039e610631565b90506103ab858285610802565b6103b685858561088e565b60019150509392505050565b60006012905090565b6000806103d6610631565b90506103f78185856103e885896105aa565b6103f29190611079565b610639565b600191505092915050565b61041361040d610631565b82610b04565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104708261046a610631565b83610802565b61047a8282610b04565b5050565b60606004805461048d90611019565b80601f01602080910402602001604051908101604052809291908181526020018280546104b990611019565b80156105065780601f106104db57610100808354040283529160200191610506565b820191906000526020600020905b8154815290600101906020018083116104e957829003601f168201915b5050505050905090565b60008061051b610631565b9050600061052982866105aa565b90508381101561056e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105659061111f565b60405180910390fd5b61057b8286868403610639565b60019250505092915050565b600080610592610631565b905061059f81858561088e565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069f906111b1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610717576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070e90611243565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107f59190610eab565b60405180910390a3505050565b600061080e84846105aa565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610888578181101561087a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610871906112af565b60405180910390fd5b6108878484848403610639565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036108fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f490611341565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610963906113d3565b60405180910390fd5b610977838383610cd1565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156109fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f490611465565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610aeb9190610eab565b60405180910390a3610afe848484610cd6565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b73576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6a906114f7565b60405180910390fd5b610b7f82600083610cd1565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c05576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bfc90611589565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cb89190610eab565b60405180910390a3610ccc83600084610cd6565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d15578082015181840152602081019050610cfa565b60008484015250505050565b6000601f19601f8301169050919050565b6000610d3d82610cdb565b610d478185610ce6565b9350610d57818560208601610cf7565b610d6081610d21565b840191505092915050565b60006020820190508181036000830152610d858184610d32565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610dbd82610d92565b9050919050565b610dcd81610db2565b8114610dd857600080fd5b50565b600081359050610dea81610dc4565b92915050565b6000819050919050565b610e0381610df0565b8114610e0e57600080fd5b50565b600081359050610e2081610dfa565b92915050565b60008060408385031215610e3d57610e3c610d8d565b5b6000610e4b85828601610ddb565b9250506020610e5c85828601610e11565b9150509250929050565b60008115159050919050565b610e7b81610e66565b82525050565b6000602082019050610e966000830184610e72565b92915050565b610ea581610df0565b82525050565b6000602082019050610ec06000830184610e9c565b92915050565b600080600060608486031215610edf57610ede610d8d565b5b6000610eed86828701610ddb565b9350506020610efe86828701610ddb565b9250506040610f0f86828701610e11565b9150509250925092565b600060ff82169050919050565b610f2f81610f19565b82525050565b6000602082019050610f4a6000830184610f26565b92915050565b600060208284031215610f6657610f65610d8d565b5b6000610f7484828501610e11565b91505092915050565b600060208284031215610f9357610f92610d8d565b5b6000610fa184828501610ddb565b91505092915050565b60008060408385031215610fc157610fc0610d8d565b5b6000610fcf85828601610ddb565b9250506020610fe085828601610ddb565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061103157607f821691505b60208210810361104457611043610fea565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061108482610df0565b915061108f83610df0565b92508282019050808211156110a7576110a661104a565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611109602583610ce6565b9150611114826110ad565b604082019050919050565b60006020820190508181036000830152611138816110fc565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061119b602483610ce6565b91506111a68261113f565b604082019050919050565b600060208201905081810360008301526111ca8161118e565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061122d602283610ce6565b9150611238826111d1565b604082019050919050565b6000602082019050818103600083015261125c81611220565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611299601d83610ce6565b91506112a482611263565b602082019050919050565b600060208201905081810360008301526112c88161128c565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061132b602583610ce6565b9150611336826112cf565b604082019050919050565b6000602082019050818103600083015261135a8161131e565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006113bd602383610ce6565b91506113c882611361565b604082019050919050565b600060208201905081810360008301526113ec816113b0565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061144f602683610ce6565b915061145a826113f3565b604082019050919050565b6000602082019050818103600083015261147e81611442565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006114e1602183610ce6565b91506114ec82611485565b604082019050919050565b60006020820190508181036000830152611510816114d4565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000611573602283610ce6565b915061157e82611517565b604082019050919050565b600060208201905081810360008301526115a281611566565b905091905056fea26469706673582212209b183252d70d1deb1eb02042568cc76373d281e74df76d5cdc40ef7b03b6bbdc64736f6c63430008120033";

type ERC20PresetFixedSupplyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20PresetFixedSupplyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20PresetFixedSupply__factory extends ContractFactory {
  constructor(...args: ERC20PresetFixedSupplyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20PresetFixedSupply> {
    return super.deploy(
      name,
      symbol,
      initialSupply,
      owner,
      overrides || {}
    ) as Promise<ERC20PresetFixedSupply>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    initialSupply: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name,
      symbol,
      initialSupply,
      owner,
      overrides || {}
    );
  }
  override attach(address: string): ERC20PresetFixedSupply {
    return super.attach(address) as ERC20PresetFixedSupply;
  }
  override connect(signer: Signer): ERC20PresetFixedSupply__factory {
    return super.connect(signer) as ERC20PresetFixedSupply__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20PresetFixedSupplyInterface {
    return new utils.Interface(_abi) as ERC20PresetFixedSupplyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20PresetFixedSupply {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC20PresetFixedSupply;
  }
}