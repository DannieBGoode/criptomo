---
title: Cómo funcionan los robos de criptomonedas
date: 2018-03-14 00:00:00 Z
tags:
- seguridad
layout: post
description: Qué ha obtenido exactamente un hacker cuando roba criptomonedas y maneras
  de poder evitarlo.
banner_image: 201803/hacker.jpg
---

Cuando hablamos de robos de criptomonedas, hay un concepto que frecuentemente es malentendido: En general, los tokens de criptomonedas no existen. Lo único que existe son las transacciones asociadas a ellas.

<!--more-->

Cuando un wallet muestra un balance en realidad se trata de la suma de todas las transacciones confirmadas por la red en el pasado. Un usuario que pierde su clave privada habrá perdido sus criptomonedas no porque no sepa donde están (estarán a la vista de todos en su dirección en el blockchain en todo momento) sino debido a que su clave privada es la única capaz de generar la firma digital asociada a la dirección donde están almacenadas que será aceptada por el resto de la red como válida.

Esto explica el hecho de que cuando un hacker roba Bitcoins no está robando los tokens en sí. Lo que ha hecho es conseguir la clave privada de un wallet con balance positivo, y enviar los tokens ahí almacenados a otro wallet del cual sólo él tenga la clave privada. Este intercambio sería aceptado por la red puesto que la firma digital sería correcta y quedará reflejado en el historial del blockchain de por vida.

Es por ello por lo que nunca se recomienda almacenar criptomonedas en un exchange como podrían ser Binance o Coinbase, puesto que estas webs no ceden las claves privadas de los wallets que poseen las criptomonedas de sus usuarios, sino que únicamente les prometen que honrarán su decisión de sacar los fondos cuando así lo deseen.

La persona afectada por un robo entraría con normalidad a su wallet y de repente observaría una transacción saliente de su dirección a otra desconocida, como si de un simple pago o transferencia se tratase. Además podría utilizar herramientas como <a rel="nofollow" href="https://blockchain.info">Blockchain.info</a> para seguirle el rastro a esas transacciones, pero nunca solicitar que sus fondos sean devueltos.

**Es importante mantener la clave privada almacenada de una manera segura, pero también es importante que no utilicemos servicios online de los cuales no nos fiemos para generar seeds o claves privadas**. Recientemente hubo un caso de miles de tokens de IOTA robados de wallets porque los usuarios usaron un generador de seeds online construido y publicado precisamente para ese propósito: los seeds generados para los usuarios eran enviados previamente a los creadores de la plataforma maligna, por lo que no importaba lo bien que los usuarios guardaran sus seeds en secreto, estaban vulnerados de origen.

Una vez un hacker ha robado tokens, su siguiente paso sería intentar cambiarlos por dinero fiat. Recordemos que todas las transacciones del blockchain son por lo general públicas y pueden monitorizarse a través de plataformas como Blockchain.info, por lo que en el momento en que el hacker envuase sus fondos a un exchange como Coinbase para intentar cambiarlos por dólares, debido a que Coinbase obliga a los usuarios a verificarse mediante sus protocolos de KYC, podría ser identificado y llevado a la justicia. Para dificultar esto, existen plataformas que blanquean tokens dividiéndolos en fracciones muy pequeñas y mezclandolos con los de otros usuarios con el fin de dificultar su seguimiento (aunque nunca podrá perder su rastro de manera definitiva). Es habitual que los ladrones hagan uso de estas plataformas para intentar perder el rastro de la gente que los esté intentando identificar.

Aun así la mayor parte de los hackers no intercambian sus fondos robados por fiat, si no que los mantienen en sus wallets, tal vez con la esperanza de alguna oportunidad de poder blanquearlos más limpimamente o gastarlos en el futuro sin descubrir su identidad.

La única criptomoneda que es totalmente fungible y no puede ser trazada de ninguna manera es [Monero](/que-es-monero/), por lo que robos de tokens de Monero son virtualmente imposibles de recuperar.

