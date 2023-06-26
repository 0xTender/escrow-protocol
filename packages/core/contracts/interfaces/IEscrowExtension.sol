// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEscrowExtension {
    function begin(
        address sender,
        uint256 escrowId,
        bytes calldata data
    ) external returns (bool, string memory);

    function cancel(
        address sender,
        bytes calldata data
    ) external returns (bool, string memory);

    function complete(
        address sender,
        bytes calldata data
    ) external returns (bool, string memory);
}
