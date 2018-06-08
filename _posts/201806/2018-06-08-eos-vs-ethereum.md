---
layout: post
title:  EOS vs Ethereum
description: Comparación de EOS y Ethereum, diferencias em ambas plataformas de smart contracts.
banner_image: 201806/boxing.jpg
rating: 5
totalVotes: 3
tags: [altcoins]
---

EOS ha sido bautizada en muchas ocasiones como un mejor Ethereum, o el Ethereum Killer, pero ¿realmente lo es? Analicemos las diferencias de ambas plataformas más a fondo.

<!--more-->

[EOS](/que-es-eos/) está reconocida por haber tenido la ICO con más éxito de la historia (4.000 millones de dólares) y ofrecer una plataforma de creación de smart contracts con transacciones gratuitas, consenso rápido y escalabilidad para miles de transacciones por segundo. [Ethereum](/que-es-ethereum) está considerada la plataforma más extendida de desarrollo y ejecución de smart contracts, pero en cambio sus operaciones tienen un coste económico en *gas*, y soportan a día de hoy pocas transacciones por segundo. Aunque ya analizamos las principales críticas que se suelen hacer a sistemas con baja escalabilidad como Bitcoin y Ethereum en el artículo [el Trilema de la Escalabilidad](/trilema-escalabilidad/), vamos a indagar más en qué diferencia a ambas tecnologías.

## Diferencias

### Ecosistema

En Ethereum ya existen muchos smart contracts funcionando y además hay muchas criptomonedas activamente utilizando el modelo ERC-20 de Ethereum. En EOS los smart contracts todavía son teóricos puesto que la plataforma todavía no está lanzada aunque si es cierto que EOS pretende ofrecer muchas más funcionalidades que Ethereum. Recordemos que Ethereum se ha declarado agnóstica a las posibles aplicaciones que se puedan construir sobre él y se considera únicamente una plataforma sobre la cual los demás pueden construir.

### Inmutabilidad de los smart contracts

En Ethereum una vez un smart contract ha sido desplegado no puede ser modificado fuera de las reglas programadas en el mismo. Esto puede tener daños catastróficos sobre las aplicaciones si se encuentran bugs a posteriori, como fue en el caso del DAO cuando se originó Ethereum Classic.

En EOS los contratos con bugs pueden ser congelados y arreglados sin necesidad de forkear todo el blockchain, lo cual es bueno por un lado, pero por otro lado es un gran riesgo si una entidad central puede modificar sus contratos cuando le plazca.

### Transacciones por segundo

Ethereum utiliza [PoW](/que-es-proof-of-work/) y permite actualmente 10-16 tps, más adelante con Casper y Sharding se modificará su algoritmo de consenso a PoS y con the Raiden Network y Plasma escalará offchain a decenas de miles de transacciones. Vitalik Buterin, una de las mentes más brillantes del espacio de las criptomonedas y creador de Ethereum ha comentado en varias ocasiones que Ethereum llegará a superar a VISA en tps sin necesidad de sacrificar su descentralización dentro de algunos años.

EOS utiliza dPOS, lo que le permite soportar 1000-8000 tps pero en consecuencia sacrifica la descentralización del sistema y por tanto su seguridad a la censura y la manipulación ya que un pequeño grupo de nodos son los encargados de validar todas las transacciones del sistema.

### Tasas de ejecución de smart contracts

En los smart contracts de Ethereum un usuario debe pagar la ejecución del contrato inteligente que desea ejecutar en *gas*. En cambio en EOS, un smart contract consumirá recursos de la red (y por tanto se ejecutará) en función de cuántos tokens EOS sus desarrolladores tengan en su posesión. Este segundo enfoque es todavía muy experimental y no se sabe bien qué consecuencias podría tener sobre la red. Por ejemplo si un smart contract tiene un bug que causa un bucle infinito, en Ethereum el bucle existiría hasta que se gastase el gas mientras que en EOS continuaría ejecutándose para siempre ocupando los recursos computacionales acordes al número de tokens de EOS con los que cuentan los creadores del contrato.

En otras palabras, si una entidad por algún motivo produce un bucle infinito en el código de un contrato inteligente independientemente de si es accidental ó con buenas o malas intenciones en EOS podría ocupar los recursos de toda la red para siempre (o hasta que se congele y modifique el contrato).

### Lenguaje de programación

Los smart contracts en Ethereum se escriben en Solidity, un lenguaje inventado expresamente para ello basado en javascript, que es el lenguaje más extendido del mundo. Esto le ha llevado a tener un grado de adopción muy alto. Adicionalmente están desarrollando otro lenguaje denominado Vyper que está basado en python que también resulta muy popular.

EOS utiliza C++ que es mucho más complicado de utilizar, por lo que no estará a mano de tantos desarrolladores como los de Ethereum. Por otro lado C++ permite escribir código de mucho más bajo nivel lo cual puede resultar en código más eficiente en cuanto a recursos utilizados.

### Gobernanza

La gobernanza es la capacidad de los usuarios de elegir el camino de una criptomoneda. Ethereum ofrece gobernanza fuera de la cadena pero en consecuencia permite en general reducir la confianza que se debe tener sobre otros miembros de la comunidad.

EOS en cambio incluye un modelo de gobernanza directamente en su blockchain desde el primer día contando con un sistema de votaciones, lo cual ha sido <a rel="nofollow" href="https://vitalik.ca/general/2018/03/28/plutocracy.html">duramente criticado por Vitalik Buterin ya que la hace vulnerable a sobornos a los miembros votantes</a>.

### Centralización

Ethereum se caracteriza principalmente por su descentralización, motivo principal por el cual no permite una gran tasa de tps directamente en el blockchain (aunque como hemos comentado anteriormente si las permitirá off-chain). EOS en cambio cuenta con 21 productores de bloques capaces de validar transacciones muy rápido y escalar muy eficientemente, pero que en algún escenario podrían tener intereses propios que les pudieran llevar a abusar del sistema.

Ethereum actualmente cuenta con más de 25000 nodos, más que ninguna otra criptomoneda (incluyendo Bitcoin). Cualquier persona puede montar su propio nodo lo cual ralentiza enormemente el consenso y por tanto decrementa el número de tps.

## Opinión

Es importante destacar que Ethereum debe arreglar su escalabilidad cuanto antes. Si no consigue hacerlo, plataformas como EOS, TRON, ICON, Cardano o Lisk podrían acabar haciéndose con su clara posición de ganador en cuanto a plataforma de creación de smart contracts. Teniendo en cuenta la cantidad de atención que está recibiendo este tema y el talento en la Ethereum Foundation, veo bastante posible que esta escalabilidad se acabe solucionando.

También existe un escenario donde tanto EOS como Ethereum acaben coexistiendo; EOS podría acabar utilizándose más cuando se confíe en los creadores del smart contract, potencialmente en entornos empresariales, aprovechando sobretodo la capacidad de actualizar contratos inteligentes ya desplegados. Ethereum podría ser más útil para saltarse censura gubernamental, o incluso habilitar contratos que ni empresas ni gobiernos puedan echar atrás. Es fácil imaginar un smart contract de devolución de fondos a los clientes en caso de que un avión llegue tarde como ya mencionamos en el artículo de [smart contracts](/que-es-un-smart-contract/) que las aerolínas no podrían intervenir.

Ambas tecnologías tienen mucho trabajo pendiente antes de ser realmente utilizables en escala masiva pero lo que resulta obvio es que el mundo va a cambiar drásticamente gracias a ellas.
