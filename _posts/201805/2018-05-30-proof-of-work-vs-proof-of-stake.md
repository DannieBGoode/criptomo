---
layout: post
title:  Proof of Work vs Proof of Stake
description: Diferencias entre Proof of Work y Proof of Stake. Problemas e inconvenientes de cada uno.
banner_image: 201805/pow-pos.jpg
rating: 5
totalVotes: 4
tags: [tecnologia]
---

Proof of Work y Proof of Stake son los mecanismos de consenso principales utilizados en el mundo de las criptomonedas y existe mucho debate sobre cuál es el mejor. Ambos algoritmos ofrecen un sistema de incentivos para los participantes de una red de manera que cumplan con las reglas del sistema.

<!--more-->

### Proof of Work

En [PoW](/que-es-proof-of-work/) los usuarios (mineros) están incentivados a seguir las reglas porque están gastando electricidad para resolver el PoW de cada bloque candidato. Si lo hacen correctamente recibirán beneficios en forma de recompensas de bloque y tasas de transacción. Si el minero no sigue las reglas no obtendrá estas recompensas y habrá malgastado electricidad para nada por lo que romper las reglas resulta penalizado.

POW presenta ciertos problemas:

##### Electricidad
La dificultad de resolver el PoW aumenta conforme más mineros existen en la red lo que conlleva a gastar más electricidad para recompensas monetarias cada vez más pequeñas. Se ha calculado que la electricidad que se está usando globalmente para la red de BTC ya supera el consumo eléctrico de algunos países como Hungría o Nueva Zelanda.


##### Economía de escalado
Si un minero tiene diez veces más dinero que otro, puede comprar más hardware de minado y por tanto obtener más recompensas. Dicho de otra manera, los ricos se hacen más ricos. Es por ello que muchas criptomonedas han decidido elegir algoritmos de PoW no tradicionales, como minado basado en memoria RAM.

##### Inflación
Aunque no está claro todavía que esto sea un problema, la recompensa de bloque es precisamente la que se encarga de generar monedas de la nada con inflación controlada hasta generar 21 millones de unidades en el caso de Bitcoin (sobre el año 2120). Otras criptomonedas como [Ethereum](/que-es-ethereum) o [Monero](/que-es-monero) todavía no están limitadas por lo que su inflación es continua y constante. Para el caso de BTC queda por ver que ocurrirá el día que deje de haber recompensas de bloque y si las tasas de transacción serán suficientes para mantener la red funcionando. Existe la posibilidad de que cierta inflación constante que recoja su valor del resto de la red sea necesaria a modo de financiación.

### Proof of Stake

En PoS no hay mineros, sino validadores. En lugar de gastar electricidad, lo que hace un usuario validador es bloquear parte de su dinero en un smart contract. De esa manera se compromete a ser honesto puesto que si propone un bloque que acabe siendo demostrado por otro nodo como incorrecto, el usuario perderá el dinero apostado. En cierta manera se podría decir que PoW es un tipo de PoS debido a que indirectamente se está apostando dinero, en forma de electricidad (en lugar de una criptomoneda), pero PoS no es PoW puesto que no utiliza electricidad y la validación de un bloque se puede considerar instantánea.

Los validadores son seleccionados por la red en función de cuanto bote han puesto en el smart contract y otras variables incluyendo cierta aleatoriedad en la fórmula basada en timestamps.

Los problemas que presenta PoS son:

##### Economía de Escalado
Aunque los usuarios no pueden utilizar su dinero en comprar hardware que mine más rápido, un usuario si que podría comprar más unidades de la moneda en cuestión, como Ethers, lo cual le daría mayor probabilidad de ser elegido para ser el encargado de crear el siguiente bloque y por tanto recibir la siguiente recompensa de bloque. Estaríamos de nuevo ante un sistema donde los ricos se hacen más ricos. La principal diferencia sería que el precio de hardware de minado se mantiene más o menos constante, mientras que el mero hecho de intentar adquirir muchos Ethers dispararía el precio de la moneda.

##### Problema de nada en juego (**Nothing at Stake Problem**)
Cuando dos validadores cumplen simultáneamente las condiciones de validación del siguiente bloque podrían proponer dos versiones distintas del siguiente bloque creando un fork del blockchain. Esto es algo que también ocurre en PoW cuando dos mineros encuentran la solución de su bloque candidato a la vez y se resuelve esperando a ver que versión eligen los demás mineros como válida minando sobre ella.

En Proof of Stake, debido a que validar un bloque no cuesta nada de electricidad, ante diferentes versiones de la cadena (forks) un validador podría validar distintos bloques de versiones distintas del blockchain simultáneamente para asegurarse que gane cual gane acabe llevándose su recompensa. Esto dificultaría mucho más la resolución de conflictos y aumentaría considerablemente el número de [bloques huérfanos](/problema-escalabilidad/). Pero aun más problemático sería que permitiría a un atacante poder deshacer sus transacciones ya pasadas:

Un atacante que tuviera únicamente un 1% de todos los Ethers podría realizar una compra en una tienda que quede reflejada en una cadena e inmediatamente después realizar un fork un bloque por detrás (antes de que se realizara esa compra). Debido a que el resto de los validadores validarán todas las cadenas, si el atacante abandona la primera cadena y ya sólo apoya la segunda, ésta acabaría siendo más larga que la original que sería decartada por la red y por tanto el pago de la primera cadena nunca habría ocurrido.

En Proof of Work esto no ocurriría por que apoyar dos versiones distintas del blockchain implicaría dividir por la mitad el poder computacional de procesamiento de minado (ya que ahora hay que resolver 2 bloques en lugar de 1) por lo que la probabilidad del minero de acabar resolviéndolo disminuiría a la mitad, algo que no le interesa. El minero siempre apostará por la versión que el considera correcta (la más larga o la primera que le llegue).

### Notas finales

Es de sobra conocido que Bitcoin utiliza Proof of Work utilizando SHA-256. Ethereum a día de hoy también utiliza PoW pero tienen planes de acabar moviéndose a Proof of Stake cuando terminen de implementar Casper, donde han buscado una solución para el problema de nada en juego donde penalizarán a los validadores que validen cadenas distintas. Este modelo requiere un sistema de comunicación entre forks que podría tener consecuencias que aun no conocemos. [Cardano](/que-es-cardano) también ha encontrado su propia solución en su solución Ouroboros aunque por el momento también es totalmente académica.

Es posible que acabemos viendo modelos híbridos, debido a que ninguno de los dos modelos acaba siendo perfecto. En PoW la cadena no puede ser rescrita físicamente por que se necesitaría mucha electricidad para reescribirla entera, por lo que la seguridad que esto ofrece es muy alta, por otro lado su coste es alto.

Otros algoritmos de consenso que se han planteado son delegated [Proof of Work (dPOS)](/que-es-eos/), Proof of Authority (PoA) o [Proof of Importance (PoI)](/que-es-nem/) pero todas ellas sacrifican la descentralización a favor de velocidad de transacción o de resolución de conflictos.
