---
layout: post
title: What is a mnemonic phrase
description: What is a mnemonic phrase or seed and how safe is it
banner_image: 202101/mnemonic.webp
rating: 5
TotalVotes: 10
tags: [bitcoin]
lang: en
loadsPlugins: true
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