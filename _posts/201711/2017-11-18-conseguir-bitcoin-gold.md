---
layout: post
title:  "Cómo obtener Bitcoin Gold"
description: "Explicación básica de qué es Bitcoin Gold y qué hacer y que no hacer para obtenerlo."
banner_image: 201711/bitcoin-gold-logo.jpg
tags: [altcoins]
redirect_from:
    - /sacar-bitcoin-gold
    - /sacar-bitcoin-gold/
---

Una nueva criptomoneda denominada [Bitcoin Gold](https://bitcoingold.org/) (BTG) fue creada el 12 de Noviembre de 2017 mediante el proceso que se denomina *hard fork*, este proceso fija un punto en el *blockchain* de Bitcoin (BTC) y realiza una copia exacta de la historia de transacciones de la moneda original replicándola en una segunda cadena con normas diferentes. Esto se realizó en el [bloque 491407](https://blockchain.info/block/000000000000000000e5438564434edaf41e63829a637521a96235adf4653e1b) que sucedió en la cadena de BTC el 25 de Octubre de 2017.

A partir de este momento, todo el mundo que tuviera en su posesión BTC, automáticamente pasará a tener adicionalmente BTG.


<!--more-->

## ¿ Por qué ha sido necesario un fork ?

El problema que este nuevo fork intenta resolver es la gran centralización que los equipos de minería de BTC. Se han realizado ciertos cambios en el mecanismos de verificación de los bloques que realizan los mineros, llamado *Proof of Work*, concretamente se ha cambiado de SHA256 a Equihash (algoritmo utilizado por otras conocidas altcoins como <a rel="nofollow" href="https://z.cash/">zCash</a> o <a rel="nofollow" href="https://zensystem.io/)">zenCash</a> haciendo inservibles a estos equipos denominados ASICs. De esta manera, se intenta dar una oportunidad a la gente común de poder minar de nuevo BTC a pesar de haber llegado tarde.

Ahora lo que este fork ha decidido obviar que la centralización sigue siendo perfectamente posible con este nuevo mecanismo de *proof of work*, aquellas entidades que consigan centralizar suficientes GPUs podrán de nuevo destacar sobre la persona convencional.

## ¿ Cómo obtengo BTG y donde puedo venderlo?

El precio de BTG es considerablemente inferior al de BTC y si lo tenemos en nuestra cartera debemos plantearnos qué hacer con ello.

Hay que tener en cuenta que aunque lleve la palabra Bitcoin en el nombre, en realidad entraría en la categoría de las *altcoins* ya que es otra moneda totalmente distinta.

Algunos wallets han dado soporte nativo a BTG por lo que tenerlo localizado o venderlo resulta muy fácil. En el caso en que nuestro wallet no lo soporte la cosa se complica. Para poder obtenerlo entonces, seguiremos los siguientes pasos:

1.  **Localizar BTG**: debemos identificar dónde teníamos guardado nuestro BTC el 25 de Octubre de 2017. Podemos utilizar la web <a rel="nofollow" href="https://btgexplorer.com">BTGExplorer</a> para dar con la dirección en la que tenemos nuestros fondos almacenados. Tendremos que probar con las distintas direcciones de BTC que tenemos en nuestro wallet hasta encontrar aquella que contiene los BTG.
2.  **Localizar la clave privada**: Una vez identificado la dirección o el wallet en cuestión, debemos mirar si poseemos la clave privada de la dirección o el seed del wallet. En la mayoría de los wallets es posibles exportar dicha clave.
**Si tuvieramos el seed del wallet pero no la clave privada** de la dirección específica podemos obtener la clave privada usando la herramienta <a rel="nofollow" href="https://github.com/iancoleman/bip39">Bip39</a>. Tenéis a vuestra disposición una guía de como hacer esto en [Claves Privadas y Seeds - Conceptos Básicos](/clave-privada-vs-seed/).
3.  **Mover BTC/BCH**: Puesto que vamos a importar nuestra clave privada en un wallet del que no necesariamente nos fiamos para poder sacar nuestro BTG, primero vamos a sacar nuestro Bitcoin y/o Bitcoin Cash de nuestro wallet enviándolo a una nueva dirección. Esta operación la tendremos que hacer una vez por moneda que queramos mover. Una vez completada nuestro wallet original solo contendrá BTG. Ha habido casos de gente que ha subido wallets maliciosas, como es el caso de <a rel="nofollow" href="https://www.reddit.com/r/btc/comments/7dsmvd/my_analysis_of_the_1_million_usd_mybtgwalletcom/">myBTGWallet</a> que en cuanto metas tus claves privadas son envíadas a terceros que inmediatamente tiene acceso tanto a tu BTC como a tu BTG hasta que los muevas de nuevo.
4.  **Importar la clave privada a cualquier wallet que si soporte BTG**. Por ejemplo <a rel="nofollow" href="https://coinomi.com/">Coinomi</a>. Para ello deberemos buscar la opción de *import wallet* ó *sweep wallet* donde se nos pedirá nuestra clave privada. Para aquellos que no tengan un dispositivo Android siempre pueden bajarse un emulador y descargar la aplicación desde dentro del emulador (no se necesitaría trastear con ficheros apks).  Recomiendo <a rel="nofollow" href="https://www.bluestacks.com/es/index.html">Bluestacks</a> como emulador.
6. **Vender BTG**: Si deseamos venderlo mueve tu BTG a un exchange que la venda, por citar alguno de los más famosos <a rel="nofollow" href="https://www.bitfinex.com">Bitfinex</a> o <a rel="nofollow" href="https://www.binance.com/es/register?ref=11317062">Binance</a>.

Ciertos exchanges como <a rel="nofollow" href="https://www.kraken.com/">Kraken</a>, <a rel="nofollow" href="https://www.coinbase.com/join/52f9eda19f27be821400004e">Coinbase</a> o <a rel="nofollow" href="https://www.bitstamp.net/ref/00zetsvGCLkDqtqH/">Bitstamp</a> entre otros no suministran la clave privada a los usuarios, de tener tus fondos en uno de estos sitios, sólo ellos podrán darte las herramientas para obtener tu BTG y decidir entonces qué hacer con ellos.

Tanto TREZOR como Ledger han informado de que dan soporte a BTG por lo que si teníamos nuestros fondos en estos dispositivos ya es posible exportarlos a un exchange sin peligro alguno.

## ¿ Debería vender BTG ?

En mi opinión cualquier criptodivisa debería tener un equipo muy fuerte de desarrolladores detrás, y a dia de hoy BTG apenas tiene desarrolladores activos. Cómo con casi todas las criptodivisas, el [código es open source](https://github.com/BTCGPU/BTCGPU) por lo que puede ser revisado por cualquiera, pero al mismo tiempo nos permite ver a los demás cuánto se está colaborando en el proyecto. Prácticamente todo el desarrollo está siendo realizado por un único desarrollador anónimo conocido como *h4x3rotab*.

Además a modo de auto financiación se ha realizado [un pre-minado de 16000 BTG](https://github.com/BTCGPU/BTCGPU/pull/2) para los propios desarrolladores, es decir, 16000 monedas que jamás serán entregadas a los mineros y que al precio actual de BTG ya convierte en millonarios a los responsables del fork.

La persona detrás del fork, Jack Liao es también el CEO de <a rel="nofollow" href="http://lightningasic.com/">Lightning ASIC</a>, una empresa que fabrica unidades de minería basados en GPU por lo que el éxito de esta moneda sin duda le enriquecería bastante.

Por muy loable que inicialmente parezca la idea, como con todo, existen intereses ocultos detrás. Personalmente recomiendo vender esta divisa e invertir en otras más prometedoras.




