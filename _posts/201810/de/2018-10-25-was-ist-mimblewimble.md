---
title: "Was ist MimbleWimble: Datenschutz und Skalierbarkeit in der Blockchain"
date: 2018-10-25 00:00:00 Z
last_modified_at: 2026-04-14
tags:
- bitcoin
- altcoins
- litecoin
- datenschutz
layout: post
description: "Was ist MimbleWimble, das Protokoll, das den Datenschutz und die Skalierbarkeit in der Blockchain verbessert. Grin, BEAM und Litecoin MWEB einfach erklaert."
banner_image: 201810/mimblewimble.jpg
lang: de
ref: what-is-mimblewimble
faq:
  - question: "Was ist MimbleWimble?"
    answer: "MimbleWimble ist ein Blockchain-Protokoll, das den Datenschutz und die Skalierbarkeit verbessert, indem es Zwischendaten aus Transaktionen entfernt, sodass nur Eingaben, Ausgaben und eine digitale Signatur erhalten bleiben. Es wurde 2016 von einem anonymen Autor unter dem Pseudonym Tom Elvis Jedusor vorgeschlagen."
  - question: "Wie verbessert MimbleWimble den Datenschutz gegenueber Bitcoin?"
    answer: "Bitcoin legt den Absender, den Empfaenger und den Betrag jeder Transaktion oeffentlich offen. MimbleWimble verbirgt alle drei Parameter, indem es Transaktionen kombiniert und unnoetige Zwischeninformationen entfernt, unter Verwendung von Confidential Transactions und der CoinJoin-Technik."
  - question: "Welche Kryptowaehrungen nutzen MimbleWimble?"
    answer: "Grin und BEAM sind native Kryptowaehrungen, die auf MimbleWimble basieren. Darueber hinaus hat Litecoin das Protokoll im Mai 2022 ueber MWEB (MimbleWimble Extension Blocks) integriert, wodurch optionale vertrauliche Transaktionen innerhalb seines Netzwerks ermoeglicht werden."
  - question: "Ist MimbleWimble sicher?"
    answer: "Ja. MimbleWimble verwendet Elliptische-Kurven-Kryptographie und bewaehrte Confidential Transactions. Das Netzwerk ueberprueft mathematisch, dass keine Muenzen unrechtmaessig erzeugt oder vernichtet werden, ohne sensible Transaktionsdaten offenlegen zu muessen."
  - question: "Was ist Litecoin MWEB?"
    answer: "MWEB (MimbleWimble Extension Blocks) ist ein Litecoin-Upgrade, das im Mai 2022 aktiviert wurde und optionale vertrauliche Transaktionen ermoeglicht. Nutzer koennen LTC in die MWEB-Schicht verschieben, um Betraege und Adressen zu verbergen, was den Datenschutz verbessert, ohne die Skalierbarkeit zu beeintraechtigen."
  - question: "Wie kann MimbleWimble in Bitcoin integriert werden?"
    answer: "MimbleWimble koennte als Soft Fork oder als Sidechain in Bitcoin integriert werden, sodass Nutzer ueber Atomic Swaps Mittel transferieren koennen, um private Transaktionen durchzufuehren. Allerdings hat Bitcoin andere Verbesserungen wie Taproot und Schnorr priorisiert."
---

MimbleWimble ist ein Protokoll, das von einem anonymen Nutzer in einem Bitcoin-Entwickler-Chat unter dem Namen Tom Elvis Jedusor (der franzoesische Name von Voldemort in den Harry-Potter-Buechern) veroeffentlicht wurde. MimbleWimble selbst ist der Name des Zauberspruchs, der in J.K. Rowlings Buechern verwendet wird, um die Zungen der Opfer zu versiegeln.

<!--more-->

Jedusor hinterliess einen Link zu einem <a rel="nofollow" href="https://download.wpsoftware.net/bitcoin/wizardry/mimblewimble.txt">Whitepaper</a>, in dem er beschreibt, wie dieses Protokoll sowohl die Skalierbarkeit als auch den Datenschutz des Bitcoin-Netzwerks erheblich verbessern koennte.

Satoshi Nakamoto war im Bitcoin-Whitepaper sehr offen, als er ueber [die Datenschutz-Einschraenkungen von BTC](/es-bitcoin-anonimo/) sprach. Er erlaeuterte, wie drei Felder bei jeder Transaktion oeffentlich bekannt sein wuerden:

- Die oeffentliche Adresse des Absenders.
- Die Menge der gesendeten Muenzen.
- Die oeffentliche Adresse des Empfaengers.

Der Grund dafuer ist sicherzustellen, dass ein Absender niemals mehr Mittel sendet, als er an seiner Adresse besitzt.

MimbleWimble hingegen schafft es, alle drei Parameter auf eine Weise zu verbergen, die mit dem Bitcoin-Netzwerk kompatibel ist. Im Gegensatz zu anderen Datenschutz-Implementierungen wie [ZCash](/que-es-zcash/) oder [Monero](/que-es-monero/), die Transaktionen verschleiern, erreicht MimbleWimble den Datenschutz, indem es fast alle Transaktionsinformationen eliminiert, die letztlich auf der Blockchain gespeichert werden.

Stellt euch vor, ich mache eine Transaktion an Bob, der wiederum eine Transaktion an Carol macht, die sie anschliessend an David weiterleitet. Das Endergebnis ist, dass meine urspruenglichen Muenzen jetzt im Besitz von David sind. Warum behalten wir dann die zusaetzlichen Informationen? MimbleWimble entfernt alle Zwischeninformationen, indem es sie zu einer einzigen autorisierten Transaktion zusammenfasst.

MimbleWimble-Transaktionen sind eine Weiterentwicklung zweier bereits bekannter Konzepte in der Bitcoin-Welt:

- **Confidential Transactions**, entwickelt von einem Bitcoin-Entwickler namens Gregory Maxwell, ermoeglicht es Nutzern, die Anzahl der gesendeten Muenzen zu verschluesseln und so vor jedem externen Beobachter der Transaktion zu verbergen.
- **CoinJoin** (ebenfalls von Gregory Maxwell vorgeschlagen) ist ein Mechanismus, bei dem verschiedene Transaktionen miteinander kombiniert werden, um die von verschiedenen Nutzern gesendeten Betraege zu verschleiern, sodass ein Beobachter nicht feststellen kann, welcher Absender genau welchen Betrag an welchen Empfaenger gesendet hat.

Die Kombination beider Konzepte erzeugt einen Block, der lediglich eine Liste von Geldeingaengen, eine Liste von Ausgaben und eine digitale Signatur enthaelt. Dies spart erheblichen Platz im 1-MB-Block des Bitcoin-Netzwerks, da die uebrigen Informationen nicht mehr gespeichert werden muessen, und folglich koennen mehr Transaktionen pro Block aufgenommen werden, was die Skalierbarkeit des Netzwerks gleichzeitig mit dem Datenschutz verbessert.

MimbleWimble kann im BTC-Netzwerk als Soft Fork oder Sidechain (wie das Lightning Network) implementiert werden, wobei Nutzer ihre Muenzen ueber *Atomic Swaps* vom BTC-Netzwerk zum MimbleWimble-Netzwerk transferieren und dann private Transaktionen durchfuehren koennen.

So wie Bitcoin ein Protokoll ist und Bitcoin Core eine seiner Implementierungen, ist MimbleWimble ein Protokoll mit mehreren Implementierungen: **Grin**, **BEAM** und seit 2022 **Litecoin MWEB**.

## MimbleWimble-Implementierungen

### Grin

Grin war die erste Implementierung des MimbleWimble-Protokolls, die ihr Hauptnetzwerk startete, am **15. Januar 2019**. Im Gegensatz zu den meisten Kryptowaehrungen hatte Grin kein ICO, kein Premining und keine Gruenderbelohnung: Es handelt sich um ein vollstaendig gemeinschaftsgetriebenes Projekt, das durch Spenden finanziert wird.

Grin verwendet ein lineares Emissionsmodell ohne maximale Angebotsobergrenze, aehnlich der Geldpolitik einer digitalen Fiat-Waehrung. Die fruehen Jahre umfassten geplante Hard Forks und Aenderungen am Proof-of-Work-Algorithmus. Heute befindet sich das Projekt in einer stabilen Wartungsphase mit aktiven Beitraegen von erfahrenen Entwicklern wie Yeastplume und Tromp, wenn auch mit weniger Entwicklungsaktivitaet als in den Anfaengen.

### BEAM

BEAM ist die andere wichtige MimbleWimble-Implementierung, die ebenfalls im Januar 2019 gestartet wurde. Im Gegensatz zu Grin wurde BEAM von einem Unternehmen mit Sitz in Tel Aviv entwickelt und verfolgt einen staerker unternehmensorientierten Ansatz. Es verwendet die Protokolle Lelantus und MimbleWimble kombiniert, um standardmaessig Datenschutz bei allen Transaktionen zu bieten.

BEAM hat seinen Umfang ueber private Zahlungen hinaus erweitert und bietet vertrauliche Vermoegenswerte, einen vertraulichen DEX, private NFTs und sogar Stablecoins mit integriertem Datenschutz. Sein Governance-Modell befindet sich im Uebergang zu einem DAO (BeamX DAO) mit einer deflationaeren Emission, die periodisch abnimmt.

### Litecoin MWEB

Die bedeutendste Adoption von MimbleWimble erfolgte am **19. Mai 2022**, als Litecoin die **MWEB (MimbleWimble Extension Blocks)** aktivierte, das groesste Upgrade in der Geschichte der Kryptowaehrung. MWEB ermoeglicht es Litecoin-Nutzern, optional vertrauliche Transaktionen durchzufuehren: Nutzer koennen ihre LTC in die MWEB-Schicht verschieben, um sowohl die Betraege als auch die Adressen der Transaktionen zu verbergen.

Die Adoption ist seit der Aktivierung stetig gewachsen:

- Ueber 90 % der Litecoin-Miner und -Nodes validieren MWEB-Bloecke.
- Mehr als 350.000 LTC sind in der MWEB-Schicht hinterlegt.
- Wallets wie Litecoin Core, Cake Wallet (seit Oktober 2024) und Tristero (seit Maerz 2026) unterstuetzen MWEB-Transaktionen auf Desktop und Mobilgeraeten.

Die von MimbleWimble geerbte *Cut-through*-Technik ermoeglicht es zudem, Daten bereits ausgegebener Transaktionen aus der Kette zu entfernen, was den benoetigten Speicherplatz reduziert und die Skalierbarkeit von Litecoin verbessert.

## MimbleWimble und die Regulierung von Privacy Coins

Die Integration von MWEB in Litecoin verdeutlichte auch die Spannung zwischen Datenschutz und Regulierung auf dem Kryptomarkt. Nach der Aktivierung von MWEB entfernten die fuenf groessten suedkoreanischen Boersen (Upbit, Bithumb, Coinone, Korbit und Gopax) Litecoin von ihren Plattformen und stuften ihn als "dunkle Muenze" ein, da er angeblich nicht mit den Geldwaeschebekaempfungsvorschriften (AML) des Landes vereinbar sei.

Binance kuendigte seinerseits an, keine Litecoin-Transaktionen zu verarbeiten, die die MWEB-Funktionalitaet nutzen, obwohl der konventionelle LTC-Handel beibehalten wurde. An US-Boersen wie Coinbase funktionierte Litecoin weiterhin normal.

Diese Episode spiegelt eine breitere Debatte wider, die den gesamten Privacy-Coin-Sektor betrifft: 2024 entfernte Binance Monero (XMR) von seiner Plattform, und OKX tat dasselbe mit XMR, DASH, ZEC und ZEN. Finanzielle Privatsphaere bleibt eines der wichtigsten Wertversprechen der Kryptographie, kollidiert aber zunehmend mit globalen regulatorischen Rahmenbedingungen.

## Die Zukunft von MimbleWimble

MimbleWimble hat sich als weit mehr erwiesen als ein theoretischer Vorschlag, der 2016 in einem Bitcoin-Chat veroeffentlicht wurde. Mit aktiven Implementierungen in Grin, BEAM und Litecoin hat das Protokoll seine technische Machbarkeit zur Verbesserung von Datenschutz und Skalierbarkeit in der Blockchain bewiesen.

Der Fall von Litecoin MWEB ist besonders relevant: Er hat gezeigt, dass ein Datenschutzprotokoll in eine etablierte Kryptowaehrung mit bestehender Nutzerbasis integriert werden kann, wenn auch nicht ohne regulatorische Herausforderungen. Mit Blick auf die Zukunft wird die Entwicklung von MimbleWimble ebenso von technischen Fortschritten abhaengen wie von der Faehigkeit des Oekosystems, das Gleichgewicht zwischen Datenschutz und regulatorischer Compliance zu navigieren.
