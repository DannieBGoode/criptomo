---
title: Qué es Oyster Protocol (PRL)
date: 2018-02-08 00:00:00 Z
tags:
- altcoins
layout: post
description: Qué es Oyster Protocol y su token PRL, cómo utiliza el Tangle de IOTA.
  Comparativa con Storj, Filecoin y Siacoin. Predicciones de precio.
banner_image: 201802/oyster.jpg
rating: 5
totalVotes: 1
lang: es
---

Oyster Protocol es una moneda que se caracteriza por ofrecer tres cosas distintas, cualquiera de las tres habría podido justificar la creación de una moneda en sí, pero es la combinación de las tres lo que la hace tan prometedora.

<!--more-->

<a rel="nofollow" href="https://oysterprotocol.com/">Oyster</a>, o más concretamente su criptomoneda PEARL (PRL) es la primera que:
* Permite subir cosas a la nube al estilo de **dropbox pero de manera totalmente anónima y descentralizada**. Existen monedas que también ofrecen esto, como Storj, SiaCoin o Filecoin y más adelante analizaremos las diferencias.
* Pretende **sustituir a la publicidad en las páginas webs** como modelo de beneficios de los dueños de las páginas. El plugin de monero llamado Coinhive también ofrece algo parecido.
* **Ofrecerá una moneda con refugio de valor real**, al estar el precio del PRL mediado con el precio del mercado de almacenamiento. Tether ofrecía esto asegurando que por cada token de USDT en circulación, los creadores tenían 1$ guardado, pero estas garantías centralizadas son peligrosas.

PRL es una moneda ERC-20, es decir basada en Ethereum, pero con la particularidad de que la información de los usuarios será almacenada en el Tangle de [IOTA](/que-es-iota/). Tendrá un total de 500 millones de monedas en circulación y no se podrán imprimir más una vez alcanzado este límite.

Cuando un usuario gasta PRL en almacenaje descentralizado, ese token PRL queda "enterrado" en la red, y podrá ser vuelto a encontrar mediante su proceso de minado.

{% include image_caption.html imageurl="/images/posts/201802/oyster-home.png" title="Oyster Homepage" caption="Página principal" popup=true %}

## Totalmente anónimo

El sistema de Oyster permite que los usuarios puedan subir el contenido que desean de manera totalmente anónima y cifrada. Esto podría llevar a un uso indebido de la red a lo cual el equipo ha respondido lo siguiente:

> Aunque entendemos que el potencial de almacenar contenido ilegal existe, toda la información es cifrada y no puede ser leída por nadie. No hay manera de que un usuario que corre un nodo de IOTA sea acusado de hacer nada ilegal puesto que sólo posee una fracción de ese fichero al cual solo la persona que tiene el handler tiene acceso. Oyster PRL no opina sobre el uso indebido que pueda ocurrir ya que prácticamente cualquier cosa puede ser utilizada con malos fines. <cite>Bruno Block</cite>

La organización provee una plataforma con un gran potencial tanto para el bien como para el mal al igual que Kim Dotcom hizo en su momento con su web MEGA. Es por esto que Bruno Block, lider del proyecto, es una personalidad totalmente anónima, puesto que sabe lo polémico que es este asunto y las repercusiones que podría tener sobre él.

## El "PEG"

Uno de los problemas de las criptomonedas es la volatilidad de su precio. Tether intentó ofrecer una moneda alternativa fijando el valor (el peg) de sus tokens a 1$ y asegurando que ellos, en algún banco o cámara acorazada, tienen la contrapartida suficiente como para igualar todos los USDT que existen en circulación. No obstante hay mucha gente que pone esto en duda, y el valor de Tether podría perfectamente decaer enormemente si se demuestra lo contrario. El dólar también tuvo una contrapartida equivalente en oro por cada billete impreso hasta que Nixon decidió desvincularlos.

Oyster podría ser la primera moneda con un valor racional, controladamente variable y descentralizado. La manera en que pretende conseguirlo es fijando la cantidad de almacenamiento que 1PRL permite pagar de tal manera que el mercado fijará su precio acabando con su volatilidad. Veamos un ejemplo:

Si se anuncia que 1PRL permitirá almacenar 64GB/año, el mercado empezará a comprar y utilizar PRL como medio de almacenamiento hasta que la moneda tenga un valor cercano al precio por el cual sus competidores (google drive, dropbox, siacoin...) permiten almacenar 64GB/año. Si por algún casual el valor de 1PRL aumentase irracionalmente más allá del precio de los competidores, lo normal es que el mercado empezará a utilizar a dichos competidores por resultar más económicos y el precio de la moneda volvería a equipararse.

Una vez fijado en el smart contract el algoritmo que fija la capacidad de almacenamiento de 1PRL, no podrá ser cambiada nunca más. El equipo está analizando todavía qué fórmula aplicar, pero han asegurado que su punto de partida será como mínimo de 64GB / año, e irá aumentando o bien cada X meses, o bien con el nivel de uso de la red.

## Equipo

El creador, llamado Bruno Block, es anónimo pero el resto del equipo puede ser visto en [su página web](https://oysterprotocol.com/#core-team). Normalmente jamás aconsejaría un proyecto donde los integrantes del equipo son anónimos, pero debido a lo polémica que puede llegar a ser su plataforma si es usada indebidamente, unido a lo activo que son en la comunidad respondiendo preguntas puedo entender la situación.

Ponen a disposición del público: 
- <a rel="nofollow" href="https://trello.com/oysterprotocol">Trello</a>: con los distintos hitos que van realizando, aunque me gustaría que estuviese más completo de lo que lo vemos.
- <a rel="nofollow" href="https://github.com/oysterprotocol">Github</a>: bastante activo donde se puede comprobar todo el trabajo que están realizando.
- <a rel="nofollow" href="https://t.me/oysterprotocol">Telegram</a>: donde el equipo, incluyendo Bruno, participan activamente aclarando cualquier pregunta que los usuarios puedan tener.

## Tecnología

El ecosistema de Oyster se divide en varias roles:

#### Usuario

Se trata del usuario que decide pagar PRLs por almacenamiento descentralizado de sus ficheros que serán cifrados y fraccionados en trozos muy pequeños (de menos de 1MB) en su equipo antes de ser almacenados en el Tangle. Su única responsabilidad a parte de pagar será almacenar el *handle*, es decir, la contraseña única referente a ese fichero.

Su fichero estará almacenado de manera anónima y segura en el tangle, es decir, replicado en muchos equipos de la red, lo que permite que cientos de usuarios puedan descargarse el mismo fichero sin retrasos (parecido a como funciona la tecnología torrent). Una vez el fichero esté subido, se puede descargar las veces que se desee de manera gratuita, pero en cambio, crear modificaciones implicaría gastar de nuevo ancho de banda de almacenaje.

Cuando un usuario paga por 64GB/año, lo que realmente está pagando es que durante un año, 64GB subidos al tangle, serán mantenidos por la red, si el usuario deja de pagar, pasado el tiempo preestablecido, la red irá borrando la información cuyo contrato no haya sido renovado. Un fichero subido por un usuario no podrá ser borrado por gobiernos, organizaciones u otros usuarios mientras el precio de su almacenaje siga siendo pagado.


{% include image_caption.html imageurl="/images/posts/201802/oyster-upload.png" title="Oyster Upload" caption="Subida de un fichero al tangle" popup=true %}
{% include image_caption.html imageurl="/images/posts/201802/oyster-download.png" title="Oyster Download" caption="Descarga de un fichero del Tangle para lo cual es necesario conocer su handle" popup=true %}


#### Nodo Broker
Provee de acceso al Tangle a los nodos web y a los usuarios que desean almacenar sus datos.

#### Dueño web

La organización o la persona encargada de una página web, únicamente añadiendo un pequeño script al final de su página pondrá a los usuarios a minar en su beneficio en lugar de bombardearlos con publicidad.

Añadir el script a la página será tan sencillo como añadir la siguiente línea en el código HTML: `<script id="o.ws" payout="ETH_ADDRESS" src="https://oyster.ws/webnode.js"></script>`.
Una vez puesta, los visitantes recibirán un aviso que les informará de que, para poder ver los contenidos de la web deberán contribuir una pequeña parte de su equipo al minado (que de todas formas antes estaba siendo utilizada para mostrar los anuncios) de nuevos PRLs para el dueño de la página. El dueño entonces podrá vender los PRLs generados y así financiar su página web.

#### Visitantes web

Personas que entren en una página web con el script de oyster preparado pondrán un pequeño porcentaje de su CPU a trabajar confirmando transacciones del Tangle mediante Proof of Work. Será su modo de pagar su acceso a los contenidos de la página web que está visitando.

Los creadores aseguran que si el script detecta que está afectando negativamente a la experiencia del usuario navegando bajará su rendimiento, ya que es importante para ellos que dicha experiencia no se vea afectada negativamente puesto que necesitan que continuen colaborando con la red.

Aquellos usuarios que utilicen adblock podrán bloquear correctamente el script si así lo desean, aunque Oyster pretende darle la opción a los usuarios de elegir si contribuir o no mediante un pequeño popup al acceder a la página.

## Dónde comprar Oyster PRL

Actualmente muy pocos exchanges venden PRL, lo cual puede ser visto como una buena oportunidad de compra. Recomiendo <a rel="nofollow" href="https://www.kucoin.com">Kucoin</a>, aunque también se puede ver en <a rel="nofollow" href="https://etherdelta.com/">EtherDelta</a>.

## Dónde almacenar Oyster PRL

Al tratarse de una moneda ERC-20, PRL se puede almacenar en cualquier cartera que soporte Ethereum utilizando la misma dirección sin problemas. Puede parecer que algunos wallets, como blockchain.info, no soportan monedas ERC-20 a pesar de soportar Ethereum. En realidad si enviarais vuestros fondos allí no los perderíais, estarían correctamente guardados, pero no los podréis visualizar desde la web a día de hoy, para hacerlo deberíais importar la clave privada de blockchain.info a un wallet que si lo soporte.

Por ello es mejor guardarlos en wallets que si soportan ERC-20, como por ejemplo:

* <a rel="nofollow" href="https://www.myetherwallet.com">MyEtherWallet</a>
* <a rel="nofollow" href="https://metamask.io/">MetaMask</a>
* <a rel="nofollow" href="http://amzn.to/2i5kRoG">Ledger Nano S</a>
* <a rel="nofollow" href="http://amzn.to/2i72hMV">Trezor</a>
* <a rel="nofollow" href="http://amzn.to/2ja1KHf">KeepKey</a>
* <a rel="nofollow" href="https://jaxx.io/">Jaxx</a>

## Competencia

Oyster tiene algo de competencia entre distintas monedas que también pretender resolver el dilema del almacenamiento descentralizado. Entre ellos se encuentran Storj, Siacoin y Filecoin. Aunque todos son proyectos prometedores hay varios factores que los distinguen.

Aunque Storj almacena la información de manera descentralizada existe un único punto de entrada dependiente de ellos, que podría considerarse su punto débil. Storj es capaz de monitorizar los datos almacenados e incluso acceder a ellos. Oyster es totalmente anónimo y si la empresa desaparece el protocolo podrá seguir funcionando sin ella.

Para utilizar Siacoin, un usuario debe descargarse todo su blockchain (6GB y varias horas) antes de poder utilizar la red. Tanto los usuarios de Sia como los de Filecoin deberán pagar por las descargas que realicen de los ficheros una vez subidos a sus respectivos blockchain, mientras que Oyster ofrece descargas ilimitadas una vez el fichero ha sido subido.

En la siguiente tabla se puede ver comparativamente los diferentes servicios de la competencia de los que ya se conocen el precio. Aquellos que tienen un asterístico se debe a que no ofrecen los planes exactos que estamos comparando por lo que hemos cogido el precio del plan siguiente y calculado cuanto sería la cuantía. Se presupone que el precio de 1 PRL es de 0.75$ aunque hasta que la plataforma salga al mercado este irá variando por motivos especulativos.

He puesto el mismo precio en Oyster para 64GB y 512GB puesto que aún no se sabe cuánto va a ser el PEG, pero probablemente será uno de esos 2 valores.

<!-- {:.table.table-striped.table-bordered.table-hover.table-condensed.table-collapsable}
|   Almacenamiento     |  Oyster  |      Sia            | Storj          |  Dropbox    | Google Drive   | Amazon Cloud       |
|:--------------------:|:--------:|:-------------------:|:--------------:|:-----------:|:--------------:|:------------------:|
| 64 GB/mes            | $0.06    |     $0.13           | $0.96          | €0.63*      | €1.28*         | $0.64*             |
| 64 GB/año            | $0.75    |     $1.53           | $11.52         | €7.5*       | €15.36*        | $7.68*             |
| 512 GB/mes           | $0.06    |     $1.02           | $7.68          | €5*         | $5*            | $2.5*              |
| 512 GB/año           | $0.75    |     $12.29          | $92.16         | €60*        | $50*           | $30*               |
| Anónimo              | Si       |      Si             | No             | No          | No             | No                 |
| Descentralizado      | Si       |      Si             | No             | No          | No             | No                 |
| Downloads gratis     | Si       |      No             | No             | Si          | Si             | Si                 |
| Modificaciones gratis| No       |      No             | No             | Si          | Si             | Si                 |
| No Registro          | Si       |      Si             | No             | No          | No             | No                 |
| Configuración fácil  | Si       |      No             | Si             | Si          | Si             | Si                 | -->

{% include image_caption.html imageurl="/images/posts/201802/storage-pricing.png" title="Comparación de servicios de almacenamiento" popup=true %}

## Camino al futuro

Aunque el protocolo está todavía en un fase muy temprana, es fácil imaginar servicios de streaming alimentados por él. Contenidos que no podrían ser censurados por las autoridades.

Resulta obvio que una vez se lance la plataforma, una de las primeras aplicaciones que deberíamos ver es algo parecido a la app de escritorio de Dropbox, donde podemos modificar libremente ficheros y se sincronizan con la web. Será necesario explicar a los usuarios que aunque hayan pagado por 64GB/año, debido al funcionamiento del Tangle, sus modificaciones también cuentan de cara a ese límite, puesto que en realidad, tanto el fichero viejo como el nuevo convivirán en la red, lo cual va en contra de la concepción que tiene el mercado hoy en día. Realizar una aplicación que contenga el conjunto de todos los handlers de todos los ficheros de un usuario será otro reto que el equipo todavía tiene que explicar, puesto que hacer esto sin que se pierda la descentralización de la que tanto alardean no será fácil.

### SHELL

El equipo de Oyster ha anunciado una nueva moneda denominada SHELL, de la cual harán airdrop 1:1 a todos los wallets que contengan PRL, es decir, los usuarios que almacenen sus tokens en wallets recibirán un SHL por cada PRL que poesan.

SHL será utilizado para pagar conectividad y operaciones de aplicaciones descentralizadas en la red de Oyster, y a diferencia de PRL, no estará fijado a un peg, por lo que su valor no estará acotado y será vulnerable a las fluctuaciones de precio. En un futuro se podrían utilizar SHLs para acceder a páginas web descentralizadas o esquivar totalmente a las operadoras de telecomunicaciones.

{% include image_caption.html imageurl="/images/posts/201802/shell.png" title="Shell Token" popup=true class="small-banner" %}

Algunos de los potenciales casos de uso sugeridos serían:

* Un usuario quiere llamar a un amigo de una manera descentralizada y segura. Su dispositivo móvil buscaría conexiones P2P (por Bluetooth y Wifi) con otros teléfonos que participen en la red de Oyster y se realiza la llamada esquivando a las operadoras. SHL se usaría para pagar la conexión por segundos de uso en lugar de pagar a final de mes a la operadora. Las llamadas no podrían ser bloqueadas, ni intervenidas o traceadas. Obviamente para que esto pueda ocurrir se necesitaría una red lo suficientemente grande de usuarios que participen en la red de Oyster.

* Oyster migra su chat de Telegram/Slack a una Dapp de chat. El equipo de Oyster paga a la red en SHL y PRL.

* Un usuario desea acceder a contenido bloqueado por la operadora evitando ser detectado. Su ordenador se conectaría directamente a la red de Oyster por conexiones P2P.

## Opinión

PRL me resulta una de las monedas más interesantes del momento. El hecho de tener una moneda que afiance su valor en algo real como es el precio de almacenamiento es un experimento social que puede marcar la historia de las criptomonedas.

Aunque la red se lanza en Abril de 2018, el precio del token PRL, suponiendo una capacidad de almacenamiento mínima de 64GB/año es todavía bajísimo comparado con Google Drive o Amazon Web Services aunque si es cierto que su usabilidad no va a ser la misma en un inicio, al menos hasta que no haya una aplicación de escritorio que le permita recibir adopción en masa.

Por otro lado está por ver si los usuarios de internet aceptan o no que parte de su equipo se dedique a minar criptomonedas mientras navegan a cambio de no ser bombardedos con publicidad. El equipo de Oyster asegura que esto es equivalente a cuando los usuarios eran reacios a poner sus tarjetas de crédito en webs de compra por internet, algo que ya es totalmente estándar a día de hoy.

La testnet B ahora activa todavía tiene unas velocidades de transferencia muy lentas. La velocidad de carga y descarga está fuertemente ligada al éxito de IOTA implantando sharding y escalando su red.

