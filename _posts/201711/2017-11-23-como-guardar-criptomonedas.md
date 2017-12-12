---
layout: post
title:  "Cómo puedo guardar mis criptomonedas de manera segura"
seo_title: "como-guradar-criptomonedas"
description: "Explicación básica para principiantes de dónde y cómo debería guardar mis criptomonedas para no perderlas y evitar que sean robadas"
date:   2017-11-23
banner_image: 201711/bitcoin-wallet.jpg
tags: [bitcoin, altcoins]
---

Es importante preguntarse para qué queremos guardar criptomonedas, es distinto tener una gran cartera económica de criptomonedas con el fin de invertir en ellas a largo plazo, a corto plazo, o para uso en el día a día.

Para inversión a largo plazo recomiendo sin duda lo que se denomina un *cold-wallet*, que es la manera más segura de almacenarlas. Si en cambio planeamos invertir a corto plazo necesitaremos poder mover los fondos rápidamente cuando identifiquemos oportunidades en el mercado por lo que lo almacenaríamos en un *hot wallet*.

<!--more-->

Podría llegar a ser concluido por algunos que el *hot wallet* más inmediato que podemos pensar para invertir podría ser los exchanges mismos puestos que podríamos comprar y vender directamente sin necesidad de mover los fondos de una dirección a otra. Aunque existe cierta lógica en esto y resultaría más fácil aprovechar dichas oportunidades es importante tener un concepto claro:

* **Si no controlas la clave privada de tu wallet no tienes control sobre tus monedas, por lo cual no es un wallet**.

En los exchanges, en ningún momento tienes poder sobre tu clave privada por lo que se podría decir que ni siquiera en ese momento posees criptomonedas, solo tienes la promesa de la entidad en cuestión de que te devolverá tus monedas cuando así lo solicites. Promesa que en muchas ocasiones no se ha podido cumplir. Ha habido casos donde muchos inversores han perdido sus fondos porque o bien el exchange en cuestión ha sido hackeado y sus monedas robadas (como fue el caso de MtGox), o porque era una tapadera desde el principio para aprovecharse de la gente que no sigue esta recomendación al pie de la letra.

* **Mi recomendación es tener los menos fondos posibles en el exchange el menor tiempo posible. El resto del tiempo deberían estar en un wallet, idealmente un cold wallet del cual poseeremos la clave privada.**

Es importante aclarar la diferencia entre un seed y una clave privada:

- **clave privada**: contraseña con la cual podemos controlar los fondos de una dirección.
- **seed**: contraseña con la cual podemos obtener las claves privadas de un conjunto de direcciones.

En muchas ocasiones en lugar de clave privada se nos dará un seed lo cual es más que suficiente. Un ejemplo de un seed de un wallet podría ser:

`witch collapse practice feed shame open despair creek road again ice least`.

A otras criptomonedas les corresponden claves ligeramente distintas y puede que menos recordables que la del ejemplo pero siempre serán generadas por los wallets y debemos guardarlas bien.

Si tenemos sospechas de que alguien ha conseguido copiar nuestra clave privada o seed inmediatamente generaremos un nuevo wallet con una nueva dirección y seed y moveremos todos nuestros fondos. Mientras no lo hagamos, esta persona tendría acceso total a nuestras monedas y podría moverlas a otro wallet fuera de nuestro control. **Esta operación no sería reversible.**




Existen varias consideraciones a tener en cuenta a la hora de elegir un wallet:

* Precio
* Facilidad de uso, entiendo cómo funciona y qué puedo hacer con ella.
* Cómo de fácil es mover fondos y hacer pagos.
* Movilidad, ¿es fácil moverla físicamente? ¿Qué ocurre si se me estropea el dispositivo donde la tengo instalada?
* Seguridad, ¿están mis criptodivisas seguras?
* Criptomonedas soportadas. No todos los wallets soportan todas las monedas. Enviar una moneda al wallet incorrecto podría ocasionarme perder mis fondos.

Además de ello existen varios tipos de wallet que veremos a continuación, analicemoslos:

## Hot wallets

### Software Wallets

Estas wallets son básicamente programas de ordenador que descargas e instalas en tu equipo. Es importante elegir un software wallet que sea open source o que tenga buena reputación. En cualquier caso siempre deberemos copiar y guardar en algún lugar seguro nuestra clave privada. Si elegimos un software wallet que no lo permita o no lo hacemos y nuestro ordenador se estropea habremos perdido nuestros fondos para siempre.

##### JAXX

[Jaxx](https://jaxx.io/) está considerada de las mejores *hot-wallets* y permite hacer backup de tu clave privada. Además está disponible para prácticamente cualquier dispositivo.

Jaxx es de las carteras que más monedas soporta, entre ellas Bitcoin, Ethereum, Litecoin, Zcash y Dash. Podeis ver la lista entera [aquí](https://decentral.zendesk.com/hc/en-us/articles/218373867-Which-tokens-does-Jaxx-support-).

Precio: Gratis

#### Electrum

[Electrum](https://electrum.org) permite almacenar la clave privada offline y se integra con *hardware wallets* como TREZOR o Ledger.

Sólo soporta Bitcoin aunque existe una versión para Litecoin.

Precio: Gratis

### Exodus:

[Exodus](http://www.exodus.io/#) se caracteriza por traer un exchange dentro de la aplicación que te permite diversificar tus fondos sin necesidad de moverlos a un exchange primero. Soporta entre otras Bitcoin, Ethereum, Litecoin, Dash, EOS y Golem. Podéis ver la lista entera [aquí](http://support.exodus.io/article/96-exodus-wallet-roadmap).

Precio: Gratis

### Web Wallets

Un web wallet es básicamente una página web que nos permite gestionar nuestras criptomonedas sin necesidad de instalar ningún programa. Es importante que tengamos dos aspectos en cuenta a la hora de elegir un web wallet. En primer lugar los niveles de seguridad que ofrezcan, como verificación en 2 pasos o confirmaciones por email.

#### Blockchain.info

[Blockchain.info](https://blockchain.info/) es una web que permite ver todas las transacciones que ocurren el mundo del Bitcoin. Adicionalmente ofrecen una cartera web bastante sencilla de usar y comparten contigo la clave privada desentendiendose de lo que pueda ocurrir si la pierdes.

Soporta únicamente Bitcoin y Ethereum.

Precio: Gratis

#### Coinbase

Estrictamente hablando, [coinbase](https://www.coinbase.com/) es un exchange y no comparten contigo la clave privada. He decidido aun así incluirla en la lista por el motivo de que almacenan el 98% de sus fondos en sus propias *cold wallets*, tienen varios niveles de seguridad y además [sus fondos asegurados](https://support.coinbase.com/customer/es/portal/articles/1662379-how-is-coinbase-insured-). Únicamente lo recomendaría para aquellos usuarios que no se fían en absoluto de sí mismos con una clave privada y deciden entregarle ese poder a un tercero. Utilizar bajo la responsabilidad de cada uno.

Precio: Gratis

### Mobile wallets

He leído ya varios reportes en internet de apps maliciosas que en cuanto metas fondos envían tus claves privadas, por lo que hay que tener mucho cuidado con qué app te bajas como wallet. Todas las mencionadas anteriormente tienen versión móvil y podrían considerarse aceptables.


## Cold wallets

### Hardware Wallets

Una hardware wallet es un aparato que conectas al ordenador cuando quieres mover tus fondos y almacena tu clave privada por ti. De esta manera un virus en tu ordenador sería incapaz de robarte tus fondos. Además dan facilidades para suministrar al usuario con la clave privada, así que en el caso en que se pierda el dispositivo todavía podría recuperar sus fondos ya sea a otra hardware wallet o a cualquier otro que acepte importación.


Además estos dispositivos van con un código PIN, por lo que en caso de robo, si el ladrón no conoce el PIN tampoco podrá hacer uso de la hardware wallet.

#### Ledger Nano S / Ledger Blue

[Ledger Nano S](http://amzn.to/2i5kRoG) es sin duda una de mis favoritas, da soporte a varias monedas y es fácilmente transportable en el bolsillo de ser necesario. 

Ledger Nano S soporta las siguientes criptomonedas:

- Bitcoin
- Ethereum
- Litecoin
- Dogecoin
- Zcash
- Dash
- Stratis
- Ripple
- Hello
- Bitcoin Cash
- Komodo
- Ethereum CLassic
- POSW
- ARK
- Expanse
- UBIQ
- PIVX
- VERTCOIN
- VIACOIN
- NEO
- SEALTHCOIN
- Bitcoin Gold
- Stellar
- H-Cash
- Digibyte
- QTUM

Sólo permite tener cuatro wallets simultáneas al mismo tiempo, aunque es posible desinstalar/reinstalar wallets sin perder los fondos guardados.


{% include image_caption.html imageurl="../images/posts/201711/ledger-nano.png" title="Ledger Nano S" caption="Ledger Nano S" %}

Precio Ledger Nano S: 70€

Su hermano mayor, Ledger Blue viene con una pantalla táctil, bluetooth y espacio para ocho wallets simultáneas a un precio considerablemente mayor. Soporta:

- Bitcoin
- Ethereum
- cualquier moneda ERC20.
- Litecoin
- Dogecoin
- Zcash
- Dash
- Stratis
- Ripple
- Hello
- Bitcoin Cash
- Komodo
- Ethereum CLassic
- POSW
- Expanse
- UBIQ
- PIVX
- VERTCOIN
- VIACOIN
- NEO
- SEALTHCOIN
- Bitcoin Gold
- H-Cash
- Digibyte
- QTUM

{% include image_caption.html imageurl="../images/posts/201711/ledger-blue.jpg" title="Ledger Blue" caption="Ledger Blue" %}



Precio Ledger Blue: 275€


	
#### Trezor

[Trezor](http://amzn.to/2i72hMV) fue la primera hardware wallet del mercado aunque poco tiene que envidiar a su competidora Ledger. Ambas son perfectamente aceptables.

Trezor soporta:

- Bitcoin
- Litecoin
- DASH
- Zcash
- Bitcoin Cash
- Ethereum
- Ethereum Classic
- cualquier moneda ERC-20
- Namecoin
- Dogecoin.

Precio: 90€

{% include image_caption.html imageurl="../images/posts/201711/trezor.jpg" title="Trezor" caption="Trezor" %}

### KeepKey

[KeepKey](http://amzn.to/2ja1KHf) es una de las hardware wallets más atractivas visualmente que hay ahora mismo en el mercado.

Todavía se tratade un wallet bastante nuevo pero poco a a poco van extendiendo su cobertura de altcoins. Por el momento sólo es compatible con:

- Bitcoin
- Ethereum
- Litecoin
- Namecoin
- Dogecoin
- Dash

{% include image_caption.html imageurl="../images/posts/201711/keepkey.jpg" title="KeepKey" caption="KeepKey" %}

Precio: 150€

### Paper Wallet

Un monedero de papel no es más que una clave privada impresa que no está guardada en ningún otro sitio. Es perfectamente posible imprimir tu clave privada de cualquiera de los anteriores wallets (exceptuando Coinbase), pero no estarías haciendo uso de la característica principal de seguridad de un Paper Wallet. Si la clave privada sólo existe en un papel y no está almacenada en ningún monedero estarías exento de fallos de seguridad en las carteras o viruses o carteras maliciosas, siempre y cuando nadie te robe el papel con la clave privada, momento en el cual serías totalmente vulnerable.

La idea de un paper wallet es poder almacenar fondos en lo que se denomina *cold storage* o básicamente una "cartera" desconectada de internet, pero para ello necesitamos fiarnos de nuestra capacidad de poder guardar una hoja de papel de manera segura. Hay quien va más allá y destruye el papel una vez memorizado (de qué modo afectará a la sociedad esta práctica con los altos casos de alzheimer de hoy en día será un experimento social bastante interesante).

Absolutamente cualquier moneda puede ser guardada de esta manera.

Precio: Gratis

{% include image_caption.html imageurl="../images/posts/201711/paper-wallet.jpg" title="Paper wallet" caption="Paper Wallet" %}

Al final tiene que ser decisión de cada uno dónde considera que tiene sus puntos fuertes, si crees que tu caja fuerte es perfectamente fiable adelante, si por el contrario te fías más de tu gestor de contraseñas, podrías tener la clave privada almacenada ahí y no en papel.


