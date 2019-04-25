---
layout: post
title:  La vida de una transacción en el blockchain
description: 
banner_image: 201810/oyster.jpg
rating: 5
totalVotes: 1
tags: [bitcoin]
published: false
---

https://cdn-images-1.medium.com/max/1920/1*ZT-C-MG5j1tclQtbOwSXeA.png

https://www.youtube.com/watch?v=kpnTb6NWih0

Cuando un usuario decide realizar un pago a otro usuario debe hacerlo a través de una transacción que quedará para siempre grabada en el blockchain una vez aceptada por la red. Revisemos todo el camino que la transacción recorre de principio a fin.

En primer lugar será el wallet del usuario el que construya la transacción agrupando los suficientes inputs de entrada también llamados UTXOs (Unspent Transaction Output).

Esto es debido a que en los wallets no existe un balance como tal. Un wallet que muestra un balance de 50 BTC realmente lo que tiene son transacciones de entrada que suman 60 BTC. Por ejemplo podría tener un pago de entrada de 20 BTC y otro de 40. Para crear una transacción de 15 BTC el wallet comprobará si la suma de sus UTXOs es igual o superior a 15BTC y después hará uso de estos UTXOs para formar la transacción. En este caso la transacción a crear tendrá una entrada de 20BTC y 2 salidas, una de 15BTC al wallet al que el usuario quiere realizar el pago, y 5 BTC que regresan al wallet originario. Todo esto lo realiza el wallet de manera automática sin que el usuario tenga q entenderlo.

Una vez estén claras las entradas y salidas de la transacción, el wallet utiliza la clave privada (sólo conocida por el dueño del wallet) para firmar la transacción, de esta manera todo el mundo puede verificar que la transacción está firmada con la clave privada asociada a la dirección pública de emisión (la de ese wallet). Es gracias a esta firma no es posible gastar el balance de otros usuarios sin conocer su clave.

En ese momento el wallet envía la transacción a todos los nodos a los cuales está conectado (p2p). Estos nodos (otros wallets, mineros, exchanges, comerciantes, etc.. ) validarán que la transacción es correcta comprobando en el blockchain que la firma es correcta y que el balance de la cuenta es suficiente para realizar esa transacción, y de ser así la añadirán a su mempool (cubo con todas las transacciones válidas aún no procesadas por el blockchain), y la seguirán propagando a otros nodos.

Normalmente la transacción será finalmente recibida por todos los nodos de la red, algunos de los cuales serán mineros que están compitiendo entre ellos por proponer el siguiente bloque válido al blokchain y así llevarse la recompensa de bloque. Una vez un minero anuncie correctamente haber encontrado la solución al sigueinte bloque, todos los demás descartarán su bloque candidato y empezarán desde cero el siguiente. Para ello harán los siguientes pasos:

1. Crearán un bloque vacío.
2. Escribirán una referencia al último bloque aceptado en el blockchain.
3. Escribirán un timestamp.
4. Incluirán la transacción coinbase, por la cual se asignan así mismos la recompensa de bloque en el caso de ser su bloque el ganador.
5. Revisarán su mempool y seleccionarán aquellas transacciones que les suponen mejores ganancias en comisiones y las irán añadiendo al bloque.
6. Empezarán a buscar la solución Proof of Work de su bloque candidato, que se llama así porque todavía no ha sido aceptado por el blockchain.

Los mempools de distintos nodos no son necesariamente idénticos aunque lo normal es considerar que se parecen en un 99% debido a la velocidad de propagación de todas las transacciones. Lo que si que será distinto con toda seguridad es el bloque candidato de cada minero, puesto que podrían tener distintas transacciones o las mismas en otro orden, y desde luego la transacción coinbase será distinta para cada minero, porque cada uno se la realiza a su propio wallet. Por ello la solución Proof of Work de cada minero resulta distinta que la de los demás aunque todas puedan ser igualmente válidas.

Para que un minero se lleve la recompensa y las comisiones de las transacciones y su bloque candidato sea aceptado por el blockchain, tendrá que encontrar antes que el resto el nonce que soluciona el Proof of Work de su bloque para la dificultad fijada por el sistema. Esto lo hará mediante fuerza bruta probando una combinación tras otra y una vez lo encuentre rápidamente lo anunciará al resto de nodos de la red. Cada uno de estos nodos lo validará rápidamente y de ser correcto descartarán sus propios bloques candidatos, eliminarán de sus propios mempools las transacciones incluidas en el bloque ganador y por tanto ya consideradas válidas por la red y empezarán a trabajar en el siguiente bloque poniendo como bloque anterior el recien propuesto por el minero ganador.

En este momento se considera que la transacción tiene una confirmación. A medida que nuevos bloques se van confirmando encima del bloque que tiene nuestra transacción, se irán sumando +1 a las confirmaciones de la transacción y considerándose más segura de que el bloque se quede huérfano.



IMAGEN DE UN BLOQUE
