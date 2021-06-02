---
title: What are Schnorr signatures
tags:
- bitcoin
layout: post
description: Benefits of schnorr signatures vs ECDSA signatures
banner_image: 202106/schnorr.webp
rating: 5
TotalVotes: 16
lang: en
---

Schnorr signatures were originally developed by Claus Schnoor, a German cryptographer and mathematician who decided to protect them through a patent for many years, which finally expired in 2008 (months before the Bitcoin whitepaper). Among other benefits, schnorr firms stand out for their simplicity and efficiency.

<!--more-->

## What are digital signatures

A digital signature is a way of mathematically showing that a message is sent by the author of the message.

The magic of digital signatures is that, unlike pencil and paper signatures, they cannot be forged even if you have hundreds of thousands of years at your disposal.

> Bitcoin originally uses the ECDSA signature algorithm.

The signature technology that Satoshi Nakamoto decided to use was ECDSA (Elliptic Curve Digital Signature Algorithm). His decision was probably driven by the fact that they were quite well known, understood, secure and above all open source.

The ECDSA algorithm is precisely what allows a public key to be generated from a private key (and not the other way around), which is one of the key parts of Bitcoin's operation since it allows wallets to exist and a user to send funds to another by means of his digital signature.

In this way, it is totally safe to share a public key with the world, and funds from a foreign wallet can never be spent unless the transaction is signed with the digital signature that only the private key can perform.

## Schnorr

The Schnorr algorithm (SDSS) is nothing more than a different way to make digital signatures, and although it does the same role it also introduces certain advantages which makes many people wonder why Satoshi Nakamoto did not introduce it from the beginning.

### Advantages of Schnorr firms

Schnorr signatures are simpler and more linear than ECDSA. Consequently they are considered safer. In Bitcoin terms this means that the way multisig operations are currently performed can be greatly simplified.

Multisig operations are those transactions that require several people who each sign with their own private key in order to be carried out. It is a mechanism that as more large corporations and other entities add Bitcoin to their coffers, we expect to see used more often.

These type of operations are expensive in terms of fees and do not provide much added privacy. Schnorr could improve both areas by aggregating all the signatures of the signers into a single signature. Thanks to this:
- The transaction is cheaper in terms of commissions.
- It becomes more complicated for an external observer to understand which users have signed the transaction, in fact it will be difficult for them to even know that the transaction corresponds to a multisig, unlike now where all multisig addresses begin with 3.

In addition, the combined signatures make it a lot more difficult for an observer to determine who signed (or didn’t sign) a transaction.

## Conclution

Schnorr signatures are a great improvement that can be introduced via a backward compatible soft fork. Once in place, it can be considered a further step towards future enhancements such as Taproot, atomic swaps and the Lightning Network. 