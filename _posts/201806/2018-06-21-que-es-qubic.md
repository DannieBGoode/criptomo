---
title: Qué es Qubic (IOTA)
date: 2018-06-21 00:00:00 Z
tags:
- altcoins
layout: post
description: La de la nueva plataforma de smart contracts, alquiler computacional
  y asambleas de oráculos de IOTA, Qubic.
banner_image: 201806/qubic.jpg
rating: 5
totalVotes: 4
lang: es
---

Qubic es un protocolo que especifica una solución para cálculos computacionales basadas en quorum de [IOTA](/que-es-iota/), incluyendo smart contracts, oráculos y alquiler de poder computacional. De esta manera Qubic permite realizar dichas tareas directamente en el Tangle habilitando a potencialmente millones de personas de hacer uso de potencia computacional no aprovechada mientras ayudan a escalar el Tangle de manera segura.

<!--more-->

## Oráculos

Cuando se procesan computaciones que involucran a una base de datos como el Tangle, es complicado obtener información fiable que venga del mundo real. Qubic presenta un sistema de asambleas de oráculos que recompensa a los sistemas fiables y penaliza a los que no lo son.

Algunos ejemplos de información que se podría recoger de oráculos que en consecuencia significará la ejecución de smart contracts en el tangle podrían ser:

- Controles de temperaturas.
- Valores de acciones de bolsa en el mercado.
- Atributos personales, como edad o estado civil.
- Resultados electorales.

{% include image_caption.html imageurl="/images/posts/201806/oracles.png" title="Qubic Oracles" caption="Un oráculo podría grabar en el Tangle las variaciones de precio EUR/USD" popup=true %}

## Alquilar poder computacional

Poder alquilar poder computacional permitirá a pequeños dispositivos de IOT caracterizados por chips baratos, baterías limitadas y memoria reducida obtener poderes de computación muy superiores a cambio de un pago en IOTAs. El protocolo de Qubic permite a cualquier dispositivo solicitar o alquilar estos servicios. Adicionalmente, **por fin existe un incentivo claro para mantener un nodo completo del protocolo de IOTA** que siempre ha sido una de las críticas más fuertes hacia esta criptomoneda, al no tener tasas de transacción ni inflación.

Por ejemplo, en un escenario donde un hogar tiene sus paneles energéticos instalados y por tanto tiene energía de sobra, podría alquilar la potencia de los equipos que tenga en casa a cambio de IOTAs mientras no los esté utilizando. El protocolo impediría que la persona que alquila supiese el motivo por el cual se está alquilando o pudiese supervisar los cálculos.

## Smart Contracts

Los [contratos inteligentes](/que-es-un-smart-contract/) eliminan la necesidad de tener a un tercero imponiendo el cumplimiento de las condiciones acordadas en el código del contrato. Existen varias plataformas que permiten la creación de smart contracts, entre las más famosas se encuentran [Ethereum](/que-es-ethereum), [EOS](/que-es-eos) o [Cardano](/que-es-cardano). Con Qubic, IOTA se añadiría a esta lista convirtiéndose en la primera aplicación que basa la ejecución de sus contratos en tecnología Tangle en lugar de Blockchain. Recordemos que al igual que en EOS, las transacciones en IOTA son gratuitas en cuanto a costes de transacción, lo cual podría abrir un abanico nuevo de casos de uso. Por otro lado, Qubic no es <a rel="nofollow" href="https://es.wikipedia.org/wiki/Turing_completo">Turing completo</a>, por lo que los bucles (incluyendo los accidentales) que se van a poder a hacer en los contratos inteligentes estarán más limitados que en Ethereum o EOS, aunque todavía está por ver si esto es positivo o no.

{% include image_caption.html imageurl="/images/posts/201806/contracts.png" title="Qubic Smart Contracts" caption="Un smart contract podría recopilar del tangle la relación EUR/USD y utilizarla para ajustar los precios de los servicios de un negocio" popup=true %}

Un ejemplo de un contrato inteligente que se podría hacer es un código que recopile información de temperatura de distintos oráculos y publiqué la media en el Tangle, lo cual convertiría al propio contrato en otro oráculo más.

Se ha creado un lenguaje de programación denominado *Abra* para facilitar el uso eficiente de la plataforma de IOTA.

> Abra es un lenguaje trinario porque los sistemas trinarios pueden llegar a proveer grandes ahorros energéticos cruciales para los dispositivos IOT. Un dígito trinario (un trit) puede representar 1.58 bits. La cantidad de cableado necesario para un sistema trinario podría por lo tanto ser decrementado un 64% respecto a los sistemas binarios. <cite>Fundación IOTA</cite>


## Opinión

Es bastante asombroso todo lo que la fundación IOTA tiene en su roadmap, planean:
- reemplazar a las plataformas de contratos inteligentes como Ethereum
- ofrecer alquiler de procesamiento como Golem
- minimizar el problema de los oráculos.

Resulta obvio que van a tardar bastantes años en poder ofrecer todo el ecosistema que plantean, además de que cambiar el estándar de binario a trinario me resulta una quimera a día de hoy que podría crear grandes fricciones y divisiones en la comunidad digital global.

Aún así Qubic recoge muchas de las mejores ideas que se han planteado durante los últimos años en el mundo de las criptomonedas y añade algunas propias en un solo ecosistema sin tasas de transacción, lo cual no es algo que se deba pasar por alto.

Podeis encontrar más información en la <a rel="nofollow" href="https://qubic.iota.org/intro">web oficial de Qubic</a>.


