---
title: Qué es Ethereum
date: 2017-12-26 00:00:00 Z
tags:
- altcoins
layout: post
description: La criptomoneda Ethereum explicada, qué es, qué diferencias tiene con
  Bitcoin y dónde comprarla
banner_image: 201712/ethereum.jpg
rating: 5
totalVotes: 2
lang: es
---

[Ethereum](https://www.ethereum.org/) es una plataforma open source basada en tecnología blockchain que permite a desarrolladores construir y desplegar sus propias aplicaciones descentralizadas que correrán exactamente de la manera en que han sido programadas sin que se puedan censurar, interferir o desconectar.

<!--more-->

En el blockchain de Ethereum, en lugar de minar bitcoins, los mineros minan **Ether** que además de poder ser intercambiada entre usuarios como el BTC, también se usa como moneda de pago de ejecución de las aplicaciones descentralizadas ubicadas en el blockchain.

> Bitcoin es principalmente una moneda, que es un uso particular de un blockchain. Sin embargo no es la única aplicación igual que el email sólo es una aplicación de uso de Internet. <cite> Dr Gavin Wood, Ethereum Co-Founder</cite>

#### Equipo

El equipo está liderado por Vitalik Buterin que propuso la idea de Ethereum en 2013, aunque la red no fue lanzada hasta 2015 tras subastar Ether para financiar el proyecto por un valor de más de 18 millones de dólares. La fundación de Ethereum reside en Suiza en la ciudad de Zug, considerado por muchos el Silicon Valley de las criptomonedas.

{% include image_caption.html imageurl="/images/posts/201712/vitalik.jpg" title="Vitalik Buterin" caption="Vitalik Buterin, creador de Ethereum" popup=true %}

#### Smart Contracts

Un contrato inteligente es un término que describe a un código de ordenador que se autoejecuta cuando se dan unas condiciones específicas.

Aunque todos los blockchains tienen la habilidad de procesar código, resultan bastante limitadas. La innovación principal de Ethereum, la Ethereum Virtual Machine (EVM), es un programa que permite correr otros programas externos. De esta manera, en lugar de tener que construir un blockchain nuevo para cada aplicación, Ethereum permite que se desarrollen miles de aplicaciones basadas en el mismo blockchain en distintos lenguajes de programación.

Se ha creado un lenguaje de programación propio para escribir los programas sobre Ethereum denominado Solidity que se asemeja mucho al ya conocido lenguaje javascript con la idea de que el proceso de aprendizaje por parte de los desarrolladores nuevos sea lo más rápido posible.

#### DAOs y DApps

Ethereum permite a desarrolladores construir aplicaciones descentralizadas (DApps) así como Organizaciones Autónomas Descentralizadas (DAOs), que vienen siendo organizaciones enteras totalmente descentralizadas sin un único lider creadas a partir de la unión de muchas DApps eliminando la necesidad de tener gente real y poder centralizado.

Un DAO es propiedad de cualquier individuo que posea tokens de dicha organización igual que podría ser el caso de las acciones o las participaciones, excepto que los tokens arman a su dueño de derechos de voto sobre la decisiones del DAO.

Como las DApps corren en el blockchain se caracterizan por todas las propiedas del mismo:

* **Inmutabilidad**: Una tercera persona no puede cambiar la información.
* **A prueba de corrupción / manipulaciones**: No es posible censurar o intervenir estas aplicaciones
* **Seguridad**: Sin un solo punto central y basada en principios criptográficos las aplicaciones están bien protegidas de ataques de hackers o actividades fraudulentas.
* **Siempre online**: Puesto que un blockchain no puede ser apagado, la aplicación siempre estará online.

Aunque todo podría sonar demasiado perfecto, las DApps tienen un problema muy grande: los humanos.
Una DApp sólo podrá ser tan perfecta cómo el código del humano que la escribió. Puesto que las DApps una vez desplegadas al blockchain no pueden ser fácilmente modificadas, un bug en el código podría ser fatal para una DAO

##### <a name="dao"></a> El DAO
Esto fue precisamente el caso del primer DAO construido, bautizado sencillamente DAO. Se trataba de una plataforma de financiación tipo Kickstarter donde inversores podrían colaborar financiando proyectos y en función de si se llegaba a la cantidad requerida por el proyecto, los fondos se movían automáticamente ya sea de vuelta a los inversores o a los dueños del proyecto financiado. Se trataba de una plataforma totalmente autónoma capaz de mover grandes cantidades de dinero y financiar proyectos sin la intervención de una sola persona trabajando en nombre de la asociación y había recaudado hasta la fecha 160 millones de dólares. Por desgracia un hacker identificó un fallo en el código del DAO que le permitía lentamente ir sacando fondos de la organización.

Esto planteó un gran problema entre la comunidad de Ethereum y se discutieron tres posibles alternativas:

1. **No hacer nada**, si el código está desplegado al blockchain es considerado ley y no bug.
2. **Hacer un soft-fork** que hiciera que los fondos del DAO se perdieran en el olvido , ni los inversores los recuperarán ni el hacker podría hacerse con ellos.
3. **Hacer un hard-fork**, o dicho de otra manera, crear una moneda nueva donde el DAO nunca existió. Los inversores recuperarían sus fondos en la nueva moneda, y el hacker obtendría lo robado en la cadena vieja.

La solución que se tomó al final fue la tercera, lo que ocasionó que la cadena vieja de Ethereum se pasase a llamar Ethereum Classic (ETC) y la nueva Ethereum (ETH) dividiendo a la comunidad para siempre. A pesar de que los desarrolladores principales de Ethereum aseguraron que no darian soporte para la cadena vieja y que todos se moverían a la nueva, al ser un proyecto open-source, ETC sigue en desarrollo por puristas que aseguran que la confianza en un blockchain se basa en su inmutabilidad por lo que no se puede  puede estar creando una moneda nueva cada vez que alguien suba una DApp con bugs independientemente del dinero que haya en juego.

Por otro lado Gavin Wood argumentó que un blockchain está creado para servir a los humanos, por lo que si existe consenso sobre la idea de que la comunidad no quiere que un hacker se escape con los fondos es perfectamente aceptable realizar un hard fork.

No obstante lo que todo el mundo si concluyó fue que se necesitan mejores herramientas para testear los DApps y de hecho durante los próximos años las empresas auditoras de smart contracts van a crecer mucho en consecuencia.

#### Otros casos de uso

Ya son muchas las compañías que han empezado a construir sus propios productos sobre Ethereum, veamos unas pocas de ellas:

* **uPort**: Pretende crear tarjetas digitales de identidad internacionales sobre la cual tengas total control. Podría usarse como llave para entrar en distintas instalaciones a la que estés autorizado, identificarte en una biblioteca o mostarlo en las fronteras.
* **Filecoin**: Se trata de un dropbox descentralizado donde los demás usuarios guardan trozos de tu información (¡pero no pueden leerla por que está cifrada!) de tal manera que siempre estará online.
* **Golem**: Alquiler de poder computacional de otros usuarios que no estén utilizando sus ordenadores.
* **Akasha**: Se trata de una red social descentralizada. No existen servidores específicos que la mantengan por lo que es inmune a la censura. Construir algo así sobre Ethereum permite también que se incentive a la gente con recompensas económicas por crear contenido o comentarios que resulten de valor a la comunidad.
* **Aragon**: Se trata de uno de los proyectos que con más ganas espero, la posibilidad de automatizar las tareas básicas de contabilidad, nóminas, votaciones de accionistas, etc.. de manera digital. Reduciría enormemente el número de personas necesarias para tener una empresa funcional.
* **SingularDTV**: Manejo de derechos del mundo del entretenimiento para la distribución de fondos de manera transparente.

Todas estas aplicaciones tienen sus propios tokens, y como tal pueden ser comprados y cotizados exactamente igual que el Ether.

Además otro uso que Ethereum permite, es la creación de ICOs para financiar las distintas monedas realizadas sobre ella.

{% include image_caption.html imageurl="/images/posts/201712/ethereum-icos.png" title="Ethereum ICOs" caption="Distintos tokens y cantidades financiadas" popup=true %}

#### Pagos, tasas y gas

Un concepto muy importante de Ethereum es el concepto de las tasas. Cada computación que ocurre como resultado de una transacción en la red implica un pago de tasas. Estas tasas son pagadas en una denominación llamada *gas*. Definamos rápidamente varios conceptos:

* Gas: Unidad de medición de las tasas requeridas para una computación específica, se mide en *gwei*.

* Wei: Unidad más pequeña de Ether que se puede conseguir, donde 1⁰¹⁸ Wei representan 1 Ether.

* Gwei: un millón de *Wei*.

Para cada transacción u operación ejecutada por un DApp, el emisor decide el límite de gas y el precio del mismo el cual está dispuesto a pagar para que la transacción se haga realidad.

Por ejemplo si un emisor decide un límite de 50000 gas a un precio de 20gwei, implicaría que está dispuesto a pagar 50,000 x 20 gwei = 1,000,000,000,000,000 Wei = 0.001 Ether para ejecutar dicha transacción.

El motivo por el cual existen las tasas de transacción de la red es para evitar bucles infinitos o que la red se utilice para usos demasiado caros computacionalmente hablando que puedan colapsar la red.

#### Roadmap
Ethereum tiene un roadmap muy bien definido separado en distintas fases.

* Frontier
* Homestead
* Metropolis - el estado actual.
* Serenity

Entre las mejoras más esperadas se encuentran:

* Smart Contracts mas robustos y flexibles.
* **Sharding**: método para mejorar la escalabilidad del sistema, diviendo el blockchain en subredes paralelas capaces de procesar transacciones paralelas.
* la inclusión de **zk-snarks**, que aumentaría el nivel de privacidad de las transacciones, cambi
* Cambio del agoritmo de consenso a **Proof of Stake**. Ethereum utiliza el protocolo Proof of Work para validar las transacciones de la red del mismo modo que lo hace Bitcoin. No obstante, existen planes de moverse a Proof of Stake bajo un protocolo creado por el equipo de Ethereum denominado Casper, lo cual significa un ahorro de energía importante. Puesto que no será en absoluto un cambio simple, se ha tenido en cuenta un periodo de transición donde cada cierto número de bloques minados por Proof of Work, otro bloque será minado por Proof of Stake.

Cada vez que se pasa de un estao a otro se necesita realizar un hard fork, y como siempre esto es una posibilidad más de dividir a la comunidad como ya ocurrió con ETC. Es por ello que Vitalik ha ideado una bomba de dificultad cuya intención es que las cadenas viejas aumenten su dificultad de minado tras el fork de tal forma que los mineros no tengan más remedio que moverse a la nueva cadena. 

#### ¿ Dónde comprar Ethereum ?

Tenemos una guía de cómo y dónde comprar Ethereum en el artículo [cómo comprar criptomonedas](../como-comprar-criptomonedas).

#### Conclusión

Ethereum es la segunda moneda que más alto cotiza del mercado de las criptomonedas y no es casualidad. La plataforma permite crear nuevas monedas sobre ella y su éxito está muy ligado a qué conseguirán hacer con ella los demás.

Cómo blockchain tiene muchos de los problemas de escalabilidad que también caracterizan a BTC.

Entre sus principales competidores se encuentran NEO, [EOS](../que-es-eos/) y [Cardano](../que-es-cardano). Resulta complicado ver un escenario donde todas ellas acaban triunfando pero desde luego Ethereum a dia de hoy va en primera posición, tiene más financiación y mucha gente volcada en el proyecto.

La única seguridad es que es una plataforma en constante crecimiento y que aquellos desarrolladores que se especialicen en Solidity lo antes posible van a tener un mercado laboral muy grande.


{% include image_caption.html imageurl="/images/posts/201712/ethereum-transactions.png" title="Ethereum Transactions" caption="El uso de Ethereum ha aumentado drásticamente durante los últimos años" popup=true %}