---
title: Qué es Mimble Wimble
date: 2018-10-25 00:00:00 Z
tags:
- bitcoin
layout: post
description: El soft fotk de Bitcoin (BTC) Mimble Wimble explicado
banner_image: 201810/mimblewimble.jpg
rating: 5
totalVotes: 3
lang: es
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

Actualmente Mimblewimble puede ser implementado en la red de BTC como un soft fork o un sidechain (igual que Lightning Network) en el que los usuarios mediante *atomic swaps* podrían pasar sus monedas de la red de BTC a la de Mimblewimble y entonces realizar transacciones privadas. 

De la misma manera que Bitcoin es un protocolo y Bitcoin Core es una de sus implementaciones, Mimblewimble es un protocolo y Grin y BEAM son dos implementaciones del mismo actualmente en desarrollo. 

Soluciones como ésta son las que apuntan a que la escalabilidad de la red de Bitcoin acabará siendo solucionada sin necesidad de realizar un hard fork y en consecuencia deprecando una gran cantidad de altcoins como Bitcoin Cash del mercado.