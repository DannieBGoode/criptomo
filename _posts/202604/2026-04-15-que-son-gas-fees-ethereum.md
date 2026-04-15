---
title: "Qué son las Gas Fees de Ethereum y cómo reducirlas"
tags:
  - ethereum
  - altcoins
layout: post
description: "Aprende qué son las gas fees (comisiones de gas) de Ethereum, por qué existen, cómo se calculan y consejos prácticos para pagar menos en cada transacción."
banner_image: 202604/gas-fees-ethereum.webp
banner_image_alt: "Explicación visual de las gas fees de Ethereum"
lang: es
ref: gas-fees-ethereum
faq:
  - question: "¿Qué son las gas fees de Ethereum?"
    answer: "Las gas fees son las comisiones que los usuarios pagan para ejecutar transacciones o interactuar con contratos inteligentes en la red Ethereum. Se pagan en ETH y compensan a los validadores que procesan y verifican las transacciones."
  - question: "¿Por qué las gas fees de Ethereum son tan caras?"
    answer: "Las gas fees aumentan cuando hay mucha demanda en la red. Ethereum tiene capacidad limitada por bloque, así que cuando muchos usuarios quieren hacer transacciones al mismo tiempo, compiten ofreciendo comisiones más altas para que los validadores prioricen sus operaciones."
  - question: "¿Cómo puedo reducir las gas fees de Ethereum?"
    answer: "Puedes reducirlas operando en horarios de menor actividad (noches y fines de semana UTC), usando redes de capa 2 como Arbitrum u Optimism, ajustando manualmente el límite de gas en tu wallet, o agrupando varias operaciones en una sola transacción."
  - question: "¿Cuánto cuestan las gas fees de Ethereum en 2026?"
    answer: "En 2026, tras las mejoras de Dencun y Pectra, las gas fees en la red principal de Ethereum oscilan entre 1 y 20 gwei para transacciones estándar. En redes de capa 2, las comisiones suelen ser inferiores a 0,01 USD."
  - question: "¿Qué es gwei y cómo se relaciona con las gas fees?"
    answer: "Gwei es una unidad de Ether (1 gwei = 0,000000001 ETH). Las gas fees se expresan en gwei por unidad de gas. Una transacción simple de ETH consume 21.000 unidades de gas, así que a 10 gwei el coste sería 0,00021 ETH."
---

Si alguna vez has enviado Ethereum o interactuado con una aplicación DeFi, habrás visto que cada operación tiene un coste: las **gas fees** (comisiones de gas). Entender qué son y cómo funcionan es fundamental para no pagar de más y usar la red de forma eficiente.

<!--more-->

## Qué es el gas en Ethereum

En Ethereum, el **gas** es la unidad que mide el esfuerzo computacional necesario para ejecutar una operación en la red. Cada acción — desde enviar ETH a otra dirección hasta intercambiar tokens en [Uniswap](/que-es-uniswap/) o acuñar un NFT — requiere una cantidad específica de gas.

El gas no es una criptomoneda en sí misma, sino una medida interna. Lo que sí se paga es el **precio del gas**, expresado en **gwei** (una fracción de ETH: 1 gwei = 0,000000001 ETH).

La fórmula básica es:

> **Coste de la transacción = Unidades de gas consumidas × Precio por unidad de gas**

Por ejemplo, una transferencia simple de ETH consume 21.000 unidades de gas. Si el precio del gas es de 10 gwei, el coste sería:

- 21.000 × 10 gwei = 210.000 gwei = 0,00021 ETH

## Cómo funcionan las gas fees desde EIP-1559

Desde agosto de 2021, con la actualización [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), Ethereum cambió radicalmente el modelo de comisiones. Ahora cada transacción tiene dos componentes:

### Base fee (tarifa base)

Es el precio mínimo por unidad de gas que la red exige para incluir tu transacción en un bloque. Se ajusta automáticamente según la congestión: si los bloques están llenos, sube; si están vacíos, baja. La **base fee se quema** — se destruye y no va a ningún validador.

### Priority tip (propina de prioridad)

Es un pago adicional opcional que va directamente a los validadores. Cuanto mayor sea tu propina, más probable es que tu transacción sea procesada rápidamente. En momentos de alta congestión, una propina más generosa marca la diferencia.

La fórmula completa es:

> **Coste total = Unidades de gas × (Base fee + Priority tip)**

## Por qué varían tanto las gas fees

Las gas fees de Ethereum pueden ir desde céntimos hasta decenas de euros por una misma operación. Los principales factores son:

### Congestión de la red

Ethereum procesa un número limitado de transacciones por bloque. Cuando hay mucha demanda — por ejemplo, durante el lanzamiento de un token popular, un airdrop masivo o una caída brusca del mercado — los usuarios compiten por el espacio en el bloque ofreciendo comisiones más altas.

### Complejidad de la operación

No todas las transacciones cuestan lo mismo:

| Tipo de operación | Gas aproximado | Coste típico (10 gwei) |
|---|---|---|
| Enviar ETH | 21.000 | 0,00021 ETH |
| Enviar un token ERC-20 | 65.000 | 0,00065 ETH |
| Swap en Uniswap | 150.000 | 0,0015 ETH |
| Acuñar un NFT | 200.000+ | 0,002+ ETH |
| Interacción DeFi compleja | 300.000+ | 0,003+ ETH |

Cuanto más compleja sea la lógica del contrato inteligente, más gas consume.

### Precio del ETH

Aunque las gas fees se miden en gwei, el coste real en euros depende del precio del ETH. Con gas a 10 gwei, una transferencia cuesta 0,00021 ETH — pero eso son ~0,35€ con ETH a 1.700€ o ~0,53€ con ETH a 2.500€.

## Cómo ahorrar en gas fees

### 1. Opera en horarios de baja congestión

La red Ethereum tiene patrones predecibles de actividad. Los momentos de menor congestión suelen ser:
- **Noches UTC** (madrugada en Europa, tarde-noche en América)
- **Fines de semana**, especialmente domingos

Puedes consultar el precio actual del gas en tiempo real en sitios como [Etherscan Gas Tracker](https://etherscan.io/gastracker).

### 2. Usa redes de capa 2

Las **redes de capa 2** (Layer 2) procesan transacciones fuera de la cadena principal de Ethereum y luego liquidan los resultados en ella. Las más populares son:

- **Arbitrum** — la L2 más usada, con comisiones por debajo de 0,01 USD
- **Optimism** — similar a Arbitrum, con un ecosistema DeFi completo
- **Base** — creada por Coinbase, muy económica y creciendo rápido
- **zkSync** — usa pruebas de conocimiento cero para mayor seguridad

Desde la actualización **Dencun** (marzo 2024) y posteriormente **Pectra** (2025), las gas fees en L2 se redujeron drásticamente gracias a los "blobs" de datos, que permiten publicar datos en Ethereum de forma mucho más barata.

### 3. Ajusta el gas manualmente

La mayoría de wallets como [MetaMask](/que-es-metamask/) permiten ajustar el gas manualmente. Si no tienes prisa, puedes:
- Reducir la **propina de prioridad** al mínimo
- Establecer un **max fee** (tarifa máxima) que estés dispuesto a pagar
- La transacción se ejecutará cuando la base fee baje hasta tu límite

### 4. Agrupa operaciones

Algunos protocolos DeFi permiten agrupar varias acciones en una sola transacción (batching). Por ejemplo, en lugar de hacer tres aprobaciones y tres swaps por separado, algunos agregadores como [1inch](https://1inch.io/) combinan todo en una transacción.

### 5. Usa tokens y contratos optimizados

Los contratos inteligentes más modernos están optimizados para consumir menos gas. Los tokens [ERC-20](/que-es-erc20/) más recientes suelen ser más eficientes que los de primera generación.

## Gas fees en otras blockchains

Es útil comparar las gas fees de Ethereum con las de otras redes:

| Blockchain | Coste medio por transacción | Velocidad |
|---|---|---|
| Ethereum (L1) | 0,50–5,00 USD | ~12 segundos |
| Arbitrum / Optimism | < 0,01 USD | ~1 segundo |
| Solana | < 0,01 USD | ~0,4 segundos |
| Polygon PoS | < 0,01 USD | ~2 segundos |
| [Bitcoin](/que-es-bitcoin/) | 0,50–3,00 USD | ~10 minutos |

La ventaja de Ethereum frente a alternativas más baratas es su **seguridad y descentralización**. Las redes de capa 2 ofrecen lo mejor de ambos mundos: comisiones bajas con la seguridad heredada de Ethereum.

## El futuro de las gas fees

Ethereum sigue trabajando activamente en reducir las comisiones:

- **Danksharding** (futuro) ampliará enormemente la capacidad de datos, reduciendo aún más los costes en L2
- **Account abstraction** (ERC-4337) permitirá que las aplicaciones paguen el gas por sus usuarios, eliminando la barrera de entrada
- La tendencia general es que la actividad del usuario migre a **redes de capa 2**, dejando la capa 1 como capa de liquidación segura

## Conclusión

Las gas fees son el coste de usar la red más descentralizada y segura del ecosistema cripto. Aunque pueden parecer elevadas en momentos de congestión, herramientas como las redes de capa 2, la elección del momento adecuado y el ajuste manual del gas permiten reducirlas significativamente. Con cada actualización, Ethereum avanza hacia un modelo donde las comisiones dejen de ser una barrera para el usuario medio.
