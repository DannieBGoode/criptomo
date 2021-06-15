---
title: What are Rollups
tags:
- ethereum
layout: post
description: What is a Rollup
banner_image: 202106/rollup.webp
rating: 5
Total votes: 3
lang: en
ref: rollups
---

There are two ways to scale a blockchain ecosystem. In the first place, the blockchain can be scaled giving it a greater capacity, that is, making sure that more transactions can fit per block.
This has been achieved in the past through solutions such as SEGWIT for BTC, SHARDING for Ethereum, or simply increasing the block size, as Bitcoin Cash (BCH) did.

<!--more-->

The problem is that solutions like SEGWIT are very limited and cannot achieve infinite scaling, and solutions such as how to make the blocks larger have other risks: Larger blocks are more complicated to verify and store, which causes the network to become more centralized as dictated by the Scalability Trilemma.

The second way to improve the scalability of a blockchain is through second layer solutions: Instead of putting all the information in the first layer (the blockchain, on-chain), part of the information and computing work is moved to chains alternatives (off-chain) that are synchronized with the main chain. This is done through a smart contract in the blockchain that is only dedicated to receiving income and withdrawals and to verify that everything that happens outside the chain complies with the agreed rules. Verifying what happens off-chain is drastically cheaper than doing all the operations that happen off-chain on the main blockchain.

Today's top three second layer scaling techniques are:

- Status channels
- Plasma networks
- The rollups

Each of them has its strengths and weaknesses. This article will review the Rollups:

## Rollups

Plasma networks and state channels are considered "integer" second layer schemes in the sense that they move both information and computation to secondary chains off the chain.

Rollups instead move computation and storage from the off-chain state (to the secondary chain) and leave some information on the main chain. To improve efficiency, compression techniques are used to replace the information left in the main chain with computation whenever possible. The result in a system still limited in terms of scalability but with substantial improvements, for example in Ethereum for an ERC20 token, a transfer could go from costing 45,000 gas to 300 gas.

What remains on the main blockchain is some general and verification information, and this allows other people to use this information:

- Detect if there has been fraud in the rollup.
- Make withdrawals.
- Make deposits.

As this information exists in the main blockchain, anyone can verify that a rollup has worked correctly and detect possible fraud and consequently make them more secure.

In addition, this will allow EVM (and consequently smart contracts) to be executed within the rollups in the second layer and greatly improving the scalability of the network.

There are two types of Rollups:

- **Optimistic Rollups**: They use proof of fraud: it keeps all the history of hashes which allows to verify each one of the processes. If someone finds an inconsistency, they can publish it on the chain and once it is verified by the contract, the associated transactions will be reversed.
- **ZK-Rollups**: They use Test validity: Each group of processes includes cryptographic tests of the zk-snark type that show that each process is correct.

{: .table.table-striped.table-bordered.table-hover.table-condensed.table-collapsable}
| | Optimistic accumulators | Zk Rollups |
|: --------------------------------------------:|:----------------------------------------------:|:----------------------:|
| **Gas ​​cost per batch** | ~ 40,000 (for a simple transaction) | ~ 500,000 (verification of a ZK-SNARK is expensive) |
| **Withdrawal period** | ~ 1 week (to allow time for fraud detection) | Very fast.
| **Complexity of technology** | Low | High (ZK-SNARKs are very complicated) |
| **Generalization** | Easy | More difficult |
| **Cost of gas per on-chain transaction** | High (extra information must be published to allow fraud checks) | Low
| **Computing costs in the secondary chain** | Low (although other nodes will have to redo the computation to verify it) | High (a ZK-SNARK can be miles of times more expensive than the computation itself) |


In general, due to the computation costs of each type, it seems that optimistic rollups could be used for smart contract computations through EVM while ZK rollups could be used for simple payments, although this could change if the ZK-Snarks technology improves over time.

## Conclusions

Rollups are a powerful tool for second layer scaling, and it is expected that they will become a fundamental part of Ethereum scaling.
The reason why they have received so much hype from the community is because, unlike other second layer scaling techniques, they support EVM code, which allows second layer smart contracts.


<a href="https://vitalik.ca/general/2021/01/05/rollup.html" rel="nofollow">Source</a> 