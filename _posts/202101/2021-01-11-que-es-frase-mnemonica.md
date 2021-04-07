---
title: Qué es una frase mnemónica
date: 2021-01-11 00:00:00 Z
tags:
- bitcoin
layout: post
description: Qué es una frase mnemónica o un seed y cómo de seguro es
banner_image: 202101/mnemonic.webp
rating: 5
totalVotes: 9
---

Para entender el concepto de frase mnemónica o seed primero debemos entender la diferencia entre wallet de custodia y de no custodia.

<!--more-->

Un wallet de custodia es aquel en el que una empresa se encarga de almacenar nuestras claves privadas por nosotros. Esto significa que en realidad no poseemos nuestras criptomonedas si no que una empresa nos promete devolvernos nuestras criptomonedas cuando las pidamos exactamente igual que un banco que guarda nuestro dinero nos promete devolvernos nuestro dinero cuando lo requiramos.

En el mundo de las criptomonedas esto tiene un riesgo alto, ya que la plataforma en cuestión podría ser hackeada (como ya ocurrió con Mt.Gox) o desaparecer de un dia para otro.

Un wallet de no-custodia en cambio sería aquel en que el usuario es el único poseedor de sus claves, y perderlas podría significar la pérdida de sus criptomonedas de manera irreversible.

## Frase Mnemónica

A la hora de abrir un wallet de no-custodia por primera vez al usuario le será generado una frase mnemónica (o seed) que tiene una forma parecida a esta:

> monitor umbrella replace fold autumn top until six glad lazy vocal buyer evolve coconut near brisk broccoli symbol nation debris blast undo prepare mom

Se trata de un conjunto de 12-24 palabras en inglés que hacen de backup del wallet.

Cualquier persona que posea la frase podrá restaurar en cualquier ordenador o móvil el wallet de manera completa y acceder a todos sus fondos. Es por ello que es muy importante que guardemos nuestro seed de manera segura, pero también es el motivo por el cual una persona podría perder todas sus pertenencias y viajar al otro lado del mundo, pero mientras recuerda la frase podrá volver a obtener sus criptomonedas.

La frase mnemónica sigue el patrón especificado en la regla BIP39 (Bitcoin Improval Proposal-39) sugerida originalmente por Satoshi Labs.

## Seguridad de una frase mnemónica

Las 24 palabras son obtenida de un diccionario en inglés con 2048 palabras.

Por ejemplo la primera palabra de la lista es `Above` y la última es `Zebra`. Entre medio tenemos 2046 otras palabras.

Si consideramos que cada palabra es un número la frase mnemonica podría codificarse como 24 números seguidos (entre 1 y 2048).

De esta manera tenemos 2048 opciones para cada una de las 24 posiciones, lo que implica que la probabilidad de que alguien acierte el bakcup phrase es de 2048<sup>24</sup>, o en otras palabras 2<sup>264</sup> ó 2.9642775 * 10<sup>79</sup>.

Esto haría que acertar es equivalente a <a href="http://blogs.hoy.es/curiosidades-cientificas/2019/12/27/cuantos-atomos-universo/" rel="nofollow">acertar un átomo entre el universo observable</a>. A día de hoy, sin la existencia de ordenadores cuánticos podemos decir que BIP39 es totalmente seguro.

Si algún día, el protocolo BIP39 corriera peligro y todas los wallets fueran vulnerables, la comunidad siempre podría optar por un HARD FORK que hiciera los wallets a prueba de computación cuántica, aunque aún estamos muy lejos de tener que enfrentarnos a esa situación, por lo que arriesgarse a un fork que potencialmente podría dividir a la comunidad (como lo hizo el fork de Bitcoin Cash por ejemplo) no parece necesario.