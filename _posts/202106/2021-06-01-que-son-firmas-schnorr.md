---
title: Qué son las firmas Schnorr
tags:
- bitcoin
layout: post
description: Ventajas de las firmas schnorr vs firmas ECDSA
banner_image: 202106/schnorr.webp
rating: 5
TotalVotes: 16
---

Las firmas schnorr fueron desarrolladas por Claus Schnoor, un criptógrafo y matemático alemán que decidió protegerlas mediante una patente durante muchos años y que finalmente expiró en 2008 (meses antes del whitepaper de Bitcoin). Entre otros beneficios las firmas schnorr destacan por su simplicidad y eficiencia.

<!--more-->

## Qué son las firmas digitales

Una firma digital es una manera de demostrar matemáticamente que un mensaje está enviado por el autor del mensaje.

La magia de las firmas digitales es que, al contrario de las firmas de lápiz y papel, éstas no pueden ser falsificadas ni aunque tuvieras cientos de miles de años a tu disposición.

> Bitcoin originalmente utiliza el algoritmo de firmas ECDSA.

La tecnología de firmas que decidió utilizar Satoshi Nakamoto fue ECDSA (Elliptic Curve Digital Signature Algorithm). Su decisión probablemente vino impulsada por que eran bastante bien conocidas, entendidas, seguras y sobretodo de código abierto.

El algoritmo ECDSA es precisamente lo que permite generar una clave pública a partir de una clave privada (y no al revés), que es una de las piezas clave del funcionamiento de Bitcoin ya que permite que existan wallets y que un usuario pueda enviar fondos a otro mediante su firma digital.

De esta manera es totalmente seguro compartir una clave pública con el mundo, y jamás se podrán gastar fondos de un wallet ajeno al no ser que se consiga firmar la transacción con la firma digital que solo la clave privada puede realizar.

## Schnorr

El algoritmo de Schnorr (SDSS) no es más que una manera distinta de realizar firmas digitales, y aunque hace el mismo papel también introduce ciertas ventajas lo que hace que mucha gente se pregunte porque Satoshi Nakamoto no lo introdujo desde el principio.

### Ventajas de las firmas Schnorr

Las firmas Schnorr son más simples y lineales que ECDSA. En consecuencia se consideran más seguras. En términos de Bitcoin esto significa que se podrá simplificar enormemente la manera en que actualmente se realizan operaciones multisig.

Las operaciones Multisig son aquellas transacciones que necesitan de varias personas que cada una firme con su propia clave privada para poder realizarse. Se trata de un mecanismo que a medida que más grandes corporaciones y otras entidades vayan sumando Bitcoin a sus cofres, esperamos ver más a menudo.

Estas operaciones son costosas en cuanto a comisiones y no proveen mucha privacidad. Schnorr podría mejorar ambos ámbitos agregando todas las firmas de los firmantes en una única firma. Gracias a esto:
- Se abarata la transacción en cuanto a comisiones.
- Se hace más complicado que un observador externo entienda qué usuarios han firmado la transacción, de hecho le será complicado incluso saber que la transacción corresponde a un multisig, a diferencia de ahora donde todas las direcciones multisig empiezan por 3.

In addition, the combined signatures make it a lot more difficult for an observer to determine who signed (or didn’t sign) a transaction.

## Conclusión

Las firmas schnorr son una gran mejora que se podrá introducir mediante un soft-fork retro-compatible. Una vez instauradas, se puede considerar un paso más hacia mejoras futuras como Taproot, atomic swaps y la Lightning Network.

