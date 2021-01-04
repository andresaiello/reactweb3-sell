---
author: Andres Aiello
category: functionality
tags:
  - ethereum
  - react
  - solidity
---

# Simple Ethereum React Connenction

A React frontend with an Etherum Smart Contract backend.

### Install

Install dependencies for the React Client.

```
cd client
yarn || npm install
```

Compile the smart contract.

```
cd ethereum
truffle develop
> compile
```

### 2 Run

Run the client. In `./client`:

```
yarn start || npm run start
```

Run a local Etheruem node. Inside `./ethereum`

```
truffle develop
> migrate
```

Inside truffle, you should see a list of private keys, in addition to a localhost address. This should default to port 9546.

To interact with the smart contract, take that address, `http://localhost:9546`, and add it to Metamask via Networks as a custom RPC.

Within truffle, a contract address for the `SimpleStorage` contract should appear after running `migrate`. Enter that contract address as the contract address within `./client/src/App.js`.
