---
title: Qué ocurre si se minan dos bloques simultáneos
date: 2020-06-06 00:00:00 Z
tags:
- bitcoin
layout: post
description: Qué ocurre si en Bitcoin si se minan dos bloques simultáneos
banner_image: 202006/btc-coin.webp
rating: 4.5
totalVotes: 11
lang: es
ref: two-blocks
---

¿ Qué ocurre si dos mineros minan el mismo bloque al mismo tiempo ? ¿ Cual de los dos bloques será aceptado antes? ¿ Quién se lleva la recompensa de bloque?

<!--more-->

En primer lugar debemos aclarar que aunque los dos mineros hayan minado un bloque aceptable, con casi todo seguridad serán distinto entre ellos. No se trata de exactamente el mismo bloque. Esto es debido a que cada minero habrá elegido unas transacciones distintas del mempool y las habrá añadido en su bloque en el orden en que hayan considerado adecuado. A continuación cada minero habrá resuelto su propio bloque con el *nonce* encontrado por [Proof of Work](/que-es-proof-of-work) que da solución a su bloque tal y como lo han construido.

Llegados a este punto nos encontramos con dos bloques resueltos perfectamente válidos para ser el siguiente añadido al Blockchain y en consecuencia otorgar la recompensa de bloque al minero responsable.

En este momento, la decisión sobre qué bloque será elegido depende de todos los demás mineros de la red.

Ambos bloques serán propagados por la red y los distintos mineros añadirán el primero que reciban a su copia del blockchain, aceptando temporalmente a ese minero como ganador, aceptando que se lleve la recompensa. Inmediatamente después se pondrán todos a intentar resolver el siguiente bloque.

Esto quiere decir que durante un pequeño intervalo de tiempo, existirán dos versiones distintas del blockchain, ambas igualmente válidas.

Dependiendo de distintos factores, como la fuerza computacional de los mineros de cada versión o incluso la suerte, pronto un siguiente bloque será descubierto en una de las dos versiones antes que en la otra. Cuando la versión más larga empiece se propague por la red, los mineros que habían aceptado la otra versión no tendrán más remedio que descartar en la que estaban trabajando puesto que en Proof of Work, **el blockchain más largo siempre gana**, (entendiéndose como más largo a aquel que tiene más trabajo computacional acumulado).

Cuando la versión rechazada del blockchain sea descartada todas aquellas transacciones incluidas en este bloque quedan rechazadas ( a no ser que hayan sido en uno de los bloques siguientes ya aceptados) y serán devueltas al mempool para que los mineros las vuelvan a tener en consideración.

El bloque descartado recibe el nombre de bloque huérfano y a su minero les desaparecerá la recompensa de bloque de su balance.

{% include image_caption.html imageurl="/images/posts/202006/orphan.webp" title="Inflación" popup=true %}

### ¿Podría el minero no-ganador haber gastado su recompensa antes de que le quiten su recompensa de bloque?

Todas las transacciones realizadas dentro del blockchain sobre el bloque huérfano quedan descartadas, como si nunca hubieran existido. Por lo que daría igual que el minero intentara mover su recompensa entre wallets, el resultado final sería que esas operaciones nunca han existido.

Lo que si que podría intentar el minero es intentar pagar algo en un establecimiento físico con sus BTC, y con suerte haber abandonado la tienda antes de que su bloque sea descartado.

Es por eso que en transacciones en el mundo real se considera correcto esperar a las 6 confirmaciones para dar el pago como seguro. Es decir, se espera a que haya 6 bloques aceptados encima del que contiene una transacción para considerar que el bloque ya no se quedará huérfano.

Considerando que cada bloque tarda una media de 10 minutos, esto no resulta muy práctico a la hora de usar BTC en comercios físicos, por suerte soluciones de segunda capa como Lightning Network permitirán a los usuarios realizar pagos instantáneos con sus BTC.

Los diez minutos de tiempo de bloque se consideran un equilibrio perfecto para evitar que haya demasiados bloques huérfanos y al mismo tiempo la red pueda operar. Si el tiempo de bloque fueran unos pocos segundos, habría muchísimos bloques huérfanos y montones de versiones de blockchains al mismo tiempo, lo cual resultaría un tanto caótico y nada usable.

