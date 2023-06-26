// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./BaseEscrowExtension.sol";

contract SwapERC20Extension is BaseEscrowExtension {
    constructor(address _escrowAddress) BaseEscrowExtension(_escrowAddress) {}

    function begin(
        address sender,
        uint256 escrowId,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {}

    function cancel(
        address sender,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {}

    function complete(
        address sender,
        bytes calldata data
    ) external override onlyEscrow returns (bool, string memory) {}
}
