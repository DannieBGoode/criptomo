---
title: "What Is an ERC-20 Token: The Ethereum Standard Explained"
date: 2018-05-31 00:00:00 Z
last_modified_at: 2026-04-14 00:00:00 Z
tags:
- altcoins
- ethereum
- token
layout: post
description: "Discover what an ERC-20 token is, how this Ethereum standard works, the top ERC-20 tokens in 2026, and how it differs from ERC-721 and ERC-1155."
banner_image: 201805/erc20.png
lang: en
ref: token-erc20
faq:
  - question: "What is an ERC-20 token?"
    answer: "An ERC-20 token is a digital asset created on the Ethereum blockchain that follows a standard set of rules (the ERC-20 standard). This ensures all tokens are compatible with each other, with wallets, and with exchanges, making integration into the ecosystem seamless."
  - question: "What are the most important ERC-20 tokens?"
    answer: "The most notable ERC-20 tokens in 2026 include stablecoins like USDT and USDC, DeFi tokens like UNI (Uniswap) and LINK (Chainlink), and bridge tokens like WBTC (Wrapped Bitcoin). In total, hundreds of thousands of ERC-20 contracts have been deployed on Ethereum."
  - question: "What is the difference between ERC-20 and ERC-721?"
    answer: "ERC-20 tokens are fungible: every unit is identical and interchangeable, like money. ERC-721 tokens (NFTs) are non-fungible: each one is unique and irreplaceable, ideal for digital art or collectibles. There is also the ERC-1155 standard, which combines both types in a single contract."
  - question: "Is an ERC-20 token the same as a cryptocurrency?"
    answer: "Not exactly. A cryptocurrency like Bitcoin or Ether has its own blockchain. An ERC-20 token is built on top of the Ethereum blockchain and depends on it to function. Transaction fees for ERC-20 tokens are paid in ETH."
  - question: "What are ERC-20 tokens used for in DeFi?"
    answer: "In DeFi, ERC-20 tokens are used as stablecoins for payments and savings, as governance tokens for voting in protocols, as liquidity tokens in decentralized exchanges, and as collateral for loans, among other uses."
---

An ERC-20 token is a digital asset created on the [Ethereum blockchain](/en/what-is-ethereum/) that follows a common set of rules. This standard, originally proposed by Fabian Vogelsteller and Vitalik Buterin in 2015, has become a fundamental pillar of the crypto ecosystem: from [stablecoins](/en/what-are-stablecoins/) to [DeFi](/what-is-defi/) governance tokens, the vast majority operate under ERC-20.

<!--more-->

## What Does ERC-20 Mean

**ERC** stands for *Ethereum Request for Comments* and **20** is the proposal number assigned to it. In essence, the ERC-20 standard defines a set of functions that every token must implement so that the Ethereum ecosystem can interact with it in a predictable way: transferring tokens, checking balances, approving third-party spending, and so on.

In a previous article we discussed [the differences between tokens and cryptocurrencies](/tokens-vs-altcoins/). Any platform that supports the creation and execution of [smart contracts](/en/what-is-a-smart-contract/) can host tokens, but the vast majority are built on Ethereum under the ERC-20 standard because it provides immediate compatibility with [wallets](/en/crypto-wallets/), exchanges, and DeFi protocols.

According to <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a>, hundreds of thousands of ERC-20 contracts have been deployed on the Ethereum network, although only a few thousand have significant activity and market value.

## How an ERC-20 Token Works

The standard defines six mandatory functions and two events that enable interaction between tokens, [smart contracts](/en/what-is-a-smart-contract/), and users:

- **totalSupply**: indicates the total amount of tokens in circulation.
- **balanceOf**: returns the balance of a specific address.
- **transfer**: allows sending tokens from one address to another.
- **transferFrom**: allows an authorized third party to move tokens on behalf of the owner.
- **approve**: authorizes an address to spend a certain amount of tokens.
- **allowance**: queries how many tokens an authorized third party can spend.

It is important not to confuse these tokens with **Ether (ETH)**, the native currency of the Ethereum network. When a user transfers ERC-20 tokens or a smart contract performs operations, gas fees are always paid in ETH.

## Advantages of Being an ERC-20 Token

The fact that a token follows the ERC-20 standard brings several practical advantages:

- **Wallet compatibility**: it can be stored in any [wallet that supports Ethereum](/en/crypto-wallets/), such as MetaMask, Ledger, or Trezor.
- **Easy exchange listing**: exchanges can integrate any ERC-20 token in a standardized way.
- **DeFi interoperability**: the token can be used directly in protocols like [Uniswap](/what-is-uniswap/), Aave, Compound, and others without special adaptations.
- **Transparency**: all transactions are recorded on the Ethereum blockchain and are publicly verifiable.

## The Most Important ERC-20 Tokens in 2026

The ERC-20 ecosystem has grown enormously since its early days. Here are some of the most notable tokens by category:

### Stablecoins
- **[USDT (Tether)](/en/what-is-usdt-tether/)**: the most widely used stablecoin in the world, pegged 1:1 to the US dollar. It is essential for trading and international transfers.
- **[USDC](/en/what-is-usdc/)**: issued by Circle with monthly audits, it is considered the most transparent and regulated stablecoin on the market.
- **DAI**: a decentralized stablecoin generated through collateral in the MakerDAO protocol.

### DeFi and Governance Tokens
- **UNI ([Uniswap](/what-is-uniswap/))**: governance token of the largest decentralized exchange on Ethereum.
- **LINK (Chainlink)**: provides reliable external data (oracles) to smart contracts, essential for the operation of [DeFi](/what-is-defi/).
- **AAVE**: token of the decentralized lending protocol of the same name.

### Bridge and Utility Tokens
- **WBTC (Wrapped Bitcoin)**: an ERC-20 representation of Bitcoin that allows BTC to be used within the Ethereum and DeFi ecosystem.
- **MATIC (Polygon)**: token of Ethereum's most popular Layer 2 scaling solution.

## ERC-20 vs Other Token Standards

Ethereum does not only have the ERC-20 standard. Over the years, other standards have been developed to cover different needs:

| Standard | Type | Main Use | Example |
|----------|------|----------|---------|
| **ERC-20** | Fungible | Cryptocurrencies, stablecoins, DeFi tokens | USDT, UNI, LINK |
| **[ERC-721](/en/what-are-nft/)** | Non-fungible (NFT) | Digital art, collectibles, unique assets | CryptoPunks, Bored Apes |
| **ERC-1155** | Multi-token | Gaming, mixed collections, metaverse | Blockchain game items |

- **ERC-20 tokens are fungible**: every unit is identical to another, just like one euro bill is interchangeable with another.
- **[ERC-721 tokens are non-fungible (NFTs)](/en/what-are-nft/)**: each token is unique and irreplaceable, ideal for representing digital objects with their own identity.
- **ERC-1155 tokens are multi-type**: they allow managing fungible and non-fungible tokens within the same contract, saving gas costs. They are especially popular in blockchain games.

## The Role of ERC-20 in DeFi

The Ethereum network dominates the [decentralized finance (DeFi)](/what-is-defi/) ecosystem, and ERC-20 tokens are its fuel. Virtually all DeFi protocols -- from decentralized exchanges to lending platforms -- operate with ERC-20 tokens:

- **Trading**: on decentralized exchanges like [Uniswap](/what-is-uniswap/), users swap ERC-20 tokens without intermediaries.
- **Lending and savings**: protocols like Aave and Compound allow lending and borrowing ERC-20 tokens while earning interest.
- **Liquidity provision**: users can deposit ERC-20 tokens into liquidity pools and receive fees in return.
- **[Stablecoins](/en/what-are-stablecoins/)**: ERC-20 stablecoins like [USDT](/en/what-is-usdt-tether/) and [USDC](/en/what-is-usdc/) are the backbone of global crypto trading.

## Security Considerations

Although the ERC-20 standard is robust and has been battle-tested for years, there are some risks to keep in mind:

- **Fraudulent tokens**: anyone can create an ERC-20 token, so many tokens exist with no real value or are designed as scams. Always verify the contract address on <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a> before interacting with an unknown token.
- **Infinite approvals**: some DeFi protocols request approval to spend an unlimited amount of your tokens. It is advisable to review and revoke approvals periodically.
- **Smart contract vulnerabilities**: bugs in the token's contract code can be exploited. Reputable projects undergo professional security audits.

## Conclusion

The ERC-20 standard, along with the [Ethereum](/en/what-is-ethereum/) network itself, is one of the fundamental pillars of the crypto ecosystem. Since its creation in 2015, it has enabled the emergence of [stablecoins](/en/what-are-stablecoins/), governance tokens, DeFi assets, and much more. Understanding how it works is essential for anyone looking to participate in the world of cryptocurrencies and decentralized finance.

On the other hand, certain cryptocurrencies that innovate deeply on the underlying technology cannot be built on Ethereum, so they have their own blockchain with different rules. Some of these include [Cardano](/en/what-is-cardano/) or [IOTA](/que-es-iota/).
