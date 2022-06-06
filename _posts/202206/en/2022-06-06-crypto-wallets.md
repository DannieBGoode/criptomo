---
title: What is a Cryptocurrency Wallet
tags:
- altcoins
- bitcoin
layout: post
description: Guide to the best bitcoin and cryptocurrency wallets. What is a wallet, best hardware wallets.
banner_image: 202206/wallet.webp
rating: 5
Total Votes: 43
ref: ledger-nano
lang: en
popular: true
---

## What is a <span class="highlight-title">wallet</span> ?

A wallet can be a physical device (hardware) or a computer program that is equivalent to a bank but without intermediaries, directly controlled by the user. With a wallet, any user can carry out operations such as sending, receiving or simply storing funds (cryptocurrency) without the need for an external entity to give them permission to do so, or to block their account when they see fit.


A common misconception is that wallets do not store the user's cryptocurrencies, but the private keys that allow the user to access them. **Cryptocurrencies like Bitcoin only exist on the Blockchain and cannot be withdrawn from there**.

There are four types of wallets and the question about which one is better depends exclusively on the use that you want to give it.

## What is a <span class="highlight-title">private key</span> ?

> Not your keys, not your coins. <cite>― Andreas Antonopoulos</cite>

Your cryptocurrency wallet is a combination of public keys and private keys. The public key is considered the address that a user can share so that others can send funds, and the private key is the password to access that wallet and be able to carry out operations within it.

All public addresses have a mathematically related binding private address. All private keys are capable of generating a public key, but the same cannot be said of the opposite case, which is key for the system to work. All private keys are 256 bits long and look like this and always start with a 5:

`5KUR9tz4iDTpW2xQkNvJDKyGHYWT9q8LriTLH29Tv8Thiyqvy9A`.

The private keys must be kept secret since if they are lost, the user would lose access to their cryptocurrencies. Similarly, if a second person were to gain access to a private key, they could move the funds to a wallet that only they control (it would be equivalent to making an irreversible bank transfer).

## What is a <span class="highlight-title">public key</span> ?

A public key acts as a wallet address and can be freely shared with the person from whom payments are expected.

A public key is 160 bits, usually starts with a `1` or `3`, and looks like this:

`154VdhSPwk2xo9YVWn5SHS47LoH8dL5mQh`

Public keys that start with a `3` are usually because they are Segwit or Multi-signature addresses, and are considered just as valid.

Sharing a public key would be equivalent to sharing an IBAN or bank account number. Sharing it will never put any funds in the wallet at risk and is in fact the only way to receive funds.

## What is a <span class="highlight-title">Seed</span> ?

We already saw it in [What is a mnemonic phrase](/what-is-mnemonic-phrase/) but in summary it is a combination of 12 or 24 random words that are used to recover access to your wallet in the event that this get lost

An example of a seed could be this:

`monitor umbrella replace fold autumn top until six glad lazy vocal buyer evolve coconut near brisk broccoli symbol nation debris blast undo prepare mom`

The main difference between a seed and a private key is that the seed can be used to generate infinite combinations of public / private keys for different cryptocurrencies, so when creating a wallet it is generally more practical to ask the user to remember a seed that multiple private keys.

If we restore a wallet through the seed, we will regain control of all the cryptocurrencies that we had inside.

It is a good practice to never store the seed on a device connected to the Internet, since in general all devices are vulnerable to hacking and the loss in the world of cryptocurrencies is irreversible.

The seed should be stored in a safe place, protected from fire, water or any other physical damage, so paper is not recommended either.

{% include image_caption.html imageurl="https://99bitcoins.com/wp-content/uploads/2016/05/crypto-steel.jpg" title="The seed is stored in cash and never enters the internet" caption= "The seed is saved in metal and never enters the internet" popup=true class="small-size" %}

Companies like <a rel="nofollow" href="https://amzn.to/3PZwXLo">Cryptosteel</a> or <a rel="nofollow" href="https://amzn.to/3m2O40T"> Billfodl</a> offer indestructible metal plates where the user can write their seed and protect it from external factors, although it is impossible to store the plate later in a place where it cannot be stolen.

<div class="product-grid">
	{% include thumbnail.html 
		title="Cryptosteel"
		href="https://amzn.to/3MrRbdw"
		imageurl="/images/posts/202206/cryptosteel.webp"
		backgroundColor="#FFBCBC"
		imagecta="/images/posts/202206/cryptosteel-logo-white-1.webp"
		badge="$85"
	%}

	{% include thumbnail.html 
		title="Billfodl "
		href="https://amzn.to/3NqXwr5"
		imageurl="/images/posts/202206/billfodl.webp"
		backgroundColor="#F3F0D7"
		imagecta="/images/posts/202206/billfodl-logo.webp"
		badge="$95"
	%}

</div>

## <span class="highlight-title">Types</span> of wallets

### <span class="highlight-title">Hardware</span> Wallet

A hardware wallet is a physical device similar to a USB stick that is responsible for storing private keys without ever connecting to the internet. That is why this type of wallet is usually characterized as *Cold Storage*.

A hardware wallet allows the user to continue sending and receiving operations without ever putting the funds at risk.

Hardware wallets have physical buttons so that the user always confirms transactions manually.

{% include image_caption.html imageurl="/images/posts/202206/confirm-transaction.gif" title="Confirming a transaction requires pressing a physical button" caption="Confirming a transaction requires pressing a physical button" popup= true class="small-size" %}

When initializing a hardware wallet for the first time the user will be given two passwords:

- The seed, which will be randomly generated at the moment, so that the user can write it down and keep it in a safe place.
- A PIN to be chosen by the user, which he will use every time he wants to operate with the hardware wallet.

Just as the seed would only be used in extreme cases of loss or theft, the PIN will be used constantly every time you want to access the wallet.

The most widespread series of hardware wallets are the **Ledger Nano** and we can find the following models. All of them accept multiple currencies, but some features only exist in the most premium models, such as bluetooth support or more storage space if we want to have a large number of different wallets at the same time on the same device (in the event that we handle many currencies).

<div class="product-grid">
	{% include thumbnail.html 
		title="Nano X"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-x.webp"
		backgroundColor="#AD8B73"
		imagecta="/images/pages/ledger-logo.svg"
		badge="$149"
	%}

	{% include thumbnail.html
		title="Nano S Plus"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-sp.webp"
		backgroundColor="#68A7AD"
		caption="Recommended"
		imagecta="/images/pages/ledger-logo.svg"
		badge="$79"
	%}

	{% include thumbnail.html
		title="Nano S"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-s.webp"
		backgroundColor="#C2DED1"
		imagecta="/images/pages/ledger-logo.svg"
		badge="$59"
	%}
</div>

#### What happens if <span class="highlight-title">I lose a hardware wallet</span> ?

If the user loses their hardware wallet or it is damaged, the cryptocurrencies remain safe as long as the user has safely saved their Seed to be able to restore their account in another new hardware wallet.

The thief who has acquired someone else's hardware wallet will not be able to use it unless he knows the PIN password. If you enter the PIN incorrectly several times, the device will end up being blocked, so that no brute force attempts are made.

If the thief instead got the seed, he wouldn't even need the original hardware wallet to gain control of the cryptocurrencies, since he could restore his victim's account on another new device.

In general, a hardware wallet is the best way to keep funds safe and to be able to operate with them occasionally without headaches.

## <span class="highlight-title">Hot</span> wallet

For those users who make movements very frequently, having to connect the hardware wallet to a computer may not be the best option.

For example, if we want to make day-to-day payments, such as buying a coffee, it is much more practical and agile to have some funds in a hot wallet, since the transactions will be made instantly.

A hot wallet is more vulnerable to possible cyber attacks, so the user should make sure not to have significant amounts of cryptocurrencies inside and limit himself to a balance that supports his day-to-day expenses.

There are two types of hot wallets:

### <span class="highlight-title">Custody</span> Wallets

Custody wallets shouldn't even be considered wallets, since essentially an entity holds the private keys on behalf of the user. The best example of a non-custodial wallet is the exchanges themselves, like Binance or Coinbase.

The user can have cryptocurrencies in Coinbase, but they only have access to their Coinbase account, which could be blocked by the company if they wanted to. There has also been the case of Exchange hacks that have drained them of cryptocurrencies due to security holes for which the user is not to blame but ends up paying the same.

### <span class="highlight-title">Non-Custody</span> Wallets

Non-custodial wallets do share the seed with the user. They can be mobile or Windows / OSX applications. The problem with these wallets is that they are connected to the internet with the risks that this entails.

<div class="product-grid">
	{% include thumbnail.html 
		title="Metamask"
		href="https://metamask.io/"
		imageurl="https://miro.medium.com/fit/c/294/294/1*ez2eqUWghaTtCIGyF4upEA.png"
		backgroundColor="#FFBCBC"
		imagecta="https://cdn.freebiesupply.com/logos/large/2x/metamask-logo-png-transparent.png"
		badge="Free"
	%}

	{% include thumbnail.html 
		title="Exodus Wallet "
		href="https://www.exodus.com/"
		imageurl="https://www.yadawallets.com/wp-content/uploads/2020/10/exodus-wallet-logo.png"
		backgroundColor="#F3F0D7"
		imagecta="https://www.investopedia.com/thmb/kPDAGMSv04PgoZP2Vj5YAm2aA_g=/2000x410/filters:no_upscale():max_bytes(150000):strip_icc()/Exodus_Logo-094c6a5bbda24cb29c2f930dd254069f.jpeg"
		badge="Free"
	%}

</div>