---
title: "O que é um Token ERC-20: O Padrão Ethereum Explicado"
date: 2018-05-31 00:00:00 Z
last_modified_at: 2026-04-14 00:00:00 Z
tags:
- altcoins
- ethereum
- token
layout: post
description: "Descubra o que é um token ERC-20, como funciona este padrão Ethereum, os principais tokens ERC-20 em 2026 e como ele se diferencia do ERC-721 e do ERC-1155."
banner_image: 201805/erc20.png
lang: pt
ref: token-erc20
faq:
  - question: "O que é um token ERC-20?"
    answer: "Um token ERC-20 é um ativo digital criado na blockchain Ethereum que segue um conjunto padrão de regras (o padrão ERC-20). Isso garante que todos os tokens sejam compatíveis entre si, com carteiras e com exchanges, facilitando a sua integração no ecossistema."
  - question: "Quais são os tokens ERC-20 mais importantes?"
    answer: "Os tokens ERC-20 mais relevantes em 2026 incluem stablecoins como USDT e USDC, tokens DeFi como UNI (Uniswap) e LINK (Chainlink), e tokens ponte como WBTC (Wrapped Bitcoin). No total, centenas de milhares de contratos ERC-20 foram implantados na Ethereum."
  - question: "Qual é a diferença entre ERC-20 e ERC-721?"
    answer: "Os tokens ERC-20 são fungíveis: cada unidade é idêntica e intercambiável, como dinheiro. Os tokens ERC-721 (NFTs) são não fungíveis: cada um é único e insubstituível, ideal para arte digital ou colecionáveis. Existe também o padrão ERC-1155 que combina ambos os tipos num único contrato."
  - question: "Um token ERC-20 é o mesmo que uma criptomoeda?"
    answer: "Não exatamente. Uma criptomoeda como Bitcoin ou Ether tem a sua própria blockchain. Um token ERC-20 é construído sobre a blockchain Ethereum e depende dela para funcionar. As taxas de transação dos tokens ERC-20 são pagas em ETH."
  - question: "Para que servem os tokens ERC-20 na DeFi?"
    answer: "Na DeFi, os tokens ERC-20 são usados como stablecoins para pagamentos e poupança, como tokens de governança para votar em protocolos, como tokens de liquidez em exchanges descentralizadas e como garantia para empréstimos, entre outros usos."
---

Um token ERC-20 é um ativo digital criado na [blockchain Ethereum](/pt/o-que-e-ethereum/) que segue um conjunto comum de regras. Este padrão, proposto originalmente por Fabian Vogelsteller e Vitalik Buterin em 2015, tornou-se um pilar fundamental do ecossistema cripto: desde [stablecoins](/pt/o-que-sao-stablecoins/) até tokens de governança [DeFi](/que-es-defi/), a grande maioria funciona sob o ERC-20.

<!--more-->

## O que significa ERC-20

**ERC** é a sigla de *Ethereum Request for Comments* e **20** é o número da proposta que lhe foi atribuído. Em essência, o padrão ERC-20 define um conjunto de funções que todo token deve implementar para que o ecossistema Ethereum possa interagir com ele de forma previsível: transferir tokens, consultar saldos, aprovar gastos por terceiros, etc.

Num artigo anterior mencionámos [as diferenças entre tokens e criptomoedas](/tokens-vs-altcoins/). Qualquer plataforma que permita a criação e execução de [smart contracts](/pt/o-que-e-um-smart-contract/) é capaz de albergar tokens, mas a grande maioria são construídos sobre Ethereum sob o padrão ERC-20 porque oferece compatibilidade imediata com [carteiras](/wallets-criptomonedas/), exchanges e protocolos DeFi.

Segundo o <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a>, existem centenas de milhares de contratos ERC-20 implantados na rede Ethereum, embora apenas alguns milhares tenham atividade significativa e valor de mercado.

## Como funciona um token ERC-20

O padrão define seis funções obrigatórias e dois eventos que permitem a interação entre tokens, [smart contracts](/pt/o-que-e-um-smart-contract/) e utilizadores:

- **totalSupply**: indica a quantidade total de tokens em circulação.
- **balanceOf**: devolve o saldo de um endereço específico.
- **transfer**: permite enviar tokens de um endereço para outro.
- **transferFrom**: permite que um terceiro autorizado mova tokens em nome do proprietário.
- **approve**: autoriza um endereço a gastar uma quantidade determinada de tokens.
- **allowance**: consulta quantos tokens um terceiro autorizado pode gastar.

É importante não confundir estes tokens com o **Ether (ETH)**, a moeda nativa da rede Ethereum. Quando um utilizador transfere tokens ERC-20 ou um smart contract realiza operações, as taxas de gas são sempre pagas em ETH.

## Vantagens de ser um token ERC-20

O facto de um token seguir o padrão ERC-20 implica várias vantagens práticas:

- **Compatibilidade com carteiras**: pode ser guardado em qualquer [carteira que suporte Ethereum](/wallets-criptomonedas/), como MetaMask, Ledger ou Trezor.
- **Facilidade de listagem em exchanges**: as exchanges podem integrar qualquer token ERC-20 de forma padronizada.
- **Interoperabilidade DeFi**: o token pode ser usado diretamente em protocolos como [Uniswap](/que-es-uniswap/), Aave, Compound ou outros sem adaptações especiais.
- **Transparência**: todas as transações ficam registadas na blockchain Ethereum e são verificáveis publicamente.

## Os tokens ERC-20 mais importantes em 2026

O ecossistema ERC-20 cresceu enormemente desde os seus primórdios. Estes são alguns dos tokens mais relevantes por categoria:

### Stablecoins
- **[USDT (Tether)](/pt/o-que-e-usdt-tether/)**: a stablecoin mais utilizada do mundo, indexada 1:1 ao dólar americano. É fundamental para o trading e as transferências internacionais.
- **[USDC](/pt/o-que-e-usdc/)**: emitida pela Circle com auditorias mensais, é considerada a stablecoin mais transparente e regulada do mercado.
- **DAI**: stablecoin descentralizada gerada através de garantias no protocolo MakerDAO.

### Tokens DeFi e de governança
- **UNI ([Uniswap](/que-es-uniswap/))**: token de governança da maior exchange descentralizada da Ethereum.
- **LINK (Chainlink)**: fornece dados externos fiáveis (oráculos) aos smart contracts, essencial para o funcionamento da [DeFi](/que-es-defi/).
- **AAVE**: token do protocolo de empréstimos descentralizados com o mesmo nome.

### Tokens ponte e de utilidade
- **WBTC (Wrapped Bitcoin)**: uma representação ERC-20 de Bitcoin que permite usar BTC dentro do ecossistema Ethereum e DeFi.
- **MATIC (Polygon)**: token da solução de escalabilidade Layer 2 mais popular da Ethereum.

## ERC-20 vs outros padrões de tokens

A Ethereum não tem apenas o padrão ERC-20. Ao longo dos anos, outros padrões foram desenvolvidos para cobrir necessidades distintas:

| Padrão | Tipo | Uso principal | Exemplo |
|--------|------|---------------|---------|
| **ERC-20** | Fungível | Criptomoedas, stablecoins, tokens DeFi | USDT, UNI, LINK |
| **[ERC-721](/que-es-un-nft/)** | Não fungível (NFT) | Arte digital, colecionáveis, ativos únicos | CryptoPunks, Bored Apes |
| **ERC-1155** | Multi-token | Gaming, coleções mistas, metaverso | Itens de jogos blockchain |

- Os tokens **ERC-20 são fungíveis**: cada unidade é idêntica a outra, tal como uma nota de um euro é intercambiável por outra.
- Os tokens **[ERC-721 são não fungíveis (NFTs)](/que-es-un-nft/)**: cada token é único e insubstituível, ideal para representar objetos digitais com identidade própria.
- Os tokens **ERC-1155 são multi-tipo**: permitem gerir tokens fungíveis e não fungíveis dentro de um mesmo contrato, poupando custos de gas. São especialmente populares em jogos blockchain.

## O papel do ERC-20 na DeFi

A rede Ethereum domina o ecossistema de [finanças descentralizadas (DeFi)](/que-es-defi/), e os tokens ERC-20 são o seu combustível. Praticamente todos os protocolos DeFi -- desde exchanges descentralizadas até plataformas de empréstimos -- operam com tokens ERC-20:

- **Troca**: em exchanges descentralizadas como [Uniswap](/que-es-uniswap/) os utilizadores trocam tokens ERC-20 sem intermediários.
- **Empréstimos e poupança**: protocolos como Aave e Compound permitem emprestar e pedir emprestado tokens ERC-20 ganhando juros.
- **Provisão de liquidez**: os utilizadores podem depositar tokens ERC-20 em pools de liquidez e receber comissões em troca.
- **[Stablecoins](/pt/o-que-sao-stablecoins/)**: as stablecoins ERC-20 como [USDT](/pt/o-que-e-usdt-tether/) e [USDC](/pt/o-que-e-usdc/) são a base do comércio cripto global.

## Considerações de segurança

Embora o padrão ERC-20 seja robusto e tenha sido testado durante anos, convém ter em conta alguns riscos:

- **Tokens fraudulentos**: qualquer pessoa pode criar um token ERC-20, pelo que existem muitos tokens sem valor real ou concebidos como fraudes. Verifique sempre o endereço do contrato no <a rel="nofollow" href="https://etherscan.io/tokens">Etherscan</a> antes de interagir com um token desconhecido.
- **Aprovações infinitas**: alguns protocolos DeFi solicitam aprovação para gastar uma quantidade ilimitada dos seus tokens. É recomendável rever e revogar aprovações periodicamente.
- **Vulnerabilidades em smart contracts**: erros no código do contrato do token podem ser explorados. Os projetos sérios realizam auditorias de segurança profissionais.

## Conclusão

O padrão ERC-20, juntamente com a própria rede [Ethereum](/pt/o-que-e-ethereum/), é um dos pilares fundamentais do ecossistema cripto. Desde a sua criação em 2015, permitiu o aparecimento de [stablecoins](/pt/o-que-sao-stablecoins/), tokens de governança, ativos DeFi e muito mais. Compreender como funciona é essencial para qualquer pessoa que queira participar no mundo das criptomoedas e das finanças descentralizadas.

Por outro lado, certas criptomoedas que inovam profundamente na tecnologia subjacente não podem ser construídas sobre Ethereum, possuindo assim a sua própria blockchain com regras distintas. Algumas delas são [Cardano](/pt/o-que-e-cardano/) ou [IOTA](/que-es-iota/).
