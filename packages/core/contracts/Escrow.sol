// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IEscrowExtension.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract Escrow is Ownable {
    using Counters for Counters.Counter;
    mapping(IEscrowExtension => bool) public escrowExtensions;

    Counters.Counter private _escrowIdTracker;
    mapping(uint256 => EscrowState) private _escrowStates;
    mapping(uint256 => IEscrowExtension) private _escrowExtensionFromId;

    enum EscrowState {
        NONE,
        BEGUN,
        COMPLETED,
        CANCELLED
    }

    /**
     *
     * @param escrowId id of the escrow
     * @return state of the escrow
     * @return address of the escrow extension
     */
    function escrowState(
        uint256 escrowId
    ) public view returns (EscrowState, address) {
        return (
            _escrowStates[escrowId],
            address(_escrowExtensionFromId[escrowId])
        );
    }

    /**
     *
     * @param escrowExtension address of the escrow extension
     * @param enabled if the extension is enabled or not
     */
    function updateEscrowExtension(
        IEscrowExtension escrowExtension,
        bool enabled
    ) external onlyOwner {
        require(
            address(escrowExtension) != address(0),
            "Escrow: Escrow extension cannot be zero address"
        );
        require(
            address(escrowExtension) != address(this),
            "Escrow: Escrow extension cannot be same address as escrow"
        );
        require(
            IERC165(address(escrowExtension)).supportsInterface(
                type(IEscrowExtension).interfaceId
            ),
            "Escrow: Escrow extension does not support IEscrowExtension interface"
        );

        escrowExtensions[escrowExtension] = enabled;
        emit EscrowExtensionUpdated(escrowExtension, enabled);
    }

    /**
     *
     * @param escrowExtension address of the escrow extension
     * @param data data to be passed to the escrow extension
     */
    function initEscrow(
        IEscrowExtension escrowExtension,
        bytes calldata data
    ) public {
        // TODO: Reentracny guard
        require(
            escrowExtensions[escrowExtension],
            "Escrow: Escrow extension not enabled"
        );

        _escrowIdTracker.increment();
        _escrowStates[_escrowIdTracker.current()] = EscrowState.BEGUN;

        (bool success, string memory errorString) = escrowExtension.begin(
            _msgSender(),
            _escrowIdTracker.current(),
            data
        );
        require(success, errorString);
        emit EscrowStateUpdate(
            _msgSender(),
            _escrowIdTracker.current(),
            EscrowState.BEGUN,
            escrowExtension
        );
    }

    /**
     * @param escrowId id of the escrow
     * @param data data to be passed to the escrow extension
     */
    function cancelEscrow(uint256 escrowId, bytes calldata data) public {
        require(
            _escrowStates[escrowId] == EscrowState.BEGUN,
            "Escrow: Escrow not in BEGUN state"
        );
        require(
            _escrowExtensionFromId[escrowId] != IEscrowExtension(address(0)),
            "Escrow: Escrow extension not set"
        );

        (bool success, string memory errorString) = _escrowExtensionFromId[
            escrowId
        ].cancel(_msgSender(), data);

        require(success, errorString);

        _escrowStates[escrowId] = EscrowState.CANCELLED;

        emit EscrowStateUpdate(
            _msgSender(),
            escrowId,
            EscrowState.CANCELLED,
            _escrowExtensionFromId[escrowId]
        );
    }

    /**
     * @param escrowId id of the escrow
     * @param data data to be passed to the escrow extension
     */
    function completeEscrow(uint256 escrowId, bytes calldata data) public {
        require(
            _escrowStates[escrowId] == EscrowState.BEGUN,
            "Escrow: Escrow not in BEGUN state"
        );

        require(
            _escrowExtensionFromId[escrowId] != IEscrowExtension(address(0)),
            "Escrow: Escrow extension not set"
        );

        (bool success, string memory errorString) = _escrowExtensionFromId[
            escrowId
        ].complete(_msgSender(), data);

        require(success, errorString);

        _escrowStates[escrowId] = EscrowState.COMPLETED;

        emit EscrowStateUpdate(
            _msgSender(),
            escrowId,
            EscrowState.COMPLETED,
            _escrowExtensionFromId[escrowId]
        );
    }

    event EscrowExtensionUpdated(
        IEscrowExtension indexed escrowExtension,
        bool indexed enabled
    );

    event EscrowStateUpdate(
        address indexed sender,
        uint256 indexed escrowId,
        EscrowState escrowState,
        IEscrowExtension escrowExtension
    );
}
