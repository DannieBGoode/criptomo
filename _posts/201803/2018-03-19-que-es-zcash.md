---
layout: post
title:  Qué es Zcash
description: La criptomoneda Zcash ZEC explicada de manera sencilla. Dónde comprar y guardar. Comparación con ZClassic, zenCash y Bitcoin Private.
banner_image: 201803/zcash.png
rating: 5
totalVotes: 3
tags: [altcoins]
---

Por el modo en que la tecnología blockchain funciona, todas las transacciones jamás realizadas son de carácter público. Esta característica traerá mucha transparencia una vez sea adoptada por sistemas gubernamentales o sin ánimo de lucro puesto que ayudarán a evitar corrupción en el sistema al ofrecer transacciones totalmente transparentes que cualquier persona pueda auditar.

Zcash reconoce que este modelo puede no ser deseable para todas las transacciones del sistema y ofrece una alternativa.

<!--more-->

## Tecnología

Zcash fue originado el 28 de Octubre de 2016 por Zooko Wilcox como un fork del protocolo de Bitcoin por lo que mantiene muchas de sus características, por ejemplo al igual que en Bitcoin:

- Únicamente llegarán a existir 21 millones de unidades.
- La recompensa por minado va disminuyendo con el tiempo.
- Jamás se ha realizado una ICO ó preminado de monedas.

A diferencia de Bitcoin en cambio:

- Su protocolo de minado es Equihash, que es el mismo que utiliza [Bitcoin Gold](/conseguir-bitcoin-gold) para prevenir centralización de minado mediante dispositivos ASICs.
- Tiene un sistema de tesorería que otorga un 20% de la recompensa de minado de cada bloque durante los primeros cuatro años a los desarrolladores y primeros inversores como modo de financiación de la moneda no muy diferente del que caracteriza a [DASH](/que-es-dash). Los mineros reciben el restante 80%.
- Se introdujo un proceso de *comienzo lento* que provocó que durante los primeros 20000 bloques (o 34 días) la recompensa de bloque fuera menor para evitar el impacto de posibles bugs en su protocolo durante los primeros días.
- Ofrece un sistema de transacciones totalmente privado que permite a los usuarios esconder sus propias transacciones mediante el uso de zk-Snarks.

Entre los primeros inversores se pueden encontrar a celebridades del espacio de las criptomonedas como pueden ser Barry Silbert, Erik Voorhes, Roger Ver y Naval Ravikant.

> Zcash es otra solución criptográfica basada en blockchain que permite intercambios privados en un blockchain público. Esto permite a organizaciones, compradores y otras aplicaciones controlar quién tiene la opción de revisar los detalles de una transacción sin perder las ventajas de utilizar un sistema descentralizado. <cite>Zooko Wilcox</cite>

En Zcash los usuarios tienen la opción de realizar dos tipos de transacciones:

- Transacciones normales, como las de Bitcoin, donde todos los datos son públicos.
- Transacciones privadas, a cambio de un coste de transferencia mayor todos los detalles de la transferencia serán privados, incluyendo las identidades del emisor y del receptor y el valor que se ha intercambiado.

De ser necesario el usuario puede compartir la clave de vista (view key) de una transacción suya lo que permitiría a un tercero auditar la transacción en sí.

Además ZCash incluye un campo denominado *memo* que permite añadir mensajes cuando se realizan transacciones a modo de recibo

## Zk-SNARKS

Zero Knowledge proofs o <a rel="nofollow" href="https://es.wikipedia.org/wiki/Prueba_de_conocimiento_cero">Pruebas de conocimiento zero</a> es un protocolo ideado por el MIT en la decada de 1980, pero que con el auge de las criptomonedas ha encontrado su oportunidad de brillar.

En resumen Zk-Snarks no es más que una manera de que un tercero pueda validar una transacción entre dos entidades sin necesidad de conocer los detalles de la transacción. Una manera de explicar esto podría ser equiparandolo a un ejemplo basado en los libros infantiles de *Busca a Wally*:


{% include image_caption.html title="Dónde está Wally" imageurl="/images/posts/201803/wally.jpg" popup=true %}

Si dos personas poseen la misma copia del libro de *Busca a Wally*, una podría demostrarle a la otra que ha encontrado a Wally sin necesidad de mostrarle dónde está exactamente. Para ello se llevaría el libro a una habitación, recortaría el contorno de Wally con unas tijeras, saldría de la habitación y se lo mostraría a la otra persona. De esta manera podría asegurar haberlo encontrado sin descubrir realmente su posición.

{% include image_caption.html title="Dónde está Wally" imageurl="/images/posts/201803/wally-2.jpg" popup=true class="small-banner" %}

Aunque es cierto que ejemplo no es perfecto nos puede dar una idea del funcionamiento en que se basa este protocolo.


Ethereum quedó tan impresionado con la funcionalidad de zk-Snarks que su implementación ya está en su roadmap en su fase de Metrópolis.

{% include tweet.html href="https://twitter.com/Snowden/status/913544739542241282" caption="La privacidad de Zcash es la aternativa más interesante a Bitcoin actualmente. Bitcoin es genial pero sin privacidad no hay seguridad. - Edward Snowden" %}

## Dónde comprar Zcash

- <a rel="nofollow" href="https://accounts.binance.com/es/register?ref=11317062">Binance</a>
- <a rel="nofollow" href="https://bittrex.com/">Bitrex</a>
- <a rel="nofollow" href="kraken.com">Kraken</a>
- <a rel="nofollow" href="https://www.bitfinex.com">Bitfinex</a>

## Dónde almacenar Zcash

* <a rel="nofollow" href="http://amzn.to/2i5kRoG">Ledger Nano S</a>
* <a rel="nofollow" href="http://amzn.to/2i72hMV">Trezor</a>
* <a rel="nofollow" href="https://jaxx.io/">Jaxx</a>
* <a rel="nofollow" href="https://coinomi.com/">Coinomi</a>

## Hard Forks

Durante el desarrollo de Zcash ha habido bastante gente que ante su disconformidad por ciertas decisiones tomadas en su desarrollo, han decidido implementar su propia versión del protocolo. Recordemos que Zcash es un fork en sí de Bitcoin originado por el mismo motivo.

### <a name="zcl"></a> ZClassic (ZCL)

ZClassic es un fork de Zcash creado únicamente para:
- Quitar el sistema que otorga un 20% de la recompensa de cada bloque minado a la tesorería.
- Quitar el *comienzo lento* mencionado antes que caracterizó el inicio de Zcash.

El *comienzo lento* ocasionó que el precio de la moneda se inflase artificialmente hasta precios ridículos. Durante los primeros días había un límite de 11 monedas Zcash repartidas entre todos los mineros, inversores y exchanges, que resultó un desastre cuando se estaban pagando 3000BTC por un solo token de Zcash. Hoy se cotiza a valores inferiores a 0.03BTC. ZClassic comenzó con recompensas de bloque completas (de 12.5 ZCL) modelando un mercado mucho más realista y sano.

Al igual que con Zcash, no hubo ICO ni preminado, y las monedas empezaron a generarse desde cero por los mineros.

> Zcash - Recompensa a los Fundadores - Comienzo Lento = ZClassic

Tecnológicamente hablando ZClassic no trae más inovación a la mesa, pero debido al inicio tan fatídico de Zcash la comunidad se ha visto divida drásticamente.

### <a name="zen"></a> ZenCash (ZEN)

ZenCash fue creado como fork de ZClassic y todos los usuarios que tenían tokens de ZCL obtuvieron el mismo número de tokens de ZEN automáticamente.

Las diferencias que se añadieron fueron:

- Mensajería privada
- Preparado para aceptar SEGWIT
- Sistema de votaciones
- Sistema de propuestas
- Modelo de gobernanza
- 88% de recompensa por bloque para los mineros
- 3.5% de la recompensa de cada bloque es destinada a mantener la infraestructura (los nodos maestros de la red muy similares a los que utiliza DASH)
- 8.5% de la recompensa va a un sistema de tesorería para desarrollo, mantenimiento y mejoras

Resulta curioso como el motivo principal que hizo que Zcash fuera forkeado a zClassic (la tesorería) es restaurado, pero se justifica el resto de la moneda con las otras mejoras.

### <a name="btcp"></a> Bitcoin Private

Los creadores de ZClassic han creado recientemente un nuevo fork denominado <a rel="nofollow" href="https://btcprivate.org/whitepaper.pdf">Bitcoin Private</a>. Todos los poseedores de tanto Bitcoin como ZClassic recibirán un token, en otras palabras:

`1 BTC + 1 ZCL = 2BTCP`

Esto ha ocasionado que muchos inversores invirtieran en ZCL los días inmediatamente anteriores al fork (puesto que es considerablemente más barato comprar un ZCL que un BTC), y se pudo ver como el precio subió de 2$ a 200$ para después desplomarse totalmente una vez el fork fue realizado.

{% include image_caption.html title="Zcash pump and dump" imageurl="/images/posts/201803/zclassic.png" caption="Pump and Dump de ZClassic en anticipación al fork" popup=true %}

Se ha comparado Bitcoin Private a Bitcoin Gold porque ambos intentar aprovecharse del branding de Bitcoin y además utilizan Equihash como algoritmo de consenso como modo de evitar la centralización en el minado pero a diferencia de BTG, no se ha realizado ningún preminado de la moneda antes de lanzarse.

Bitcoin Private acaba siendo un Bitcoin con zk-SNARKs, 20% de recompensa a los fundadores y Equihash y no es ninguna tontería cuando uno se pregunta por qué sencillamente no se han quedado con zCash.

{% include tweet.html href="https://twitter.com/VitalikButerin/status/968318826306850817" caption="¿Por qué no usar Zcash y ya está?" %}


### Opinión

Me resulta bastante absurdo la cantidad de forks que se han realizado mientras se decide si se desea una moneda con recompensa a los creadores o no. Personalmente pienso que es importante que el desarrollo de una criptomoneda esté financiada siempre y cuando haya un modelo de gobernanza que permita a la comunidad elegir tanto el porcentaje como en qué utilizar estos fondos. Monedas como [Cardano](/que-es-cardano), [DASH](/que-es-dash) o [EOS](/que-es-eos) son muy conscientes de esta necesidad y sus proyectos están estructurados en torno a esta necesidad. Muy pocos proyectos exitosos han sido capaces de sobrevivir sin una ICO o sistema de tesorería, Bitcoin y Litecoin entre ellos, y es debatible hasta que punto es bueno que sea así.

ZCash es un proyecto bastante sólido de por sí, pero el hecho de que Ethereum vaya a incorporar su magistral sistema de privacidad (zk-Snarks) en su roadmap podría perfectamente significar su declive, es por ello que nunca me he atrevido a recomendarlo como inversión a largo plazo. Me resulta considerablemente más atractivo [Monero](/que-es-monero) que aunque no utilice zk-Snarks comparte muchas de las funcionalidades que caracterizan a Zcash.

