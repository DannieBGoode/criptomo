---
layout: post
title: Qué es Cardano
description: La criptomoneda Cardano ADA podría ser el nuevo rival de Ethereum y durante los últimos meses se ha revalorizado un 400%.
banner_image: 201712/cardano.jpg
tags: [altcoins]
---

[Cardano](https://www.cardanohub.org/en/home/) es una plataforma open-source lanzada por IOHK en Septiembre de 2017 que constituye un proyecto muy ambicioso. Dicen estar intentando construir la tercera generación de criptomonedas donde la primera generación sería Bitcoin y la segunda Ethereum.

Su criptomoneda, denominada ADA, se encuentra ya en el top 10 en cuanto a mercado a pesar de sus pocos meses de existencia con 26 mil millones de monedas en circulación de un total de 45 mil millones.

<!--more-->

## Fisolofía

Todos los miembros y desarrolladores de Cardano, incluyendo a Charles Hoskinson, uno de los fundadores originales de Ethereum, están mostrados públicamente en la página web y además realizan muchísimos videos donde intentan explicar cada funcionalidad técnica en un lenguaje más amigable.

Una de las cosas que más me gusta de Cardano es que no ha necesitado autopromocionarse demasiado. Pretende ser un proyecto sólido enfocado en su solución tecnológica antes de empezar a intentar venderse mediante ICOs cómo hacen muchísimas otras monedas.

Sus creadores son ingenieros y científicos que han realizado primero estudios y documentación extensa y sólo después han empezado a construir. Parece algo muy sencillo pero lo que hacen la mayor parte de las criptomonedas es copiar el código de Bitcoin y entonces realizar modificaciones sobre ella, mientras que Cardano ha decidido empezar el proyecto totalmente desde cero y enfocándolo primero desde un punto de vista académico.

Invito a la gente (con dominio de inglés) que le echen un vistazo a la cantidad de [papeles académicos](https://www.cardanohub.org/en/academic-papers/) que Cardano ha creado para explicar toda su solución tecnológica antes de realizar una sola línea de código.

## Ouroboros

{% include image_caption.html imageurl="/images/posts/201712/ouroboros.png" title="Ouroboros" %}

Cardano usa un algoritmo Proof of Stake creado por ellos mismos denominado **Ouroboros**. Los mecanismo de Proof of Stake son mucho más eficientes energéticamente que los Proof of Work (usados por Bitcoin y Ethereum aunque este último planea moverse a Proof of Stake en algún momento).

Proof of Stake es un mecanismo muy complicado de realizar de manera segura, pero los integrantes de IOHK aseguran haberlo conseguido y [han presentado públicamente extensos documentos al respecto](https://eprint.iacr.org/2016/889.pdf).

## Daedalus

{% include image_caption.html imageurl="/images/posts/201712/daedalus.png" title="Daedalus" %}

**Daedalus** es la wallet ofrecida por IOHK, se puede descargar desde su página web y con el tiempo pretende soportar otras monedas para convertirse en un wallet universal.

## ¿Por qué lo están construyendo?

La primera generación Bitcoin solo puede hacer transacciones simples P2P y todavía no es muy práctica para transacciones más complejas. Ethereum intenta traer consigo el concepto de smart contracts, lo cual ha sido una revolución que la ha colocado en la segunda posición de criptomonedas. Aun así los smart contracts están un poco limitados y tienen ciertos problemas sin resolver que Cardano ha tenido en cuenta desde el principio.

Estos problemas son:

#### Escalabilidad.
**Poder realizar muchas más transacciones por segundo (TPS) sin necesidad de debilitar el protocolo** quitando funcionalidades o patrones de seguridad para logarlo (que es precisamente como la criptomoneda EOS ha conseguido tener tal volumen de tps). BTC y Ethereum todavía soportan poquísimas transacciones por segundo (10 y 30 tps respectivamente), mientras que VISA o Mastercard tienen capacidad para decenas de miles de transacciones. Si alguna vez las criptomonedas desean poder reemplazar a estos métodos convencionales de pago la escalabilidad deberá estar resuelta. Cardano soporta ahora mismo hasta 15 tps, pero está siendo creado de tal manera que cuanto más usuarios haya más tps será capaz de procesar y espera poder escalar sin problemas.

#### Interoperabilidad.
**Interactuar con otras blockchains**. Cardano no pretende sustituir a Bitcoin ya que prevé un mundo con muchísimas otras monedas en circulación y propone un escenario donde las monedas pueden operar entre ellas y adicionalmente con el sistema bancario clásico.

#### Sostenibilidad.
**Mantener a la comunidad unida y tener desarrollo flexible y financiado**. Hoy en día hay muchas preguntas sobre cuál es el verdadero Bitcoin, Bitcoin? Bitcoin Cash? Bitcoin Gold? Cada fork que se realiza sobre una moneda divide a la comunidad. Además otra cuestión es de qué manera se financia al equipo de desarrolladores para que siempre exista progresión sobre la misma.

Cardano quiere traer el poder de decisión a la gente de manera descentralizada e intentar así mitigar este problema. Para ello ha copiado de Dash su concepto de *Tesorería*, donde los desarrolladores se llevan una comisión de cada bloque minado, y su sistema de votaciones para que la comunidad pueda elegir en qué dirección debería moverse el desarrollo de la moneda.

{% include imgur_embed.html id="MAvcXw5" caption="&quot;Charles Hoskinson&quot; by Xaviera Lopez" %}

## Camino al futuro

Cardano crecerá gradualmente hasta poder ofrecer funcionalidades cómo Smart Contracts, sidechains, metadata y computación multi-party.

El roadmap de desarrollo de Cardano se puede observar en [su página web](https://cardanoroadmap.com/). Alguna de las próximas mejores que prometen son tarjetas de crédito para uso cotidiano, sistemas de votaciones y *Firmas resistentes a la computación Cuántica* (que es un problema de seguridad que se discute en vistas al día en que tengamos ordenadores cuánticos que podrían ser capaces de vulnerar la red).

{% include image_caption.html imageurl="/images/posts/201712/cardano-roadmap.png" title="Cardano Roadmap" popup=true %}

Me encanta el hecho de que todos los desarrollos del roadmap cuentan al lado con las personas específicas que están a cargo de él con enlaces a sus githubs tanto personales cómo de los desarrollos en sí lo que permite a cualquier persona entendida en el sector entrar a ver de qué manera se están resolviendo los problemas y auditar el código.

Aún para aquellas personas que no entiendan de programación recomiendo también entrar antes de invertir para hacerse una idea de qué actividad están teniendo los desarrollos. Es muy mala señal que proyectos cómo éstos no presenten muestras de actividad.

## Solución Técnica

El lenguaje de programación utilizado ha sido Haskell, que es un lenguaje muy extendido y considerado de los más seguros entre la comunidad.

El código sigue una filosofía Hack-Proof, que es el método que utiliza el ejército o la NASA a la hora de realizar sus desarrollos asumiendo que un error de programación es totalmente inaceptable. Mientras que un error en facebook podría suponer un texto descolocado, un error en un cohete espacial podría significar vidas humanas. Por eso se llevan rigurosos reviews de calidad que aunque no lo hacen imposible de hackear o de fallar, al menos lo hacen bastante más complicado.

Por muy increíble que parezca, la mayor parte de los proyectos de Blockchain no siguen esta filosofía. No hay más que mirar al DAO, donde un simple error de programación al poner una línea de código antes que otra ocasionó semejante catástrofe en el mundo de Ethereum que se tuvo que crear una nueva moneda (Ethereum) que solucionara este problema y se intentó meter debajo de la alfombra a la moneda original (que se pasó a llamar Ethereum Classic y sigue siendo cotizada a un precio muy inferior).

## Dónde Comprar Cardano (ADA)

Por el momento se puede comprar ADA únicamente a cambio de Bitcoin o Ethereum. Particularmente me gusta el exchange de [Binance](https://www.binance.com/?ref=11317062).

## Conclusión

Al final como siempre será el mercado quien decida lo útil y valiosa que será la moneda, por muy buena o prometedora que sea si no se acaba utilizando morirá. El proyecto lleva muy poco activo y por el momento hay que aclarar que su utilidad es absolutamente nula y todo son promesas futuras.

Por otro lado el equipo de Cardano está haciendo un papel increíble intentando explicar todo lo que están haciendo y en qué dirección se están moviendo. Os invito a echar un vsitazo a [su canal de youtube](https://www.youtube.com/channel/UCBJ0p9aCW-W82TwNM-z3V2w) (todo en inglés) y que lo comprueben.

Durante los próximos años vamos a ver centenares de nuevas criptomonedas y tecnologías blockchain que serán anunciadas a lo grande con el fin de ganar millones de dólares en sus ICO y que luego fracasarán en entregar lo prometido. Muy pocas de ellas saldrán realmente victoriosas independientemente de lo prometedoras que sean o la poca competencia que sufran. La gran mayoría de estos fracasos se deberán a soluciones tecnológicas aceleradas sin realizar un cuidadoso estudio de mercado y tecnología.

Cardano mientras tanto se dedica a poco a poco sacar nuevas funcionalidades sin hacer demasiado ruido y a construir una plataforma altamente estable y auditada. Si su pasión por su rigor científico y documentación continúa sin duda dará mucho más de que hablar. Si será el siguiente Ethereum será algo que sólo el tiempo dirá, lo que está claro es que ninguna otra criptomoneda está realizando las cosas de esta manera.


