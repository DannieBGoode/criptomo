---
title: What can we expect from Ethereum 2.0
date: 2020-09-24 00:00:00 Z
tags:
- ethereum
- altcoins
layout: post
description: "Learn what Ethereum 2.0 brings: Proof of Stake consensus, sharding with 64 parallel chains, validators, and how the upgrade improves speed and energy use."
banner_image: 202009/eth2.webp
lang: en
ref: new-eth2
faq:
  - question: "What is Ethereum 2.0?"
    answer: "Ethereum 2.0 is a complete redesign of the original Ethereum network, built from scratch by the same creators to replace Ethereum 1.0 with a more efficient and scalable system."
  - question: "What consensus algorithm does Ethereum 2.0 use?"
    answer: "Ethereum 2.0 switches from Proof of Work to Proof of Stake, which significantly reduces the energy required to secure the network."
  - question: "What is sharding in Ethereum 2.0?"
    answer: "Sharding allows Ethereum 2.0 to run up to 64 parallel chains simultaneously instead of a single blockchain, all converging on a central Beacon chain, greatly improving network scalability."
  - question: "How much ETH do I need to become an Ethereum 2.0 validator?"
    answer: "A minimum of 32 ETH is required to become a validator. Validators earn rewards of 2–18% per year on their stake but can be penalized or expelled if they validate incorrectly or go offline."
  - question: "Do I need to do anything to migrate my ETH to Ethereum 2.0?"
    answer: "No action is required. In phase 2 of the rollout, all Ether balances from ETH 1.0 will be automatically migrated to ETH 2.0 by copying their state."
---

Ethereum 2.0 is a complete revision of the current Ethereum (1.0) created by the same creators with the intention of replacing Ethereum 1.0 entirely.

<!--more-->

Its final launch is expected sometime between 2021 and 2022, although phase 0 is currently in test net for testing and people are free to participate if they wish.

Instead of making small transformations little by little in Ethereum 1.0 it has been decided to do it all at once starting from scratch to be able to make the changes much more efficiently without being subject to the limitations of the first version or having to think through intermediate phases to accommodate a transition by steps.

Among the main changes that this new version will offer are:

### Proof of Stake consensus algorithm
Ethereum will stop using [Proof of Work](/que-es-proof-of-work) and will change to [Proof of Stake](/proof-of-work-vs-proof-of-stake/) which will mean a energy saving to ensure significant network.

### Sharding
The sharding method will allow you to stop using a single blockchain and instead have up to 64 different parallel chains, which will allow the network to scale better. These 64 chains converge on a central chain called a Beacon chain.

The Beacon chain does not store any transactions or information, but rather acts as the basis of the PoS system, keeping the record of the validators.


### Validators

Validators are those people who stake a minimum of 32 ETH and consequently are allowed to validate blocks in exchange for rewards of 2-18% per year of their stake.

If a validator validates incorrectly (or maliciously) a block will be penalized with up to 100% of its stake. Validators will also be penalized for not being online when it is their turn to validate (so being always online is a validation requirement). As a validator is penalized, if its stake falls below 16 ethers it will be expelled from the validation groups.

The beacon chain chooses the validators randomly using the RANDAO and VDF algorithms. Validators will be chosen randomly from among those and given the opportunity to validate a block. If they validate it correctly they will receive the reward.

## Testnet

Right now we are in phase 0 in which the beacon chain is already launched.

In phase 1 shards and the change from PoW to PoS will be introduced.

In phase 2, all Ethers from ETH1.0 to ETH2.0 will be incorporated by copying their state. Users will not have to take any action for their funds to be transferred.



If this implementation turns out to be successful, it would mean great advances in Proof of Stake and consensus algorithms in general. Recall that Proof of Stake remains untested on a scale as large as that offered by Ethereum, so the entire platform should be considered an experiment with the risks that this entails.