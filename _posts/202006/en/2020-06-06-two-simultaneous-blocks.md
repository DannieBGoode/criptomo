---
layout: post
title:  What happens if two blocks are mined simultaneously
description: What happens if in Bitcoin two blocks are mined simultaneously
banner_image: 202006/btc-coin.webp
rating: 4.5
totalVotes: 11
tags: [bitcoin]
lang: en
---

What happens if two miners mine the same block at the same time? Which of the two blocks will be accepted? Who gets the block reward?

<!--more-->

Firstly, we must clarify that although the two miners have mined an acceptable block, they will almost certainly be different between them. It is not exactly the same block. This is because each miner will have chosen different transactions from the mempool and will have added them in their block in the order in which they have considered appropriate. Then each miner will have solved their own block with the *nonce* found by Proof of Work that gives solution to their block as they have built it.

At this point we find two perfectly valid resolved blocks to be the next addition to the Blockchain and consequently grant the block reward to the responsible miner.

At this time, the decision on which block will be chosen depends on all the other miners in the network.

Both blocks will be spread over the network and the different miners will add the first one they receive to their copy of the blockchain, temporarily accepting that miner as the winner, accepting that they take the reward. Immediately after, everyone will try to solve the next block.

This means that for a short time, there will be two different versions of the blockchain, both equally valid.

Depending on different factors, such as the computational strength of the miners of each version or even luck, soon a next block will be discovered in one of the two versions before the other. When the longest version starts spreading across the network, miners who had accepted the other version will have no choice but to discard the one they were working on since in Proof of Work, **the longest blockchain always wins**, ( understood as the one with the most accumulated computational work).

When the rejected version of the blockchain is discarded, all those transactions included in this block are rejected (unless they have been in one of the following blocks already accepted) and will be returned to the mempool for miners to consider them again.

The discarded block is called an orphan block, and your miner will have the block reward removed from their balance.

{% include image_caption.html imageurl="/images/posts/202006/orphan.webp" title="Inflación" popup=true %}

### Could the non-winning miner have spent his reward before his block reward was taken from him?

All transactions made within the blockchain on the orphan block are discarded, as if they had never existed. So it wouldn't matter if the miner tried to move his reward between wallets, the end result would be that those operations have never existed.

What the miner could do is to try to pay for something in a physical establishment with his BTC, and hopefully have left the store before his block is discarded.

That is why in real world transactions it is considered correct to wait for the 6 confirmations to give the payment as insurance. That is, it waits for there to be 6 accepted blocks on top of the one that contains a transaction to consider that the block will no longer be orphaned.

Considering that each block takes an average of 10 minutes, this is not very practical when using BTC in physical stores, luckily second layer solutions like Lightning Network will allow users to make instant payments with their BTC.

The ten minutes of block time is considered a perfect balance to avoid having too many orphaned blocks and at the same time the network can operate. If the block time were a few seconds, there would be tons of orphan blocks and tons of versions of blockchains at the same time, which would be a bit chaotic and not usable.

