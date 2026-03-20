---
title: What is a mnemonic phrase
date: 2021-01-11 00:00:00 Z
tags:
- bitcoin
layout: post
description: Learn what a mnemonic phrase is, how this 12-24 word seed secures your crypto wallet, and why it is mathematically impossible to guess. Complete guide.
banner_image: 202101/mnemonic.webp
lang: en
ref: what-mnemonic
faq:
  - question: "What is a mnemonic phrase?"
    answer: "A mnemonic phrase (also called a seed phrase) is a set of 12 to 24 words that acts as a backup for a non-custodial cryptocurrency wallet. Anyone who has the phrase can fully restore the wallet and access all its funds."
  - question: "How many words are in a mnemonic phrase?"
    answer: "A mnemonic phrase consists of 12 to 24 words chosen from a standardized English dictionary of 2,048 words, as defined in the BIP39 specification."
  - question: "Is it safe to store crypto in a custodial wallet?"
    answer: "Custodial wallets carry a higher risk because a third party holds your private keys, meaning the platform could be hacked or shut down and you could lose access to your funds, as happened with Mt.Gox."
  - question: "Can someone guess my mnemonic phrase?"
    answer: "It is mathematically impossible in practice. The number of possible combinations is 2,048 to the power of 24, equivalent to 2^264, which is comparable to picking a specific atom from the entire observable universe."
  - question: "What standard do mnemonic phrases follow?"
    answer: "Mnemonic phrases follow the BIP39 (Bitcoin Improvement Proposal 39) standard, originally proposed by Satoshi Labs, which is used across the vast majority of non-custodial cryptocurrency wallets."
---

To understand the concept of a mnemonic phrase or seed, we must first understand the difference between a custodial and a non-custodial wallet.

<!--more-->

A custodial wallet is one in which a company is responsible for storing our private keys for us. This means that we do not actually own our cryptocurrencies, but rather that a company promises to return our cryptocurrencies to us when we ask for them, exactly like a bank that keeps our money promises to return our money when we require it.

In the world of cryptocurrencies, this has a high risk, since the platform in question could be hacked (as it happened with Mt.Gox) or disappear from one day to the next.

A non-custodial wallet, on the other hand, would be one in which the user is the only owner of their keys, and losing them could mean the loss of their cryptocurrencies in an irreversible way.

## Mnemonic Phrases

When opening a non-custodial wallet for the first time, the user will be generated a mnemonic phrase (or seed) that has a form similar to this:

> monitor umbrella replace fold autumn top until six glad lazy vocal buyer evolve coconut near brisk broccoli symbol nation debris blast undo prepare mom

It is a set of 12-24 words in English that act as a backup for the wallet.

Anyone who owns the phrase will be able to restore the wallet in full on any computer or mobile and access all its funds. That is why it is very important that we keep our seed safely, but it is also the reason why a person could lose all their belongings and travel to the other side of the world, but as long as they remember the phrase they can get their cryptocurrencies again.

The mnemonic phrase follows the pattern specified in the BIP39 (Bitcoin Improval Proposal-39) rule originally suggested by Satoshi Labs.

## Safety of a mnemonic phrase

The 24 words are obtained from an English dictionary with 2048 words.

For example the first word in the list is `Above` and the last word is` Zebra`. In between we have 2046 other words.

If we consider that each word is a number, the mnemonic phrase could be encoded as 24 consecutive numbers (between 1 and 2048).

In this way we have 2048 options for each of the 24 positions, which implies that the probability that someone hits the bakcup phrase is 2048<sup>24</sup>, or in other words 2<sup>264</sup> or 2.9642775 * 10<sup>79</sup>.

This would make hitting is equivalent to <a href="https://www.universetoday.com/36302/atoms-in-the-universe/#:~:text=At%20this%20level%2C%20it%20is,hundred%20thousand%20quadrillion%20vigintillion%20atoms." rel="nofollow"> hitting an atom between the observable universe </a>. Today, without the existence of quantum computers, we can say that BIP39 is totally safe.

If one day the BIP39 protocol were to be compromised and all wallets were vulnerable, the community could always opt for a HARD FORK that would make the wallets quantum computing proof, although we are still a long way from having to face that situation, so that risking a hard fork that could potentially divide the community does not seem necessary.