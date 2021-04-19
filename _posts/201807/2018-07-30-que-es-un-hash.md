---
title: Qué es un Hash
date: 2018-07-30 00:00:00 Z
tags:
- tecnologia
layout: post
description: Explicación de qué es un hash, que es el cifrado y cómo se utilizan en
  las redes de criptomonedas.
banner_image: 201807/hashing.png
rating: 5
totalVotes: 9
---

Con frecuencia hablamos en este mundo de hashes y cifrados asimétricos, por lo que es importante tener claro estos conceptos que tanto uso se le dan en el mundo de las criptomonedas.

<!--more-->

## Hashes

Un hash no es más que un conjunto de caracteres alfanumérico generado a partir de un texto plano. Suelen tener una longitud finita y se caracterizan por ser irreversibles y determinísticos.

La función de hash más conocida es MD5 y siempre que se aplique sobre un texto se obtendrá el mismo hash, veamos algunos ejemplos:

{:.table.table-striped.table-bordered.table-hover.table-condensed}
| Texto sobre el cual aplicar función de hashing MD5          | Hash Resultante                     |
|:------------------------------------------------------------|:-----------------------------------:|
| hola                                                        | `4d186321c1a7f0f354b297e8914ab240`  |
| hola-                                                       | `268801f78ba900ecb415989f7400b5c5`  |
| esto es una prueba de creación de hashes mediante md5       | `f52622c801f9c065237f81b253ba02e4`

Se puede observar como cualquier cambio en el texto original, por pequeño que sea, genera un resultado totalmente distinto e independientemente del tamaño del texto, el resultado siempre tendrá una longitud de 32 caracteres.

Cuando dos textos planos tienen el mismo hash se dice que se ha producido una colisión, no obstante los algoritmos de hasheado aseguran que en la práctica, jamás encontrarás dos textos que produzcan el mismo hash, a pesar de que los resultados siempre tienen 32 caracteres y el origen puede tener cualquier longitud posible.

Obviamente esto es teóricamente imposible, puesto que con sólo 32 caracteres, existen un número limitado de combinaciones que se pueden generar, mientras que los posibles textos que pueden ser hasheados son infinitos lo cual implicaría que existen infinitas colisiones para cada hash. La realidad es que la probabilidad de encontrar una colisión es tan insignificante que se considera totalmente nula y por eso se utiliza sin miedo.

Diferentes criptomonedas utilizan distintas funciones de hashing, Bitcoin por ejemplo utiliza sha256 que ha demostrado ser bastante segura. MD5 en cambio resulta una función de hashing vulnerable y no debería ser utilizada para fines que requieran cierta seguridad.

Una función de hashing segura permite asegurar la integridad de la información a modo de un checksum: Es posible verificar que un mensaje y un hash pertenecen el uno al otro como ya se explicó en la solución al [Problema de los Generales Bizantinos](/problema-generales-bizantinos/).

{% include image_caption.html imageurl="/images/posts/201807/hashing-vs-encryption.png" title="Hashing vs Cifrado" caption="El cifrado es reversible si tienes la clave correcta mientras que el hashing es irreversible" popup=true %}

## Cifrado

El cifrado o la encriptación se diferencia del hashing principalmente en que es bidireccional. Es decir, si se tiene la clave privada, es posible recuperar los datos originales a partir de un texto cifrado.

Existen diferentes tipos de cifrado:

### Simétrico
Utiliza la misma clave para cifrar y para descifrar el mensaje. Esta clave debe ser conocida tanto por el emisor como por el receptor.

### Asimétrico
En el cifrado asimétrico existen dos claves relacionadas entre sí, una se denomina *clave privada* y se debe mantener en secreto. La otra es la *clave pública* y puede ser publicada sin problemas.

Dos de las principales funcionalidades que tiene el uso de este par de claves es:

- **Cifrado con Clave Pública**: Un mensaje puede ser cifrado con una clave pública, y únicamente el poseedor de la clave privada asociada podrá descifrarlo.
- **Firmas Digitales**: Un mensaje es firmado utilizando una clave privada, y todos aquellos que reciban la clave pública podrán verificar su autenticidad.

{% include image_caption.html imageurl="/images/posts/201807/signature.png" title="Firmas Digitales" caption="Si enviamos un mensaje, podemos realizar el hash del mismo y cifrarlo con una clave privada. Cualquier receptor puede después comparar el hash del documento original con el hash obtenido al descifrar con la clave pública del emisor. Si coinciden el mensaje es válido." popup=true %}

El comportamiento mostrado en la imagen sería:

El emisor está generando lo siguiente:
- El documento
- Un hash del documento, llamémosle A (esto lo puede generar cualquier persona que tenga el documento puesto que no requiere claves privadas/públicas)
- El mismo hash del documento pero cifrado con su clave privada. Llamémosle B=F(A). Esto es lo que se llama firma digital.

El receptor, recibe:
- El documento
- La Firma digital B=F(A)

El receptor entonces genera:
- Un hash del documento, que coincide con A, puesto que tanto el emisor como el receptor han cogido el mismo documento y han generado un hash con la misma fórmula.
- Con la clave pública descifra la firma digital, haciendo que F(B)=A.

Si ambos resultados coinciden , se puede decir que el documento y la firma proceden de la misma persona que facilitó la clave pública al receptor.

