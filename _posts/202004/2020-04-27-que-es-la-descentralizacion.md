---
layout: post
title:  Qué es la descentralización
description: La descentralización en las criptomonedas y Bitcoin explicadas.
banner_image: 202004/decentralization.jpg
rating: 5
totalVotes: 4
tags: [bitcoin]
---



Todo el mundo habla de la descentralización, de cómo es lo mejor de las criptomonedas y se debate qué criptomoneda está más descentralizada que cual otra. ¿ Pero qué es la descentralización realmente?

<!--more-->

En principio la descentralización se da cuando no existe una entidad que domine y controle el ecosistema.

Hay varias maneras en que una criptomoneda puede estar descentralizada.

- **Minado**: Si existen sólo unos pocos mineros en la red, como podría ser en el caso de [Ripple](/que-es-ripple/), resulta muy fácil censurar a ciertas organizaciones bloqueando sus fondos. Por ejemplo VISA/Mastercard bloquearon a Wikileaks dejándoles sin fondos de un día para otro cuando el gobierno de EEUU así lo decidió. Si en cambio existen muchos mineros, la posibilidad de que todos ellos se pongan de acuerdo para dejar a alguien fuera de la red es muy poco probable. Aquí entra el debate del [tamaño de bloque](/problema-escalabilidad/). La criptomoneda fork de Bitcoin, Bitcoin Cash ([BCH](/que-es-bitcoin-cash/)) insiste en aumentar constantemente el tamaño de bloque posible de su red, lo cual hace que haya menos mineros capaces de participar en la red ya que a mayor tamaño de bloque se requieren equipos más potentes para participar. BSV, otro fork de BTC, va más allá insistiendo en que los únicos que deberían procesar transacciones son organismos centralizados especializados en ello. Obedeciendo al [trilema de escalabilidad](/trilema-escalabilidad/) podemos decir que BTC es la criptomoneda más segura de las tres en cuanto a capacidad de que alguien pueda ser censurado o la red pueda recibir un [Ataque del 51%](/ataque-51-porciento/) pero paga su precio en velocidad de transmisión de transacciones. En mi opinión un precio bastante justo para pagar, teniendo en cuenta que durante la guerra de hashes de BCH y BSV ambas demostraron que tenían más del 50% del poder de procesado de sus respectivas redes. En otras palabras, podrían censurar transacciones de sus redes según vean conveniente.

- **Forks**. El equipo de Ethereum tiene un modelo donde ellos mismos forkean su moneda constantemente para poder hacer cambios drásticos en su código. Para evitar que la gente se quede atrás como hicieron con el hack del DAO cuando nació Ethereum Classic, dejan una bomba de dificultad en cada cadena que hace que con el paso del tiempo sea imposible de minar y procesar transacciones en el blockchain anterior. De esta manera la gente se ve obligada a moverse al nuevo Ethereum estén o no de acuerdo con sus cambios. Podríamos decir que los desarrolladores de Ethereum tienen poder absoluto sobre lo que suceda en su red.

- **Desarrollo**. Ethereum es un buen ejemplo de un modelo de desarrollo centralizado como acabamos de explicar, pero cualquier criptomoneda que tenga un equipo dedicado que haya creado la criptomoneda y se encargue exclusivamente de desarrollarla se podría decir que está bastante centralizada. Si únicamente existe un equipo de desarrollo la gente no tiene más remedio que obedecer la voluntad de los desarrolladores. BCH tiene 2 grupos de desarrolladores principales que en ocasiones deciden forkear la moneda sin tener en cuenta la opinión del otro y pudiendo provocar dividir a la comunidad en cualquier momento. BTC tiene cientos de desarrolladores que trabajan por separado con las mismas reglas, puesto que la única regla del desarrollo de BTC es que no se puede forkear la moneda. Por eso tenemos equipos de desarrollo que se encargan en ofrecer soluciones side-chain de privacidad, o de escalabilidad sin tener que compaginarse con el resto. El hecho de que el creador, Satoshi Nakamoto, crease BTC, pusiera sus inmutables reglas en marcha y desapareciera sólo ha ayudado a que nadie sea dueño de BTC pero todos podamos sentirnos con el mismo derecho de colaborar en su desarrollo.

### Puntos fuerte de la descentralización:
- **Anti-censura**: cuanto más mineros haya más complicado es censurar las transacciones de una entidad.
- **No hay cambios en el funcionamiento de la red**. Nadie podría decidir cambiar las reglas principales como por ejemplo imprimir más criptomonedas sin el consentimiento de los demás.

### Puntos débiles
- **Lentitud**. Cómo ya hemos mencionado anteriormente aumentar la descentralización disminuye la velocidad de transacciones por segundo (tps), puesto que necesitas que muchos más nodos se pongan de acuerdo para continuar.
- **No hay marcha atrás**. Accidentes debido a la descentralización como cuando un fallo en la cartera de criptomonedas Parity hizo que muchos usuarios perdieran todos sus fondos o el DAO que ocasionó el primer fork de Ethereum y un gran debate no son fácilmente evitables.


## ¿Puede una moneda estar suficientemente descentralizada?

Un lector me preguntó el otro día si no habría un límite de descentralización el cual podamos alcanzar y una vez ahí dedicarnos a mejorar la velocidad de la criptomoneda en cuestión, sacrificando la mínima velocidad posible para una seguridad que pueda considerarse suficiente.

Por desgracia, no es tan sencillo.

En primer lugar como hemos visto no existe un concepto único de descentralización, la descentralización se da de al menos tres maneras distintas todas igual de importantes.

Además nadie sabe el umbral por el cual una criptomoneda pasa a ser suficientemente descentralizada puesto que este umbral va moviéndose con el tiempo a medida que salen mejores ASICs de minado o se vayan sumando (o eliminando) mineros a la red según ellos mismos vean conveniente por ejemplo por las variaciones en el precio de la electricidad que a su vez puede cambiar por cientos de factores distintos.

Un gobierno podría decidir acabar con una criptomoneda haciendo una inversión millonaria en equipos ASICs con la intención de realizar un ataque del 51% sobre la red y destruir en consecuencia la confianza que se tiene sobre la misma. Este ataque siempre es teóricamente posible independientemente de cuán descentralizada esté la red, pero cuanto más descentralizada esté y por tanto más mineros y fuerza de hasheado haya en la red más caro resulta atacarla.

En la página web <a rel="nofollow" href="https://www.crypto51.app/">Crypto51</a> podeis ver los costes de atacar distintas criptomonedas durante 1h. 

{% include image_caption.html imageurl="/images/posts/202004/attack.png" title="Ataques a diferentes criptomonedas a fecha 27 Abril 2020" caption="Ataques a diferentes criptomonedas a fecha 27 Abril 2020" popup=true %}

¿Podría a alguien interesarle gastar 1 millón de dólares por hora para tirar Bitcoin? Tal vez, pero cuanto más grande sea este número más improbable será. Bitcoin Cash por tomar una referencia podría ser atacado durante 1h con sólo $13,000.

