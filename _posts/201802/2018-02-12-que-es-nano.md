---
title: Qué es Nano (XRB)
date: 2018-02-12 00:00:00 Z
tags:
- altcoins
layout: post
description: La criptomoneda Nano, anteriormente conocida como Raiblocks, XRB explicada
  de manera sencilla. Diferencias con Bitcoin y Ethereum. Dónde comprar y guardar.
banner_image: 201802/xrb.jpg
rating: 5
totalVotes: 2
lang: es
---

Nano, anteriormente conocida como Raiblocks, es un proyecto bastante joven que frecuentemente es comparado con IOTA por el hecho de que no utiliza tecnología blockchain, sino tecnología DAG, más concretamente tecnología *block lattice*. Es importante tener en cuenta que XRB no pretende competir con Ethereum en cuanto a smart contracts, sino que su intención es limitarse únicamente a ser usados como medio de pago.

<!--more-->

Existen 133,248,290 tokens XRB en circulación que se repartieron de manera gratuita hasta Octubre de 2017 entre personas que resolvieran sus captchas online para asegurar un reparto inicial equitativo. No hubo ICO y jamás se podrán generar más XRBs.

{% include video.html provider="vimeo" id="253563861" %}

## Tecnología

Nano intenta resolver los problemas más graves de Bitcoin: Escalabilidad, costes de transacción, tiempos de transferencia y consumo energético. La tecnología Block-lattice opera de manera similar al blockchain pero tiene ciertas diferencias:

* Cada usuario que participe en la red XRB tendrá su propio blockchain que únicamente ellos podrán modificar.
* Todos los fondos intercambiados en la red XRB requeriran de dos operaciones: una realizada por el emisor y otra por el receptor. La transacción quedará en pendiente hasta que el receptor firme el bloque confirmando los fondos envíados por el emisor.
* Las transacciones no son selladas mediante Proof of Work o Proof of Stake lo que permite a la red prescindir de mineros y hacer que las transacciones sean gratis e instantáneas. Si que se requiere un pequeño Proof of Work por los emisores sobre sus propias blockchains para evitar spam.
* Cada transacción de envío debe referenciar el bloque previo del dueño, por lo que un emisor que intenta gastar fondos que no tiene será rechazado por los demás nodos de la red.
* Únicamente se utiliza a la red para resolver conflictos: XRB reemplaza el modelo que la red usa para validar transacciones Proof of Work por un Delegated Proof of Stake (dPOS) ya utilizada otras criptomonedas como Ark o Lisk. A diferencia de en otras criptomonedas, los mecanismos de verificación, en este caso Proof of Stake, únicamente se pondrán en uso para resolver conflictos en la red. **Si todos los usuarios de la red funcionan de manera honesta, jamás se necesita validar las transacciones por terceros.**
* Ante conflictos, la red debe votar cual de las dos transacciones es correcta. Cada vez que una cuenta de Nano es creada, se debe seleccionar un nodo representante que funcionará como punto de contacto para votos. Estos representantes deben estar siempre online y controlados por entidades en las que se pueda confiar. **El peso del voto de cada representante depende de cuantos XRBs tiene en su posesión**, cuanto más tenga, más importancia tendrá su voto, ya que se considera que cuanto más dinero tenga invertido en Nano, más le interesa mantener el sismema honesto.
* Puesto que no hay mineros, **las transacciones son tan rápidas como la red lo permita**, normalmente unos pocos segundos, excepto en caso de conflicto, donde los validadores resolverán la incidencia en menos de un minuto.
* En bitcoin los balances de las cuentas nunca son guardados, sino que cada transacción debe referenciar a una transacción anterior que demuestre que dispone de esos fondos. Colin Lemahieu, el creador de Nano, decidió ir por un camino distinto, donde cada cuenta tiene su propio blockchain, y cada bloque tiene una sola transacción. Cómo cada cuenta contiene su balance, no es necesario almacenar el historial de todas las transacciones de la historia, lo cual hace que el ledger general compartido entre todas las cuentas sea de tamaño muy inferior al de Bitcoin.

{% include tweet.html href="https://twitter.com/ZackShapiro/status/945634097807986688" caption="Transacciones por segundo de diferentes criptomonedas"%}

## Ventajas de XRB

- **Costes de transacción nulos**, debido a la ausencia de mineros.

- **Velocidad de transacción instantánea**, o al menos tan rápido como la red permita enviar la información. Los wallets tienen preparado el Proof of Work de la siguiente transacción tan pronto como realizan la transacción anterior. Para envíos consecutivos podría empezar a haber retrasos pero esto es intencional para evitar spamear la red.

- **Escalabilidad**, el sistema escala correctamente hasta unas 7000 tps.

{% include video.html id="https://streamable.com/s/natpz/pjrsuo" caption="Transacción XRB vs Usain Bolt" %}

## Desventajas de XRB

- **Los nodos que resuelven incidencias no tienen ninguna motivación para mantenerse online** puesto que no hay tasas de transferencias. Estarían operando por amor a la red.

- **El wallet se debe sincronizar con la red para funcionar, lo que puede llevar entre 12 y 24 horas**. Los light wallets deberían arreglar este problema, suponiendo que hay suficientes full-nodos en la red.

- Para que una transacción se considere completa, **tanto el emisor como el receptor deben estar online**. De no ser así, la transferencia quedará en PENDIENTE hasta que el receptor se conecte y sincronice su wallet. Las transacciones pendientes no expiran.

- **Las transacciones por segundo que la red permite están limitadas a 7000 tps** y será complicado aumentar este número en el futuro. Es bastante posible que Ethereum, IOTA, e incluso Bitcoin, que por el momento no  se acercan a este número, acaben superándolo con los años.

- **Proof of Stake es todavía un sistema muy experimental** y no se ha puesto a prueba en escenarios lo suficientemente grandes. PoS se basa en la buena voluntad de los individuos que más tokens disponen.

La tecnología Block Lattice de la que hace uso Nano es todavía bastante reciente y no ha sido estudiada ni puesta a prueba tan duramente como ya ha sido Bitcoin, por lo que todavía podría contener fallos o vulnerabilidades que no resulten obvios.

## Equipo

El equipo está públicamente reconocido y podeis verlo <a rel="nofollow" href="https://nano.org/en/team/">en su página web</a>. Además son bastante activos en los siguientes medios de comunicación:

- Discord: <a rel="nofollow" href="https://chat.raiblocks.net/">https://chat.raiblocks.net/</a>
- Reddit: <a rel="nofollow" href="https://www.reddit.com/r/nanocurrency/">https://www.reddit.com/r/nanocurrency/</a>
- Twitter: <a rel="nofollow" href="https://twitter.com/nanocurrency">@nanocurrency</a>
- Forum: <a rel="nofollow" href="https://forum.raiblocks.net/">https://forum.raiblocks.net/</a>

Además podeis comprobar su <a rel="nofollow" href="https://github.com/clemahieu/raiblocks/commits/master">Github</a> para ver de qué manera evoluciona el desarrollo. Por lo general están realizando un desarrollo continuo por parte de todo el equipo lo que le da legitimidad al proyecto.

## Dónde almacenar XRB?

Por el momento sólo existen wallets de escritorio y online, aunque hay un wallet móvil en el roadmap.

El wallet de escritorio lo podeis descargar de <a rel="nofollow" href="https://raiblocks.net/">la web oficial</a>. Adicionalmente es posible <a rel="nofollow" href="https://t.me/RaiWalletBot">usar telegram a modo de wallet</a> mediante un bot oficial.

## Dónde comprar XRB?

Nano está disponible en:

- <a rel="nofollow" href="https://www.kucoin.com">Kucoin</a>
- <a rel="nofollow" href="https://accounts.binance.com/es/register?ref=11317062">Binance</a>

## Opinión

Aunque se trata de una tecnología muy prometedora, es importante preguntarnos para qué será usado. Si Bitcoin o Ethereum resuelven sus problemas de escalabilidad, y todo apunta a que lo terminarán haciendo, habrá que ver qué ocurre con RaiBlocks y cual acaba siendo su uso.


> Para tener problemas de escalabilidad, primero hay que necesitar escalar. <cite>Andreas Antonopoulos</cite>

Bitcoin fue en el pasado prácticamente gratis ( o al menos muy barato) y podría perfectamente volver a serlo con Lightning Network. Si Nano no se ha adoptado masivamente para cuando esto ocurra, será complicado que consiga abrirse un hueco.

