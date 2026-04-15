---
title: "Was sind Ethereum Gas Fees und wie kann man sie senken"
tags:
  - ethereum
  - altcoins
layout: post
description: "Erfahren Sie, was Ethereum Gas Fees (Gasgebühren) sind, warum sie existieren, wie sie berechnet werden und praktische Tipps, um bei jeder Transaktion weniger zu bezahlen."
banner_image: 202604/gas-fees-ethereum.webp
banner_image_alt: "Visuelle Erklärung der Ethereum Gas Fees"
lang: de
ref: gas-fees-ethereum
faq:
  - question: "Was sind Ethereum Gas Fees?"
    answer: "Gas Fees sind die Transaktionsgebühren, die Nutzer zahlen, um Operationen auszuführen oder mit Smart Contracts im Ethereum-Netzwerk zu interagieren. Sie werden in ETH bezahlt und entlohnen die Validatoren, die Transaktionen verarbeiten und verifizieren."
  - question: "Warum sind Ethereum Gas Fees so teuer?"
    answer: "Gas Fees steigen bei hoher Nachfrage im Netzwerk. Ethereum hat eine begrenzte Kapazität pro Block, sodass bei gleichzeitiger Nutzung durch viele Nutzer ein Wettbewerb um höhere Gebühren entsteht."
  - question: "Wie kann ich Ethereum Gas Fees reduzieren?"
    answer: "Sie können sie reduzieren, indem Sie in Zeiten geringer Auslastung handeln (Nächte und Wochenenden UTC), Layer-2-Netzwerke wie Arbitrum oder Optimism nutzen, das Gaslimit in Ihrer Wallet manuell anpassen oder mehrere Operationen in einer Transaktion bündeln."
  - question: "Was kosten Ethereum Gas Fees im Jahr 2026?"
    answer: "Im Jahr 2026 liegen die Gas Fees im Ethereum-Hauptnetz nach den Dencun- und Pectra-Upgrades zwischen 1 und 20 Gwei für Standardtransaktionen. In Layer-2-Netzwerken betragen die Gebühren typischerweise unter 0,01 USD."
  - question: "Was ist Gwei und wie hängt es mit den Gas Fees zusammen?"
    answer: "Gwei ist eine Einheit von Ether (1 Gwei = 0,000000001 ETH). Gas Fees werden in Gwei pro Gaseinheit angegeben. Ein einfacher ETH-Transfer verbraucht 21.000 Gaseinheiten, bei 10 Gwei wären die Kosten also 0,00021 ETH."
---

Wenn Sie jemals Ethereum gesendet oder mit einer DeFi-Anwendung interagiert haben, ist Ihnen aufgefallen, dass jede Operation Kosten verursacht: die **Gas Fees** (Gasgebühren). Zu verstehen, was sie sind und wie sie funktionieren, ist entscheidend, um nicht zu viel zu bezahlen und das Netzwerk effizient zu nutzen.

<!--more-->

## Was ist Gas bei Ethereum

Bei Ethereum ist **Gas** die Einheit, die den Rechenaufwand misst, der für die Ausführung einer Operation im Netzwerk erforderlich ist. Jede Aktion — vom Senden von ETH an eine andere Adresse bis zum Token-Tausch auf Uniswap oder dem Erstellen eines NFT — erfordert eine bestimmte Menge an Gas.

Gas ist keine Kryptowährung an sich, sondern ein internes Maß. Was Sie tatsächlich bezahlen, ist der **Gaspreis**, ausgedrückt in **Gwei** (ein Bruchteil von ETH: 1 Gwei = 0,000000001 ETH).

Die grundlegende Formel lautet:

> **Transaktionskosten = Verbrauchte Gaseinheiten × Preis pro Gaseinheit**

Ein einfacher ETH-Transfer verbraucht beispielsweise 21.000 Gaseinheiten. Bei einem Gaspreis von 10 Gwei betragen die Kosten:

- 21.000 × 10 Gwei = 210.000 Gwei = 0,00021 ETH

## Wie Gas Fees seit EIP-1559 funktionieren

Seit August 2021, mit dem [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)-Upgrade, hat Ethereum das Gebührenmodell grundlegend geändert. Jede Transaktion hat nun zwei Komponenten:

### Base Fee (Grundgebühr)

Der Mindestpreis pro Gaseinheit, den das Netzwerk verlangt, um Ihre Transaktion in einen Block aufzunehmen. Er passt sich automatisch an die Auslastung an: bei vollen Blöcken steigt er, bei leeren sinkt er. Die **Base Fee wird verbrannt** — sie wird zerstört und geht an keinen Validator.

### Priority Tip (Prioritätstrinkgeld)

Eine optionale zusätzliche Zahlung, die direkt an die Validatoren geht. Je höher Ihr Trinkgeld, desto wahrscheinlicher wird Ihre Transaktion schnell verarbeitet.

Die vollständige Formel lautet:

> **Gesamtkosten = Gaseinheiten × (Base Fee + Priority Tip)**

## Warum Gas Fees so stark schwanken

- **Netzwerkauslastung** — bei Token-Launches, Airdrops oder Markteinbrüchen
- **Komplexität der Operation** — ein DeFi-Swap kostet ~7x mehr als ein einfacher Transfer
- **ETH-Preis** — die Gas Fees in Gwei bleiben gleich, aber ihr Euro-Wert ändert sich

| Operationstyp | Ungefähres Gas | Typische Kosten (10 Gwei) |
|---|---|---|
| ETH senden | 21.000 | 0,00021 ETH |
| ERC-20 Token senden | 65.000 | 0,00065 ETH |
| Swap auf Uniswap | 150.000 | 0,0015 ETH |
| NFT erstellen | 200.000+ | 0,002+ ETH |

## Wie man bei Gas Fees spart

1. **Handeln Sie in Zeiten geringer Auslastung** — Nächte UTC und Wochenenden. Prüfen Sie den [Etherscan Gas Tracker](https://etherscan.io/gastracker) für den aktuellen Preis.

2. **Nutzen Sie Layer-2-Netzwerke** — Arbitrum, Optimism, Base und zkSync bieten Gebühren unter 0,01 USD dank der Dencun- und Pectra-Upgrades.

3. **Passen Sie das Gas manuell an** — In MetaMask können Sie das Prioritätstrinkgeld senken und eine maximale Gebühr festlegen.

4. **Bündeln Sie Operationen** — Aggregatoren wie 1inch kombinieren mehrere Swaps in einer einzigen Transaktion.

5. **Verwenden Sie optimierte Verträge** — Neuere [ERC-20](/de/was-ist-ein-erc20-token/) Token und Protokolle verbrauchen weniger Gas als die der ersten Generation.

## Gas Fees bei anderen Blockchains

| Blockchain | Durchschnittliche Transaktionskosten | Geschwindigkeit |
|---|---|---|
| Ethereum (L1) | 0,50–5,00 USD | ~12 Sekunden |
| Arbitrum / Optimism | < 0,01 USD | ~1 Sekunde |
| Solana | < 0,01 USD | ~0,4 Sekunden |
| Polygon PoS | < 0,01 USD | ~2 Sekunden |
| Bitcoin | 0,50–3,00 USD | ~10 Minuten |

## Die Zukunft der Gas Fees

Ethereum arbeitet weiter aktiv an der Senkung der Gebühren: **Danksharding** wird die Datenkapazität massiv erweitern, **Account Abstraction** (ERC-4337) wird es Anwendungen ermöglichen, Gas für ihre Nutzer zu bezahlen, und der allgemeine Trend geht zur Migration auf **Layer-2-Netzwerke**.

## Fazit

Gas Fees sind die Kosten für die Nutzung des dezentralsten und sichersten Netzwerks im Krypto-Ökosystem. Mit Layer-2-Netzwerken, dem richtigen Timing und manueller Gasanpassung lassen sie sich erheblich reduzieren.
