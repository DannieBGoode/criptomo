---
layout: post
title: Qué es Bitcoin Cash
description: La criptomoneda Bitcoin Cash explicada, qué es, que diferencias tiene con Bitcoin y dónde comprarla
banner_image: 201712/bitcoin-cash.jpg
tags:
  - altcoins
---
Bitcoin (BTC), la primera criptomoneda, está todavía sujeta a importantes problemas de escalabilidad lo cual incrementa enormemente las tasas de transferencia así como la velocidad de las mismas y ha sido extensamente criticada por ello.

El debate de como arreglar la escalabilidad de Bitcoin no es nuevo y se han sugerido bastantes alternativas. Una de ellas llevó a realizar un *hard fork* el dia 1 de Agosto de 2017 y fue bautizada como **Bitcoin Cash** (BCH).

<!--more-->

Al ser un fork del protocolo original lo que realmente está sucediendo es que se está creando una moneda nueva (un altcoin) y el hecho de que Bitcoin Cash contenga la palabra Bitcoin no debe confundirnos.

**Bitcoin y Bitcoin Cash no son la misma moneda, se venden a distinto precio y no son intercambiables entre sí.**

La salvedad es que al haber copiado todo el historial de transacciones de la cadena original, todo el mundo que tuviera Bitcoins en su wallet en la fecha del fork, automáticamente pasa a tener también Bitcoin Cash, lo cual ha sido considerado por muchos cómo dinero gratis, puesto que el precio de BTC ni pestañeó en el momento del fork y BCH se valoró de partida en casi 2000$. Para información más básica de qué es exactamete un hard fork podeis leer el artículo [Qué es Bitcoin](../que-es-bitcoin).


{% include image_caption.html imageurl="/images/posts/201712/hard-fork.png" title="Bitcoin Cash Hardfork" caption="Bitcoin Cash se generó a partir de un HARD FORK de Bitcoin" popup=true %}

#### El tamaño de bloque

Para que una transacción sea válida debe ser añadida a un bloque que será posteriormente añadido al blockchain por los mineros. BTC soporta bloques de hasta 1MB de tamaño y además la dificultad de minado se ajusta automáticamente para que los bloques sean minados cada 10 minutos. Esto ha sido manjeable hasta recientemente, pero en cuanto BTC explotó en popularidad y se empezó a utilizar los bloques de 1 MB resultaron totalmente insuficientes para encapsular todas las transacciones de la red, lo que ocasionabá o bien retrasos a medida que las transacciones se iban acumulando, o bien tasas de transferencia más altas puesto que los mineros tienen el poder de elegir las transacciones que quieran.


{% include image_caption.html imageurl="/images/posts/201712/btc-transactions.png" title="BTC Transactions Increase" caption="Transacciones de la red de Bitcoin" popup=true %}

A medida que Bitcoin ha ido incrementando en popularidad se han dado más y más transacciones lo que ha llevado a que haya más transacciones pendientes de ser validadas esperando en el [mempool](https://blockchain.info/charts/mempool-size). 

{% include image_caption.html imageurl="/images/posts/201712/btc-mempool.png" title="BTC Mempool" caption="Transacciones pendientes por validar" popup=true %}

Como podeis ver, el número de transacciones mensuales sigue incrementándose y con el límite de bloque mencionado apenas se pueden manejar 4.4 transacciones por segundo.

Este límite de 1MB no existía inicialmente en el protocolo de Bitcoin pero fue introducido para evitar ataques de spam que saturasen la red. La idea era que sin este límite una persona maliciosa podría muy rápidamente generar un gran número de transacciones a cualquier coste incrementando el tamaño del blockchain en general el cual costaría mucho más almacenar por usuarios normales.

Para arreglar este inconveniente se sugerió incrementar el tamaño de bloque de 1MB pero esto levantó muchos debates entre la comunidad por los motivos explicados y no se llegó a un acuerdo, lo que finalmente ocasióno la creacion de BCH que cuenta con un blocksize de 8MB. Si algun dia llegamos a tener tantas transacciones como para que 8MB no sean suficientes habría que hacer un nuevo hard fork. Cada hard fork es una posibilidad de dividir a la comunidad y puede ser catastrófica y eso es precisamente lo que Bitcoin Core (el equipo de BTC) intenta evitar.

BCH también introduce ciertas modificaciones para ajustar el nivel de dificultad de minado más rápidamente en caso de cambios en el hashrate.

Los principales argumentos contra el incremento del tamaño de bloque son:
* El número de mineros podría decrecer al bajar las tasas de transmisión.
* Algunos integrantes de la comunidad defienden que BTC no debería ser utilizado en el dia a dia sino como refugio de valor como es el caso del oro.
* Dividiría a la comunidad con el fork al existir de repente 2 monedas paralelas.
* Minar bloques mayores requiere máquinas de minado más potentes sólo accesibles a unos pocos lo cual acabaría con los mineros pequeños subiendo el nivel de centralización que va contra la esencia misma del protocolo.
 
Los principales argumentos a favor del incremento de tamaño de bloque:
* Al haber más transacciones por bloque las tasas totales de cada bloque serían mayores lo cual incentivaría a los mineros.
* Si las tasas no disminuyen nunca se conseguirá que la persona de la calle acabe usándolo. La aceptación es clave para conseguir que Bitcoin funcione como se desea.
 
#### Roger Ver

Roger Ver, conocido como *Bitcoin Jesus*, es el inversor millonario detrás del dominio [Bitcoin.com](https://www.bitcoin.com) y apoya enormemente la moneda Bitcoin Cash. Roger argumenta que para que algo sea usado como refugio de valor primero debe de tener otros usos, como es el caso del oro que se puede usar para la electrónica, joyería, usos dentales, etc... (Roger no ha debido oir hablar de las [piedras Rai](https://es.wikipedia.org/wiki/Piedras_rai) utilizadas como medio de pago por tribus indonesas).
Defiende por ello que BTC nunca será aceptado como un refugio de valor por la gente y que cómo BTC ha sufrido tantas modificaciones menores (soft forks) como pueden ser el caso de Segwit o la inminente Lightning Network, que se ha distanciado de la idea original proyectada por Satoshi Nakamoto en su whitepaper y ya no debería ser llamado Bitcoin.

{% include video.html provider="youtube" id="ycdSrwlDQuA" caption="Entrevista de Jimmy Song a Roger Ver" %}

Su intención, así como la de todos los defensores de BCH es que en algún momento ocurra lo que denominan *el Flippening*, que básicamente sería que BCH pasase a valer tanto como BTC vale ahora y empezara a ser la moneda predominante del mercado mientras BTC cayera en picado.

Para demostrar sus argumentos, Roger Ver frecuentemente regala dinero online enseñando una clave privada de un paper wallet por su webcam con fondos tanto de BTC como de BCH y reirse de las tasas y las velocidades de transferencia actuales de BTC mientras observa como la gente tarda segundos en extraer los fondos BCH por unos céntimos y casi una hora con unas tasas ridiculamente grandes para los fondos BTC.

En resumen, no podemos estar seguro de que ocurrirá con el debate de la escalabilidad y que repercusiones podría tener esto sobre el mundo de las criptomonedas. Lo que si que sabemos de primera mano es que BCH no deja de crecer en valor y a diferencia de BTC puede ser utilizada en el día a día. Por otro lado, si BCH acaba triunfando y se llenasen los bloques de 8MB podríamos encontrarnos en exactamente el mismo escenario y necesitar de nuevo realizar un HARD FORK o implementar ciertas mejoras como SEGWIT o Lightning Network para arreglarlos, que es precisamente lo que el equipo de BTC está intentando resolver a contra reloj.

Por el momento es absurdo enviar BTC entre wallets, mucha gente que quiere comprar altcoins, y para ello necesita enviar BTC de por ejemplo, Coinbase a Binance, está optando por vender primero en Coinbase su BTC por Litecoin, enviar el LTC, y luego en Binance vender el LTC por Bitcoins para poder comprar las altcoins. Hasta que estos problemas estén resueltos el valor de BCH y LTC no va a hacer más que subir puesto que ofrecen alternativas mucho más económicas a la hora de mover fondos.

#### ¿ Dónde comprar Bitcoin Cash ?

Tenemos una guía de donde comprar Bitcoin Cash en el artículo [cómo comprar criptomonedas](../como-comprar-criptomonedas).