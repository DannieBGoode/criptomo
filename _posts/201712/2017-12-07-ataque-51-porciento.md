---
layout: post
title: Cómo funciona un ataque del 51 porciento
description: El ataque del 51 por ciento explicado.
date: 2017-12-03T00:00:00.000Z
banner_image: 201712/exchange.jpg
tags:
  - bitcoin
published: false
---
El ataque del 51 por ciento es altamente discutido entre la comunidad de las criptomonedas por las consecuencias catastróficas para la red que podría llegar a tener.

Este ataque podría provocarse en cualquier blockchain que use Proof of Work, aunque también podría llegar a ser posible en redes Proof of Stake.

<!--more-->

El nombre del ataque se debe a que si una entidad consigue el 51% del poder computacional de la red (léase ordenadores suficientes como para que procesen transacciones/minen más rápido en sincronía que el resto de los ordenadores de los demás usuarios que minan la misma moneda) podría ser capaz de hundir la red entera y desprestigiar la tecnología.

En primer lugar, debemos entender de qué modo resuelve la tecnología blockchain los conflictos si se enfrenta a dos cadenas distintas: **La red siempre elegirá la cadena más larga, lo cual es un fundamento importantísimo que hace funcionar al protocolo de blockchain.**

Si una entidad consigue el 51% del poder computacional, estadísticamente podrá minar más rápido que el resto de la red, lo cual le daría virtualmente todas las recompensas en criptomoneda del sistema, que a día de hoy para Bitcoin son de 25 BTC por bloque minado (cada 10 minutos). Además implicaría que el resto de los mineros dejarían de recibir sus recompensas de bloque (o recibirían muchas menos), lo cual les haría abandonar el sector subiendo el 51% del atacante a porcentajes superiores agravando el problema.

Ahora bien, si en lugar de eso, esta entidad decide tumbar la red de Bitcoin procedería de la siguiente manera:
-	**El atacante empezaría a minar sus propios bloques a escondidas**, ya que a diferencia del caso anterior, cada vez que se mina un bloque satisfactoriamente, NO se anunciaría públicamente al resto de la red. De esta manera tenemos dos cadenas paralelas, una en la que el atacante mina por su cuenta y añade bloques nuevos a su versión del blockchain y otra en la que el resto de la gente mina públicamente.
-	Puesto que el atacante tiene más poder computacional, **a la larga habrá minado más bloques en su propia cadena** que el resto de los usuarios en la pública.
-	Mientras tanto, **el atacante puede realizar compras en la cadena pública** e ir gastando sus BTCs, pero a diferencia del resto de las transacciones que aparecen en la cadena pública, éstas no las incluirá en su versión privada.
-	**El atacante decidirá entonces compartir su versión del blockchain con el resto del mundo**. El resto de la red se encontrará con una nueva versión del blockchain y por su protocolo de manejo de conflictos descartará la cadena más corta, de tal manera que el atacante podrá mantener sus compras ya en su posesión además de los BTCs con los que originalmente realizó dichas compras.

Otro posible ataque que se podría realizar teniendo tal poder computacional sería censurar ciertas transacciones, puesto que los mineros tienen la capacidad de elegir las transacciones que permiten pasar y cuales ignorar, si digamos un gobierno consiguiese el 51% del poder computacional, podría decidir bloquear todas las transacciones realizadas a favor o en contra de las direcciones conocidas de otro país o individuo desconectándolo del sistema monetario general.

Una de las claves de la tecnología blockchain según lo explicado en el whitepaper original escrito por Satoshi Nakamoto es la Teoría de juegos de John Nash, que básicamente apuesta porque si en algún momento un atacante decide realizar la enorme inversión que requiere tener el 51% del poder computacional, le va a interesar más jugar a favor del sistema para llevarse las recompensas de la red (que se seguirán entregando hasta el año 2100) que tirar el sistema.

Adicionalmente, tirar el sistema de la manera explicada, sería una acción totalmente destructiva ya que aunque permitiría al atacante poder volver a gastar sus BTCs infinitamente o censurar a otras entidades, el pánico distribuido del resto de la gente cuando descubran lo que está ocurriendo (que sería prácticamente al instante) provocaría una desconfianza en el sistema que devaluaría la moneda a prácticamente cero volviendo inservibles los poderes del atacante.

Es por ello que en aquellas ocasiones donde ciertos pools de mineros (un pool de mineros es un conjunto de entidades que deciden juntar su poder computacional mediante un software para minar en sincronía y repartirse las recompensas) se han acercado a porcentajes altos, a ellos mismos les ha interesado repartir su potencia en grupos más pequeños.

**La concepción general del ataque de 51 por ciento ahora mismo es que aunque resultaría técnicamente posible, no es algo que a priori nos debería preocupar demasiado a día de hoy.**

Ahora como ejercicio de lo explicado anteriormente, vamos a imaginar un escenario ficticio:
Imaginemos que se produce una guerra nuclear, y un grupo de supervivientes decide refugiarse en un búnker convenientemente acondicionado para sobrevivir los próximos 20 años hasta que la radicación nuclear desaparezca. Los ocupantes deciden usar Bitcoin como método de pago entre ellos, y así lo hacen durante 20 años, los mineros consiguen sus recompensas por procesar las transacciones del resto de los usuarios que usan Bitcoins sin problemas.

Una vez la radiación nuclear desaparece, los ocupantes deciden salir al exterior y encuentran un segundo grupo de supervivientes refugiados en otro búnker cercano que también han estado usando Bitcoins durante todo este tiempo.

¿ Qué ocurriría de manera automática cuando ambas redes (léase nodos de la red que operan con el Software actual de Bitcoin) conozcan la existencia de la otra?

a)	Se crearía un FORK y pasaríamos a tener 2 Bitcoins distintos como ya ha ocurrido con Bitcoin Cash o Bitcoin Gold.
b)	Puesto que los ocupantes de cada bunker sólo han intercambiado Bitcoins dentro de su propio bunker ambas redes resultan compatibles y pueden ser fusionadas sin conflictos.
c)	Se descarta la cadena del bunker que menos bloques ha producido a lo largo de los 20 años y sus integrantes recuperarían su saldo inicial cuando empezó la bifurcación de las dos cadenas.

Si has estado prestando atención habrás concluido que lo que ocurriría es lo descrito en la última opción de la lista. Desde luego las dos primeras opciones son soluciones perfectamente válidas para este problema desde una perspectiva humana, pero ambas requerirían una modificación del protocolo actual para llevarse a cabo.
