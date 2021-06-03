---
title: Qué es Taproot
tags:
- bitcoin
layout: post
description: Qué es Taproot y como beneficia a Bitcoin
banner_image: 202106/taproot.webp
rating: 5
TotalVotes: 12
ref: taproot
---

Una de las principales características de Bitcoin es que no hay ninguna entidad detrás. Esto significa que cualquier cambio realizado sobre la red debe tener un consenso máximo o será rechazado por distintos nodos y se originará una nueva moneda, como ya pasó con [Bitcoin Cash](/que-es-bitcoin-cash/). Realizar los cambios mediante soft-forks garantiza la retro-compatibilidad y además respeta el hecho de que BTC no haya sido hard-forkeado jamás (a diferencia de ETH, BCH y una infinidad de criptomonedas).

Taproot podría ser el cambio más importante desde el incremento del tamaño de bloque realizado mediante el soft-fork de Segwit en 2017. Se realizaría mediante otro soft-fork y parece que hay relativo consenso de que es una funcionalidad a integrar.

<!--more-->


El objetivo de Taproot es cambiar la manera en que BTC funciona para incrementar la privacidad, escalabilidad y seguridad de la red. Esto se consigue funcionando en tandem con las [firmas Schnorr](/que-son-firmas-schnorr/) que son absolutamente necesarias para el correcto funcionamiento de Taproot.

Como es bien conocido, todas las transacciones de la red de BTC son públicas y pueden ser observadas por cualquiera. Existen maneras de intentar mejorar la privacidad como los métodos de *Coin Mixing* y *CoinJoin* aunque ninguna de ellas garantiza privacidad de manera absoluta. Taproot tampoco garantizará este tipo de privacidad pero si mejorará el anonimato de la red.

Taproot permitirá que la red de Bitcoin pueda utilizar ciertas funcionalidades más complejas como:
* Timelocks
* Transacciones Multifirma mejores (Multisig).

El algoritmo de Taproot enmascara estas funcionalidades para que no se puedan distinguir de una transacción normal, y en consecuencia un observador externo no pueda saber si una transacción pertenece a un smart contract, un multisig, una transacción de Lightning Network o una transacción normal.

Taproot fue inicialmente propuesto por el desarrollador de Bitcoin Core Greg Maxwell en enero de 2018. Para verlo en acción será necesario que haya consenso entre los operadores de los nodos y lo instalen en sus máquinas. Dependiendo de cómo se vayan apuntando estos operadores, el proceso puede llevar más o menos tiempo.

Al simplificar este tipo de transacciones no ordinarias, se mejora también la escalabilidad de la red ofreciendo comisiones más bajas, menos espacio ocupado en el Blockchain y más transacciones por segundo que anteriormente.

Además, gracias a Taproot, las firmas digitales ya no serán "maleables", que es uno de los riesgos de la red de Bitcoin.

Se conoce como la maleabilidad de las firmas a la posibilidad de alterar una firma de una transacción antes de que sea confirmada, cancelándola y permitiendo a un potencial tercero realizar un doble-pago, lo cual vulneraría la integridad del blockchain

## Conclusión

Si finalmente Taproot acaba siendo instaurado junto a las firmas Schnorr podremos ver un incremento en la privacidad, seguridad y escalabilidad de la red de Bitcoin. Además la simplificación de las direcciones multisig podrían generar más interés de las grandes corporaciones hacia utilizar Bitcoin, algo muy necesario para su adopción.

