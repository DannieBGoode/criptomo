---
layout: post
title:  Qué es Bitcoin
description: Qué es Bitcoin, cómo funciona, quien la creo, es o no una burbuja. Explicaciones para principiantes. Guía básica.
banner_image: 201711/bitcoin.png
date: 2018-01-12
rating: 4.75
totalVotes: 3
tags: [bitcoin]
---

Bitcoin es una moneda electrónica creada digitalmente basándose en principios de criptografía. Nadie puede controlarla, no puede ser impresa, ni copiada y es generada mediante un procedimiento de inflación controlada que premia a los colaboradores (mineros) con más unidades.
Se trata del primer ejemplo de la creciente categoría de dinero electrónico conocido como criptomonedas y su principal característica es que está descentralizada, es decir, fuera de cualquier posibilidad de regulación directa por cualquier entidad gubernamental

<!--more-->

Para explicaciones más básicas podéis consultar el artículo [qué es una criptomoneda](/que-es-una-criptomoneda).

## Objetivo
El objetivo original de Bitcoin, es devolver el poder financiero a las personas. Después de la crisis bancaria de 2009 y descontenta con los niveles de inflación y corrupción que existen, Bitcoin pretende acabar con los sistemas bancarios tradicionales arrebatandoles el poder de imprimir dinero a sus anchas convirtiendo a cada persona en su propio banco. **La red de Bitcoin jamás podrá ser desconectada mientras existan usuarios dispuestos a utilizarlo y jamás podrán imprimirse más tokens que los que se acordaron inicialmente**.

Adicionalmente, pretende dotar de poderes de pago a las cientas de millones de personas en el tercer mundo que no disponen siquiera de cuenta bancaria. Lo que en inglés llaman *Banking the Unbanked*. Un usuario con un dispositivo móvil y la capacidad de recordar su contraseña tendría todo lo que necesita para formar parte de la economía internacional, recibiendo y transmitiendo pagos a nivel internacional y sin fronteras.

## Origen

Bitcoin fue creado por una persona anónima de la cual sólo se conoce su pseudónimo, Satoshi Nakamoto. Satoshi frecuentaba unos foros de criptografía donde publicó en 2008 un <a rel="nofollow" href="https://bitcoin.org/bitcoin.pdf" target="_blank">whitepaper</a> donde en tan sólo siete páginas explicó el funcionamiento de todo el sistema. Además estuvo a cargo del desarrollo hasta que desapareció misteriosamente en 2010.

{% include image_caption.html imageurl="/images/posts/201801/nakamoto.png" title="Satoshi Nakamoto" popup=true %}

## Tecnología

Bitcoin está diseñado para que sólo existan 21 millones de monedas en circulación, que habrán sido distribuidas a todos los mineros para el año 2140.

{:.table.table-striped.table-bordered.table-hover.table-condensed.table-collapsable}
|                      | Bitcoin                |
|:--------------------:|:----------------------:|
| Monedas Totales      | 21 millones            |
| Algoritmo PoW        | SHA-256                |
| Tiempo de Bloque     | 10 minutos             |
| Tamaño de Bloque     |     1MB                |
|Recalculo Dificultad  | cada 2016 bloques      |
|Recompensa Inicial    |   50 BTC               |
|Recompensa Actual     |   25 BTC               |
|Cambio de Recompensa  | cada 210000 bloques    |
|Explorador de Bloques | www.blockchain.info    |
| Creador              | Satoshi Nakamoto       |
| Fecha creación       | 3 de Enero de 2009     |
| Capitalización       | $288,002,717,905	    |

#### Minería

Cualquier persona puede además operar como minero encargándose de verificar las transacciones del resto mediante el algoritmo [Proof of Work](/que-es-proof-of-work). Aproximadamente cada 10 minutos un minero valida con éxito transacciones pasadas y es recompensado con más bitcoins (actualmente 25BTC). Este mecanismo de repartir riqueza reemplaza la necesidad de tener una entidad bancaria central.

Cada vez que un minero valida con éxito un bloque (conjunto de transacciones pasadas) el bloque será añadido al blockchain y propagado entre todos los usuarios.

El protocolo de Bitcoin está pensado para que se ajuste la dificultad de resolver un bloque de tal manera que haya uno resuelto cada 10 minutos. Si aumenta el poder computacional de los mineros porque meten más ordenadores para calcular las transacciones, la dificultad aumentará dejando los 10 minutos constantes. Además el protocolo divide por dos la recompensa de los mineros cada cuatro años.

#### Transacciones

Una transacción recién emitida figurará como *Unconfirmed*. Esto quiere decir que todavía no ha sido validada por los mineros ni añadida al blockchain, pero si ha sido validada como correcta en cuanto a si tenemos balance suficiente para poder emitirla.

Cuando los mineros la recojan, la meterán a un bloque junto a otras transacciones y minarán con el fin de validar el bloque mediante Proof of Work. Una vez resuelto, el bloque se situará en el blockchain y otros bloques serán montados encima según se vayan confirmando. **Cuantos más bloques confirmados encima tenga una transacción, más definitiva se considera**. Después de 6 confirmaciones (60 minutos) la transacción se considerará totalmente confirmada.

Esto es debido a problemas que pueden suceder si dos mineros validan sus bloques simultáneamente. Supongamos que un bloque con unas transacciones es validado por un minero en España y otro bloque con otras transacciones es validado en Australia. A media que los nodos van propagando su versión del blockchain por el mundo de repente los nodos que se encuentren a medio camino recibirán dos versiones, ambas perfectamente válidas.

El modo en que el protocolo de Bitcoin resuelve este conflicto es esperando a que se valide el siguiente bloque. Los mineros de Australia seguirán minando para la primera versión del blockchain que han recibido, y si son más rápidos que los del otro lado del mundo validando, de repente su versión del blockchain ya estará 1 bloque por delante de la versión española. **Ante conflictos el protocolo de blockchain siempre descartará la versión más corta del blockchain** por lo que se quedará con la australiana.
Es por esto que transacciones que inicialmente parecian confirmadas en el blockchain español de repente ya no lo estarán, aunque serán validadas en un siguiente bloque un poco más tarde.

Un error habitual es que como una transacción puede tardar 10 minutos en ser añadida a un bloque y luego hasta 50 más para que más bloques se monten encima y la transacción se considerar totalmente confirmada, Bitcoin jamás podrá ser utilizado en la vida cotidiana, pero para el uso del dia a dia sería perfectamente posible para un comerciante aceptar pagos con transacciones marcadas por la red como no confirmadas en unos pocos segundos. Si el comprador no tuviera fondos su transacción jamás llegaría a ese punto. No tendría más riesgo que el de cobrar con una tarjeta de crédito y no pedir un carnet de identidad o una firma como rutinariamente los comerciantes ya aceptan.

## Privacidad

Cuando Bitcoin empezó a extenderse, fue utilizado en el mercado negro para adquirir productos de dudosa legalidad con el pretexto de que era una moneda anónima. En realidad se trata de una moneda pseudónima puesto que todas las direcciones son públicas. Sería equivalente a que podemos ver todas las cuentas bancarias que existen solo que no sabemos a quien pertenece cada una, pero en el momento en que alguien nos solicita un pago a su cuenta podemos asociar su cuenta a su nombre y a partir de ese momento podriamos conocer su balance en todo momento.

{% include image_caption.html imageurl="/images/posts/201801/btc-wikileaks.png" title="Wikileaks address" popup=true caption="Todas las donaciones a Wikileaks mediante BTC son públicas y pueden ser trazadas a las direcciones donantes" %}

## Dificultades

Bitcoin se ha encontrado con la gran dificultad de que no consigue escalar correctamente. Bitcoin es capaz de procesar 7tps, que frente a las decenas de miles de transacciones que valida VISA resulta totalmente insuficiente.

Muchas otras criptomonedas intentan mejorar Bitcoin solucionando este problema, pero todavía ninguna ha conseguido dar con la solución perfecta.

Las principales soluciones propuestas por la comunidad de Bitcoin son *SEGWIT* y *Lightning Network*. Se espera que ambas estén funcionando al 100% de sus posibilidades a lo largo de 2018. Si estas mejoras solucionan la escalabilidad, es probable que muchas criptomonedas acaben desapareciendo.

## Forks de Bitcoin

Durante los últimos meses de 2017 se crearon dos nuevas monedas denominadas [Bitcoin Cash](/que-es-bitcoin-cash) y [Bitcoin Gold](/conseguir-bitcoin-gold). Aunque tengan la palabra Bitcoin delante, realmente son monedas nuevas y no deben confundirse con el Bitcoin principal. La característica que tienen éstas dos últimas es que fueron creadas como copias del Bitcoin original manteniendo su historial de transacciones pero con reglas ligeramente distintas, copia que se denomina *fork*.

## ¿ Es el Bitcoin una burbuja ?

Es posible. La innovación que trae Bitcoin como moneda digital es incuestionable, y parece garantizado que va a cambiar el mundo pero no debemos olvidar de que a día de hoy el Bitcoin apenas está siendo utilizado como moneda, sino más bien como almacenamiento de valor o inversión especulativa.
Teniendo en cuenta que ahora mismo cuenta con un mercado por el valor de más de 130.000 millones de dólares, <a rel="nofollow" href="https://finance.yahoo.com/quote/mcd?ltr=1">mayor incluso que el de McDonalds</a> resulta inevitable pensar que más que probablemente se trate de una burbuja.
Ahora bien, si consideramos el valor que esta y otras posibles criptomonedas va a traer al mundo en los próximos 15 años probablemente el valor acabe siendo mucho mayor.

## ¿ Dónde puedo comprar Bitcoins ?

Existen numerosas páginas webs denominadas exchanges donde es posible comprar Bitcoins y otras monedas. Muchas de ellas permiten pago con tarjeta de crédito y otras aceptan transacciones bancarias. Aquí tenéis una guía de [cómo comprar criptomonedas](/como-comprar-criptomonedas/) más en detalle.
