---
title: "Qué es MimbleWimble: Privacidad y Escalabilidad en Blockchain"
date: 2018-10-25 00:00:00 Z
last_modified_at: 2026-04-14
tags:
- bitcoin
- altcoins
- litecoin
- privacidad
layout: post
description: "Qué es MimbleWimble, el protocolo que mejora la privacidad y escalabilidad en blockchain. Grin, BEAM y Litecoin MWEB explicados de forma sencilla."
banner_image: 201810/mimblewimble.jpg
lang: es
ref: what-is-mimblewimble
faq:
  - question: "¿Qué es MimbleWimble?"
    answer: "MimbleWimble es un protocolo de blockchain que mejora la privacidad y la escalabilidad eliminando datos intermedios de las transacciones, de forma que solo se conservan las entradas, las salidas y una firma digital. Fue propuesto en 2016 por un autor anónimo bajo el seudónimo de Tom Elvis Jedusor."
  - question: "¿Cómo mejora MimbleWimble la privacidad respecto a Bitcoin?"
    answer: "Bitcoin expone públicamente el emisor, el receptor y la cantidad de cada transacción. MimbleWimble oculta estos tres parámetros combinando transacciones y eliminando la información intermedia innecesaria, utilizando transacciones confidenciales y la técnica CoinJoin."
  - question: "¿Qué criptomonedas usan MimbleWimble?"
    answer: "Grin y BEAM son criptomonedas nativas basadas en MimbleWimble. Además, Litecoin integró el protocolo en mayo de 2022 a través de MWEB (MimbleWimble Extension Blocks), permitiendo transacciones confidenciales opcionales dentro de su red."
  - question: "¿Es MimbleWimble seguro?"
    answer: "Sí. MimbleWimble utiliza criptografía de curva elíptica y transacciones confidenciales probadas. La red verifica matemáticamente que no se crean ni destruyen monedas de forma ilícita, sin necesidad de exponer datos sensibles de las transacciones."
  - question: "¿Qué es Litecoin MWEB?"
    answer: "MWEB (MimbleWimble Extension Blocks) es una actualización de Litecoin activada en mayo de 2022 que permite realizar transacciones confidenciales opcionales. Los usuarios pueden mover LTC a la capa MWEB para ocultar cantidades y direcciones, mejorando la privacidad sin sacrificar la escalabilidad."
  - question: "¿Cómo se puede integrar MimbleWimble en Bitcoin?"
    answer: "MimbleWimble puede incorporarse a Bitcoin como un soft fork o como una sidechain, permitiendo a los usuarios mover fondos mediante atomic swaps para realizar transacciones privadas. Sin embargo, Bitcoin ha priorizado otras mejoras como Taproot y Schnorr."
---

Mimblewimble es un protocolo publicado por un usuario anónimo en un chat de developers de Bitcoin con el nombre de Tom Elvis Jedusor (el nombre francés de Voldemort en los libros de Harry Potter). Mimblewimble en sí es el nombre del hechizo de Harry Potter utilizado para sellar lenguas de víctimas en los libros de J.K. Rowling.

<!--more-->

Jedusor dejó un enlace a un <a rel="nofollow" href="https://download.wpsoftware.net/bitcoin/wizardry/mimblewimble.txt">whitepaper</a> en el cual describe como utilizando este protocolo se podría mejorar significativamente tanto la escalabilidad como la privacidad de la red de Bitcoin.

Satoshi Nakamoto fue muy sincero en el whitepaper de Bitcoin cuando habló de [las limitaciones de la privacidad de BTC](/es-bitcoin-anonimo/). En él contaba como hay tres campos que serían públicamente conocidos para cualquier transacción realizada:

- La dirección pública del emisor.
- La cantidad de monedas enviadas.
- La dirección pública del receptor.

El motivo por el que necesita hacer esto es para asegurar que un emisor jamás enviará más fondos de los que tiene en su dirección.

Mimblewimble en cambio consigue ocultar estos tres parámetros de una manera compatible a la red de Bitcoin. A diferencia de otras implementaciones de privacidad como [ZCash](/que-es-zcash/) o [Monero](/que-es-monero/) que añaden ofuscación a las transacciones, Mimblewimble obtiene la privacidad eliminando casi toda la información de las transacciones que acaban grabándose en el blockchain.

Imaginad que hago una transacción a Bob, que a su vez hace otra transacción a Carol, que seguidamente se la hace a David. El resultado final es que mis monedas originales están ahora bajo la posesión de David. ¿Por qué entonces mantenemos la información adicional? Mimblewimble elimina toda la información intermedia combinándolos en una sola transacción autorizada.

Las transacciones Mimblewimble son una evolución de dos conceptos ya conocidos en el mundo de Bitcoin:

- **Las transacciones confidenciales**, desarrolladas por un desarrollador de Bitcoin llamado Gregory Maxwell, permiten a los usuarios cifrar el número de monedas que se están enviando ocultándose de cualquier observador externo a la transacción .
- **CoinJoin** (también propuesto por Gregory Maxwell) se trata de un mecanismo en que distintas transacciones son combinadas entre sí con el fin de ofuscar las cantidades emitidas por los distintos usuarios, de tal manera que un observador no puede saber de todos los emisores quién ha enviado exactamente qué cantidad y a qué receptor.

La combinación de ambos conceptos produce un bloque que sencillamente tiene una lista de entradas de dinero, otra lista de salidas y una firma digital, lo cual salva un considerable espacio en el bloque de 1MB característico de la red de Bitcoin porque el resto de la información ya no necesita ser guardada y en consecuencia más transacciones podrían ser incluidas por bloque mejorando la escalabilidad de la red al mismo tiempo que la privacidad.

Mimblewimble puede ser implementado en la red de BTC como un soft fork o un sidechain (igual que Lightning Network) en el que los usuarios mediante *atomic swaps* podrían pasar sus monedas de la red de BTC a la de Mimblewimble y entonces realizar transacciones privadas.

De la misma manera que Bitcoin es un protocolo y Bitcoin Core es una de sus implementaciones, Mimblewimble es un protocolo con varias implementaciones: **Grin**, **BEAM** y, desde 2022, **Litecoin MWEB**.

## Implementaciones de MimbleWimble

### Grin

Grin fue la primera implementación del protocolo MimbleWimble en lanzar su red principal, el **15 de enero de 2019**. A diferencia de la mayoría de criptomonedas, Grin no tuvo ICO, ni preminado, ni recompensa para fundadores: se trata de un proyecto completamente comunitario financiado por donaciones.

Grin utiliza un modelo de emisión lineal sin límite máximo de oferta, similar a la política monetaria que tendría una moneda fiduciaria digital. Sus primeros años incluyeron hard forks programados y cambios en el algoritmo de prueba de trabajo. A día de hoy el proyecto se encuentra en una fase estable de mantenimiento, con contribuciones activas de desarrolladores veteranos como Yeastplume y Tromp, aunque con menor actividad de desarrollo que en sus inicios.

### BEAM

BEAM es la otra implementación principal de MimbleWimble, también lanzada en enero de 2019. A diferencia de Grin, BEAM fue desarrollado por una empresa con sede en Tel Aviv y tiene un enfoque más empresarial. Utiliza los protocolos Lelantus y MimbleWimble combinados para ofrecer privacidad por defecto en todas las transacciones.

BEAM ha ampliado su alcance más allá de los pagos privados, ofreciendo activos confidenciales, un DEX confidencial, NFTs privados e incluso stablecoins con privacidad integrada. Su modelo de gobernanza está en transición hacia un DAO (BeamX DAO), con una emisión deflacionaria que se reduce periódicamente.

### Litecoin MWEB

La adopción más significativa de MimbleWimble llegó el **19 de mayo de 2022**, cuando Litecoin activó los **MWEB (MimbleWimble Extension Blocks)**, la mayor actualización en la historia de la criptomoneda. MWEB permite a los usuarios de Litecoin realizar transacciones confidenciales de forma opcional: los usuarios pueden mover sus LTC a la capa MWEB para ocultar tanto las cantidades como las direcciones de las transacciones.

La adopción ha crecido de forma constante desde su activación:

- Más del 90% de los mineros y nodos de Litecoin validan bloques MWEB.
- Más de 350.000 LTC se encuentran depositados en la capa MWEB.
- Wallets como Litecoin Core, Cake Wallet (desde octubre 2024) y Tristero (desde marzo 2026) soportan transacciones MWEB en escritorio y móvil.

La técnica de *cut-through* heredada de MimbleWimble permite además que los datos de transacciones ya gastadas se eliminen de la cadena, reduciendo el espacio de almacenamiento necesario y mejorando la escalabilidad de Litecoin.

## MimbleWimble y la regulación de las monedas de privacidad

La integración de MWEB en Litecoin también puso de manifiesto la tensión entre privacidad y regulación en el mercado cripto. Tras la activación de MWEB, los cinco principales exchanges de Corea del Sur (Upbit, Bithumb, Coinone, Korbit y Gopax) eliminaron a Litecoin de sus plataformas, clasificándolo como una "moneda oscura" por presunta incompatibilidad con las normas contra el blanqueo de capitales (AML) del país.

Binance, por su parte, anunció que no procesaría transacciones de Litecoin que utilizaran la funcionalidad MWEB, aunque mantuvo el trading convencional de LTC. En los exchanges estadounidenses como Coinbase, Litecoin siguió operando con normalidad.

Este episodio refleja un debate más amplio que afecta a todo el sector de las monedas de privacidad: en 2024, Binance eliminó Monero (XMR) de su plataforma, y OKX hizo lo propio con XMR, DASH, ZEC y ZEN. La privacidad financiera sigue siendo una de las propuestas de valor más importantes de la criptografía, pero choca cada vez más con los marcos regulatorios globales.

## El futuro de MimbleWimble

MimbleWimble ha demostrado ser mucho más que una propuesta teórica publicada en un chat de Bitcoin en 2016. Con implementaciones activas en Grin, BEAM y Litecoin, el protocolo ha probado su viabilidad técnica para mejorar la privacidad y la escalabilidad en blockchain.

El caso de Litecoin MWEB es especialmente relevante: ha demostrado que un protocolo de privacidad puede integrarse en una criptomoneda establecida con una base de usuarios existente, aunque no sin desafíos regulatorios. De cara al futuro, la evolución de MimbleWimble dependerá tanto de los avances técnicos como de la capacidad del ecosistema para navegar el equilibrio entre privacidad y cumplimiento normativo.