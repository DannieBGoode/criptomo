---
title: "¿Son 21 millones de bitcoins suficientes?"
date: 2018-08-28 00:00:00 Z
tags:
- bitcoin
layout: post
description: Sólo existirán 21 millones de bitcoins, ¿serán suficientes para toda
  la población si el Bitcoin triunfa? ¿Cuánto se puede dividir cada Bitcoin?
banner_image: 201808/bitcoin-mining.jpg
rating: 5
totalVotes: 5
lang: es
---

Únicamente existirán unos 21 millones de criptomonedas, suponiendo que el Bitcoin triunfa y acaba extendiéndose por el mundo, ¿será este número suficiente para poder hacer frente a una economía mundial de transacciones al uso?

<!--more-->

### ¿Por qué hay 21 millones de bitcoins con 8 decimales?

El número 21 millones puede parecer bastante arbitrario, y mucha gente se pregunta por qué no son 20, o 50, o algún otro número redondo. La realidad es que el número en sí nunca fue 21 sino que es ligeramente por debajo tendiendo a 21 a lo largo de los años como muestra la siguiente gráfica.

{% include image_caption.html imageurl="/images/posts/201808/graph.jpg" title="21 Million of Bitcoins" caption="El número final de bitcoins tiende a 21 millones sin llegar nunca a tocarlo." popup=true %}

Este número es en realidad consecuencia de que desde la creación de Bitcoin se otorga cada 10 minutos una recompensa de bloque que comenzó siendo 50 BTC y va reduciéndose a la mitad cada cuatro años. Teniendo en cuenta esta progresión, el número de monedas final tiende a estos 21 millones. 50 BTC como recompensa de bloque, 4 años, 8 decimales y 10 minutos como tiempo de bloque si parecen números redondos elegidos de manera humana, por ello resultar lógico pensar que no es el 21 el número que se elegió, si no el resto de los parámetros.

El tiempo de bloque de 10 minutos tampoco ha sido elegido a la ligera, 10 minutos ha demostrado ser el tiempo perfecto para no generar demasiados [bloques huérfanos](/problema-escalabilidad/) y al mismo tiempo no tardar demasiado en verificar transacciones.

### ¿Qué pasa cuando se pierden bitcoins?

Desde la creación de la criptomoneda se han perdido muchísimos Bitcoins, principalmente por la pérdida de las claves privadas asociadas a las direcciones que los contienen. No es raro leer noticias de gente buscando por vertederos sus antiguos discos duros que contenían sus claves privadas con miles de bitcoins dentro. Además mucha gente ha muerto o morirá sin haber entregado sus claves privadas a sus seres queridos y por la naturaleza de Bitcoin ningún banco o entidad será capaz de remediarlo.

Todos estos bitcoins perdidos son equivalentes a tirar dinero al mar ó quemar billetes: su valor ha sido perdido para siempre pero en consecuencia, existe menos dinero en circulación por lo que el poder adquisitivo del resto de los poseedores aumenta. En cierta manera, **cada vez que una clave privada se pierde se está haciendo un regalo al resto de la comunidad en forma de deflación**.

De hecho, en muchas criptomonedas, después de la fase ICO es normal ver como los creadores de la altcoin de turno, deciden quemar gran parte del capital que no ha sido comprado por los inversores mediante Proof of Burn, que consiste en enviar el sobrante a una dirección aleatoria de la cual nadie tiene la clave privada. Por ejemplo, una dirección con todo 0's. Técnicamente hablando podría ser la dirección de alguien, pero en la práctica es imposible que justo alguien posea esa dirección.

{% include image_caption.html imageurl="/images/posts/201808/pob.jpg" title="Joker quemando dinero" caption="En Proof of Burn el dinero se envía a una dirección aleatoria por lo que pasa a ser irrecuperable y se considera quemado." popup=true %}

¿Qué consecuencias podría tener la pérdida constante de tantos Bitcoins a lo largo de los años? **Según la economía austriaca no muchas, ya que cualquier cantidad de dinero es suficiente para mantener una economía siempre y cuando la divisa sea lo suficientemente divisible**. La unidad más pequeña de BTC que se puede obtener es un satoshi, resultado de los 8 decimales que un BTC tiene a su disposición. Si la demanda de bitcoins aumentara con el tiempo, la única manera de hacer frente a ella sería con la revalorización de la oferta disponible haciendo el satoshi cada vez más valioso.

### ¿Qué ocurrirá si un satoshi llega a ser demasiado caro?

Si llegase el día en el que debido a la cantidad de BTCs perdidos junto a una subida del precio del mismo ocasione que un satoshi pasase a ser demasiado caro como para transaccionar con él habrá que empezar a trabajar en divisiones más pequeñas.

Existen dos maneras de ofrecer niveles de unidad inferiores al satoshi:

- Mediante un [hardfork](/hard-fork-vs-soft-fork#hardfork), es decir, creando una moneda totalmente nueva y esperando que todo el mundo la considere el nuevo Bitcoin. Esto es muy peligroso porque arriesga dividir a la comunidad y debería ser evitado a toda costa. Una de los principales puntos fuertes a favor de BTC es que jamás ha necesitado realizar un hardfork, siempre ha sido inmutable pero si se quieren tener más decimales en la misma cadena blockchain no hay ninguna otra alternativa.

- Mediante [softforks](/hard-fork-vs-soft-fork#softfork). De hecho esto es algo que ya se hace en The Lightning Network. Puesto que es una red fuera del blockchain principal de Bitcoin, The Lightning Network permite transacciones a unidades inferiores al satoshi siempre y cuando el resultado final de todas estas transacciones sea liquidado a nivel de satoshi cuando se escriba el resultado en el blockchain.

Contrario a lo que muchos pueden pensar, cambiar la divisibilidad de una moneda no es equivalente a inflación, puesto que los poseedores de la moneda no ven sus ahorros devaluados, todo lo contrario.

Teniendo en cuenta que cada Bitcoin está formado por 100 millones de satoshis aún existe mucho espacio para que crezca sin problemas antes de afrontar estos problemas de divisibilidad pero siempre es un buen ejercicio pensar en las posibles consecuencias que podrían producirse.