---
title: "Qu'est-ce que MimbleWimble : Confidentialite et Scalabilite dans la Blockchain"
date: 2018-10-25 00:00:00 Z
last_modified_at: 2026-04-14
tags:
- bitcoin
- altcoins
- litecoin
- confidentialite
layout: post
description: "Qu'est-ce que MimbleWimble, le protocole qui ameliore la confidentialite et la scalabilite de la blockchain. Grin, BEAM et Litecoin MWEB expliques simplement."
banner_image: 201810/mimblewimble.jpg
lang: fr
ref: what-is-mimblewimble
faq:
  - question: "Qu'est-ce que MimbleWimble ?"
    answer: "MimbleWimble est un protocole blockchain qui ameliore la confidentialite et la scalabilite en supprimant les donnees intermediaires des transactions, de sorte que seules les entrees, les sorties et une signature numerique sont conservees. Il a ete propose en 2016 par un auteur anonyme sous le pseudonyme de Tom Elvis Jedusor."
  - question: "Comment MimbleWimble ameliore-t-il la confidentialite par rapport a Bitcoin ?"
    answer: "Bitcoin expose publiquement l'emetteur, le destinataire et le montant de chaque transaction. MimbleWimble masque ces trois parametres en combinant les transactions et en supprimant les informations intermediaires inutiles, grace aux transactions confidentielles et a la technique CoinJoin."
  - question: "Quelles cryptomonnaies utilisent MimbleWimble ?"
    answer: "Grin et BEAM sont des cryptomonnaies natives basees sur MimbleWimble. De plus, Litecoin a integre le protocole en mai 2022 via MWEB (MimbleWimble Extension Blocks), permettant des transactions confidentielles optionnelles au sein de son reseau."
  - question: "MimbleWimble est-il securise ?"
    answer: "Oui. MimbleWimble utilise la cryptographie sur courbe elliptique et des transactions confidentielles eprouvees. Le reseau verifie mathematiquement qu'aucune monnaie n'est creee ni detruite de maniere illicite, sans avoir besoin d'exposer des donnees sensibles des transactions."
  - question: "Qu'est-ce que Litecoin MWEB ?"
    answer: "MWEB (MimbleWimble Extension Blocks) est une mise a jour de Litecoin activee en mai 2022 qui permet de realiser des transactions confidentielles optionnelles. Les utilisateurs peuvent deplacer leurs LTC vers la couche MWEB pour masquer les montants et les adresses, ameliorant la confidentialite sans sacrifier la scalabilite."
  - question: "Comment MimbleWimble peut-il etre integre a Bitcoin ?"
    answer: "MimbleWimble pourrait etre integre a Bitcoin sous forme de soft fork ou de sidechain, permettant aux utilisateurs de transferer des fonds via des atomic swaps pour effectuer des transactions privees. Cependant, Bitcoin a privilegie d'autres ameliorations comme Taproot et Schnorr."
---

MimbleWimble est un protocole publie par un utilisateur anonyme dans un chat de developpeurs Bitcoin sous le nom de Tom Elvis Jedusor (le nom francais de Voldemort dans les livres de Harry Potter). MimbleWimble est lui-meme le nom du sortilege utilise pour sceller la langue des victimes dans les livres de J.K. Rowling.

<!--more-->

Jedusor a laisse un lien vers un <a rel="nofollow" href="https://download.wpsoftware.net/bitcoin/wizardry/mimblewimble.txt">livre blanc</a> dans lequel il decrit comment ce protocole pourrait ameliorer de maniere significative la scalabilite et la confidentialite du reseau Bitcoin.

Satoshi Nakamoto a ete tres honnete dans le livre blanc de Bitcoin lorsqu'il a parle des [limitations de la confidentialite de BTC](/es-bitcoin-anonimo/). Il y expliquait que trois champs seraient publiquement connus pour toute transaction effectuee :

- L'adresse publique de l'emetteur.
- Le montant de monnaie envoye.
- L'adresse publique du destinataire.

La raison est de s'assurer qu'un emetteur n'envoie jamais plus de fonds qu'il n'en possede a son adresse.

MimbleWimble, en revanche, parvient a masquer ces trois parametres d'une maniere compatible avec le reseau Bitcoin. Contrairement a d'autres implementations de confidentialite comme [ZCash](/que-es-zcash/) ou [Monero](/que-es-monero/) qui ajoutent de l'obfuscation aux transactions, MimbleWimble obtient la confidentialite en eliminant presque toute l'information des transactions qui finit par etre enregistree sur la blockchain.

Imaginez que j'effectue une transaction vers Bob, qui a son tour en fait une autre vers Carol, qui ensuite l'envoie a David. Le resultat final est que mes monnaies originales sont maintenant en possession de David. Pourquoi alors conserver l'information supplementaire ? MimbleWimble elimine toute l'information intermediaire en les combinant en une seule transaction autorisee.

Les transactions MimbleWimble sont une evolution de deux concepts deja connus dans le monde de Bitcoin :

- **Les transactions confidentielles**, developpees par un developpeur Bitcoin nomme Gregory Maxwell, permettent aux utilisateurs de chiffrer le nombre de monnaies envoyees, les cachant de tout observateur externe a la transaction.
- **CoinJoin** (egalement propose par Gregory Maxwell) est un mecanisme dans lequel differentes transactions sont combinees entre elles afin d'obscurcir les montants emis par les differents utilisateurs, de sorte qu'un observateur ne puisse pas savoir qui a envoye exactement quel montant et a quel destinataire.

La combinaison de ces deux concepts produit un bloc qui contient simplement une liste d'entrees d'argent, une liste de sorties et une signature numerique, ce qui economise un espace considerable dans le bloc de 1 Mo caracteristique du reseau Bitcoin. Le reste de l'information n'a plus besoin d'etre stocke et, par consequent, davantage de transactions peuvent etre incluses par bloc, ameliorant la scalabilite du reseau en meme temps que la confidentialite.

MimbleWimble peut etre implemente sur le reseau BTC sous forme de soft fork ou de sidechain (comme le Lightning Network) ou les utilisateurs pourraient transferer leurs monnaies du reseau BTC vers celui de MimbleWimble via des *atomic swaps* pour effectuer des transactions privees.

De la meme maniere que Bitcoin est un protocole et Bitcoin Core en est une implementation, MimbleWimble est un protocole avec plusieurs implementations : **Grin**, **BEAM** et, depuis 2022, **Litecoin MWEB**.

## Implementations de MimbleWimble

### Grin

Grin a ete la premiere implementation du protocole MimbleWimble a lancer son reseau principal, le **15 janvier 2019**. Contrairement a la plupart des cryptomonnaies, Grin n'a eu ni ICO, ni preminage, ni recompense pour les fondateurs : il s'agit d'un projet entierement communautaire finance par des dons.

Grin utilise un modele d'emission lineaire sans plafond maximum d'offre, similaire a la politique monetaire d'une monnaie fiduciaire numerique. Ses premieres annees ont inclus des hard forks programmes et des changements de l'algorithme de preuve de travail. Aujourd'hui, le projet se trouve dans une phase de maintenance stable, avec des contributions actives de developpeurs veterans comme Yeastplume et Tromp, bien qu'avec moins d'activite de developpement qu'a ses debuts.

### BEAM

BEAM est l'autre implementation principale de MimbleWimble, egalement lancee en janvier 2019. Contrairement a Grin, BEAM a ete developpe par une entreprise basee a Tel-Aviv et adopte une approche plus orientee entreprise. Il utilise les protocoles Lelantus et MimbleWimble combines pour offrir une confidentialite par defaut sur toutes les transactions.

BEAM a elargi son perimetre au-dela des paiements prives, offrant des actifs confidentiels, un DEX confidentiel, des NFTs prives et meme des stablecoins avec confidentialite integree. Son modele de gouvernance est en transition vers un DAO (BeamX DAO), avec une emission deflationniste qui diminue periodiquement.

### Litecoin MWEB

L'adoption la plus significative de MimbleWimble est arrivee le **19 mai 2022**, lorsque Litecoin a active les **MWEB (MimbleWimble Extension Blocks)**, la plus grande mise a jour de l'histoire de la cryptomonnaie. MWEB permet aux utilisateurs de Litecoin d'effectuer des transactions confidentielles de maniere optionnelle : les utilisateurs peuvent transferer leurs LTC vers la couche MWEB pour masquer les montants et les adresses des transactions.

L'adoption a progresse de maniere constante depuis son activation :

- Plus de 90 % des mineurs et des noeuds Litecoin valident les blocs MWEB.
- Plus de 350 000 LTC sont deposes dans la couche MWEB.
- Des portefeuilles comme Litecoin Core, Cake Wallet (depuis octobre 2024) et Tristero (depuis mars 2026) prennent en charge les transactions MWEB sur ordinateur et mobile.

La technique de *cut-through* heritee de MimbleWimble permet egalement de supprimer les donnees des transactions deja depensees de la chaine, reduisant l'espace de stockage necessaire et ameliorant la scalabilite de Litecoin.

## MimbleWimble et la regulation des monnaies de confidentialite

L'integration de MWEB dans Litecoin a egalement mis en evidence la tension entre confidentialite et regulation sur le marche crypto. Apres l'activation de MWEB, les cinq principaux exchanges sud-coreens (Upbit, Bithumb, Coinone, Korbit et Gopax) ont retire Litecoin de leurs plateformes, le classant comme une "monnaie sombre" en raison d'une pretendue incompatibilite avec les normes anti-blanchiment d'argent (AML) du pays.

Binance, de son cote, a annonce qu'il ne traiterait pas les transactions Litecoin utilisant la fonctionnalite MWEB, tout en maintenant le trading conventionnel de LTC. Sur les exchanges americains comme Coinbase, Litecoin a continue de fonctionner normalement.

Cet episode reflete un debat plus large qui touche l'ensemble du secteur des monnaies de confidentialite : en 2024, Binance a retire Monero (XMR) de sa plateforme, et OKX a fait de meme avec XMR, DASH, ZEC et ZEN. La confidentialite financiere reste l'une des propositions de valeur les plus importantes de la cryptographie, mais elle entre de plus en plus en conflit avec les cadres reglementaires mondiaux.

## L'avenir de MimbleWimble

MimbleWimble a prouve qu'il etait bien plus qu'une proposition theorique publiee dans un chat Bitcoin en 2016. Avec des implementations actives dans Grin, BEAM et Litecoin, le protocole a demontre sa viabilite technique pour ameliorer la confidentialite et la scalabilite de la blockchain.

Le cas de Litecoin MWEB est particulierement pertinent : il a demontre qu'un protocole de confidentialite peut etre integre dans une cryptomonnaie etablie avec une base d'utilisateurs existante, bien que non sans defis reglementaires. Pour l'avenir, l'evolution de MimbleWimble dependra autant des avancees techniques que de la capacite de l'ecosysteme a naviguer l'equilibre entre confidentialite et conformite reglementaire.
