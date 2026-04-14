---
title: "Qu'est-ce qu'un token ERC-20 : le standard Ethereum expliqué"
date: 2018-05-31 00:00:00 Z
last_modified_at: 2026-04-14 00:00:00 Z
tags:
- altcoins
- ethereum
- token
layout: post
description: "Découvrez ce qu'est un token ERC-20, comment fonctionne ce standard Ethereum, les principaux tokens ERC-20 en 2026 et en quoi il diffère de l'ERC-721 et de l'ERC-1155."
banner_image: 201805/erc20.png
lang: fr
ref: token-erc20
faq:
  - question: "Qu'est-ce qu'un token ERC-20 ?"
    answer: "Un token ERC-20 est un actif numérique créé sur la blockchain Ethereum qui respecte un ensemble standard de règles (le standard ERC-20). Cela garantit que tous les tokens sont compatibles entre eux, avec les portefeuilles et avec les plateformes d'échange, facilitant leur intégration dans l'écosystème."
  - question: "Quels sont les tokens ERC-20 les plus importants ?"
    answer: "Les tokens ERC-20 les plus notables en 2026 incluent des stablecoins comme USDT et USDC, des tokens DeFi comme UNI (Uniswap) et LINK (Chainlink), et des tokens passerelles comme WBTC (Wrapped Bitcoin). Au total, des centaines de milliers de contrats ERC-20 ont été déployés sur Ethereum."
  - question: "Quelle est la différence entre ERC-20 et ERC-721 ?"
    answer: "Les tokens ERC-20 sont fongibles : chaque unité est identique et interchangeable, comme de l'argent. Les tokens ERC-721 (NFTs) sont non fongibles : chacun est unique et irremplaçable, idéal pour l'art numérique ou les objets de collection. Il existe aussi le standard ERC-1155 qui combine les deux types dans un seul contrat."
  - question: "Un token ERC-20 est-il la même chose qu'une cryptomonnaie ?"
    answer: "Pas exactement. Une cryptomonnaie comme Bitcoin ou Ether possède sa propre blockchain. Un token ERC-20 est construit sur la blockchain Ethereum et dépend d'elle pour fonctionner. Les frais de transaction des tokens ERC-20 sont payés en ETH."
  - question: "À quoi servent les tokens ERC-20 dans la DeFi ?"
    answer: "Dans la DeFi, les tokens ERC-20 sont utilisés comme stablecoins pour les paiements et l'épargne, comme tokens de gouvernance pour voter dans les protocoles, comme tokens de liquidité dans les échanges décentralisés et comme garantie pour les prêts, entre autres usages."
---

Un token ERC-20 est un actif numérique créé sur la [blockchain Ethereum](/fr/quest-ce-qu-ethereum/) qui respecte un ensemble commun de règles. Ce standard, proposé à l'origine par Fabian Vogelsteller et Vitalik Buterin en 2015, est devenu un pilier fondamental de l'écosystème crypto : des [stablecoins](/fr/que-sont-les-stablecoins/) aux tokens de gouvernance [DeFi](/que-es-defi/), la grande majorité fonctionne sous ERC-20.

<!--more-->

## Que signifie ERC-20

**ERC** signifie *Ethereum Request for Comments* et **20** est le numéro de proposition qui lui a été attribué. Pour l'essentiel, le standard ERC-20 définit un ensemble de fonctions que tout token doit implémenter afin que l'écosystème Ethereum puisse interagir avec lui de manière prévisible : transférer des tokens, consulter les soldes, approuver les dépenses par des tiers, etc.

Dans un article précédent, nous avons évoqué [les différences entre tokens et cryptomonnaies](/tokens-vs-altcoins/). Toute plateforme qui permet la création et l'exécution de [smart contracts](/fr/quest-ce-qu-un-smart-contract/) est capable d'héberger des tokens, mais la grande majorité sont construits sur Ethereum sous le standard ERC-20, car il offre une compatibilité immédiate avec les [portefeuilles](/wallets-criptomonedas/), les plateformes d'échange et les protocoles DeFi.

Selon <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a>, des centaines de milliers de contrats ERC-20 ont été déployés sur le réseau Ethereum, bien que seuls quelques milliers aient une activité significative et une valeur marchande.

## Comment fonctionne un token ERC-20

Le standard définit six fonctions obligatoires et deux événements qui permettent l'interaction entre les tokens, les [smart contracts](/fr/quest-ce-qu-un-smart-contract/) et les utilisateurs :

- **totalSupply** : indique la quantité totale de tokens en circulation.
- **balanceOf** : renvoie le solde d'une adresse spécifique.
- **transfer** : permet d'envoyer des tokens d'une adresse à une autre.
- **transferFrom** : permet à un tiers autorisé de déplacer des tokens au nom du propriétaire.
- **approve** : autorise une adresse à dépenser un montant déterminé de tokens.
- **allowance** : consulte combien de tokens un tiers autorisé peut dépenser.

Il est important de ne pas confondre ces tokens avec l'**Ether (ETH)**, la monnaie native du réseau Ethereum. Lorsqu'un utilisateur transfère des tokens ERC-20 ou qu'un smart contract effectue des opérations, les frais de gas sont toujours payés en ETH.

## Avantages d'être un token ERC-20

Le fait qu'un token suive le standard ERC-20 implique plusieurs avantages pratiques :

- **Compatibilité avec les portefeuilles** : il peut être conservé dans tout [portefeuille compatible Ethereum](/wallets-criptomonedas/), comme MetaMask, Ledger ou Trezor.
- **Facilité de cotation sur les plateformes** : les plateformes d'échange peuvent intégrer tout token ERC-20 de manière standardisée.
- **Interopérabilité DeFi** : le token peut être utilisé directement dans des protocoles comme [Uniswap](/que-es-uniswap/), Aave, Compound ou d'autres sans adaptations spéciales.
- **Transparence** : toutes les transactions sont enregistrées sur la blockchain Ethereum et sont vérifiables publiquement.

## Les tokens ERC-20 les plus importants en 2026

L'écosystème ERC-20 a considérablement grandi depuis ses débuts. Voici quelques-uns des tokens les plus notables par catégorie :

### Stablecoins
- **[USDT (Tether)](/fr/qu-est-ce-que-usdt-tether/)** : le stablecoin le plus utilisé au monde, indexé 1:1 sur le dollar américain. Il est essentiel pour le trading et les transferts internationaux.
- **[USDC](/fr/qu-est-ce-que-usdc/)** : émis par Circle avec des audits mensuels, il est considéré comme le stablecoin le plus transparent et réglementé du marché.
- **DAI** : stablecoin décentralisé généré grâce à des garanties dans le protocole MakerDAO.

### Tokens DeFi et de gouvernance
- **UNI ([Uniswap](/que-es-uniswap/))** : token de gouvernance de la plus grande plateforme d'échange décentralisée sur Ethereum.
- **LINK (Chainlink)** : fournit des données externes fiables (oracles) aux smart contracts, essentiel au fonctionnement de la [DeFi](/que-es-defi/).
- **AAVE** : token du protocole de prêts décentralisés du même nom.

### Tokens passerelles et utilitaires
- **WBTC (Wrapped Bitcoin)** : une représentation ERC-20 de Bitcoin qui permet d'utiliser le BTC au sein de l'écosystème Ethereum et DeFi.
- **MATIC (Polygon)** : token de la solution de scalabilité Layer 2 la plus populaire d'Ethereum.

## ERC-20 contre les autres standards de tokens

Ethereum ne possède pas seulement le standard ERC-20. Au fil des années, d'autres standards ont été développés pour répondre à des besoins différents :

| Standard | Type | Usage principal | Exemple |
|----------|------|-----------------|---------|
| **ERC-20** | Fongible | Cryptomonnaies, stablecoins, tokens DeFi | USDT, UNI, LINK |
| **[ERC-721](/que-es-un-nft/)** | Non fongible (NFT) | Art numérique, objets de collection, actifs uniques | CryptoPunks, Bored Apes |
| **ERC-1155** | Multi-token | Gaming, collections mixtes, métavers | Objets de jeux blockchain |

- Les tokens **ERC-20 sont fongibles** : chaque unité est identique à une autre, tout comme un billet d'un euro est échangeable contre un autre.
- Les tokens **[ERC-721 sont non fongibles (NFTs)](/que-es-un-nft/)** : chaque token est unique et irremplaçable, idéal pour représenter des objets numériques ayant leur propre identité.
- Les tokens **ERC-1155 sont multi-types** : ils permettent de gérer des tokens fongibles et non fongibles au sein d'un même contrat, réduisant les coûts de gas. Ils sont particulièrement populaires dans les jeux blockchain.

## Le rôle de l'ERC-20 dans la DeFi

Le réseau Ethereum domine l'écosystème de la [finance décentralisée (DeFi)](/que-es-defi/), et les tokens ERC-20 en sont le carburant. Pratiquement tous les protocoles DeFi -- des plateformes d'échange décentralisées aux plateformes de prêts -- fonctionnent avec des tokens ERC-20 :

- **Échange** : sur les plateformes décentralisées comme [Uniswap](/que-es-uniswap/), les utilisateurs échangent des tokens ERC-20 sans intermédiaires.
- **Prêts et épargne** : des protocoles comme Aave et Compound permettent de prêter et d'emprunter des tokens ERC-20 en percevant des intérêts.
- **Fourniture de liquidité** : les utilisateurs peuvent déposer des tokens ERC-20 dans des pools de liquidité et recevoir des commissions en retour.
- **[Stablecoins](/fr/que-sont-les-stablecoins/)** : les stablecoins ERC-20 comme [USDT](/fr/qu-est-ce-que-usdt-tether/) et [USDC](/fr/qu-est-ce-que-usdc/) sont la base du commerce crypto mondial.

## Considérations de sécurité

Bien que le standard ERC-20 soit robuste et ait été éprouvé pendant des années, il convient de garder à l'esprit certains risques :

- **Tokens frauduleux** : n'importe qui peut créer un token ERC-20, il existe donc de nombreux tokens sans valeur réelle ou conçus comme des arnaques. Vérifiez toujours l'adresse du contrat sur <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a> avant d'interagir avec un token inconnu.
- **Approbations infinies** : certains protocoles DeFi demandent l'autorisation de dépenser une quantité illimitée de vos tokens. Il est recommandé de vérifier et de révoquer les approbations régulièrement.
- **Vulnérabilités des smart contracts** : des erreurs dans le code du contrat du token peuvent être exploitées. Les projets sérieux font réaliser des audits de sécurité professionnels.

## Conclusion

Le standard ERC-20, avec le réseau [Ethereum](/fr/quest-ce-qu-ethereum/) lui-même, est l'un des piliers fondamentaux de l'écosystème crypto. Depuis sa création en 2015, il a permis l'émergence des [stablecoins](/fr/que-sont-les-stablecoins/), des tokens de gouvernance, des actifs DeFi et bien plus encore. Comprendre son fonctionnement est essentiel pour quiconque souhaite participer au monde des cryptomonnaies et de la finance décentralisée.

D'autre part, certaines cryptomonnaies qui innovent en profondeur sur la technologie sous-jacente ne peuvent pas être construites sur Ethereum et possèdent donc leur propre blockchain avec des règles différentes. Parmi celles-ci, on trouve [Cardano](/fr/quest-ce-que-cardano/) ou [IOTA](/que-es-iota/).
