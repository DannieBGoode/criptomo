---
title: El Trilema de escalabilidad
date: 2018-06-07 00:00:00 Z
tags:
- tecnologia
layout: post
description: El compromiso entre descentralización, seguridad y escalabilidad.
banner_image: 201806/buildings.jpg
rating: 5
totalVotes: 4
lang: es
---

En muchas ocasiones se critica a Bitcoin o Ethereum por el reducido número de transacciones que son capaces de soportar, y rápidamente se habla de que otras plataformas como EOS, IOTA, Hashgraph o Ripple son capaces de soportar muchísimas más transacciones por segundo, y en ocasiones incluso de manera gratuita, deprecando totalmente otras tecnologías anteriores.

<!--more-->

Por ejemplo, con el lanzamiento de la aplicación <a rel="nofollow" href="https://www.cryptokitties.co/">CryptoKitties</a> construida sobre Ethereum se congestionó la red lo cual levantó duras críticas sobre el objetivo de Ethereum de ofrecer lo que ellos denominan la Web 3.0.

Aunque pueda llegar a ser posible que Bitcoin o Ethereum acaben siendo destronados durante los próximos años es importante analizar ciertos aspectos de las soluciones candidatas.

Vitalik Buterin describió lo que <a rel="nofollow" href="https://github.com/ethereum/wiki/wiki/Sharding-FAQ#this-sounds-like-theres-some-kind-of-scalability-trilemma-at-play-what-is-this-trilemma-and-can-we-break-through-it">él mismo denominó el Trilema de Escalabilidad</a>, que describe como cualquier sistema basado en blockchain solo puede cumplir dos de las tres siguientes propiedades:

- **Descentralización**, resistencia a la censura y evitar los puntos de fallos únicos.
- **Escalabilidad**, poder procesar un gran número de transacciones por segundo.
- **Seguridad** ante [ataques del 51%](/ataque-51-porciento/) o equivalentes.

#### Sacrificar descentralización

Si analizamos algunas de las criptomonedas que dicen ser mejores que Bitcoin o Ethereum debido a su escalabilidad:

- [EOS](/que-es-eos/) consigue un gran número de tps y transacciones gratuitas sacrificando la descentralización, puesto que únicamente hay 21 nodos validadores en todo momento.
- [Ripple](/que-es-ripple/) sacrifica la descentralización ya que cuenta con 425 nodos en todo el mundo controlados por ellos mismos y en cualquier momento pueden imprimir más XRPs o congelar los fondos de cualquier cuenta.
- [DASH](/que-es-dash/) sacrifica la centralización por que aunque cualquier persona podría tener su propio masternode que valide transacciones, el coste de tener suficientes tokens como para poder montar un nodo (1000 DASH) no está al alcance de cualquiera. Para que exista un alto nivel de descentralización es necesario que haya una barrera muy pequeña de acceso de individuos a la red.
- [IOTA](/que-es-iota/) ofrece un sistema de transacciones gratis y teóricamente escalable, pero es importante recordar que hasta que eliminen al elemento coordinador, su solución es totalmente centralizada, y queda por ver si resultará posible eliminarlo.

**Sacrificar la descentralización podría llegar a ser aceptable en un entorno empresarial donde haya un gran nivel de confianza en los nodos validadores, pero debemos tener muy en cuenta que un sistema así es vulnerable a la censura y a abusos de poder**.

#### Sacrificar Escalabilidad

Sacrificar la escalabilidad podría de nuevo llegar a ser aceptable en un entorno cerrado, privado o limitado pero no es algo que pueda ser aceptado si se pretende crear un sistema de pagos internacional con miles de transacciones por segundo.

[Bitcoin Cash](/que-es-bitcoin-cash) ha decidido mejorar la escalabilidad que Bitcoin sacrifica subiendo el tamaño de sus bloques (pero esto deteriora la descentralización al encarecer los costes de montar un nodo).

#### Sacrificar Seguridad

Sacrificar la seguridad no resulta de ningún modo aceptable, puesto que un sistema vulnerable a ataques del 51% permite a un atacante poder realizar pagos infinitos rompiendo el valor de la criptomoneda como medio de pago.

### Conclusión

Tal vez más adelante alguien dé con la solución al trilema, pero por el momento es necesario tener en cuenta que ninguna criptomoneda ha demostrado ser perfecta.

Así como para un entorno empresarial podría ser una solución sacrificar descentralización, a medida que perdemos nivel de confianza en nuestras transacciones, como en nuestros pagos del día a día con desconocidos nos interesa tener un sistema descentralizado y escalable a medida que más gente lo utiliza. El consenso en las comunidades de Bitcoin y Ethereum es que las soluciones óptimas para ello es manejar la escalabilidad fuera de la cadena (soluciones de segunda capa) utilizando The Lightning y The Raiden Networks respectivamente. Estas soluciones se basan en realizar el mayor número posible de transacciones fuera del blockchain, y sólo escribir en éste el resultado final de las operaciones.
