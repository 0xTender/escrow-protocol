// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IEscrowExtension.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

abstract contract BaseEscrowExtension is Ownable, ERC165, IEscrowExtension {
    address public escrowAddress;

    constructor(address _escrowAddress) {
        escrowAddress = _escrowAddress;
    }

    function updateEscrowAddress(address _escrowAddress) external onlyOwner {
        escrowAddress = _escrowAddress;
        emit EscrowAddressUpdated(_escrowAddress);
    }

    event EscrowAddressUpdated(address escrowAddress);

    modifier onlyEscrow() {
        require(
            _msgSender() == address(this),
            "EscrowExtension: Only escrow contract can call this function"
        );
        _;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(IEscrowExtension).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
