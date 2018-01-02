---
layout: post
title: Qué es Monero
description: Monero es la criptomoneda que mejores aplicaciones de privacidad ha implementado. Veamos en detalle en qué consiste y de qué manera consigue estos niveles de anonimidad a la hora de realizar transacciones.
banner_image: 201801/monero.jpg
tags:
  - altcoins
---

A pesar de que en ocasiones se ha mencionado que Bitcoin es una tecnología anónima, en realidad es pseudónima. El principio básico en el que se basa es en que todas las transacciones son públicamente almacenadas en el blockchain, por lo que si alguien identifica al dueño de una dirección de BTC puede en todo momento conocer su balance y transacciones. Esta propiedad trae muchísima transparencia al mundo de las criptomonedas puesto que cualquier transacción puede ser auditada por cualquier persona y se puede ver como los fondos van moviéndose de cuenta en cuenta lo cual podría acabar con la corrupción en entidades gubernamentales o en ONGs, pero no resulta tan valiosa para individuos o empresas. Aquí es donde entra Monero.

<!--more-->

Monero (XMR) ofrece una aplicación diferente al utilizar el blockchain de un modo que hace que las transacciones sean imposibles de rastrear y los balances estén ocultos. Sus niveles de anonimato la han llevado a ser la moneda elegida a dia de hoy por los mercados de drogas online, entidades financieras suizas y también cualquier persona preocupada por su anonimidad.

A la hora de aceptar pagos en criptomonedas, los comerciantes ya no deberán preocuparse de la procedencia de los fondos que están aceptando. Es probable que como usuario no se desee que todo el mundo con quien haya realizado una transacción conozca su salario, balance y el historial de transacciones pasadas. Monero protege esta información personal haciendo que cada transacción sea totalmente privada de cara al mundo exterior.

A diferencia de Z-Cash donde hay que pagar un extra por utilizar zk-Snarks para ocultar las transacciones, la privacidad de Monero es obligatoria desde el principio.

{% include image_caption.html imageurl="/images/posts/201801/btc-wikileaks.png" title="Wikileaks address" popup=true caption="Todas las donaciones a Wikileaks mediante BTC son públicas y pueden ser trazadas a las direcciones donantes" %}

#### Tecnologia

{% include image_caption.html imageurl="/images/posts/201801/monero-anon.png" title="Monero Anonymous" popup=true %}

La tecnología que permite el anonimato en Monero se divide en varios conceptos:

* **Ring Signatures:** Hace las transacciones no rastreables al emisor mezclando las distintas transacciones de todos los usuarios para que no esté claro a quién pertenece cada una.

* **Stealth Addresses:**  Esconde tanto al receptor de la transacción como los balances de los distintos usuarios haciendo que todas las direcciones sean aleatorias para que no puedan ser asociadas a personas específicas.

* **Ring Confidential Transactions:** Esconde la cantidad enviada en cada transacción.

* **Kovri:** Kovri todavía está en desarrollo, se prevé que sea lanzada a lo largo de 2018. Permitirá esconder las IPs de los usuarios de Monero cuando le dicen a la red que desean hacer una transacción. Estos niveles de anonimato ya son alcanzables si se utiliza Monero desde una red TOR, sobretodo si es con el sistema operativo Tails, pero este avance permitiría traer esa anonimidad al público general. Puesto que Kovri pretende soportar más monedas aparte de Monero, más adelante podría esconder incluso el hecho de que se está realizando una transacción con Monero en lugar de otra criptomoneda. 

Además existen dos claves asociadas a cada transacción:

* **Spend Key:** Utilizada para gastar los balances. Es equivalente a la contraseña que permite gastar los fondos.
* **View Key:** Clave que el dueño de una cuenta puede compartir con otros usuarios para que conozcan cierta información de la transacción a modo de transparencia. Esta transparencia opcional puede resultar beneficiosa para permitir a una entidad realizar una auditoría o por temas de impuestos. Sería equivalente a un recibo bancario matemáticamente demostrable.

El tiempo de bloque medio de Monero es de 2 minutos verificados mediante Proof of Work, y se prevé una inflación controlada de 0.3 XMR / minuto para siempre de modo que los mineros siempre tendrán incentivos para seguir procesando transacciones.

#### El Equipo

Monero dispone de un equipo de desarrollo principal de siete personas, de las cuales 5 son anónimas y de las que sólo se conoce el pseudónimo. Las otras dos son Riccardo Spagni y Francisco Cabañas que se han posicionado como los representantes de la tecnología.

Adicionalmente cuenta con mas de [310 colaboradores](https://www.openhub.net/p/monero) que trabajan gratis o cambio de donaciones.

#### ¿ Dónde Comprar XMR ?

{% include image_caption.html imageurl="/images/posts/201801/monero-vault.jpg" title="Monero Anonymous" popup=true %}

Se puede comprar XMR en los siguientes exchanges:
* [Binance](https://www.binance.com/?ref=11317062)
* [Kraken](https://www.kraken.com/)
* [Bitfinex](https://www.bitfinex.com)

#### ¿ Dónde almacenar XMR ?

No existe ningún wallet ligero todavía, por lo que los wallets disponibles resultan un poco pesados todavía pero son perfectamente utilizables.

Las opciones disponibles son:

* [Monero Core](https://getmonero.org/downloads/)
* [Monero Core GUI](https://getmonero.org/2017/10/27/monero-0.11.1.0-released.html)
* [Monero Web-Wallet](https://mymonero.com/)
* [Offline Wallet Generator](https://moneroaddress.org/)

#### Conclusión

Hay muchas otras monedas que han identificado ese mismo problema y están intentando darle solución, como zCash, XVG o NAV, pero ninguna de ellas está tan avanzada ni desde luego basa su estructura principal en la privacidad siendo anónimo desde el principio.

Con 16 millones de token en circulación, el mercado de Monero es incuestionable ya sólo considerando que el mundo de la droga mueve tantos miles de millones de dólares al año. Si a eso le sumamos que los ciudadanos también van a desear contar con cierta privacidad a la hora de realizar compras y pagos una vez las criptomonedas se empiecen a utilizar públicamente podríamos verla subir de precio drásticamente durante los próximos años, especialmente cuando acaben de implementar el protocolo Kovri.