---
layout: post
published: true
netlifycms: true
title: What is Segwit
date: 2022-Dec-14
description: Learn what SegWit is, how it fixed transaction malleability and Bitcoin's block size limit, and why it was a key upgrade enabling the Lightning Network.
tags:
  - bitcoin
  - blockchain
banner_image: /images/posts/image_2022-12-14_154035529.png
rating: 5
TotalVotes: 13
popular: false
ref: segwit
lang: en
faq:
  - question: "What is SegWit in Bitcoin?"
    answer: "SegWit (Segregated Witness) is a Bitcoin protocol upgrade proposed in 2015 and activated in August 2017. It separates transaction signatures from transaction data to fix transaction malleability and increase effective block capacity."
  - question: "What problem does SegWit solve?"
    answer: "SegWit fixes two main issues: transaction malleability (where a third party could alter a transaction ID before confirmation) and the 1 MB block size limit, which caused congestion and high fees."
  - question: "How does SegWit reduce Bitcoin transaction fees?"
    answer: "By separating the witness data from transactions, SegWit allows more transactions to fit in each block. This reduces competition for block space, which in turn lowers transaction fees for users."
  - question: "What is the Lightning Network and how does SegWit enable it?"
    answer: "The Lightning Network is a second-layer payment solution that enables fast, cheap Bitcoin transactions off-chain. SegWit's fix for transaction malleability was a prerequisite for the Lightning Network to function correctly."
  - question: "When was SegWit activated on Bitcoin?"
    answer: "SegWit was activated on the Bitcoin network in August 2017 and has since been adopted by a significant number of users and businesses."
---
Segregated Witness (segwit) is a protocol upgrade that was first proposed in 2015 by Bitcoin Core developer Pieter Wuille. It was designed to address a number of issues with the Bitcoin blockchain, including transaction malleability and block size limitations.

Transaction malleability refers to the ability of a third party to change the transaction ID of a transaction before it is added to the blockchain. This can cause confusion and make it difficult for users to know whether a transaction has been confirmed or not. Segwit addresses this issue by separating the transaction signature (witness) from the transaction data, allowing the signature to be modified without affecting the transaction ID.

The block size limitation, on the other hand, refers to the maximum size of a block that can be added to the Bitcoin blockchain. Currently, the block size is limited to 1 MB, which means that only a limited number of transactions can be processed per block. This can lead to longer transaction times and higher fees, as users compete for space in the limited number of blocks. Segwit addresses this issue by allowing for more transactions to be processed per block, increasing the effective block size and improving the scalability of the Bitcoin network.

Segwit was implemented on the Bitcoin network in August 2017, and it has since been adopted by a significant number of users and businesses. One of the key benefits of segwit is that it allows for the creation of second-layer solutions, such as [state channels](https://criptomo.com/what-are-state-channels/) solutions like the [Lightning Network](https://criptomo.com/what-is-the-lightning-network/), which can further improve the scalability and speed of Bitcoin transactions.

In addition to its technical benefits, segwit has also been credited with helping to **lower transaction fees** on the Bitcoin network. By increasing the effective block size and allowing for more transactions to be processed per block, segwit has reduced competition for block space, leading to lower fees for users.

Overall, segwit has been a significant improvement for the Bitcoin network, addressing several important issues and laying the groundwork for further innovations and improvements. While it is not a perfect solution, and there are still challenges facing the Bitcoin network, segwit has helped to make the network more efficient and scalable, and it has laid the foundation for further progress in the future.