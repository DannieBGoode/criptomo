---
title: Qué podemos esperar de Ethereum 2.0
date: 2020-09-24 00:00:00 Z
tags:
- ethereum
- altcoins
layout: post
description: Qué novedades trae Ethereum 2.0, Proof of Stake y otras novedades.
banner_image: 202009/eth2.webp
rating: 5
totalVotes: 11
lang: es
ref: new-eth2
---

Ethereum 2.0 es una revisión completa del Ethereum actual (1.0) creado por los mismos creadores con la intención de reemplazar a Ethereum 1.0 totalmente.

<!--more-->

Su lanzamiento final se prevee en algún momento entre los años 2021 y 2022, aunque actualmente la fase 0 se encuentra en test net para pruebas y la gente es libre de participar si así lo desea.

En lugar de hacer transformaciones pequeñas poco a poco en Ethereum 1.0 se ha decidido hacerlo todo de golpe empezando desde cero para poder realizar los cambios mucho más eficientemente sin estar sujeto a las limitaciones de la primera versión o tener que pensar fases intermedias para acomodar una transición por pasos.

Entre los principales cambios que esta nueva versión ofrecerá se encuentran:

### Algoritmo de consenso Proof of Stake
Ethereum dejará de utilizar [Proof of Work](/que-es-proof-of-work) y cambiará a [Proof of Stake](/proof-of-work-vs-proof-of-stake/) lo que significará un ahorro de energía para asegurar la red significante.

### Sharding
El método de sharding permitirá dejar de utilizar una sola blockchain y contar en su lugar con hasta 64 distintas cadenas paralelas, que permitirán a la red escalar mejor. Estas 64 cadenas convergen en una cadena central denominada cadena Beacon.

La cadena Beacon no almacena ninguna transacción ni información, sino que es actúa como base del sistema PoS manteniendo el registro de los validadores.


### Validadores

Los validadores son aquellas personas que stakean un mínimo de 32 ETH y en consecuencia se les permite validar bloques a cambio de recompensas del 2-18% al año de su stake.

Si un validador valida incorrectamente (o maliciosamente) un bloque será penalizado con hasta el 100% de su stake. Los validadores también serán penalizados por no estar online cuando les toque validar (por lo que estar siempre online es un requisito de validación). Conforme un validador es penalizado, si su stake cae por debajo de los 16 ethers será expulsado de los grupos de validación.

El Beacon chain elige a los validadores de manera aleatoria mediante los algoritmos RANDAO y VDF. Se elegirán validadores entre los de manera aleatoria y se les dará la oportunidad de validar un bloque. Si lo validan correctamente recibirán la recompensa.

## Testnet

Ahora mismo nos encontramos en la fase 0 en la que el beacon chain ya está lanzado.

En la fase 1 se introducirán los shards y el cambio de PoW a PoS.

En la fase 2 se incorporarán todos los Ethers de ETH1.0 a ETH2.0 copiando su estado. **Los usuarios no tendrán que realizar ninguna acción para que sus fondos sean traspasados de ETH1.0 a ETH2.0**.



Si esta implementación acaba teniendo éxito significaría unos grandes avances en Proof of Stake y los algoritmos de consensos en general. Recordemos que Proof of Stake sigue sin estar testeado a una escala tan grande como la que le ofrece Ethereum por lo que toda la plataforma debería considerarse un experimento con los riesgos que eso conlleva.