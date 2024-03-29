---
title: Qué es IOTA
date: 2017-12-18 00:00:00 Z
tags:
- altcoins
layout: post
description: La criptomoneda IOTA explicada, en qué consiste, dónde comprarla y cómo
  almancerla de manera segura.
banner_image: 201712/iota.jpg
rating: 5
totalVotes: 1
lang: es
---

[IOTA](https://iota.org/) es una de las altcoins que más ha subido de precio durante las últimas semanas, cuenta con un mercado de 11000 millones de dólares. Aunque permite comunicación económica entre wallets de la misma manera que BTC o Ethereum, este no es su principal propósito, lo que pretende es ofrecer una plataforma para la economía entre dispositivos en el Internet Of Things.

IOTA asume un escenario futuro donde los dispositivos necesitarán comunicarse entre ellos y realizarse pagos mutuamente, y espera que cuando llegue, lo haga de la mano con su criptomoneda.

<!--more-->

{% include image_full.html imageurl="/images/posts/201712/iota-banner.jpg" title="IOTA" %}

El equipo de IOTA, responsable del [whitepaper](http://iotatoken.com/IOTA_Whitepaper.pdf) es noruego con oficinas en Oslo, así que se podría considerar una criptomoneda totalmente europea. Su oficina central se situa en Berlín pero tiene presencia ya en varios países por el mundo. Fue creada por David Sønstebø, Sergey Ivancheglo, Dominik Schiener y Serguei Popov en 2015 cuando se realizó una ICO que recaudó 1337 BTC (medio millón de dólares entonces).

IOTA no usa tecnología blockchain sino que han ideado su propia versión denominada el tangle. Este diseño le separa de cualquier otra criptomoneda y le ha permitido quitar a los mineros de la ecuación y por tanto eliminar las tasas de transacción. El modo en que esto funciona es que cada vez que un usuario hace una transferencia, primero tiene que verificar otras dos transferencias aleatorias mediante un proof of work de baja dificultad. El esfuerzo computacional para hacer esto es tan pequeño que cualquier dispositivo podría ser capaz de hacerlo. 

Una manera rápida de explicar el Tangle sería compararlo con un profesor que para evitar tener que corregir los exámenes de todos los alumnos en su tiempo libre, lo que hace es repartirlos entre los alumnos de manera aleatoría y cada alumno corrige el examen del de al lado. Esta es la filosofía de IOTA, la red se quita la necesidad de pagar a los mineros haciendo que los propios usuarios sean los mineros.

{% include image_full.html imageurl="/images/posts/201712/iota-tangle.png" title="Tangle" caption="En el Tangle cada transacción debe confirmar otras dos" popup=true %}


El tangle permite dos cosas:

* **Microtransacciones**, transacciones de cantidades de dinero muy pequeñas. Ahora mismo sería imposible enviar una transferencia de BTC de 1$ ya que las tasas serían mayores que la cantidad transmitida. IOTA trae unas coste de transacción de exactamente cero.
* **Velocidad**, tps. La arquitectura permite que cuanto más gente utilice la red, más rápida se vuelva, obviando el problema de escalabilidad al que se enfrentan el resto de tecnologías blockchain.

{% include image_full.html imageurl="/images/posts/201712/iota-fees.png" title="IOTA tasas" caption="IOTA no tiene tasas de transferencia" popup=true %}

De esta manera IOTA quiere convertirse en la red economía de la comunicación entre dispositivos y convertirse así en el protocolo estándar del IOT.

#### Por qué hay tantas iotas

Existe un total de 2 cuatrillones de IOTAs (2,779,530,283,277,761 IOTAs), lo cual inicialmente puede parecer un número absurdamente alto comparado con los 21 millones de Bitcoin, pero analicemos este número más cuidadosamente.

Existen seis niveles de agrupación de iotas:

* i - 1 IOTAs
* Ki - 1000i
* Mi - 1 millon i
* Gi - 100 millones i
* Ti - 1 billón de i. No es usará en el día a día.
* Pi - 1 Cuatrillón de IOTAs. No se usará en el día a día.

En comparación para Bitcoin, la unidad más pequeña es un satoshi, para 21 millones de BTC que habrá en circulación tendremos en consecuencia 2 cuatrillones de satoshis, teniendo en cuenta que IOTA no es divisible ya que no admite decimales, ya no parecen tantas unidades.

Ethereum todavía no ha marcado su cantidad de tokens en circulación, por el momento hay 95 millones de Ether, donde la unidad más pequeña es conocida como un Wei, lo que nos daría a dia de hoy 95 septillones de Wei, lo que demuestra que Ether tiene más unidades indivisibles que IOTA.

La mejor manera de entender el concepto de cantidades en IOTA es pensando en Gi, donde habría 2 millones de Gi-IOTAS en total. Todos los tokens de IOTA han sido preminados y distribuidos a los inversores de la ICO.

#### Velocidad de transmisión de transferencias por segundo

Veamos los rangos de tps de otros populares métodos de pago:

* Paypal 115 tps
* VISA 4k tps
* Bitcoin 5 tps
* Ethereum 15 tps
* Ripple 1500 tps

Si cualquier criptomoneda pretende vender al sistema de pago clásico está claro que deberá soportar tps de más de 4000. Ripple es la criptomoneda que más se está acercando por el momento aunque todas ellas están trabajando duro en subir este número. Por el momento IOTA llega a 1000 tps lo cual se acerca bastante a Ripple y supera ampliamente a Bitcoin o Ethereum.

#### Tecnología

IOTA hace uso de una entidad denominada *El Coordinador*, que está formada por varios nodos completos distribuidos por todo el mundo y manejados directamente por la fundación IOTA. Su propósito principal es proteger a la red de manera temporal de posibles atacantes marcando la dirección en la que el tangle debe crecer. Aunque la red es considerada descentralizada porque cualquier nodo puede verificar que el Coordinador no está rompiendo las reglas de consenso creando iotas de la nada o aprobando gastos dobles, **el Coordinador es una solución temporal y la intención es eliminarlo** una vez la red de IOTA sea lo suficientemente madura. La existencia del Coordinador es una de las grandes críticas a esta moneda y habrá que ver si resulta posible que la tecnología sobreviva sin él.

En el roadmap de IOTA podemos encontrar otras dos funcionalidades:

- **Sharding**: Permitirá escalar la red mucho más rápido al fraccionar el blockchain entre los distintos nodos. Por ejemplo un sharding de nivel 1 podría consistir en dividir el blockchain por la mitad, y que algunos nodos guarden una mitad y el resto la otra de tal manera que ningún nodo necesite almacenar la totalidad de las transacciones. Ethereum también está investigando como implementarlo.

- **Snapshots**: Snapshots es un proceso que ayuda a mantener el blockchain del menor tamaño posible agrupando todas las transferencias a una misma dirección en un solo movimiento. Además borra del historial todas las transacciones de balances nulos (utilizados por la red de IOTA para el envío de información entre nodos). Actualmente los snapshots se hacen de manera manual pero se espera que sean automatizados próximamente.

Aún con la existencia de ambas funcionalidades siempre se requerirá de nodos permanentes que almacenen toda la información de la historia del tangle de manera segura y persistente.

#### Casos de uso

Estando la tecnología todavía en desarrollo es aún pronto para tener casos de usos en funcionamiento, aun así existen empresas que ya empiezan a hacer uso de ella de manera exitosa.

La empresa Ruuvi ofrece unos dispositivos llamados RUUVITAGs que son sensores open source programables que permiten a cualquier persona instalar desde un control de temperatura en una nevera, hasta de humedad del ambiente o de velocidad de un dispositivo. IOTA trae consigo un sistema de autenticación y cifrado que permite recoger esta información de manera privada.

A la hora de comprar un coche de segunda mano, el comprador desea conocer el estado del vehículo de manera totalmente fiable. Innogy decidió que la manera de solucionar este problema es introduciendo sensores en los coches que no puedan ser fácilmente engañados por el dueño original del coche. Cualquier tecnología blockchain habría sido capaz de realizar esta tarea, pero solo IOTA permite unos gastos de transferencia lo suficientemente bajos (de hecho nulos) cómo para que merezca la pena una solución así.

{% include image_full.html imageurl="/images/posts/201712/iota-use-case.jpg" title="IOTA use case" caption="Una nevera smart es capaz de detectar qué productos faltan y podría realizar micropagos al supermercado que los ofrezca más baratos" popup=true %}

Resulta obvio que IOTA va a potenciar la filosofía EVERYTHING AS A SERVICE. Se me ocurren por ejemplo micropagos instantáneos cada vez que gastamos electricidad en lugar de pagar cada dos meses como acostumbramos que es un sistema muy lento e ineficiente debido sobretodo a la cantidad de gente e infraestructura que se requiere para procesar todos nuestros gastos lo cual aumenta las tasas que se terminen pagando. Además cada vez que una persona se mueve a un nuevo piso de alquiler tiene que cambiar la luz a su nombre y asegurarse de que el nuevo inquilino del piso anterior hace lo mismo.

Imaginaros por un momento que vuestros dispositivos estén identificados como vuestros digitalmente, y si cargais el móvil en casa de un amigo, tu propio móvil es el que estaría haciendo micropagos de manera invisible e instantánea a su red por dicha electricidad, lo mismo en un aeropuerto o por la calle, y cuando finalmente te mudes de tu vivienda, con llevarte tus dispositivos sería suficiente, por que cuando llegue la siguiente persona en cuanto conectara sus propios dispositivos, los pagos irían a él.

También se hablá de aspiradores robots que van por el edificio limpiando y entrando en las casas, y podrían cobrar por metro cuadrado a cada propietario de cada vivienda. O alquilar tus propios drones mientras no los utilizas para que hagan de mensajeros para empresas como Amazon.

Resulta también obvio que con Google y Tesla haciendo experimentos con vehículos que se conducen solos, servicios del estilo de UBER con coches autónomos es una realidad bastante cercada, que estos coches realicen micropagos para pagar peajes o recargas de batería mediante tecnologías como ésta no me resulta para nada descabellado.

{% include image_full.html imageurl="/images/posts/201712/iota-use-case-2.png" title="IOTA use case" caption="Un usuario podría pagar envíos por metro cuadrado recorrido y un dron podría pagar su recarga de batería directamente al panel solar" popup=true %}

#### Dónde comprar IOTA

En los exchanges lo que venden como IOTAS son realmente Mi-IOTAS. Mi exchange de preferencia para comprarlos es [Binance](https://accounts.binance.com/es/register?ref=11317062).

#### Dónde guardar IOTA

Cómo siempre nos aseguramos de dejar bien claro, no se debe guardar ninguna criptomoneda en los exchanges, IOTA no es ninguna excepción. Aunque existen varias wallets trabajando para dar soporte a IOTA, incluidos TREZOR y Ledger, por el momento no existe ningún wallet fíable salvo el [wallet oficial](https://github.com/iotaledger/wallet/releases). Una vez descargado el wallet por primera vez habrá que crear un seed siguiendo la expresión [u9]{81}, o en otras palabras, el seed debe estar caracterizado por:

* 81 caracterés
* Letras Mayúsculas
* Números 9

Herramientas como [KeePass](../mejores-gestores-contrasenas) nos pueden ayudar a la hora de generar automáticamente y almacenar un seed que siga este patrón. Si perdemos este seed perderemos todos los fondos que tengamos dentro por lo que debemos guardarlo bien. Una vez lo tengamos, podremos desinstalar el wallet perfectamente, volverlo a instalar en otro ordenador y al introducir la seed nuestros fondos estarán ahí. De hecho es técnicamente posible pero estadísticamente improbable que al introducir un seed al iniciar el wallet, metamos un seed ya utilizado y tengamos acceso a los fondos de otro. Se han escuchado casos antes de que se forzaran las limitaciones anteriores en la creación de seed de gente que ha utilizado como seed frases fáciles de recordar pero que en consecuencia ha significado que alguien probando seeds ha acertado apropiándose de las IOTAS almacenadas ahí.

Si realmente esto es una preocupación os invito a probar herramientas como [How Long To Hack](http://random-ize.com/how-long-to-hack-pass/) (¡pero nunca con vuestra contraseña exacta!) para que os deis realmente cuenta de cómo de imposible resultaría acertar un seed siempre y cuando esté esté caracterizado de caracteres aleatorios. Estos seeds están diseñados desde el principio para ser Quantum Proof. No van a ser hackeados proximamente.



Por desgracia a dia de hoy hay tres reglas muy importantes a tener en cuenta antes de empezar a enviar IOTAs:
* **REGLA 1:** Nunca re-utilizar una dirección. Siempre generar una nueva para el mismo wallet antes de recibir nuevos fondos.
* **REGLA 2:** Siempre crear una dirección nueva antes de recibir nuevos fondos.
* **REGLA 3:** Siempre esperar a que una transacción sea confirmada antes de realizar una nueva.

El motivo de estas reglas se debe a que por la tecnología utilizada, cada vez que se realiza una transacción, una parte de la clave privada asociada a esa dirección es revelada, lo que hace a la dirección más vulnerable a ser atacada mediante fuerza bruta.

No seguir estas reglas podría significar la pérdida de nuestras IOTAS. Son limitaciones un poco absurdas a día de hoy que otras tecnologías blockchain desde luego no comparten, esperemos que sean solucionadas con el tiempo.
