---
title: Qué es un Wallet de criptomonedas
tags:
- altcoins
- bitcoin
layout: post
description: Guía de las mejores wallets de bitcoin y criptomonedas. Qué es un wallet, una cartera de criptomonedas.
banner_image: 202206/wallet.webp
rating: 5
TotalVotes: 4
ref: ledger-nano
lang: es
popular: true
---


## ¿ Qué es un <span class="highlight-title">wallet</span> ?

Un wallet, también llamado cartera criptográfica, puede ser un dispositivo físico (hardware) o un programa infórmatico que equivale a un banco pero sin intermidiarios, directamente controlado por el usuario. Con un wallet, cualquier usuario puede hacer operaciones como enviar, recibir o sencillamente almacenar fondos (criptodivisas) sin necesidad de que una entidad externa le de permiso para hacerlo, o le pueda bloquear la cuenta cuando lo vea adecuado..


Una concepción errónea habitual es que los wallets no almacenan las criptomonedas del usuario, si no las claves privadas que permiten al usuario acceder a ellos. **Las criptomonedas como Bitcoin únicamente existen en el Blockchain y no pueden ser retiradas de allí**.

Existen cuatro tipos de wallets y la pregunta sobre cual es mejor depende exclusivamente del uso que se le quiera dar.

## ¿ Qué es una <span class="highlight-title">clave privada</span> ?

> Si no controlas la clave privada de tu wallet no son tus criptomonedas. <cite>― Andreas Antonopoulos</cite>

Tu wallet de criptomonedas es una combinación de claves públicas y claves privadas. A la clave pública se la considera la dirección que un usuario puede compartir para que los demás le envien fondos, y la clave privada es la contraseña para acceder a ese wallet y poder realizar operaciones dentro de él.

Todas las direcciónes públicas tienen una dirección privada vinculante relacionadas matemáticamente. Todas las claves privadas son capaces de generar una clave pública pero no se puede decir lo mismo del caso contrario, lo cual es clave para que el sistema funcione. Todas las claves privadas tienen 256 bits y tienen este aspecto y siempre empiezan con un 5:

`5KUR9tz4iDTpW2xQkNvJDKyGHYWT9q8LriTLH29Tv8Thiyqvy9A`.

Las claves privadas deben mantenerse en secreto ya que de perderlas el usuario perdería el acceso a sus criptomonedas. Del mismo modo, si una segunda persona consiguiera acceso a una clave privada, podría mover los fondos a un wallet que solo ella controle (sería equivalente a realizar una transferencia bancaria irreversible).

## ¿ Qué es una <span class="highlight-title">clave pública</span> ?

Una clave pública actua como dirección del wallet y puede ser compartida libremente con la persona de la cual se esperen pagos.

Una clave pública tiene 160bits, suele empezar con un `1` o con un `3` y tiene este aspecto:

`154VdhSPwk2xo9YVWn5SHS47LoH8dL5mQh`

Las claves públicas que empiean con un `3` suelen ser porque son direcciones Segwit o Multi-firma, y se consideran igual de válidas.

Compartir una clave pública sería equivalente a compartir un IBAN o un número de cuenta bancario. Compartirla nunca pondrá en riesgo los fondos que existan en la cartera y de hecho es la única manera de recibir fondos.

## ¿ Qué es un <span class="highlight-title">Seed</span> ?

Ya lo vimos en [Qué es un frase mnemónica](/que-es-frase-mnemonica/) pero en resumen es una combinación de 12 o 24 palabras aleatorias que se utilizan para recuperar el acceso de tu wallet en el caso en que este se pierda.

Un ejemplo de un seed podría ser este:

`monitor umbrella replace fold autumn top until six glad lazy vocal buyer evolve coconut near brisk broccoli symbol nation debris blast undo prepare mom`

La diferencia principal entre un seed y una clave privada, es que el seed puede ser utilizado para generar infinitas combinaciones de claves públicas / privadas para diferentes criptomonedas, por lo que lo general es que al crear un wallet es más práctico pedir al usuario que recuerde un seed que múltiples claves privadas.

Si restauramos un wallet a través del seed, recuperarmos el control de todos las criptodivisas que tuvieramos dentro.

Resulta una buena práctica no almacenar nunca el seed en un dispositivo conectado a Internet, ya que en general todos los dispositivos son vulnerables a hackeos y la pérdida en el mundo de las criptomonedas es irreversible.

El seed debería guardarse en un lugar seguro, protegido del fuego, el agua o cualquier otro daño físico, por lo que un papel tampoco resulta recomendable.

{% include image_caption.html imageurl="https://99bitcoins.com/wp-content/uploads/2016/05/crypto-steel.jpg" title="El seed se guarda en metálico y nunca entra en internet" caption="El seed se guarda en metálico y nunca entra en internet" popup=true class="small-size" %}

Empresas como <a rel="nofollow" href="https://amzn.to/3PZwXLo">Cryptosteel</a> ó <a rel="nofollow" href="https://amzn.to/3m2O40T">Billfodl</a> ofrecen placas de metal indestructribles donde el usuario puede escribir su seed y protegerlo de factores externos, aunque es imposible poder almacenar la placa después en un lugar en el cual no pueda ser robado.

<div class="product-grid">
	{% include thumbnail.html 
		title="Cryptosteel"
		href="https://amzn.to/3GWuxbW"
		imageurl="/images/posts/202206/cryptosteel.webp"
		backgroundColor="#FFBCBC"
		imagecta="/images/posts/202206/cryptosteel-logo-white-1.webp"
		badge="139.99€"
	%}

	{% include thumbnail.html 
		title="Billfodl "
		href="https://amzn.to/3xmm2E3"
		imageurl="/images/posts/202206/billfodl.webp"
		backgroundColor="#F3F0D7"
		imagecta="/images/posts/202206/billfodl-logo.webp"
		badge="85€"
	%}
</div>


## <span class="highlight-title">Tipos</span> de wallets

### <span class="highlight-title">Hardware</span> Wallet

Un hardware wallet es un disposítivo físico parecido a un stick USB que se encarga de almacenar las claves privadas sin jamás conectarse a internet. Es por ello que a este tipo de wallet se le suele caracterizar como de *Cold Storage*, o almacenaje frío.

Un hardware wallet permite al usuario que siga realizando operaciones de envío y recepción sin nunca poner en riesgo los fondos.

Los harware wallets disponen de botones físicos para que el usuario siempre confirme las transacciones manualmente.

{% include image_caption.html imageurl="/images/posts/202206/confirm-transaction.gif" title="Confirmar una transacción requiere de apretar un botón físico" caption="Confirmar una transacción requiere de apretar un botón físico" popup=true class="small-size" %}

Al inicializar un hardware wallet por primera vez al usuario se le darán dos contraseñas:

- El seed, qué será generado en el momento de manera aleatoria, para que el usuario lo apunte y lo mantenga un lugar seguro. 
- Un PIN a elegir por el usuario, que utilizará cada vez que quiera operar con el hardware wallet.

Así como el seed solo se utilizaría en casos extremos de pérdida o robo, el PIN se utilizará constantemente cada vez que se quiera acceder al wallet.

La serie de hardware wallets más extendidos son los **Ledger Nano** y podemos encontrar los siguientes modelos. Todos ellos aceptan múltiples divisas pero algunas funcionalidades sólo existen en los modelos más premium, como soporte bluetooth o más espacio de almacenamiento si queremos tener una gran cantidad de wallets distintos a la vez en el mismo dispositivo (para el caso en que manejemos muchas divisas).

<div class="product-grid">
	{% include thumbnail.html 
		title="Nano X"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-x.webp"
		backgroundColor="#AD8B73"
		imagecta="/images/pages/ledger-logo.svg"
		badge="149€"
	%}

	{% include thumbnail.html
		title="Nano S Plus"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-sp.webp"
		backgroundColor="#68A7AD"
		caption="Recomendado"
		imagecta="/images/pages/ledger-logo.svg"
		badge="79€"
	%}

	{% include thumbnail.html
		title="Nano S"
		href="https://shop.ledger.com?r=7454342c96fc"
		imageurl="/images/posts/202206/nano-s.webp"
		backgroundColor="#C2DED1"
		imagecta="/images/pages/ledger-logo.svg"
		badge="59€"
	%}
</div>

#### Qué pasa si <span class="highlight-title">pierdo un hardware wallet</span> ?

Si el usuario pierde su hardware wallet o este queda dañado las criptomonedas siguen a salvo siempre y cuando el usuario haya guardado de manera segura su Seed para poder restaurar su cuenta en otro hardware wallet nuevo.

El ladrón que haya adquirido el hardware wallet ajeno no podrá hacer uso de él al no ser que sepa la contraseña PIN. Si introduce el PIN incorrectamente varias veces el dispositivo se acabará bloqueando, para que no se intente forzar con fuerza bruta.

Si el ladrón en cambio consiguiera el seed, ni siquiera necesitaría el hardware wallet original para obtener el control de las criptomonedas, ya que podría restaurar la cuenta de su víctima en otro dispositivo nuevo.

En general un hardware wallet es la mejor manera de mantener los fondos de manera segura y poder operar de vez en cuando con ellos de manera ocasional sin quebaderos de cabeza.

## <span class="highlight-title">Hot</span> wallet

Para aquellos usuarios que hagan movimientos con mucha frecuencia, tener que conectar el hardware wallet a un ordenador puede no ser la mejor opción.

Por ejemplo, si deseamos hacer pagos en el día a día, como comprar un café, resulta mucho más práctico y ágil tener algunos fondos en una cartera caliente (hot wallet) puesto que las transacciones se harán de manera instantánea.

Un hot wallet es más vulnerable a posibles ataques cibernéticos, por ello el usuario debería asegurarse de no tener cantidades importantes de criptomonedas dentro y limitarse a un balance que soporte sus gastos del día a día.

Existen dos tipos de carteras calientes:

### Carteras de <span class="highlight-title">Custodia</span>

Las carteras de custodia no deberían ni de considerarse carteras, puesto que básicamente una entidad guarda las claves privadas en nombre del usuario. El mejor ejemplo de una cartera de no custodia son los exchanges en sí, como Binance o Coinbase. 

El usuario puede tener criptomonedas en Coinbase, pero únicamente tiene acceso a su cuenta de Coinbase, la cual podría ser bloqueada por la empresa si así lo quisieran. También se ha dado el caso de hackeos de Exchanges que los han drenado de criptomonedas por agujeros de seguridad de los cuales el usuario no tiene ninguna culpa pero acaba pagando igual.

### Carteras de <span class="highlight-title">No Custodia</span>

Las carteras de no custodia si que comparten el seed con el usuario. Pueden ser aplicaciones de móvil o de Windows / OSX. El problema de estas carteras es que estan conectadas a internet con los riesgos que eso conlleva.