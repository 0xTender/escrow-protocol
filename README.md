Demo Link: https://escrow.0xtender.com/

For Gobi testnet use:

```console
git checkout develop-chain-gobi
```

And this .env:
```env
DATABASE_URL=mysql://root:password@localhost:3306/escrow-gobi
MNEMONIC=<MNEMONIC>
RPC_1663_CHAIN="https://gobi-testnet.horizenlabs.io/ethv1"
NEXT_PUBLIC_CHAIN_ID=1663
```

## Table of Contents

- [Escrow-Protocol](#escrow-protocol)
- [Screenshots](#screenshots)
- [About the Project](#about-the-project)
- [Developer Guideline](#developer-guideline)
  - [Sources](#sources)
    - [Design Inspirations](#design-inspirations)

# Escrow-Protocol

[Deployments](https://github.com/0xTender/escrow-protocol/blob/master/contracts-gobi.json)
Also checkout [on chain contracts](https://github.com/0xTender/escrow-protocol/tree/develop-chain-gobi)

The project uses a plugin system based escrow contract that allows high scalability with escrow protocol.

The base escrow contract accepts addresses that act as extensions on top on it so as to keep the interactions simple.

The contracts have been tested end-to-end.

The project utilizes something called [0xtender-heisenberg](https://github.com/0xTender/evm-utilities).

`pnpm i @0xtender/heisenberg-cli`

The project uses pnpm workspace so please install pnpm with `npm i -g pnpm`

There are shell scripts to speed up development.

Run: `reset.sh` followed by `init.sh`

Check [Developer Guideline](#developer-guideline) for complete steps.

Then open two separate terminals and run:

```console
pnpm run start:worker
```

```console
pnpm run dev
```

# Screenshots
<img width="1436" alt="0" src="./docs/0.png">
<img width="1436" alt="0" src="./docs/1.png">
<img width="1436" alt="0" src="./docs/2.png">
<img width="1436" alt="0" src="./docs/3.png">


# About the Project

The highly scalable escrow contract is designed to facilitate secure and efficient exchanges of ERC20 and ERC721 tokens between users on the Ethereum blockchain. The contract provides a trusted intermediary service, ensuring that transactions are executed reliably and transparently.

Key features of the escrow contract include:

Flexibility: The contract supports the exchange of both ERC20 and ERC721 tokens, allowing users to trade fungible (ERC20) and non-fungible (ERC721) assets with ease. This enables a wide range of transactions, from simple token transfers to complex asset swaps.

Scalability: The contract is optimized for scalability, allowing for a high volume of concurrent transactions. This is achieved through efficient transaction management and gas optimization techniques, ensuring that the contract can handle a large number of users and transactions without performance degradation.

Transparency: The contract promotes transparency by providing a public audit trail of all transactions. Users can easily verify the transaction history and track the progress of their exchanges. This fosters trust among participants and mitigates the risk of fraud or disputes.

Customizability: The contract offers customization options to accommodate various transaction requirements. Users can specify their own terms and conditions, including the duration of the escrow, dispute resolution mechanisms, or any additional steps necessary for completing the exchange. This allows for flexibility and adaptability to different trading scenarios.

In summary, the highly scalable escrow contract provides a reliable and secure solution for exchanging ERC20 and ERC721 tokens on the Ethereum blockchain. Its features, including flexibility, scalability, security, transparency, automated execution, and customizability, make it suitable for a wide range of token-based transactions while ensuring the integrity and safety of participants' assets.

# Developer Guideline

Steps to run

`pnpm i`

Update the env:

```
cp .env.example .env
```

Initialize:

```
./init.sh
```

Start worker:

```
pnpm run start:worker
```

Start dev

```
pnpm run dev
```

You can reset your local deployments with (destructive action):

./reset.sh

## Sources

### Design Inspirations

Loosely based on:

- https://dribbble.com/shots/18261148-Escrow-mobile-design-dashboard-product-design
- https://dribbble.com/shots/18524987-Escrow-Mobile-Dashboard-Dark-mode
