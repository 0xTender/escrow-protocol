// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./BaseEscrowExtension.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract SwapERC20Extension is BaseEscrowExtension {
    using SafeERC20 for IERC20;

    constructor(address _escrowAddress) BaseEscrowExtension(_escrowAddress) {}

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
    }

    mapping(uint256 => bool) public cancelledSwaps;

    mapping(uint256 => SwapStruct) public swapStructs;

    // state mananged by escrow
    // function can called only by escrow
    function begin(
        address sender,
        uint256 escrowId,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {
        SwapStruct memory swapStruct = abi.decode(data, (SwapStruct));

        require(
            swapStruct.initiatorToken != address(0) &&
                swapStruct.counterToken != address(0),
            "SwapERC20Extension: tokens cannot be zero address"
        );
        require(
            swapStruct.initiatorAmount > 0 && swapStruct.counterAmount > 0,
            "SwapERC20Extension: amounts cannot be zero"
        );
        require(
            sender == swapStruct.initiator,
            "SwapERC20Extension: sender must be initiatorToken"
        );

        IERC20(swapStruct.initiatorToken).safeTransferFrom(
            sender,
            address(this),
            swapStruct.initiatorAmount
        );

        swapStructs[escrowId] = swapStruct;
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
            "SwapERC20Extension: swap already cancelled"
        );
        // post deadline.
        // state is monitored by escrow.
        // safe to cancel if reached here.
        // sender should be initiator.

        if (block.timestamp > swapStruct.deadline) {
            require(
                sender == swapStruct.initiator,
                "SwapERC20Extension: sender must be initiator"
            );
        } else {
            require(
                sender == swapStruct.counter,
                "SwapERC20Extension: sender must be counter"
            );
        }

        cancelledSwaps[escrowId] = true;
        IERC20(swapStruct.initiatorToken).safeTransfer(
            swapStruct.initiator,
            swapStruct.initiatorAmount
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
            "SwapERC20Extension: sender must be counter"
        );

        // for record on chain
        IERC20(swapStruct.counterToken).safeTransferFrom(
            swapStruct.counter,
            address(this),
            swapStruct.counterAmount
        );

        // transfer from escrow to counter
        IERC20(swapStruct.initiatorToken).safeTransfer(
            swapStruct.counter,
            swapStruct.initiatorAmount
        );

        // transfer from escrow to initiator
        IERC20(swapStruct.counterToken).safeTransfer(
            swapStruct.initiator,
            swapStruct.counterAmount
        );

        return (true, "");
    }
}
