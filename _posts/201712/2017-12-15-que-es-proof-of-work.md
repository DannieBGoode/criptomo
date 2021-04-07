---
title: Qué es Proof of Work
date: 2017-12-15 00:00:00 Z
tags:
- bitcoin
- blockchain
layout: post
description: Explicación de qué es Proof of Work, también llamado Prueba de Trabajo,
  cómo funciona y a que se debe que gaste tanta energía.
banner_image: 201712/proof-of-work.jpg
rating: 5
totalVotes: 9
---

Proof of Work es un protocolo que evita que se hagan ataques DDoS o spam a la red de Bitcoin. Es probablemente la pieza clave de todo el whitepaper original de Bitcoin y al mismo tiempo es altamente criticado por su consumo energético.

<!--more-->

#### Qué es un ataque DDoS?

Tenemos que entender primero qué es un ataque DDoS (Denegación de Servicio Distribuida). Cuando una entidad quiere bloquear a otra (por ejemplo a una página web) mediante DDoS se dedicará a realizar un número altísimo de llamadas al servidor central (lo que sería equivalente a refrescar repetitivamente la página) saturándolo evitando que otras entidades o individuos que quieran acceder a la página no sean capaces de hacerlo.

El modo en que Bitcoin resuelve este problema es requiriendo que todo el mundo que quiera enviar bloques al blockchain deba realizar un esfuerzo computacional que es lo que se conoce como minería. Un minero que tras miles de cálculos computacionales ha resuelto el problema matemático que la red ha sugerido y que explicaremos más adelante puede ofrecer su solución al resto de la red, que lo podrá verificar matemáticamente en una milésima de segundo y aceptarlo o no como correcto.

El concepto de Proof of Work es anterior al Bitcoin y se pensó originalmente como método para evitar el spam por email. Si un cliente de email ignorase todos aquellos emails que reciba que no tengan un Proof of Work demostrado, es decir una solución matemática que sólo habría podido ser resuelta mediante procesamiento de CPU, no sería rentable para aquellas empresas de spam que envían millones de emails de viagra por minuto a todos los correos de email que se les ocurra, puesto que cada envío de email implicaría un nuevo problema matemático que tendrían que solucionar. Si cada problema matemático llevase un segundo de procesamiento de CPU de repente es mucho más caro enviar email basura mientras que un usuario auténtico de email no notaría  absolutamnete nada al enviar sus correos.

Satoshi Nakamoto introdujo este concepto a la hora de idear su criptomoneda y es una de las piezas claves que hace que todo funcione al permitir que todos los nodos puedan confiar los unos en los otros de manera distribuida, o dicho de otra forma permite que dos usuarios que no se conocen se puedan enviar fondos entre ellos sin que haya una tercera entidad validando la transacción como podría ser Visa, Mastercard, Paypal, los bancos, etc...

Cuando un usuario hace una transferencia bancaria a otro tiene que confiar en que sus respectivos bancos van a restar los fondos de una cuenta y sumarselo a la otra. Con Bitcoin y otras criptomonedas, la propia transferencia es la prueba de ambos balances y todo el mundo lo puede comprobar matemáticamente observando los movimientos en el Blockchain que es totalmente público.

#### Minería Proof of Work

La minería de bitcoin hace dos tareas: verifica que la transacción es posible porque hay balance disponible y recompensa al minero mediante inflación controlada otorgándole nuevas criptomonedas.

Cuando se realiza una transacción esto es lo que ocurre por debajo:

* La transacción se añade al *mempool*, donde residen todas las transacciones todavía no validadas a la espera de que los mineros las recojan.
* La transacción se agrupa con otras transacciones pendientes en un bloque candidato. Los bloques candidatos de cada minero no tienen por qué ser idénticos entre ellos puesto que cada minero puede ordenar y seleccionar las transacciones como le plazca.
* Los mineros verifican que efectivamente cada transacción de sus correspondientes bloques es válida y que nadie está pagando una cantidad mayor que su balance.
* Los mineros observan la dificultad del bloque, para este ejemplo digamos que la dificultad es 6.
* Los mineros añaden un string al final del bloque llamado *nonce* y cifran todo el bloque entero con el método `SHA256` lo cual nos dará un código alfanumérico, por ejemplo `2341bdd2d99b 46318f363e09fbbcdf9d7 6817a2f6810c4b00b8 3fa9106f05570`.
* Si el resultado del cifrado no tiene 6 o más ceros delante el bloque se considera no resuelto y se prueba con otro *nonce* totalmente aleatorio lo que generará un hash totalmente nuevo. Esto llevará millones de intentos. Un ejemplo de un hash correcto sería por ejemplo: `000000318f3 3e09fbbcdf1d4b00b83fa91768zX32f 6810c06f05570 2d99b46`.
* Si un minero averigua el *nonce* correcto antes que los demás, lo anunciará a los demás mineros. Verificar si efectivamente este nonce es correcto es una operación muy rápida y poco costosa.
* Si el nonce es dado como bueno por los demás, el minero en cuestión es recompensado con +25BTC así como por las tasas de transacción que el emisor debe pagar y el bloque se añade al blockchain.
* Todos los mineros descartarán su bloque candidato y procederán a crear un candidato para el siguiente bloque.

De esta manera, para cada bloque tenemos a miles de mineros compitiendo por ser los primeros en dar con el resultado correcto. En cuanto un minero descubra el nonce correcto y los demás mineros lo validen como tal, todos descartarán sus actuales bloques candidatos y rápidamente pasarán a competir por el siguiente bloque de transacciones.

La red de bitcoin intentará siempre que cada bloque tarde diez minutos en ser validado. Para ello requerirá una dificultad acorde con la fuerza computacional existente. Cada catorce dias aproximadamente se mide el tiempo medio de minado bloque y si es menor de diez minutos, se presupone que la fuerza computacional global ha aumentado y se sube la dificultad de manera acorde.

De esta manera se consigue que todos los mineros estén de acuerdo con el historial de transacciones y existe una sola verdad demostrable matemáticamente distribuida entre todos los nodos.

Debido a que cada *nonce* con el que un minero prueba es cogido de manera totalmente aleatoria, se podría decir que el minado de criptomonedas con Proof of Work no es más que una lotería, y que aquellos mineros que tienen más poder computacional y pueden calcular más hashes por segundo, tendrían más números para ganar dicha lotería. El número de hashes que cada minero puede procesar se mide en Gigahashes por segundo (mil millones de hashes por segundo).

#### Gasto energético

Cuanta más gente quiere lucrarse de la minería de criptomonedas, más aumenta la dificultad, lo cual requiere más electricidad para encontrar la siguiente solución, y el ciclo se repite. Es por eso por lo que Proof of Work es altamente criticado, se considera que se gasta una cantidad de energía increíble para hacer un montón de cálculos innecesarios para validar las transacciones.

Este gasto energético se ha disparado totalmente en los últimos años. Se calcula que el minado de Bitcoin ya supera en consumición de energía a ciertos países del primer mundo.

{% include image_full.html imageurl="/images/posts/201712/proof-of-work-energy.png" title="Proof of Work Consumo de Energía" caption="Proof of Work Consumo de Energía" popup=true %}

Además es posible realizar una comparativa de estos datos con una estimación del gasto energético de VISA, que procesa unos 82.000 millones de transacciones al año. Como podemos ver Bitcoin consumiría la electricidad equivalente de 3 millones de viviendas de EEUU mientras que VISA únicamente la de 50000.

{% include image_full.html imageurl="/images/posts/201712/proof-of-work-visa.png" title="Proof of Work vs VISA" caption="Proof of Work vs VISA" popup=true %}

En realidad no es el gasto energía lo que debería preocuparnos tanto si no la contaminación en sí. La mayor parte de la contaminación asociada a Bitcoin se debe a que en China, país que cuenta con un gran número de granjas de minería debido a los bajos costes de la energía, produce gran cantidad de dicha energía mediante combustión de carbón lo que resulta en emisiones de contaminación elevados.

Aunque resulte muy fácil de criticar este mecanismo debemos analizar ciertos puntos primero:

En primer lugar hay que analizar que el motivo por el cual la energía resulta tan barata en ciertos países es por que construyen instalaciones para suplir la demanda no de hoy en día, si no la de dentro de quince años, lo que les lleva a producir un exceso de energía actual que no puede ser almacenada lo cual reduce los precios de la electricidad (simple oferta y demanda). Esta electricidad que hubiera sido generada aun en el caso en que los mineros no existieran ahora se encuentra rentabilizando el coste de los generadores

Otra de las cosas que tenemos que analizar es que Bitcoin es fácil de criticar por que su consumo energético es fácilmente medible, pero en cambio cada vez que se utiliza una tarjeta de crédito no podemos medir todos los costes de servidores intentando evitar fraude, de las torres de comunicación encendidas 24 horas al dia, los salarios de empleados, la gasolina que consumen para ir a trabajar, el coste de las oficinas, los bancos, las cajas fuertes, etc...

Además según vayan pasando los años, la recompensa de Bitcoin por minado de bloque irá disminuyendo, lo que significa que habrá menos mineros en juego, lo cual si has estado prestando atención implica que la dificultad disminuiría de nuevo y con ella todavía más el gasto energético.

Es por esto que Bitcoin bien podría acabar siendo en realidad el método más energéticamente eficiente.

Y aunque no lo fuera... ¿es realmente energía malgastada si sirve para asegurar la red de Bitcoin con todas las aplicaciones que trae consigo? Desde luego es un tema polémico.

Aunque hemos hecho hincapié en el método de consenso Proof of Work que opera Bitcoin, otras criptomonedas también lo utilizan, algunas con pequeñas variaciones para que el tiempo de bloquea sea menor, o para que el minado no se pueda hacer con CPU sino con GPU, etc... Ethereum por ejemplo también utiliza Proof of Work aunque tienen idea de moverse a Proof of Stake en el futuro, lo cual tendría un gasto energético casi nulo pero trae otros problemas consigo.

