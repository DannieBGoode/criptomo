---
layout: post
title:  La vida de una transacción
description: 
banner_image: 201810/oyster.jpg
rating: 5
totalVotes: 1
tags: [bitcoin]
published: false
---

https://www.youtube.com/watch?v=kpnTb6NWih0
la vida de una transacción desde que la hace un usuario hasta que es confirmada en el blockchain

El wallet de un usuario construye una transacción agrupando las suficientes trransacciones de entrada de BTCs que ha ido recibiendo y las direcciones de destino a las que quiere enviar bitcoins y firmando dicha transacción con su clave privada (sólo conocida por el dueño del wallet) dejando de esta manera una firma que todo el mundo puede verificar que corresponde al dueño de esa dirección pública (ese wallet) aun sin que el resto de la red conozca la red privada.

HABLAR DE OTXO QUE VUELVEN AL WALLET

Es curioso que si un wallet ha recibido 1 transacción de 50 BTC y desea enviar 10 BTC a otra dirección, deberá gastar la transacción de entrada anterior (50BTC) de golpe para poder enviarlos. Para hacerlo su transacción constará de una entrada de 50 BTC, y 2 salidas, una de 10 BTC a la dirección a la que quiere enviar esos fondos, y 40 BTC que regresan a su propio wallet. Esto es por que en blockchain el concepto de balance no existe si que lo que tiene un wallet son transacciones sin gastar (UTXO).

En ese momento el wallet envía la transacción a cualquiera (o a todos) de los nodos de la red a los que está conectado. Estos nodos, que tal vez sean otros wallets, o tal vez sean mineros, exchanges, comerciantes, etc.. recibirán la transacción y la validarán. Verificarán que realmente tienes el balance que dices tener y que estás intentando enviar comprobando en el blockchain el historial de transacciones hasta ese momento. De esta manera se verifica que el emisor no se ha inventado su balance y que la firma es correcta.

Si la transacción no fuera correcta sería descartada por los nodos, en caso de si serla, los nodos guardán las transacciones nuevas en un cubo llamado el mempool donde se guardan todas las transacciones aún no grabadas en el blockchain, y posteriormente enviarán la transacción a todos los nodos que ellos también conozcan que también validarán la transacción y la continuarán propagando.

Eventualmente la transacción será recibida por todos los nodos de la red, algunos de estos nodos serán mineros. Los mineros, que como ya sabemos están luchando por sugerir el siguiente bloque correcto antes que el resto, se dedican a recoger las transacciones del mempool que han ido completando según recibían y verificaban transacciones.

Los mempools de distintos nodos no son idénticos pero lo normal es que tengan un overlap del 99% ya que la propagación de las transacciones nuevas es muy eficiente. Lo que si que podría ser distinto es el bloque candidato que cada minero crea juntando un montón de transacciones del mempool, ordenandolas y empezando a buscar el proof of work del bloque para que la red lo acepte.

Las transacciones con más fee ofrecida por el emisor son más probables que sean recogidas por el minero (puesto que se llevan una mayor comisión por procesarla). Siguiendo con nuestra transacción

Desde el punto de los mineros, una vez han dado cuenta de que un bloque se ha construido, dejarán de buscar la solución a su bloque candidato, y empezarán a construir el siguiente bloque. Esto lo harán creando un bloque con un enlace al último bloque apcetado por la red, un timestamp, y al menos una transacción que es la coinbase transacción a su propio wallet que básicamente es la recompensa de bloque que se llevarán si su bloque es aceptado por el blockchain antes que los del resto de los mineros. En este momento enviarán el bloque vacío a su mining equipment, luego buscan en el mempool cuales son las transacciones que ofrecen el mayor fee y las van añadiendo al bloque. Todas estas transacciones ya están validadas por que si no estarián en el mempool. Esto crea el bloque candidato, que se llama así por que todavía no ha sido aceptado por el blockchain. Para que se acepta y se lleven su recompensa y los fees tendrán que encontrar el *nonce* mediante un método de fuerza bruta buscando un hash del bloque candidato que cumpla con la dificultad propuesta por la red, e inmediatamente el nodo anunciará su bloque candidato con proof of work válido a todos los nodos de la red.

Cuando otros nodos mineros de la red lo validarán rápidamente y de ser válido dejarán de minar sus propios bloques candidatos y empezarán a construir el siguiente bloque candidato con este bloque como padre puesto que habrán perdido la carrera por la recompensa de este bloque.

Todos los nodos según van recibiendo el bloque y lo validan, comprobarán que la transacción que antes existía en el mempool ahora existe en un bloque validado, por lo que eliminarán la transacción del mempool y la considerarán confirmada. En este momento se considera que la transacción tiene una confirmación. A medida que nuevos bloques se van confirmando encima del bloque que tiene nuestra transacción, se irán sumando +1 a las confirmaciones de la transacción y considerándose más segura de que el bloque se quede huérfano.

IMAGEN DE UN BLOQUE
