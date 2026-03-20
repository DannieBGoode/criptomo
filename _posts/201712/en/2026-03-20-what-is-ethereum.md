---
layout: post
published: true
title: What Is Ethereum
date: 2026-03-20 00:00:00 Z
description: Discover what Ethereum is, how smart contracts and DApps work, who created it, and why it remains the most important smart contract platform in the crypto market.
tags:
  - altcoins
banner_image: 201712/ethereum.jpg
lang: en
ref: what-is-ethereum
faq:
  - question: "What is Ethereum and how does it differ from Bitcoin?"
    answer: "Ethereum is a blockchain platform that enables the creation of decentralised applications and smart contracts, while Bitcoin is designed primarily as digital currency. Ethereum uses Ether as its native currency to pay for the execution of those applications."
  - question: "What is a smart contract on Ethereum?"
    answer: "A smart contract is code that executes automatically on the blockchain when predefined conditions are met, without the need for intermediaries."
  - question: "Who created Ethereum?"
    answer: "Ethereum was proposed by Vitalik Buterin in 2013 and officially launched in 2015 after an initial fundraise of more than 18 million dollars."
  - question: "What is gas in Ethereum?"
    answer: "Gas is the unit that measures the computational cost of executing operations on the Ethereum network. Every transaction or smart contract requires paying a fee in gas, denominated in gwei."
---

[Ethereum](https://www.ethereum.org/) is an open-source platform built on blockchain technology that allows developers to build and deploy their own decentralised applications, which will run exactly as programmed without the possibility of censorship, interference, or shutdown.

<!--more-->

On the Ethereum blockchain, instead of mining bitcoin, miners mine **Ether**, which — in addition to being exchangeable between users like BTC — is also used as the payment currency for executing decentralised applications hosted on the blockchain.

> Bitcoin is primarily a currency, which is one particular use of a blockchain. However, it is not the only application, just as email is only one application of the Internet. <cite>Dr Gavin Wood, Ethereum Co-Founder</cite>

#### Team

The team is led by Vitalik Buterin, who proposed the idea of Ethereum in 2013, although the network was not launched until 2015 after auctioning Ether to fund the project for a value of more than 18 million dollars. The Ethereum Foundation is based in Switzerland in the city of Zug, considered by many to be the Silicon Valley of cryptocurrencies.

{% include image_caption.html imageurl="/images/posts/201712/vitalik.jpg" title="Vitalik Buterin" caption="Vitalik Buterin, creator of Ethereum" popup=true %}

#### Smart Contracts

A smart contract is a term that describes computer code that self-executes when specific conditions are met.

Although all blockchains have the ability to process code, they are quite limited. Ethereum's main innovation, the Ethereum Virtual Machine (EVM), is a program that allows other external programs to run on top of it. In this way, instead of having to build a new blockchain for each application, Ethereum allows thousands of applications to be developed on the same blockchain in different programming languages.

A dedicated programming language called Solidity has been created for writing programs on Ethereum. It closely resembles the well-known JavaScript language, with the idea of making the learning process for new developers as fast as possible.

#### DAOs and DApps

Ethereum allows developers to build decentralised applications (DApps) as well as Decentralised Autonomous Organisations (DAOs) — essentially entire organisations that are fully decentralised, with no single leader, created from the union of many DApps, eliminating the need for real people and centralised power.

A DAO is owned by any individual who holds tokens in that organisation, much like shares or equity stakes, except that the tokens grant their owner voting rights over the DAO's decisions.

Because DApps run on the blockchain, they share all of its properties:

* **Immutability**: A third party cannot change the information.
* **Corruption/tamper-proof**: It is not possible to censor or interfere with these applications.
* **Security**: With no single central point, and built on cryptographic principles, the applications are well protected against hacker attacks or fraudulent activity.
* **Always online**: Since a blockchain cannot be switched off, the application will always be online.

Although all of this might sound too good to be true, DApps have one very significant problem: humans. A DApp can only be as perfect as the code written by the human who created it. Because DApps, once deployed to the blockchain, cannot easily be modified, a bug in the code could be fatal for a DAO.

##### The DAO

This was precisely the case with the first DAO ever built, simply named The DAO. It was a Kickstarter-style crowdfunding platform where investors could collaborate to fund projects, and depending on whether the required amount was reached, the funds would move automatically — either back to investors or to the owners of the funded project. It was a fully autonomous platform capable of moving large sums of money and funding projects without the intervention of a single person working on behalf of the organisation, and it had raised 160 million dollars at the time. Unfortunately, a hacker identified a flaw in The DAO's code that allowed them to slowly drain funds from the organisation.

This raised a major problem for the Ethereum community, and three possible alternatives were discussed:

1. **Do nothing** — if the code is deployed to the blockchain, it is considered law, not a bug.
2. **Implement a soft fork** that would cause the DAO's funds to be lost forever — neither investors would recover them nor could the hacker access them.
3. **Implement a hard fork** — in other words, create a new currency in which The DAO never existed. Investors would recover their funds in the new currency, and the hacker would retain the stolen funds on the old chain.

The solution ultimately chosen was the third option, which caused the old Ethereum chain to be renamed Ethereum Classic (ETC) and the new one to remain Ethereum (ETH), permanently dividing the community.

#### Other Use Cases

Many companies have already started building their own products on Ethereum. Here are a few examples:

* **uPort**: Aims to create international digital identity cards over which you have full control.
* **Filecoin**: A decentralised dropbox where other users store encrypted fragments of your data.
* **Golem**: Rental of computational power from other users who are not using their computers.
* **Akasha**: A decentralised social network, immune to censorship.
* **Aragon**: The ability to automate basic accounting, payroll, and shareholder voting tasks digitally.
* **SingularDTV**: Management of entertainment rights for the transparent distribution of funds.

All of these applications have their own tokens, and as such can be bought and traded in exactly the same way as Ether.

{% include image_caption.html imageurl="/images/posts/201712/ethereum-icos.png" title="Ethereum ICOs" caption="Different tokens and the amounts raised" popup=true %}

#### Payments, Fees, and Gas

A very important concept in Ethereum is the concept of fees. Every computation that occurs as a result of a transaction on the network requires a fee payment. These fees are paid in a denomination called *gas*. Let us briefly define several concepts:

* Gas: The unit of measurement for the fees required for a specific computation, measured in *gwei*.
* Wei: The smallest unit of Ether that can be obtained, where 10^18 Wei represents 1 Ether.
* Gwei: One million *Wei*.

For each transaction or operation executed by a DApp, the sender decides the gas limit and the gas price they are willing to pay for the transaction to go through.

The reason transaction fees exist on the network is to prevent infinite loops or the network being used for computationally very expensive operations that could cause it to collapse.

#### Conclusion

Ethereum is the second highest-valued currency in the cryptocurrency market, and that is no coincidence. The platform enables the creation of new currencies on top of it, and its success is closely tied to what others will manage to build with it.

Among its main competitors is [Cardano](/what-is-cardano/).

{% include image_caption.html imageurl="/images/posts/201712/ethereum-transactions.png" title="Ethereum Transactions" caption="Ethereum usage has increased dramatically over the last few years" popup=true %}
