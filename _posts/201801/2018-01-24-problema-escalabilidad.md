---
title: El problema de la escalabilidad de Bitcoin
date: 2018-01-24 00:00:00 Z
tags:
- bitcoin
layout: post
description: Explicación del problema de escalabilidad de Bitcoin y sus posibles soluciones.
banner_image: 201801/bitcoin-scalability.jpg
rating: 4.75
totalVotes: 3
---

El problema de escalabilidad de Bitcoin es un tema que crea mucho debate y que ha ocasionado numerosas creaciones de nuevas criptomonedas intentando resolverse. Su limitada capacidad de 4-10 transacciones por segundo queda muy lejos de rivalizar a los gigantes de la industria como VISA o Mastercard que manejan decenas de miles de tps. Se han discutido varios métodos de arreglar este problema.

<!--more-->

## Reducir el tiempo de bloque

Hay quien dice que si reducimos el tiempo de bloque la red sería más rápida y eficiente pero esto sólo es parcialmente cierto.

En Bitcoin el tiempo de bloque es de 10 minutos, eso quiere decir, que en media un bloque es minado cada 10 minutos validando todas las transacciones que contiene. Aún así de vez en cuando hay conflictos debido al funcionamiento de [Proof of Work](/que-es-proof-of-work/).

Si un minero en China y un minero en Europa minan el siguiente bloque a la vez (cada uno incluyendo unas transacciones) y lo propagan por el mundo, ambos bloques resultan perfectamentes válidos y generarían dos versiones paralelas del blockchain. Los nodos acaban recibiendo ambos bloques, añaden el primero que reciban a su versión del blockchain y el otro lo dejarán de lado por el momento, a este bloque inicialmente descartado se le denomina *stale block*.

Será en este momento cuando serán los mineros quienes decidan cual de las dos versiones del blockchain es la válida: si un minero ha apostado por el bloque chino, y consigue minar el siguiente bloque sobre él antes que nadie mine el siguiente bloque sobre el europeo, la red global reconocerá la cadena más larga como la verdadera, descartando el bloque europeo y devolviendo al *mempool* todas las transacciones que no se han podido procesar. Adicionalmente reconocemos como bloques huérfanos a aquellos que no tienen un padre conocido, probablemente por que o bien el padre era un stale block descartado, o bien el padre nunca llegó a ser propagado correctamente.

Si el tiempo de bloque de Bitcoin se redujera, aumentaría considerablemente el número de *stale blocks*. En consecuencia cada vez que hay un conflicto entre bloques, **la fuerza de minado global se repartiría entre los bloques candidatos lo que llevaría a tiempos de minado más grandes.**

Volviendo al ejemplo anterior, si exactamente la mitad de los mineros del mundo se ponen a minar sobre el bloque europeo ya que lo han recibido primero, y la otra mitad sobre el chino, el tiempo medio de minado del siguiente bloque, independientemente de cual de los dos ganase, será el doble para la dificultad que hubiera en ese momento, unos 20 minutos. Es por ello que disminuir el tiempo de bloque no acabaría siendo necesariamente más rápido, si no que probablemente llevaría a validaciones más lentas.

**Los 10 minutos de Bitcoin son un compromiso entre tiempos de confirmación de transacciones rápidos y probabilidad baja de *stale blocks*.**

## Aumentar el tamaño de bloque

Los defensores de [Bitcoin Cash](/que-es-bitcoin-cash) aseguran que la solución de la escalabilidad es tan sencilla como aumentar el tiempo de bloque de Bitcoin de 1MB a tamaños más grandes (de hasta 32MB). No hay ninguna duda de que actualmente Bitcoin no es utilizable como modo de pago debido a que las tasas de transacción son demasiado caras y los tiempos de verificación demasiado largos. Bitcoin Cash en cambio ha demostrado que puede funcionar con unas tasas muy bajas y tiempos muy rápidos, como los que caracterizaban a Bitcoin en sus inicios.

Ahora bien, hay que aclarar que BCH no tiene el mismo volumen de transacciones que Bitcoin, y que llegados al mismo punto es posible que se enfrentara a los mismos problemas.

Como podemos ver, los bloques de BCH apenas llegan a 1MB actualmente, aunque si que es cierto que podrían escalar fácilmente hasta 32MB lo que nos llevaría a una capacidad de 28 - 34 tps (todavía muy lejos de poder rivalizar a los líderes del mercado). Al final para poder hacer frente a las decenas de mile de tps de VISA tendrían que seguir aumentando el tamaño de bloque indefinidamente.

{% include image_caption.html imageurl="/images/posts/201801/bitcoin-cash-blocksize.png" title="BCH Tamaños de bloque" caption="Los bloques de BCH apenas están llegando a 1MB con fecha Noviembre de 2017" popup=true %}

Veamos los argumentos que utilizan los principales defensores de incrementar el tamaño de bloque:
* Más transacciones por segundo
* Tasas de transferencia más baratas
* Tiempos de verificación más rápidos
* Las soluciones off-chain no están preparadas para manejar la carga del blockchain principal.

De los cuales al menos los tres primeros han sido demostrados con el uso de BCH. Veamos en contraposición los argumentos que utilizan los principales opositores al incremento del tamaño de bloque:

* Debido a que la velocidad de propagación de bloque aumenta, tenemos más bloques huérfanos y stale blocks.
* Es necesario realizar un hard fork, lo cual siempre es un peligro ya que puede dividir la cadena y la comunidad.
* No existe un tamaño de bloque suficientemente grande que soporte todas las futuras transacciones del blockchain principal. Aumentar el tamaño de bloque es únicamente una solución temporal.
* Bloques más grandes hacen que los nodos de la red sean más costosos, lo que lleva a la centralización.
* El minado también aumenta considerablemente en costes, lo que lleva a centralización del minado

Uno de los principios de Bitcoin era que cualquier persona pudiera montar un nodo completo en su casa o poder minar transacciones. Con el caso del minado, debido a la gran carrera energética en la que se ha convertido, ya resulta inviable minar sin formar parte de un gran pool de mineros y trae consigo problemas que ya mencionamos en [el artículo del ataque del 51 por ciento](/ataque-51-porciento).

Si adicionalmente tuvieramos el problema de que el blockchain empieza a ocupar demasiado espacio (por tener bloques más grandes), y en consecuencia, operar un nodo completo pasa a ser una actividad mucho más restrictiva, podríamos tener un entorno donde solo las grandes corporaciones o los gobiernos tuvieran nodos completos. Una vez llegados a este punto, nada podría impedir que se generase censura sobre ciertas direcciones ignorando sus transacciones evitando que sean procesadas. Por ejemplo, se podría fácilmente bloquear todos los fondos de Wikileaks ignorando cualquier pago o cobro realizado a la dirección pública de Wikileaks donde aceptan donaciones.

## Segregated Witness y Lightning Network

El equipo de Bitcoin Core ha propuesto en lugar de aumentar tamaños de bloque las soluciones de Segwit y Lightning Network. Ambas soluciones son soft forks, por lo que no hay peligro de crear una moneda nueva, eso sí, requerirá que al menos una grande parte de los nodos, wallets y mineros actualicen su software. **Ambas soluciones son soluciones off-chain, es decir, que realizan parte de la transacción fuera del blockchain lo cual es la principal crítica que se hace sobre ellos.**

Con Segwit, se separan las firmas digitales de la información de transacción, haciendo más hueco en los bloques lo que extiende su tamaño virtual de 1MB a 4MB. Adicionalmente Segwit también arregla la vulnerabilidad de maleabilidad de transacción y le allana el camino a Lightning Network.

Lightning Network es una manera en que distintos usuarios de la red de Bitcoin podrían abrir canales de pago entre ellos, intercambiar fondos entre varios comerciantes y después solo escribir en el Blockchain el resultado de todos estos movimientos. Esto decrementa enormemente el número de transacciones totales que se escriben en el blockchain.

> **Con únicamente Segwit implementado el volumen de transacciones capaz de procesar aumenta hasta x4 veces, con todo el tráfico quedando grabado en el blockchain. Con lightning Network funcionando en cambio, podríamos tener decenas de miles de tps ocurriendo fuera del blockchain a través de canales Lightning donde únicamente el resultado final de todas estas transacciones sería grabado en el blockchain que todavía soportará únicamente un volumen de x4.**

Lightning Network está en fase alpha y se prevé que esté lista a lo largo de 2018. Además será totalmente opcional, aquellos usuarios que decidan no utilizarla podrán no hacerlo ya que de nuevo se trata de un soft fork.