---
title: Cómo reclamar y vender los forks de BTC
date: 2018-10-10 00:00:00 Z
tags:
- bitcoin
layout: post
description: Cómo detectar si tenemos forks asignados en nuestras direcciones de BTC
  y como extraerlos y venderlos.
banner_image: 201810/forks.png
rating: 5
totalVotes: 6
lang: es
---

En este artículo vamos a repasar cómo detectar, reclamar y vender aquellos forks que tengamos en nuestra posesión que no nos interese mantener.

<!--more-->

En primer lugar tenemos que averiguar qué forks tenemos en nuestra dirección. Para haber sido asignados mediante airdrop nuevas criptomonedas debido a un hard fork sobre BTC es necesario que averiguamos en qué dirección teniamos nuestro BTC en el momento en que se hizo el hard fork. Esto es debido a que la nueva criptomoneda ha copiado todo el historial de transacciones hasta ese bloque.

Si tenemos dudas acerca de en qué dirección las tenemos podemos probar en esta página: <a rel="nofollow" href="http://www.findmycoins.ninja/">findmycoins.ninja</a>.

En esta página, introduciremos nuestra dirección pública (**¡nunca la privada!**) en la caja y a continuación se rastrearán todos los blockchain de los distintos forks a ver si hay monedas sin gastar en esa dirección.

{% include image_caption.html imageurl="/images/posts/201810/ninja.png" title="Fork Ninja" caption="Introducimos la dirección donde queremos verificar si hay forks" popup=true %}

{% include image_caption.html imageurl="/images/posts/201810/ninja-2.png" title="Fork Ninja" caption="Podemos ver como hay forks de BTG en esa dirección pero también BTC." popup=true %}

En este caso podemos ver que la dirección que hemos utilizado tiene un balance de `0.9792 BTG`, un fork denominado Bitcoin Gold.

Además podemos ver que se nos marca la extracción cómo Riesgo Alto debido a que también hay un balance de `0.00001395 BTC`.

Si estuvieramos decididos a extraer el balance de BTG, deberíamos ir a <a rel="nofollow" href="https://bitcoingold.org/">la página web oficial del fork</a> y descargar su wallet oficial debido a que probablemente no exista ningún otro wallet que soporte el fork. Aún descargando el wallet oficial nada impide a los creadores actuar maliciosamente y robarnos nuestro balance de BTC residente en la misma dirección en el momento en que introducimos nuestra clave privada en el wallet, es por ello que es recomendable primero extraer el BTC de esta dirección a otra que tengamos y sólo entonces introducir la clave privada en el wallet sospechoso.

Lo siguiente que tendríamos que hacer es ir a CoinMarketCap y ver en que exchanges se vende el fork:

{% include image_caption.html imageurl="/images/posts/201810/markets.png" title="Fork Ninja" caption="Elegimos exchanges en los cuales ya tengamos cuenta o tengan un mínimo de reputación." popup=true %}

Podemos ver que la moneda se vende por ejemplo en Bitfinex y Binance. De esta manera podemos proceder a hacernos una cuenta en alguno de estos exchanges.

Si por ejemplo eligiéramos Binance, procederemos a hacer un depósito en Binance en la dirección que se nos de BTG. Para ello copiaremos la dirección que nos da e iremos al wallet oficial de BTG.

{% include image_caption.html imageurl="/images/posts/201810/binance-deposit.png" title="Fork Ninja" caption="Enviaremos desde el wallet oficial de BTG a la dirección suministrada por Binance." popup=true %}

En el wallet de BTG, una vez introducida la clave privada y reconocidos los BTGs, le daremos a `SEND` y pegaremos la dirección obtenida de Binance.

Ahora solo toca esperar, una vez recibidos los BTG podremos proceder a venderlos fácilmente a cambio de BTC.

