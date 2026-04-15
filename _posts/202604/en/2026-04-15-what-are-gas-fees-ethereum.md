---
title: "What Are Ethereum Gas Fees and How to Reduce Them"
tags:
  - ethereum
  - altcoins
layout: post
description: "Learn what Ethereum gas fees are, why they exist, how they are calculated, and practical tips to pay less on every transaction."
banner_image: 202604/gas-fees-ethereum.webp
banner_image_alt: "Visual explanation of Ethereum gas fees"
lang: en
ref: gas-fees-ethereum
faq:
  - question: "What are Ethereum gas fees?"
    answer: "Gas fees are the transaction costs users pay to execute operations or interact with smart contracts on the Ethereum network. They are paid in ETH and compensate validators who process and verify transactions."
  - question: "Why are Ethereum gas fees so expensive?"
    answer: "Gas fees increase when there is high demand on the network. Ethereum has limited capacity per block, so when many users want to transact simultaneously, they compete by offering higher fees so validators prioritise their operations."
  - question: "How can I reduce Ethereum gas fees?"
    answer: "You can reduce them by transacting during off-peak hours (nights and weekends UTC), using Layer 2 networks like Arbitrum or Optimism, manually adjusting the gas limit in your wallet, or batching multiple operations into a single transaction."
  - question: "How much do Ethereum gas fees cost in 2026?"
    answer: "In 2026, following the Dencun and Pectra upgrades, gas fees on the Ethereum mainnet range between 1 and 20 gwei for standard transactions. On Layer 2 networks, fees are typically below $0.01."
  - question: "What is gwei and how does it relate to gas fees?"
    answer: "Gwei is a unit of Ether (1 gwei = 0.000000001 ETH). Gas fees are expressed in gwei per unit of gas. A simple ETH transfer uses 21,000 gas units, so at 10 gwei the cost would be 0.00021 ETH."
---

If you have ever sent Ethereum or interacted with a DeFi application, you will have noticed that every operation has a cost: **gas fees**. Understanding what they are and how they work is essential to avoid overpaying and to use the network efficiently.

<!--more-->

## What is gas in Ethereum

In Ethereum, **gas** is the unit that measures the computational effort required to execute an operation on the network. Every action — from sending ETH to another address to swapping tokens on [Uniswap](/what-is-uniswap/) or minting an NFT — requires a specific amount of gas.

Gas is not a cryptocurrency itself but an internal measure. What you actually pay is the **gas price**, expressed in **gwei** (a fraction of ETH: 1 gwei = 0.000000001 ETH).

The basic formula is:

> **Transaction cost = Gas units consumed × Price per gas unit**

For example, a simple ETH transfer uses 21,000 gas units. If the gas price is 10 gwei, the cost would be:

- 21,000 × 10 gwei = 210,000 gwei = 0.00021 ETH

## How gas fees work since EIP-1559

Since August 2021, with the [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) upgrade, Ethereum radically changed its fee model. Now every transaction has two components:

### Base fee

This is the minimum price per gas unit the network requires to include your transaction in a block. It adjusts automatically based on congestion: when blocks are full it rises, when they are empty it falls. The **base fee is burned** — it is destroyed and does not go to any validator.

### Priority tip

This is an optional additional payment that goes directly to validators. The higher your tip, the more likely your transaction will be processed quickly. During high congestion, a more generous tip makes the difference.

The complete formula is:

> **Total cost = Gas units × (Base fee + Priority tip)**

## Why gas fees vary so much

Ethereum gas fees can range from pennies to tens of dollars for the same operation. The main factors are:

### Network congestion

Ethereum processes a limited number of transactions per block. When demand is high — for example, during a popular token launch, a massive airdrop, or a sharp market crash — users compete for block space by offering higher fees.

### Operation complexity

Not all transactions cost the same:

| Operation type | Approximate gas | Typical cost (10 gwei) |
|---|---|---|
| Send ETH | 21,000 | 0.00021 ETH |
| Send an ERC-20 token | 65,000 | 0.00065 ETH |
| Uniswap swap | 150,000 | 0.0015 ETH |
| Mint an NFT | 200,000+ | 0.002+ ETH |
| Complex DeFi interaction | 300,000+ | 0.003+ ETH |

The more complex the smart contract logic, the more gas it consumes.

### ETH price

Although gas fees are measured in gwei, the real cost in dollars depends on the price of ETH. At 10 gwei, a transfer costs 0.00021 ETH — but that is ~$0.37 with ETH at $1,800 or ~$0.53 with ETH at $2,500.

## How to save on gas fees

### 1. Transact during off-peak hours

The Ethereum network has predictable activity patterns. The least congested times tend to be:
- **UTC nights** (early morning in Europe, late evening in the Americas)
- **Weekends**, especially Sundays

You can check the current gas price in real time on sites like [Etherscan Gas Tracker](https://etherscan.io/gastracker).

### 2. Use Layer 2 networks

**Layer 2 networks** process transactions off the Ethereum mainnet and then settle the results back onto it. The most popular ones are:

- **Arbitrum** — the most widely used L2, with fees below $0.01
- **Optimism** — similar to Arbitrum, with a complete DeFi ecosystem
- **Base** — built by Coinbase, very cheap and growing fast
- **zkSync** — uses zero-knowledge proofs for greater security

Since the **Dencun** upgrade (March 2024) and later **Pectra** (2025), L2 gas fees dropped dramatically thanks to data "blobs", which allow publishing data on Ethereum far more cheaply.

### 3. Adjust gas manually

Most wallets like [MetaMask](/what-is-metamask/) allow you to adjust gas manually. If you are not in a rush, you can:
- Lower the **priority tip** to the minimum
- Set a **max fee** you are willing to pay
- The transaction will execute when the base fee drops to your limit

### 4. Batch operations

Some DeFi protocols allow grouping multiple actions into a single transaction (batching). For example, instead of making three approvals and three swaps separately, aggregators like [1inch](https://1inch.io/) combine everything into one transaction.

### 5. Use optimised tokens and contracts

Modern smart contracts are optimised to consume less gas. Newer [ERC-20](/what-is-erc20-token/) tokens tend to be more efficient than first-generation ones.

## Gas fees on other blockchains

It is helpful to compare Ethereum gas fees with those of other networks:

| Blockchain | Average transaction cost | Speed |
|---|---|---|
| Ethereum (L1) | $0.50–5.00 | ~12 seconds |
| Arbitrum / Optimism | < $0.01 | ~1 second |
| Solana | < $0.01 | ~0.4 seconds |
| Polygon PoS | < $0.01 | ~2 seconds |
| Bitcoin | $0.50–3.00 | ~10 minutes |

Ethereum's advantage over cheaper alternatives is its **security and decentralisation**. Layer 2 networks offer the best of both worlds: low fees with security inherited from Ethereum.

## The future of gas fees

Ethereum continues to actively work on reducing fees:

- **Danksharding** (future) will massively expand data capacity, further reducing L2 costs
- **Account abstraction** (ERC-4337) will allow applications to pay gas on behalf of their users, removing the entry barrier
- The general trend is for user activity to migrate to **Layer 2 networks**, leaving Layer 1 as a secure settlement layer

## Conclusion

Gas fees are the cost of using the most decentralised and secure network in the crypto ecosystem. Although they can seem high during congestion, tools like Layer 2 networks, timing your transactions, and manual gas adjustment let you reduce them significantly. With every upgrade, Ethereum moves towards a model where fees are no longer a barrier for the average user.
