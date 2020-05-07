---
layout: post
title:  Qué es el bitcoin halving
description: Qué es el bitcoin halving cómo se compara con el oro o con los bancos centrales
banner_image: 202005/bitcoin-halving.png
rating: 5
totalVotes: 6
tags: [bitcoin]
---

Inicialmente, en 2009 cuando nació Bitcoin, se distribuía una [recompensa por bloque minado](/que-es-proof-of-work) de 50BTC, es decir cada 10 minutos se generaban 50BTC de la nada asignados al minero ganador. Según el protocolo de [Bitcoin](/que-es-bitcoin), cada aproximadamente cuatro años la recompensará bajará a la mitad.

<!--more-->

El 29 de Noviembre de 2012, en el bloque  <a rel="nofollow" href="https://www.blockchain.com/btc/block/000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e">210,000</a> se produjo el primer halving, por el cual la recompensa pasó de 50 BTC a la mitad, 25 BTC.

El siguiente halving se produjo el 10 de Julio de 2016 en el bloque  <a rel="nofollow" href="https://www.blockchain.com/btc/block/000000000000000002cce816c0ab2c5c269cb081896b7dcb34b8422d6b74ffa1">420,000</a> disminuyendo la recompensa a 12.5 BTC.

Con fecha 12 de Mayo de 2020 se produjo el siguiente halving, que disminuyó la recompensa a 6.25 BTC. Este halving ocasiona que el ratio de inflación de Bitcoin disminuyese de 3.68% a 1.80% lo cual ya lo sitúa por debajo del ratio de inflación medio de los bancos centrales principales (2%) pero a diferencia de los bancos centrales, nadie tiene el poder de cambiar esta tendencia. La inflación de Bitcoin seguirá bajando hasta llegar a cero.

El proceso terminará con un total de aproximadamente 21 millones de bitcoins por el año 2140, teniendo en cuenta que la recompensa de bloque será disminuida por la mitad cada 4 años.

Estas reglas fueron puestas en funcionamiento por Satoshi Nakamoto.

Se espera que el precio pueda verse afectado positivamente por varios motivos:

- Históricamente después de cada halving el precio siempre ha aumentado drásticamente.

{% include image_caption.html imageurl="/images/posts/202005/graph2.webp" title="Halvings de Bitcoin" caption="Después de cada halving el precio de BTC aumenta" popup=true %}

- Los mineros tienen menos BTC que vender lo cual crea escasez. Si la demanda se mantiene constante el precio debería subir.

{% include image_caption.html imageurl="/images/posts/202005/bitcoin-inflation-chart.png" title="Inflación" popup=true %}

- Con la inminente crisis económica y la gran inflación esperada para los siguientes años la demanda por bienes de refugio de valor como el BTC o el oro debería aumentar.

Aun que haya gente que decida refugiarse en el oro, que tiene una inflación constante pero pequeña y dificilmente controlable por la dificultad de minado que tiene, y sin duda parece mejor idea que mantener el dinéro en euros o dólares, hay que recordar como la NASA <a rel="nofollow" href="https://www.foxnews.com/science/nasa-headed-towards-giant-golden-asteroid-that-could-make-everyone-on-earth-a-billionaire">anunció</a> que se encuentra en camino para intervenir un asteroide cargado de oro. Al tratarse el oro de un material físico, en cualquier momento se podrían encontrar yacimientos de oro grandes o mejoras de minado significativas, o cualquier otro acontecimiento que pueda generar mucha abundancia de oro y derrumbar su precio.

Bitcoin en cambio se trata de algo irremplazable, no se pueden encontrar más, ni multiplicar según los gobiernos centrales consideren adecuados. Por primera vez en la historia se trata del primer bien universal y permanentemente escaso. Su inflación terminará siendo nula, sumado a la gran cantidad de BTCs que se pierden cada año por pérdida de contraseñas o muertes sin herencia.


{% include image_caption.html imageurl="/images/posts/202005/inflation-table.png" title="Inflación" caption="Inflación del Bitcoin a lo largo de los años" popup=true %}

### ¿ Dónde en el código de Bitcoin ocurre el halving?

Este es el <a rel="nofollow" href="https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp">código</a> que define los halvings en Bitcoin. Una de las cosas a destacar es que después de 64 halvings la recompensa de bloque pasará a ser cero.

Cada halving ocurre cada 210,000 bloques, teniendo en cuenta que un bloque es minado cada aproximadamente 10 minutos, podemos esperar un halving cada cuatro años. El tiempo medio de diez minutos depende realmente de cuanto tarden los mineros en encontrar la solución Proof of Work de cada bloque. A medida que se sumen mineros este tiempo debería disminuir pero la dificultad del minado es re-ajustada cada dos semanas, lo que llevará el tiempo medio de nuevo a los 10 minutos.

{% include image_caption.html imageurl="/images/posts/202005/code.png" title="Bitcoin halving code" caption="Código del halving" popup=true %}

### ¿ Cómo se financiarán los mineros cuando la recompensa de bloque sea demasiado pequeña?

Principalmente, los mineros se financiarán únicamente por comisiones de transferencia, igual que ya hacen parcialmente ahora mismo. El mercado ajustará los valores de estas comisiones, especialmente teniendo en cuenta los bajos costes de crear un nodo de Bitcoin.

{% include image_caption.html imageurl="/images/posts/202005/graph.png" title="" popup=true %}


