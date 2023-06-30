- [Escrow-Protocol](#escrow-protocol)
- [Screenshots](#screenshots)
- [About the Project](#about-the-project)
- [Developer Guideline](#developer-guideline)
  - [Sources](#sources)
    - [Design Inspirations](#design-inspirations)

# Escrow-Protocol

[Deployments](https://github.com/0xTender/escrow-protocol/blob/master/contracts-gobi.json)

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

<img width="1436" alt="Screenshot 2023-06-30 at 7 56 59 AM" src="https://github.com/0xTender/escrow-protocol/assets/24915107/c696d23d-3559-4cd8-8d29-e7d557ebc442">
<img width="1436" alt="Screenshot 2023-06-30 at 7 58 34 AM" src="https://github.com/0xTender/escrow-protocol/assets/24915107/635630df-aa1e-4ba1-88c0-91a8c0268d3c">
<img width="961" alt="Screenshot 2023-06-29 at 8 58 47 AM" src="https://github.com/0xTender/escrow-protocol/assets/24915107/005648ea-569a-4d39-bd6b-db044d6a1ca8">
<img width="1436" alt="Screenshot 2023-06-30 at 7 57 34 AM" src="https://github.com/0xTender/escrow-protocol/assets/24915107/5bd0b063-2011-41f6-b046-d09e79a3feae">

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
