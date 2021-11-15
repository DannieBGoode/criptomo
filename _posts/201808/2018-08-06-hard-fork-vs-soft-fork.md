---
title: Hard Fork vs Soft Fork
date: 2018-08-06 00:00:00 Z
tags:
- tecnologia
layout: post
description: Qué es un Soft Fork? Qué es un Hard Fork? Explicaciones básicas y diferencias
  entre los dos.
banner_image: 201808/fork.jpg
rating: 5
totalVotes: 7
lang: es
---

El concepto de fork es algo que puede traer dolores de cabeza entenderlo, puesto que se usa a menudo para hablar del origen de criptomonedas nuevas, así como de actualizaciones de software. Veamos qué significa exactamente.

<!--more-->

## <a name="hardfork"></a> Hard Fork

Un hard fork se caracteriza principalmente por no ser retrocompatible. Para que sea exitoso, todos los usuarios deben actualizar su software o la red se divide. **El motivo principal por el que se genera un hard fork es por que se cambian las reglas de consenso de una criptomoneda**, lo cual a veces puede resultar obligatorio para hacer una actualización de software. De repente hay nodos en la red que ya no están de acuerdo con los bloques de la versión del blockchain que se generaban anteriormente y mientras haya mineros que minen con respecto a las nuevas reglas, se genera una nueva cadena de bloques con sus propias transacciones y totalmente independiente a la original.

Cuando un hard fork origina una moneda totalmente nueva con nuevas reglas de consenso, se espera que la gente deje de utilizar la moneda original y que quede olvidada. Para bien o pra mal esto no es siempre el caso, por ejemplo con [el hack del DAO](/que-es-ethereum#dao), se hizo un hard fork de la red de Ethereum donde se modificó el blockchain para que los inversores afectados por el hack recuperaran sus inversiones. Mucha gente, incluyendo los desarrolladores, se pasaron a la moneda nueva abandonando la versión antigua y llevándose consigo el nombre de Ethereum. La antigua red se pasó entonces a denominar Ethereum Classic y a día de hoy sigue siendo mantenida por otros desarrolladores distintos que no estuvieorn de acuerdo con el fork y cotiza en los mercados.

Por lo normal después de un hard fork, puesto que se replica la cadena de bloques, todos los que tenían monedas en la cadena original, pasan a tenerlas también en la nueva. Por ejemplo con el hard fork de Bitcoin Cash, todos los usuarios recibieron BCH en proporción `1:1` respecto a los BTCs que tenían en su posesión. Aún así, cada hardfork puede crear sus propias reglas de redistribución de tokens, pero siempre le interesará bonificar de alguna manera a los poseedores de la moneda original con el fin de que participen en la red y por tanto la nueva moneda tenga valor.

## <a name="softfork"></a> Soft Fork

Un Soft Fork en cambio es totalmente retrocompatible. Ocurre cuando se cambian las reglas de una criptomoneda sin modificar las normas de consenso de la red por lo que la red nunca se divide. Por ejemplo la actualización de BTC a *Segwit* fue un soft fork, esto significa que todas las wallets que no utilizan Segwit pueden seguir operando y transaccionando con usuarios que si actualizaron su software para habilitar transacciones Segwit (lo cual les permite costes de transacción más baratos).

Una de las cosas que más orgullosamente dicen los defensores de BTC, es que jamás se ha realizado un hard fork, sino que todas las actualizaciones que se han hecho sobre la red, incluyendo *Segwit* y *Lightning Network*, han sido soft forks lo cual es bastante complicado pero evita la amenaza de que se pueda dividir a la comunidad como ocurriría con un hard fork.

Cambiar las reglas de una criptomoneda mediante un hard fork es muchísimo más sencillo que con un soft fork, ya que permite reescribir cualquier parte del código. Bitcoin Cash ya ha realizado varios hard forks para actualizar su software desde su origen (que en sí fue otro hard fork), lo cual significa que hay varias versiones de BCH con reglas distintas, aunque sólo la última es mantenida por los desarrolladores e intercambiada en los exchanges o usada como medio de pago.

Ethereum ya ha realizado varios hard forks después del que lo originó separándolo de ETC, y para evitar más divisiones de la red ha tomado otra estrategia distinta: cada vez que se realiza un hard fork, se deja una bomba de dificultad en la cadena de bloques a abandonar, lo cual la hace imposible de minar con el paso de los meses haciendo que acabe muriendo por su propio peso. De esta manera obligan a todos los usuarios a pasarse siempre a la última versión, algo que no está muy bien visto entre aquellos que opinan que son los usuarios los que deberían decidir a qué versión apoyar según el valor que les ofrezca.

