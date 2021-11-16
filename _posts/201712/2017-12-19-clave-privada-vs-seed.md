---
title: Claves Públicas, Privadas y Seeds
date: 2017-12-19 00:00:00 Z
tags:
- seguridad
layout: post
description: Cómo obtener claves públicas y privadas a partir de un seed para recuperar
  criptomonedas. Diferencia entre sweep y import.
banner_image: 201712/key-restore.jpg
lang: es
---

Muchos wallets nos suministrarán un seed con el cual poder recuperar nuestros fondos en el caso en que perdamos el wallet en sí. Por desgracia no siempre es tan fácil importar estos seeds a wallets nuevos como nos gustaría.

En primer lugar es importante conocer bien ciertos conceptos:

<!--more-->

* **clave pública**: dirección que podemos compartir para recibir pagos en criptomonedas.
* **clave privada**: contraseña con la cual podemos controlar los fondos de una dirección.
* **seed**: contraseña con la cual podemos obtener las claves privadas de un conjunto de direcciones.

Aunque algunos wallets permiten recuperar fondos a partir de seeds, esta recuperación no siempre funciona correctamente. Lo más seguro es que importemos la dirección exacta donde nuestras criptomonedas están almacenadas.

Por ello vamos a explorar los **pasos que nos permitirán obtener una clave privada de una dirección a partir de un seed**:

1. Descargamos la herramienta <a rel="nofollow" href="https://github.com/iancoleman/bip39/releases">Bip39</a> en formato zip.
2. Como medida de prevención extra podemos mover esta herramienta a algún dispositivo que no tenga conexión a internet. No se necesita conexión a internet para ninguno de los pasos siguientes y se han conocido casos de programas parecidos a este que en realidad son una tapadera para que cuando introduzcas tu seed se envie por internet al creador del software malicioso para que se apropie de tus monedas, como fue el caso de <a rel="nofllow" href="https://www.reddit.com/r/btc/comments/7dsmvd/my_analysis_of_the_1_million_usd_mybtgwalletcom/">myBTGWallet</a>. Personalmente me fio de este programa pero nunca está de más tener precauciones extras, sobretodo cuando tenemos mucho dinero en juego.
3. Extraemos el contenido del zip.
4. Abrimos el fichero `bip39-standalone.html` en cualquier navegador, por ejemplo chrome. Abrirlo es tan fácil como arrastrar el fichero encima del navegador.
5. Introduciremos el seed en el campo: `BIP39 Mnemonic` y seleccionaremos `Coin: BTC - Bitcoin` o la moneda original de la dirección de donde queremos extraer los fondos. En el caso en que estemos intentando recuperar los fondos de un fork por primera vez, por ejemplo de Bitcoin Gold, tendremos que seleccionar Bitcoin porque la dirección original es de Bitcoin.
6. En el campo: `Derivation Path:` elegiremos `BIP44` y dejaremos las demás opciones como están.
7. Abajo del todo en `Derived Addresses` deberíamos ver todas las direcciones de nuestro wallet con su clave pública y privada. Existen miles de direcciones para cada seed, pero lo normal es que las nuestras estén entre las primeras. Si no sabemos qué dirección exacta contiene nuestros fondos podemos utilizar un block explorer para ver si hay fondos. Por ejemplo para BTC utilizariamos <a rel="nofollow" href="https://blockchain.info">blockchain.info</a> y para Bitcoin Gold <a rel="nofllow" href="https://btgexp.com/">BTGExp</a>. En este caso sí que nos interesa buscar los fondos de exactamente la moneda que queremos obtener, por ejemplo en el caso anterior de Bitcoin Gold utilizaremos las direcciones de BTC derivadas en el explorador de Bitcoin Gold puesto que estamos buscando BTG en direcciones BTC.
8. Una vez tengamos la dirección localizada podemos proceder a hacer o bien import o bien sweep de la dirección.

{% include image_caption.html imageurl="/images/posts/201712/bip39-1.png" title="BIP39 seed input" caption="Introducimos el seed y seleccionamos la moneda y BIP44" popup=true %}

{% include image_caption.html imageurl="/images/posts/201712/bip39-2.png" title="BIP39 direcciones derivadas" caption="Podemos ver el listado de todas las direcciones derivadas a partir del seed con su clave pública y privada" popup=true %}

> A partir de un seed podemos derivar un conjunto de claves privadas y a partir de una clave privada podemos derivar su clave pública. En cambio a partir de una clave pública jamás podremos obtener una clave privada, ni a partir de una clave privada un seed.

A la hora de recuperar fondos existen dos maneras de recuperar fondos a partir de una clave privada:

#### Import
Cuando importes una clave privada, por ejemplo desde un paper wallet, esa pareja de clave pública/privada será añadida a tu nuevo wallet aunque pertenezca a un seed distinto. Tendremos control absoluto sobre los fondos de la dirección, pero si alguien importa la misma clave privada a otro wallet, también podrá controlar los mismos fondos. Es por eso que **si tememos que nuestro seed/clave privada hayan podido ser vulnerados, Import NO es la opción que debemos elegir, sino sweep**. Si alguien vuelve a enviar dinero a la dirección vieja lo veremos inmediatamente en nuestro wallet.

Otro aspecto a tener en cuenta es que si gastamos fondos de una clave privada aunque sean una fracción del total que tenemos almacenado, el balance final de esa dirección será nulo. Esto es debido a que el protocolo de Bitcoin siempre gasta todos los fondos de la dirección al realizar transferencias moviendo el sobrante a otras direcciones derivadas del seed en tu posesión.

#### Sweep
Cuando hacemos sweep de una clave privada básicamente estamos haciendo una transferencia de los fondos de la dirección asociada a dicha clave a una nueva dirección en nuestro wallet. Una vez hayamos completado el sweep, los fondos de la dirección vieja serán nulos.

Puesto que es una transferencia completa y será grabada como tal en el blockchain debemos tener en cuenta que se nos cobrará una tasa de transferencia.
Debemos hacer un sweep siempre que pensemos que nuestra clave privada haya podido ser vulnerada o cuando nos estén entregando fondos por ejemplo cuando se regalan criptomonedas online o por televisión. Si más adelante alguien vuelve a enviar dinero a la dirección vieja, deberemos volver a hacer sweep de la dirección.

