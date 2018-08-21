---
layout: post
title:  Qué es un nodo completo de Bitcoin
description: Qué es un full node de Bitcoin (nodo completo) y por qué debería interesarte tener uno.
banner_image: 201808/node.jpg
rating: 4.5
totalVotes: 2
tags: [tecnologia, bitcoin]
---

Cualquier dispositivo que se conecte a una red de Bitcoin es denominado nodo. Entre estos, solo aquellos capaces de verificar todas las reglas de la red son considerados nodos completos.

<!--more-->

### ¿Qué hace un nodo completo?

Un nodo completo descarga todo el blockchain (más de 165 GB a fecha de 2 de Agosto de 2018) y verifica cada bloque y transacción respecto a las reglas de consenso de Bitcoin. Entre otras cosas verifica para cada bloque:
- La recompensa de bloque al minero es la correcta (12.5 BTC)
- Las transacciones tienen las firmas correctas de sus dueños.
- Los bloques tienen el formato predefinido.
- Las transacciones de cada bloque son únicas y no han sido gastadas anteriormente en un bloque anterior.
- El nonce del bloque es correcto por lo que se verifica su [Proof of Work](/que-es-proof-of-work/).

Si alguna de estas reglas no es cumplida, el nodo completo rechazará el bloque incluso aún cuando otros nodos sí lo consideren correcto. Discrepancias como ésta son precisamente las que originan [hard forks](/hard-fork-vs-soft-fork/) al crearse dos cadenas de bloques distintas que no siguen las mismas reglas de consenso. Ésta es precisamente la característica principal de un nodo completo: siempre hará lo que considere correcto sin importarle nada más.

Un minero siempre requerirá tener un nodo completo para poder operar, puesto que si desea obtener la recompensa de bloque es importante que verifique su bloque candidato con las mismas reglas que el resto de la red antes de entregarlo. La única libertad que tiene un minero es poder decidir qué transacciones incluye en su bloque candidato y en qué orden antes de empezar a calcular el Proof of Work del bloque.

### ¿Por qué debería interesarnos tener un nodo completo?

Tener un full node no está al alcance de cualquier persona, y la mayor parte de ellas se conformarán con tener un nodo ligero (lightweight node) también conocido como un lightwallet o sencillamente wallet.

##### Seguridad

Los nodos ligeros podrían en ciertos escenarios ser engañados por nodos completos maliciosos para aceptar transacciones erróneas. Aún así la mayor parte de los nodos ligeros realizan conexiones arbitrarias a distintos nodos completos antes de considerar una transacción correcta, por lo que realmente no sería suficiente con tener un único nodo malicioso.

Aún así tener un nodo completo es la única manera con la cual se puede ser totalmente independiente y no confiar en un tercero. El dueño de un full node podrá verificar que las reglas de Bitcoin se siguen cumpliendo correctamente, que nadie está engañando al sistema gastando monedas que ya no están en su posesión, que no se está generando inflación no programada o que la dificultad del Proof of Work es la correcta.

##### Privacidad

Adicionalmente, cuando un nodo ligero se comunica con un nodo completo, le está revelando sobre qué direcciones quiere obtener información, por lo que un nodo malicioso podría acabar identificando todas las direcciones de bitcoin que pertenecen a la IP del dueño de lightnode. Esta información podría ser usada de muchas maneras, como por ejemplo con fines fiscales o de marketing.

##### Control de Software

El dueño de un full node puede decidir en qué updates de Bitcoin desea participar, por ejemplo Segwit y Lightning Network, así como qué hard forks desea soportar. Los nodos ligeros en cambio siempre estarán a la merced de lo que decida la mayoría de los nodos completos en su entorno.

### Conclusión

El software de nodo completo de Bitcoin más famoso es <a rel="nofollow" href="https://github.com/bitcoin/bitcoin/releases">Bitcoin Core</a> y  es de código abierto por lo que cualquier persona puede ver cómo funcionar y descargar la última versión y se puede utilizar perfectamente como un Wallet después de que se descargue todo el blockchain, lo cual llevará bastantes horas iniciales.

Desde luego un nodo completo [jamás tendrá la agilidad que tiene un wallet móvil o la seguridada hackeos de un hardware wallet](/como-guardar-criptomonedas/) puesto que al final es un software, por lo que debemos decidir por nosotros mismos qué no es más apropiado.