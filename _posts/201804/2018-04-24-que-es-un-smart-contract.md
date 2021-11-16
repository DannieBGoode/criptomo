---
title: Qué es un Smart Contract
date: 2018-04-24 00:00:00 Z
tags:
- altcoins
layout: post
description: Qué es un smart contract, también llamado contrato inteligente. El problema
  de los oráculos.
banner_image: 201804/agreement.jpg
rating: 5
totalVotes: 1
lang: es
---

Un smart contract, o contrato inteligente, es un programa de ordenador que reside directamente en el blockchain por lo que ninguna entidad debería tener acceso directo sobre ella. Su labor es la de verificar y ejecutar los términos acordados en un contrato sin la necesidad de un tercero y sus operaciones son irreversibles, traceables y transparentes. El concepto de smart contract fue inicialmente propuesto por Nick Szabo en 1996 pero es con el auge de la tecnología blockchain cuando realmente han encontrado su oportunidad de brillar.

<!--more-->

El motivo del concepto de los smart contracts es tener contratos que se ejecutan independientemente de poderes superiores a los participantes y además eliminar los costes de transacción propios de un contrato así. Ya son varias las criptomonedas que pretenden crear una plataforma de contratos inteligentes, entre ellas:

- [Ethereum](/que-es-ethereum/)
- [Cardano](/que-es-cardano/)
- [EOS](/que-es-eos/)
- [NEM](/que-es-nem/)
- Rootstock (RSK)
- NEO

Los smart contracts pueden facilitar el intercambio de dinero, servicios, propiedades, participaciones o cualquier otra bien de valor de una manera transparente y sin necesidad de un intermediario. En su código se definirían las condiciones y las penalizaciones y es muy importante que todos los posibles escenarios sean cubiertos puesto que **un smart contract no puede ser modificado una vez desplegado al blockchain**.

> En los smart contracts, un bien o una divisa podrían ser transferidos a un programa que cuando verifique que unas condiciones específicas han sido cumplidas, se ejecutara automáticamente decidiendo a donde deberían ir a parar los fondos que posee. Debido a que el blockchain almacena el código, éste resulta seguro e inmutable. <cite>- Vitalik Buterin, creador de Ethereum.</cite>

Los contratos inteligentes residen en el blockchain, cuando se dan las condiciones preestablecidas, todos los equipos ejecutan en sincronía el código y graban en el blockchain el resultado de su operación. Estamos ante la primera vez en la historia en la que un programa de ordenador puede poseer bienes financieros, algo para lo cual las leyes no están preparadas todavía. Los fondos de un contrato inteligente pertenecen a sí mismo, y es imposible extraerlos rompiendo las propias reglas que lo definen.

### Problemas de los smart contracts

#### Inmutabilidad y Transparencia

La inmutabilidad y transparencia de los smart contracts no son accidentales, sino que eran precisamente el objetivo desde el principio: tener smart contracts públicos y no censurables. Lo que tal vez si era más inesperado eran las consecuencias que han traído consigo:

- Debido a que el código de un smart contract es inmutable, aquel código que sea subido al blockchain no puede ser modificado fuera de las reglas establecidas en el mismo código. Esto quiere decir que un posible error de programación podría acabar resultando catastrófico y ocasionar la pérdida de fondos o provocar comportamientos inesperados por parte del contrato.

- Adicionalmente un smart contract es transparente, puesto que al subirse al blockchain su código es público y puede ser auditado por cualquier persona. Esto es muy positivo para poder revisar contratos antes de decidir hacer uso de ellos, pero por otro lado, cualquier agujero de seguridad que el contrato pudiera tener es visible por todos aquel lo suficientemente experimentado como para identificarlo.

Esto fue el caso del DAO, una plataforma de crowdfunding construida sobre Ethereum que contenía fondos por valor de 50 millones de dólares de distintos inversores, que se llevaron las manos a la cabeza cuando una sola línea de código mal colocada permitió a un hacker empezar a extraer fondos lentamente del contrato. Esto resultó ser un tema muy discutido en su momento y finalmente se decidió solucionar el problema creando un hard fork, una nueva versión de Ethereum donde el DAO nunca había ocurrido, devolviendo a los inversores sus fondos. Los puristas en cambio, decidieron seguir manteniendo el blockchain anterior, que se pasó a denominar Ethereum Classic (ETC), puesto que defienden que un error en un contrato es responsabilidad de los autores del contrato y no de la plataforma en sí.

En 2017 otro error de programación en el smart contract que mantenía el wallet de Ethereum *Parity* ocasionó la pérdida de los fondos de todos los usuarios que allí los tenían almacenados, un total de 300 millones de dólares (513000 ETH). La Ethereum Improvement Proposal EIP-999, es una propuesta que sugiere volver a hacer un hard fork de Ethereum para que todos esos usuarios recuperen sus fondos, pero que bien podría ocasionar que hubiera una nueva moneda que dividiese a la comunidad como ya ocurrió con ETC.

Un hard fork es un proceso complicado y peligro por lo que resulta obvio que no se va a poder hacer uno cada vez que alguien escriba un smart contract con errores, problema que se está intentando solucionar de varias maneras:

- Evidentemente las empresas que hagan uso de ellos van a tener que invertir enormemente en procesos de testing y calidad para evitar problemas como éstos.
- Es posible programar smart contracts que puedan ser modificados dadas ciertas condiciones, pero cuanta más flexibilidad tiene un smart contract una vez sellado y subido al blockchain menos fiable resulta puesto que las condiciones inicialmente acordadas por los participantes podrían ser modificadas a favor de una de las partes.
- EOS ha planteado un modelo donde smart contracts defectuosos podrían ser congelados y mediante un sistema de votaciones, se podrían proponer soluciones en su código que arreglasen el agujero de seguridad. Un modelo que parece ser un punto intermedio pero que a los puristas del código tampoco les acaba de convencer.


#### El Problema de los Oráculos

Otro de los problemas que presentan los smart contracts es el conocido como Problema de los Oráculos.

Para poder explicarlo, primero es importante entender **qué es un oráculo**:

Un oráculo es un proveedor de información externa a un smart contract. Puesto que un contrato inteligente puede necesitar información importante del mundo exterior como condiciones de su ejecución es importante cuestionarse la validez de la información que un oráculo provee. Por muy perfecto que resulte el código del contrato, si su punto de entrada de información puede ser manipulado el contrato pierde toda su validez. Es por ello que la solución de tener un oráculo centralizado que provee su versión de los hechos no es considerada una solución aceptable.

Pongamos un ejemplo en el que una aerolínea decide construir un smart contract que devuelve el dinero a los pasajeros si un avión es cancelado o llega tarde. Para que este smart contract funcione correctamente, necesitará información respecto a qué vuelos hay y cuales son sus horas estimadas y reales de llegada. Podría resultar natural pensar que quién mejor para proveer esta información que la aerolínea en sí, por lo que ella montaría un Oráculo que alimentaría directamente a dicho smart contract.

Ahora bien, si de repente un avión llega lo suficientemente tarde como para que deba devolver todos los billetes a los pasajeros, la aerolínea podría decidir evitar estas importantes pérdidas económicas manipulando el oráculo que ellos mismos controlan, informando al contrato inteligente de que el avión efectivamente ha llegado a su hora correcta.

¿Por qué a las aerolíneas le iban a interesar un sistema así?

A pesar de que un sistema de reembolsos automáticos podría suponer un ahorro de costes importantes en operaciones manuales y lentas que requieren tener varias personas en nómina, puede parecer obvio que aún así no le va interesar automatizar este sistema. Pero esto no es una decisión que pueda o deba tomar una aerolínea, conforme los smart contracts empiecen a tener más presencia, serán los propios clientes los que se negarán a viajar con aerolíneas que no cumplan con estos requisitos y más adelante podría incluso ser impuesto como ley por el gobierno con el fin de proteger a los consumidores. Es exactamente el mismo recorrido que tuvo el cinturón de seguridad en los coches, al principio no existía, después de inventarse empezó a ser casualmente utilizado, para finalmente ser de uso obligatorio impuesto por ley.

Otras posibles preguntas que un oráculo podría acabar alimentando a un smart contract podrían ser:

- ¿Ha ganado el Real Madrid ?
- ¿Ha llovido hoy?
- ¿Se han conseguido los suficientes fondos en la ronda de inversión?
- ¿Ha subido la acción de Apple?

Todas ellas podrían desencadenar la ejecución de smart contracts con consecuencias potencialmente muy grandes por lo que obtener la información correcta es crítico para el éxito del contrato. 

El consenso parece establecido en que la solución radica en que la información provenga de una red descentralizada de oráculos en lugar de desde un solo punto de verdad y existen varios proyectos que estudian posibles soluciones:

- <a rel="nofollow" href="http://www.augur.net/">Augur</a> ha ideado un modelo donde aquellos usuarios que posean tokens de Augur pueden votar por una versión de la verdad, y otros usuarios pueden disputarla si no están de acuerdo.
- <a rel="nofollow" href="https://witnet.io/#/">Witnet</a> presenta una red de nodos testigo descentralizada que obtendrían recompensas por dar información de confianza y al mismo tiempo serían penalizados por dar información que vaya en contra del consenso de la red.

Ninguna de las dos soluciones son perfectas y todavía se están estudiando alternativas y experimentando con modelos que puedan llegar a dar resultados positivos.

{% include image_caption.html imageurl="/images/posts/201804/smart-contract-2.png" title="smart contract" caption="Los smart contracts facilitarán la creación y ejecución de contratos internacionales que no estén sujetos a la ley de ningún país en determinado" popup=true %}

## Opinión

Me resulta obvio que los smart contracts van a revolucionar el mundo, pero está todavía por ver hasta qué punto resulta una buena idea extraer la subjetividad de un juez humano de la ejecución de un contrato. Probablemente no todos los documentos legales podrán convertirse en contratos inteligentes, y muchos de los pioneros sufrirán importantes pérdidas monetarias hasta que la sociedad decida hasta qué punto está dispuesta a automatizar el proceso.

Por otro lado, un smart contract público puede significar el fin de la corrupción gubernamental y su instauración en los gobiernos democráticos podría ser una de sus aplicaciones más interesantes, por no hablar del ahorro que supondría prescindir de los puestos de trabajo que previamente se encargaban de estos procesos. Por supuesto se requeriría de una inversión de testeo y chequeo de calidad muy fuerte así como de una fase donde los smart contracts co-existirán con sus equivalentes en papel a modo de backup hasta que el producto esté lo suficientemente maduro como para atreverse a dar el gran salto. 

Es cuestionable si la transparencia de los contratos al ser visibles en el blockchain es realmente un punto débil cómo se ha discutido previamente o no, puesto que las tendencias de código libre mantienen que la ofuscación del código no es de ninguna manera una medida de seguridad, y aunque lo fuera sigue resultando mucho más valioso tener el código auditado de manera gratuita por la comunidad.

Proyectos como [Aragon](/que-es-aragon/) traen consigo la posibilidad de tener empresas sin fronteras y no censurables basadas en smart contracts que podrían cambiar el concepto de trabajo de manera permanente y abrir un nuevo abanico de posibilidades que ahora nos resulta complicado imaginar. Sin duda uno de los experimentos socio-económicos más interesantes que se ha vivido en los últimos siglos.
