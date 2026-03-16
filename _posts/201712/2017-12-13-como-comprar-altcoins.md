---
title: Cómo comprar altcoins
date: 2017-12-13 00:00:00 Z
tags:
- altcoins
layout: post
description: Aprende cómo comprar altcoins en Binance con Bitcoin paso a paso. Cómo depositar, encontrar el par de trading correcto y retirar tus criptomonedas de forma segura.
banner_image: 201712/coins.jpg
rating: 5
totalVotes: 3
lang: es
faq:
  - question: "¿Cómo puedo comprar altcoins que no están en Coinbase?"
    answer: "Primero debes comprar Bitcoin o Ethereum en un exchange como Coinbase, luego transferirlos a Binance y cambiarlos por la altcoin que desees. Puedes consultar en CoinMarketCap qué exchanges venden cada moneda."
  - question: "¿Por qué es más barato enviar Litecoin que Bitcoin entre exchanges?"
    answer: "Las tasas de transacción de Bitcoin pueden ser muy elevadas en momentos de congestión de red, mientras que otras monedas como Litecoin tienen tasas mucho menores, lo que reduce el coste del envío."
  - question: "¿Qué ocurre si envío criptomonedas a una dirección del tipo incorrecto?"
    answer: "Perderías los fondos de forma permanente. Siempre debes asegurarte de que la dirección de destino corresponde exactamente al tipo de criptomoneda que estás enviando."
  - question: "¿Cómo vendo mis altcoins y convierto las ganancias a dinero fiat?"
    answer: "Debes enviar tus altcoins a Binance, venderlas por Bitcoin, transferir ese Bitcoin a Coinbase, venderlo allí por euros o dólares, y finalmente retirar el dinero a tu cuenta bancaria."
how_to:
  - name: "Decidir dónde comprar la altcoin"
    text: "Consulta CoinMarketCap, busca la altcoin deseada y mira en qué exchanges se vende. Si el exchange acepta transferencias SEPA, puedes comprar directamente con euros; si no, necesitarás Bitcoin o Ethereum como paso intermedio."
  - name: "Obtener la dirección de envío en Binance"
    text: "Regístrate en Binance, ve a Billetera → Depósito, selecciona Bitcoin o Ethereum y copia la dirección de depósito. Verifica que la red coincide exactamente antes de enviar fondos."
  - name: "Enviar fondos desde Coinbase a Binance"
    text: "En Coinbase, ve a Enviar, pega la dirección de Binance y envía Bitcoin o Ethereum. Para reducir comisiones usa Litecoin si el exchange destino lo acepta. Espera a que la transacción sea confirmada."
  - name: "Comprar la altcoin en Binance"
    text: "En Binance, busca el par de trading (por ejemplo ETH/ALT), selecciona Mercado y compra al precio actual con los fondos que acabas de depositar."
  - name: "Vender y convertir a fiat"
    text: "Para retirar dinero fiat, vende la altcoin por Bitcoin en Binance, transfiere el Bitcoin a Coinbase, véndelo por euros y retira a tu cuenta bancaria mediante transferencia SEPA."
---

Esta entrada es la continuación del artículo [cómo comprar criptomonedas](/como-comprar-criptomonedas) dónde explicabamos cómo comprar tus primeras criptomonedas a cambio de euros o dólares. En este artículo haremos más hincapie en cómo comprar otras criptomonedas a cambio de BTC suponiendo que ya  poseemos está u otra criptomoneda en [Coinbase](https://www.coinbase.com/join/52f9eda19f27be821400004e) y utilizaremos [Binance](https://www.binance.com/activity/referral-entry/CPA?ref=CPA_001SI1A33Q) para ello. El motivo por el que haríamos esto es por que la mayor parte de los Exchanges que venden estas monedas no aceptan transferencias bancarias.

Ten en cuenta que si la moneda que quieres comprar se vende en un exchange que si acepta transferencias bancarias (como Coinbase, Bitstamp o Kraken) no necesitas seguir esta guía para nada.

<!--more-->

Asumiremos entonces los siguientes pasos explicados en el artículo original:

* El usuario tiene cuenta en Coinbase.
* El usuario ha conseguido comprar alguna moneda en Coinbase ya sea con tarjeta de crédito o transferencia.
* El usuario tiene cuenta en Binance.


Llegados a este punto, el usuario pretende comprar otra criptomoneda, por ejemplo Dash.

#### Decidir dónde comprar

Lo primero que deberá hacer es **investigar en qué Exchanges venden Dash**. Esto se puede hacer en [coinmarketcap](https://coinmarketcap.com/currencies/dash/#markets) haciendo click en la moneda en cuestión y pulsando en la pestaña de Markets.

{% include image_caption.html imageurl="/images/posts/201712/dash-markets.png" title="Dash Markets" popup=true %}

En este caso podemos ver que Binance vende Dash a cambio de BTC (DASH/BTC) por lo que sabemos que deberemos acabar teniendo BTC a Binance para poder comprarlo, pero si tenemos alguna otra moneda con la cual queramos pagar, siempre podemos enviar esa otra moneda a Binance y cambiarla por BTC allí.

**De hecho, a dia de hoy es más barato comprar otra moneda como Litecoin o Ethereum en Coinbase, enviarla a Binance y venderla por BTC que enviar BTC directamente puesto que las tasas de envío de BTC son enormes (problema que esperamos que solucionen pronto)**. Por ejemplo he visto casos en los que enviar 20€ de BTC de Coinbase a Binance podría costarte 12€ de tasas mientras que para Litecoin podría costarte 10céntimos. Aún así seguiremos el ejemplo con BTC al ser el caso más general.

#### Obtener dirección de envio

Ahora procederemos a Binance y le daremos a `FUNDS > DEPOSITS WITHADRAWALS`. Ahí veremos una lista de todas las monedas que Binance ofrece, con aquellas que poseamos situadas en las primeras líneas.

Buscaremos BTC y le daremos a `DEPOSIT` puesto que vamos a depositar BTC en Binance desde otro sitio. Aquí se nos dará una dirección como muestra la imagen que deberemos copiar. Si hubiéramos querido depositar otra moneda, como LTC o Ethereum el proceso hubiese sido el mismo pero buscando la moneda correspondiente en la lista y copiando la dirección.

**Nunca enviaremos monedas a una dirección perteneciente a otro tipo de moneda**. Si intentamos enviar BTC a una dirección de LTC perderemos las monedas para siempre. Mucho cuidado con esto.

{% include image_caption.html imageurl="/images/posts/201712/binance-deposit.png" title="Binance Deposit" popup=true %}

#### Enviar los fondos

Una vez copiada la dirección iremos a Coinbase y le daremos a enviar BTC. Pondremos la dirección que hemos copiado y esperaremos a que la transferencia se realice que podría llevar unos minutos. Podemos ver el progreso de la transferencia en Binance, aunque nuestros fondos no estarán disponibles hasta que no haya al menos dos confirmaciones en el blockchain.

{% include image_caption.html imageurl="/images/posts/201712/coinbase-send.png" title="Coinbase Send" popup=true %}

#### Comprar la criptomoneda

Volvemos a Binance y le damos a `EXCHANGE > BASIC`, en el buscador de la derecha escribiremos DASH y seleccionaremos `DASH/BTC`. En el formulario de BUY escribimos cuanto DASH queremos comprar y le daremos a BUY. Si queremos gastar la totalidad de nuestro saldo de BTC en DASH podemos hacer click en el botón de `100%`.

Si por algún casual no tuvieramos BTC por que queremos vender otra moneda, por ejemplo Litecoin, elegiremos primero `LTC/BTC`, venderiamos nuestro LTC por BTC dandole a `SELL 100%`, y despues procedemos a comprar `DASH/BTC`.

{% include image_caption.html imageurl="/images/posts/201712/binance-buy-dash.png" title="Binance Buy Dash" popup=true %}

Si ahora volvemos a la sección de `FUNDS` veremos que efectivamente ahora poseemos DASH.

No se os ocurra dejar vuestro Dash o cualquier otra criptomoneda almacenada en Binance o cualquier otro exchange. Así es como mucha gente ha perdido muchísimo dinero, yo incluido (te odio [cryptsy](http://www.cryptsysettlement.com/)) por que los Exchanges desaparecen o son hackeados. He creado otra entrada de [cómo guardar vuestras criptomonedas de manera segura](../como-guardar-criptomonedas/), por favor echadle un vistazo.

#### Vender las altcoins

Ha llegado el momento y ahora quieres vender tus ganancias en altcoins y meterlas en tu cuenta bancaria corriente, para ello tendremos que hacer lo siguiente:

* Envíamos nuestro DASH a Binance mediante el botón de `DEPOSIT`.
* En la sección de `EXCHANGE > BASIC` elegimos `DASH/BTC` y le damos a `SELL DASH`.
* En Coinbase le daremos a `RECEIVE BTC` y se nos dará una dirección.
* En Binance lo enviamos de vuelta a Coinbase desde la sección `FUNDS > WITHDRAW` dándole a `WITHADRAWAL` para BTC y poniendo la dirección del paso anterior.
* En Coinbase le damos a `SELL Bitcoin` y nos darán dinero fiat.
* En Coinbase hacemos un withdraw de esos fondos a nuestra cuenta bancaria.