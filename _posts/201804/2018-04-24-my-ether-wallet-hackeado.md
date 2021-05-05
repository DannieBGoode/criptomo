---
title: My Ether Wallet hackeado
date: 2018-04-24 08:08:39 Z
tags:
- noticias
layout: post
description: My Ether Wallt hackeado 2018.
banner_image: 201804/mew.jpg
---

El wallet por excelencia de Ethereum y tokens ERC20 MyEtherWallet (MEW) ha sido hackeado esta tarde lo que ha ocasionado en apenas media hora una pérdida de fondos de usuarios por un valor aproximado de medio millón de dólares.

<!--more-->

Una de las diferentes maneras de utilizar MEW es directamente introduciendo la clave privada que controla tus fondos en su interfaz web, algo [que hemos recomendado NO hacer en varias ocasiones](/como-guardar-criptomonedas/). Aproximadamente a las 12PM UTC los usuarios que entraron a MEW pudieron ver la siguiente imagen advirtiendo que el sitio no era seguro:

{% include image_caption.html imageurl="/images/posts/201804/not-secure.png" caption="Google advierte de cuando un protocolo HTTPS ha sido vulnerado" popup=true %}

Esto era debido a que unos hackers, a pesar de no haber podido vulnerar a MEW en sí, si consiguieron hackear los servidores de DNS de los que hacía uso MEW redirigiendo a todos los usuarios que accedían a la web a otra página aparentemente idéntica a MEW pero controlada por ellos. En cuanto los usuarios introducían sus claves privadas, los hackers automáticamente movían todos los fondos que encontrasen a cuentas en su posesión. Debido a que todas las operaciones ejecutadas en el blockchain son irreversibles es muy poco probable que los usuarios recuperen jamás sus fondos.

{% include tweet.html href="https://twitter.com/myetherwallet/status/988830652526092288" caption="Los DNS de Google han sido hackeados hoy a las 12PM UTC por lo que los usuarios de MEW eran redireccionados a una página web maligna. Esta técnica de hackeo tiene más de una década de edad y pretende atacar al sistema de rutas de Google" %}

Debido a la naturaleza del blockchain, nos es posible seguir el rastro de todas las transacciones realizadas por los hackers, concretamente en esta <a rel="nofollow" href="https://etherscan.io/address/0x1d50588c0aa11959a5c28831ce3dc5f1d3120d29">enlace</a> podemos ver una de las cuentas del hacker donde consiguió reunir un total de 215 Ether, por un valor de $150,500 y esta <a rel="nofollow" href="https://etherscan.io/address/0xf203a3b241decafd4bdebbb557070db337d0ad27">otra</a> donde llegó a recibir 308 Ether ($215,600). Si seguimos el rastro de las transacciones podemos ver que finalmente acaban todas en la dirección <a rel="nofollow" href="https://etherscan.io/address/0xb3aaaae47070264f3595c5032ee94b620a583a39">0xb3aaaae47070264f3595c5032ee94b620a583a39</a> que posee 17 millones de dólares en Ethereum. Ahora bien, esta última dirección tiene más de 265 mil transacciones realizadas por lo que es normal pensar que se trate de un Exchange o alguna otra entidad parecida. Lo normal es asumir que los hackers están intentando vender los Ethers adquiridos por fiat.

Ahora bien, cualquier exchange bien valorado requiere un proceso de KYC (Know Your Client) dónde los usuarios debemos verificarnos de varias maneras para evitar situaciones como ésta, por lo que es complicado que los hackers lleguen a pasar su dinero al sistema bancario tradicional. Por otro lado, ciertas criptomonedas como [Monero](/que-es-monero/) se consideran totalmente fungibles en el sentido en que no se le puede seguir el rastro a las monedas y por tanto, si los criminales llegan a intercambiar unas divisas por otras, podrían llegar a salirse con la suya.

### Qué podría haber hecho MEW

Aunque es fácil señalar con el dedo a MEW, la realidad es que poco podría haber hecho salvo tal vez, como sugiere un usuario, encargarse de sus propias DNS, algo que muy pocas empresas hacen.

{% include tweet.html href="https://twitter.com/hannahmontaanaa/status/988788676883767296/photo/1" caption="Un usuario le echa en cara a MEW no hacerle caso a Blue Protocol unos meses antes y utilizar sus propios DNS" %}

### Qué podemos hacer nosotros

**NUNCA debemos introducir nuestro seed ni nuestra clave privada en páginas webs.** Usar HARDWARE wallets es la solución más sencilla y segura que podemos hacer para cubrirnos puesto que nuestras claves privadas residen dentro del dispositivo físico. Las principales hardware wallets que existen en el mercado [las hemos cubierto en un artículo anterior](/como-guardar-criptomonedas), pero si necesitáis un recordatorio son:

* <a rel="nofollow" href="http://amzn.to/2i5kRoG">Ledger Nano S</a>
* <a rel="nofollow" href="http://amzn.to/2i72hMV">Trezor</a>
* <a rel="nofollow" href="http://amzn.to/2ja1KHf">KeepKey</a>

Otra solución que el equipo de MEW sugiere es que utilicemos la versión offline de MEW. MEW es una página web que podemos descargar fácilmente y de esa manera nos aseguramos que estamos ejecutando el código correcto.

Por último debemos desconfiar de cualquier página que no utilice HTTPS y no esté autorizada con el icono verde del candado, puesto que si aparece en rojo existe la posibilidad de que la página haya sido vulnerada.

{% include image_caption.html imageurl="/images/posts/201804/https.png" caption="CRIPTOMO utiliza HTTPS" popup=true %}
