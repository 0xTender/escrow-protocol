// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./BaseEscrowExtension.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract MultiSwapExtension is
    BaseEscrowExtension,
    ERC721Holder,
    ReentrancyGuard
{
    using SafeERC20 for IERC20;

    constructor(address _escrowAddress) BaseEscrowExtension(_escrowAddress) {}

    enum EscrowState {
        NONE,
        BEGUN,
        COMPLETED,
        CANCELLED
    }

    enum ExchangeType {
        ERC20,
        ERC720
    }

    struct SwapStruct {
        address initiator;
        address counter;
        // sender token
        address initiatorToken;
        uint256 initiatorAmount;
        // receiver token
        address counterToken;
        uint256 counterAmount;
        // deadline
        uint256 deadline;
        // exchange type
        ExchangeType initiatorExchange;
        ExchangeType counterExchange;
    }

    function transferTokenToContract(
        address tokenAddress,
        uint256 amount,
        address getFrom,
        ExchangeType exchange
    ) internal {
        if (exchange == ExchangeType.ERC20) {
            IERC20(tokenAddress).safeTransferFrom(
                getFrom,
                address(this),
                amount
            );
        } else {
            IERC721(tokenAddress).safeTransferFrom(
                getFrom,
                address(this),
                amount
            );
        }
    }

    function transferTokenFromContract(
        address tokenAddress,
        uint256 amount,
        address sendTo,
        ExchangeType exchange
    ) internal {
        if (exchange == ExchangeType.ERC20) {
            IERC20(tokenAddress).safeTransfer(sendTo, amount);
        } else {
            IERC721(tokenAddress).safeTransferFrom(
                address(this),
                sendTo,
                amount
            );
        }
    }

    mapping(uint256 => bool) public cancelledSwaps;

    mapping(uint256 => SwapStruct) public swapStructs;

    function begin(
        address sender,
        uint256 escrowId,
        bytes calldata data
    ) external override onlyEscrow nonReentrant returns (bool, string memory) {
        SwapStruct memory swapStruct = abi.decode(data, (SwapStruct));
        require(
            swapStruct.initiatorToken != address(0) &&
                swapStruct.counterToken != address(0),
            "MultiSwapExtension: tokens cannot be zero address"
        );
        // zero amounts permitted.
        // meaning no token is being sent in case of erc20
        // token 0 still can be sent for erc721
        require(
            sender == swapStruct.initiator,
            "MultiSwapExtension: sender must be initiatorToken"
        );
        require(
            swapStruct.deadline > block.timestamp,
            "MultiSwapExtension: deadline must be in future"
        );

        transferTokenToContract(
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            sender,
            swapStruct.initiatorExchange
        );
        swapStructs[escrowId] = swapStruct;

        emit SwapStateChanged(
            escrowId,
            swapStruct.initiator,
            swapStruct.counter,
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            swapStruct.counterToken,
            swapStruct.counterAmount,
            swapStruct.deadline,
            EscrowState.BEGUN,
            swapStruct.initiatorExchange,
            swapStruct.counterExchange
        );
        return (true, "");
    }

    function cancel(
        address sender,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {
        uint256 escrowId = abi.decode(data, (uint256));
        SwapStruct storage swapStruct = swapStructs[escrowId];

        require(
            cancelledSwaps[escrowId] == false,
            "MultiSwap: swap already cancelled"
        );
        require(
            sender == swapStruct.initiator || sender == swapStruct.counter,
            "MultiSwap: sender must be initiator"
        );
        cancelledSwaps[escrowId] = true;
        transferTokenFromContract(
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            swapStruct.initiator,
            swapStruct.initiatorExchange
        );
        emit SwapStateChanged(
            escrowId,
            swapStruct.initiator,
            swapStruct.counter,
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            swapStruct.counterToken,
            swapStruct.counterAmount,
            swapStruct.deadline,
            EscrowState.CANCELLED,
            swapStruct.initiatorExchange,
            swapStruct.counterExchange
        );
        return (true, "");
    }

    function complete(
        address sender,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {
        uint256 escrowId = abi.decode(data, (uint256));
        SwapStruct storage swapStruct = swapStructs[escrowId];
        // we not need to check for cancelled swaps here
        // because escrow will not call this function if swap is cancelled
        require(
            sender == swapStruct.counter,
            "MultiSwap: sender must be counter"
        );
        transferTokenToContract(
            swapStruct.counterToken,
            swapStruct.counterAmount,
            swapStruct.counter,
            swapStruct.counterExchange
        );
        transferTokenFromContract(
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            swapStruct.counter,
            swapStruct.initiatorExchange
        );

        transferTokenFromContract(
            swapStruct.counterToken,
            swapStruct.counterAmount,
            swapStruct.initiator,
            swapStruct.counterExchange
        );

        emit SwapStateChanged(
            escrowId,
            swapStruct.initiator,
            swapStruct.counter,
            swapStruct.initiatorToken,
            swapStruct.initiatorAmount,
            swapStruct.counterToken,
            swapStruct.counterAmount,
            swapStruct.deadline,
            EscrowState.COMPLETED,
            swapStruct.initiatorExchange,
            swapStruct.counterExchange
        );
        return (true, "");
    }

    event SwapStateChanged(
        uint256 indexed escrowId,
        address initiator,
        address counter,
        address initiatorToken,
        uint256 initiatorAmount,
        address counterToken,
        uint256 counterAmount,
        uint256 deadline,
        EscrowState state,
        ExchangeType initiatorExchange,
        ExchangeType counterExchange
    );
}
