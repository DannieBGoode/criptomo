---
layout: post
title:  El Problema de los Generales Bizantinos
description: Explicación del problema de los generales bizantinos y cómo se resuelve en Bitcoin mediante el algoritmo Proof of Work.
banner_image: 201807/byzantine.jpg
rating: 5
totalVotes: 4
tags: [tecnologia]
---

El Problema de los Generales Bizantinos (PGB) es un problema clásico de las redes distribuidas como Bitcoin y otras criptomonedas. La descentralización es la característica principal de estas monedas y se consigue sobretodo gracias a que consiguen solucionar este problema. 

<!--more-->

El PGB es un ejemplo excelente de cómo funciona el algoritmo de consenso de [Proof of Work](/que-es-proof-of-work/) que ya cubrimos con anterioridad y presenta el siguiente escenario:

Dos ejércitos están situados a los lados de una ciudad con intención de asediarla. La defensa de la ciudad es suficientemente fuerte como para vencer a los atacantes de uno en uno pero nunca a la vez, por lo que el asedio deberá ser simultáneo y estar bien coordinado. Los generales atacantes se comunican entre ellos a través de un mensajero que debe rodear la ciudad para ir de un campamento a otro con las órdenes de ataque.

El mensajero de un ejército informará al otro de que planean atacar el próximo Lunes, y el segundo ejército le confirmará si necesita más tiempo para prepararse o de lo contrario está listo para atacar.

El problema es que el mensajero podría ser interceptado por agentes de la ciudad, el mensaje modificado y enviado de nuevo haciendo que los dos ejércitos no ataquen de manera sincronizada y por tanto sean vencidos por los defensores de la ciudad.

{% include image_caption.html imageurl="/images/posts/201807/byzantine2.png" title="Ejército bizantino" caption="Si los dos ejércitos no atacan a la vez serán derrotados por los defensores de la ciudad" popup=true %}

Si un mensaje de los generales es: **Atacar el Lunes**, al ser únicamente un mensaje de texto, podría ser modificado con facilidad a *Atacar el jueves*. Esto es en esencia el problema de los Generales Bizantinos.

Se requiere entonces de una manera de verificar que el mensaje no ha sido modificado, lo cual se hace en Bitcoin con el algoritmo de consenso Proof of Work.

Proof of Work sugiere que el mensaje sea así: **Atacar el Lunes89**, dónde `89` es el número (denominado *nonce*) que hace que el hash realizado con el protocolo sha256 empiece con dos ceros.

Veamos distintas variaciones del mensaje original cada uno con un *nonce* distinto y el hash sha256 que generarían en cada caso:

- **Atacar el Lunes01** : `4E248CA0C855EEF671DEA9C73E24D20D899E5269601F584C5AFEAA92B0071CA0`  (incorrecto)
- **Atacar el Lunes11** : `8FFAB91733EFC956D87F34C0979533B47E7371AB5F3658D8342E8566D2E4E9F2`  (incorrecto)
- **Atacar el Lunes51** : `E48E41F80135BF67E42ECBBA20D2E83A8014109093905B34D84B8700249E865A`  (incorrecto)
- **Atacar el Lunes89** : `002569FAFD4AC34940816528E86D66257894878486DBF55F7BA9E459B37F79A8`  (válido)

Si ambos generales llegan a un consenso de que únicamente los mensajes que vengan con un número (*nonce*) que al cifrar con sha256 produzcan un hash con dos ceros delante serán aceptados como válidos, sustituir el mensaje original ya no es tan sencillo, puesto que hay que probar con potencialmente millones de números antes de dar con uno que produzca el hash correcto. Además a medida que aumentamos el número de `0` requeridos, llegar al *nonce* correcto se va complicando exponencialmente.

Validar si un hash es correcto o no se puede hacer con páginas online como por ejemplo <a rel="nofollow" href="https://passwordsgenerator.net/sha256-hash-generator/">passwordsgenerator</a> y no lleva más de unos simples segundos (y mucho menos para una máquina). Recibir un mensaje sin cinco `0` al principio del hash sería considerado incorrecto e ignorado por el receptor del mensaje.

De esta manera si el mensajero es interceptado, los agentes de la ciudad deberán leer el mensaje y empezar a probar con miles de combinaciones posibles de *nonces* para intentar generar el hash correcto. Si la dificultad (léase el número de ceros necesarios en el hash) es suficientemente alta, los espías tardarán demasiados días en encontrar el correcto, por lo que al ejército inicial, al no recibir respuesta, le habría dado tiempo de sospechar que algo habría salido mal, y enviar nuevos mensajeros con el mismo mensaje.

Puesto que los agentes interceptores no conocen exactamente qué mensaje deben hashear, no pueden venir con el *nonce* ya preparado.

En Proof of Work, los mensajes son las transacciones a validar por los mineros, y es el trabajo del minero precisamente encontrar el *nonce* que genera un hash que cumple los requisitos de dificultad de la red, es decir, que tenga el suficientemente número de ceros.

Los agentes de la ciudad únicamente podrían generar un hash a tiempo en el caso en que tengan más poder computacional que los ejércitos que se intentan comunicar, esto es lo que se denomina un [ataque del 51%](/ataque-51-porciento/) y es uno de los puntos más criticados de las redes distribuidas. Bitcoin jamás ha sufrido un ataque del 51% victorioso, pero muchas otras altcoins si lo han sufrido lo que ha provocado que los atacantes hayan podido deshacer transacciones pasadas en su beneficio.

