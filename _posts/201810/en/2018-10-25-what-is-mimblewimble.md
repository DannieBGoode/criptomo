---
title: "What is MimbleWimble: Privacy and Scalability in Blockchain"
date: 2018-10-25 00:00:00 Z
last_modified_at: 2026-04-14
tags:
- bitcoin
- altcoins
- litecoin
- privacy
layout: post
description: "What is MimbleWimble, the protocol that improves privacy and scalability in blockchain. Grin, BEAM, and Litecoin MWEB explained in simple terms."
banner_image: 201810/mimblewimble.jpg
lang: en
ref: what-is-mimblewimble
faq:
  - question: "What is MimbleWimble?"
    answer: "MimbleWimble is a blockchain protocol that improves privacy and scalability by removing intermediate transaction data, so that only inputs, outputs, and a digital signature are kept. It was proposed in 2016 by an anonymous author using the pseudonym Tom Elvis Jedusor."
  - question: "How does MimbleWimble improve privacy compared to Bitcoin?"
    answer: "Bitcoin publicly exposes the sender, receiver, and amount of every transaction. MimbleWimble hides all three by combining transactions and removing unnecessary intermediate information, using confidential transactions and the CoinJoin technique."
  - question: "Which cryptocurrencies use MimbleWimble?"
    answer: "Grin and BEAM are native cryptocurrencies built on MimbleWimble. Additionally, Litecoin integrated the protocol in May 2022 through MWEB (MimbleWimble Extension Blocks), enabling optional confidential transactions within its network."
  - question: "Is MimbleWimble secure?"
    answer: "Yes. MimbleWimble uses elliptic curve cryptography and proven confidential transactions. The network mathematically verifies that no coins are created or destroyed illicitly, without needing to expose sensitive transaction data."
  - question: "What is Litecoin MWEB?"
    answer: "MWEB (MimbleWimble Extension Blocks) is a Litecoin upgrade activated in May 2022 that enables optional confidential transactions. Users can move LTC to the MWEB layer to hide amounts and addresses, improving privacy without sacrificing scalability."
  - question: "Can MimbleWimble be integrated into Bitcoin?"
    answer: "MimbleWimble could be incorporated into Bitcoin as a soft fork or as a sidechain, allowing users to move funds via atomic swaps to conduct private transactions. However, Bitcoin has prioritized other upgrades such as Taproot and Schnorr."
---

MimbleWimble is a protocol published by an anonymous user in a Bitcoin developer chat under the name Tom Elvis Jedusor (the French name for Voldemort in the Harry Potter books). MimbleWimble itself is the name of the spell used to seal victims' tongues in J.K. Rowling's books.

<!--more-->

Jedusor left a link to a <a rel="nofollow" href="https://download.wpsoftware.net/bitcoin/wizardry/mimblewimble.txt">whitepaper</a> describing how this protocol could significantly improve both the scalability and privacy of the Bitcoin network.

Satoshi Nakamoto was very candid in the Bitcoin whitepaper when discussing [the privacy limitations of BTC](/es-bitcoin-anonimo/). He explained how three fields would be publicly known for every transaction:

- The sender's public address.
- The amount of coins sent.
- The receiver's public address.

The reason for this is to ensure that a sender never sends more funds than they hold at their address.

MimbleWimble, however, manages to hide all three parameters in a way that is compatible with the Bitcoin network. Unlike other privacy implementations such as [ZCash](/que-es-zcash/) or [Monero](/que-es-monero/) that add obfuscation to transactions, MimbleWimble achieves privacy by eliminating almost all the transaction information that ends up being recorded on the blockchain.

Imagine I make a transaction to Bob, who in turn makes another transaction to Carol, who then sends it to David. The end result is that my original coins are now in David's possession. So why do we keep the additional information? MimbleWimble removes all the intermediate information by combining them into a single authorized transaction.

MimbleWimble transactions are an evolution of two concepts already known in the Bitcoin world:

- **Confidential transactions**, developed by a Bitcoin developer named Gregory Maxwell, allow users to encrypt the number of coins being sent, hiding it from any external observer of the transaction.
- **CoinJoin** (also proposed by Gregory Maxwell) is a mechanism in which different transactions are combined together to obfuscate the amounts sent by different users, so that an observer cannot tell which sender sent exactly what amount to which receiver.

The combination of both concepts produces a block that simply has a list of money inputs, another list of outputs, and a digital signature, which saves considerable space in the 1MB block characteristic of the Bitcoin network because the rest of the information no longer needs to be stored, and consequently more transactions can be included per block, improving the network's scalability at the same time as its privacy.

MimbleWimble can be implemented on the BTC network as a soft fork or a sidechain (like Lightning Network) where users could move their coins from the BTC network to the MimbleWimble network via *atomic swaps* and then conduct private transactions.

Just as Bitcoin is a protocol and Bitcoin Core is one of its implementations, MimbleWimble is a protocol with several implementations: **Grin**, **BEAM**, and since 2022, **Litecoin MWEB**.

## MimbleWimble Implementations

### Grin

Grin was the first implementation of the MimbleWimble protocol to launch its mainnet, on **January 15, 2019**. Unlike most cryptocurrencies, Grin had no ICO, no premine, and no founder reward: it is an entirely community-driven project funded by donations.

Grin uses a linear emission model with no maximum supply cap, similar to the monetary policy of a digital fiat currency. Its early years included scheduled hard forks and changes to the proof-of-work algorithm. Today the project is in a stable maintenance phase, with active contributions from veteran developers such as Yeastplume and Tromp, though with less development activity than in its early days.

### BEAM

BEAM is the other major MimbleWimble implementation, also launched in January 2019. Unlike Grin, BEAM was developed by a Tel Aviv-based company and has a more enterprise-oriented approach. It uses the Lelantus and MimbleWimble protocols combined to offer privacy by default on all transactions.

BEAM has expanded its scope beyond private payments, offering confidential assets, a confidential DEX, private NFTs, and even stablecoins with built-in privacy. Its governance model is transitioning to a DAO (BeamX DAO), with a deflationary emission that decreases periodically.

### Litecoin MWEB

The most significant adoption of MimbleWimble came on **May 19, 2022**, when Litecoin activated **MWEB (MimbleWimble Extension Blocks)**, the biggest upgrade in the cryptocurrency's history. MWEB allows Litecoin users to make confidential transactions optionally: users can move their LTC to the MWEB layer to hide both the amounts and the addresses of transactions.

Adoption has grown steadily since activation:

- Over 90% of Litecoin miners and nodes validate MWEB blocks.
- More than 350,000 LTC are deposited in the MWEB layer.
- Wallets such as Litecoin Core, Cake Wallet (since October 2024), and Tristero (since March 2026) support MWEB transactions on desktop and mobile.

The *cut-through* technique inherited from MimbleWimble also allows data from already-spent transactions to be removed from the chain, reducing the storage space required and improving Litecoin's scalability.

## MimbleWimble and Privacy Coin Regulation

The integration of MWEB into Litecoin also highlighted the tension between privacy and regulation in the crypto market. Following MWEB's activation, the five major South Korean exchanges (Upbit, Bithumb, Coinone, Korbit, and Gopax) delisted Litecoin from their platforms, classifying it as a "dark coin" due to alleged incompatibility with the country's anti-money laundering (AML) regulations.

Binance, for its part, announced that it would not process Litecoin transactions using MWEB functionality, although it maintained conventional LTC trading. On US exchanges like Coinbase, Litecoin continued to operate normally.

This episode reflects a broader debate affecting the entire privacy coin sector: in 2024, Binance delisted Monero (XMR) from its platform, and OKX did the same with XMR, DASH, ZEC, and ZEN. Financial privacy remains one of the most important value propositions of cryptography, but it increasingly clashes with global regulatory frameworks.

## The Future of MimbleWimble

MimbleWimble has proven to be much more than a theoretical proposal published in a Bitcoin chat in 2016. With active implementations in Grin, BEAM, and Litecoin, the protocol has demonstrated its technical viability for improving privacy and scalability in blockchain.

The case of Litecoin MWEB is especially relevant: it has shown that a privacy protocol can be integrated into an established cryptocurrency with an existing user base, albeit not without regulatory challenges. Looking ahead, the evolution of MimbleWimble will depend as much on technical advances as on the ecosystem's ability to navigate the balance between privacy and regulatory compliance.
