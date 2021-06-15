---
title: Qué son Rollups
tags:
- ethereum
layout: post
description: Qué es un Rollup
banner_image: 202106/rollup.webp
rating: 5
TotalVotes: 3
ref: rollups
---

Existen dos maneras de escalar un ecosistema de blockchain. En primer lugar se puede escalar la blockchain dándole una mayor capacidad, es decir, asegurándonos de que caben más transacciones por bloque.
Esto se ha conseguido en el pasado mediante soluciones como SEGWIT para BTC, SHARDING para Ethereum, o sencillamente incrementando el tamaño de bloque, como hizo Bitcoin Cash (BCH).

<!--more-->

El problema es que soluciones como SEGWIT son muy limitadas y no pueden conseguir un escalado infinito, y soluciones cómo hacer los bloques más grandes tiene otros riesgos: Bloques más grandes son más complicados de verificar y almacenar lo que genera que la red se convierta en más centralizada tal y como dicta el [Trilema de Escalabilidad](/trilema-escalabilidad/).

La segunda manera de mejorar la escalabilidad de una blockchain es mediante soluciones de segunda capa: En lugar de poner toda la información en la primera capa (el blockchain, on-chain), parte de la información y el trabajo de computación se mueve a cadenas alternativas (off-chain) que se sincronizan con la cadena principal. Esto se hace mediante un smart contract en el blockchain que únicamente se dedique a recibir ingresos y retiros y a verificar que todo lo que ocurra off-chain cumple las reglas consensadas. Verificar lo que ocurre off-chain es drásticamente más barato que realizar todas las operaciones que ocurren off-chain en el blockchain principal.

Las tres principales técnicas de escalado en segunda capa de hoy en día son:

- Los canales de estado
- Las redes plasma
- Los rollups

Cada una de ellas tiene sus puntos fuertes y debilidades. En este artículo se revisarán los Rollups:

## Rollups

Las redes plasma y los canales de estado se consideran esquemas de segunda capa "enteros" en el sentido en que mueven tanto la información como la computación a cadenas secundarias off-chain.

Los Rollups en cambio mueven la computación y el almacenamiento del estado off-chain (a la cadena secundaria) y dejan cierta información en la cadena principal. Para mejorar la eficiencia se usan técnicas de compresión para reemplazar la información que se dejaría en la cadena principal con computación siempre que resulte posible. El resultado en un sistema todavía limitado en cuanto a escalabilidad pero con mejoras sustanciales, por ejemplo en Ethereum para un token ERC20, una transferencia podría pasar de costar 45000 gas a 300 gas.

Lo que queda en el blockchain principal es cierta información general y de verificación, y esto permite que otras personas puedan a partir de esta información:

- Detectar si ha habido fraude en el rollup.
- Realizar retiros de fondos.
- Realizar transacciones.

Al existir esta información en el blockchain principal, cualquier persona puede verificar que un rollup ha funcionado de manera correcta y detectar posibles fraudes y en consecuencia se hacen más seguros.

Además, esto permitirá que se puedan correr EVM (y en consecuencia smart contracts) dentro de los rollups en la segunda capa y mejorando enormemente la escalabilidad de la red.

Existen dos tipos de Rollups:

- **Rollups Optimistas**: Usan prueba de fraude: mantiene todo el historial de hashes lo cual permite a cualquiera verificar cada uno de los procesos. Si alguien encuentra alguna inconcurrencia puede publicarlo en la cadena y una vez verificado por el contrato se revertirán las transacciones asociadas.
- **ZK-Rollups**: Usan Validez de pruebas: Cada grupo de procesos incluye pruebas criptográficas de tipo zk-snark que demuestran que cada proceso es correcto.

{:.table.table-striped.table-bordered.table-hover.table-condensed.table-collapsable}
|                                              | Optimistic Rollups                              |     Zk Rollups         |
|:--------------------------------------------:|:-----------------------------------------------:|:----------------------:|
| **Coste del gas por batch**                      |~40,000 (para una transacción simple)       |	~500,000 (la verificación de un ZK-SNARK es costosa) |
| **Periodo de retiro**                        |~1 semana (para dar tiempo a la detección del fraude) |	Muy rápido.
| **Complejidad de la tecnología**                 |Baja                                             |	Alta (los ZK-SNARKs son muy complicados) |
| **Generalización**                           |Fácil                                            |	Más difícil |
| **Coste del gas por transacción on-chain**       |Alta (se debe publicar información extra para permitir verificaciones de fraude) |	Baja
| **Costes de computación en la cadena secundaria**|	Bajos (aunque otros nodos tendrán que rehacer la computación para verificarla) |	Alta (un ZK-SNARK puede ser miles de veces más caro que la computación en sí) |

En general, por los costes de computación de cada tipo, parece que que los optimistic rollups se podrían utilizar para computaciones de smart contracts mediante EVM mientras que los ZK rollups podrían usarse para pagos simples, aunque esto podría cambiar si la tecnología de ZK-Snarks mejora con el tiempo.

## Conclusiones

Los rollups son una poderosa herramienta para escalar en segunda capa, y se espera que se convierta en una parte fundamental del escalado de Ethereum.
El motivo por el cual han recibido tanto hype por la comunidad es debido a que, a diferencia de otras técnicas de escalado en segunda capa, soportan código de EVM, lo cual permite smart contracts en segunda capa.


<a href="https://vitalik.ca/general/2021/01/05/rollup.html" rel="nofollow">Fuente</a>