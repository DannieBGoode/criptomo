---
title: "O que e MimbleWimble: Privacidade e Escalabilidade na Blockchain"
date: 2018-10-25 00:00:00 Z
last_modified_at: 2026-04-14
tags:
- bitcoin
- altcoins
- litecoin
- privacidade
layout: post
description: "O que e MimbleWimble, o protocolo que melhora a privacidade e escalabilidade na blockchain. Grin, BEAM e Litecoin MWEB explicados de forma simples."
banner_image: 201810/mimblewimble.jpg
lang: pt
ref: what-is-mimblewimble
faq:
  - question: "O que e MimbleWimble?"
    answer: "MimbleWimble e um protocolo de blockchain que melhora a privacidade e a escalabilidade ao eliminar dados intermediarios das transacoes, de forma que apenas as entradas, as saidas e uma assinatura digital sao mantidas. Foi proposto em 2016 por um autor anonimo sob o pseudonimo de Tom Elvis Jedusor."
  - question: "Como o MimbleWimble melhora a privacidade em relacao ao Bitcoin?"
    answer: "O Bitcoin expoe publicamente o remetente, o destinatario e o valor de cada transacao. O MimbleWimble oculta esses tres parametros combinando transacoes e eliminando informacoes intermediarias desnecessarias, utilizando transacoes confidenciais e a tecnica CoinJoin."
  - question: "Quais criptomoedas usam MimbleWimble?"
    answer: "Grin e BEAM sao criptomoedas nativas baseadas em MimbleWimble. Alem disso, o Litecoin integrou o protocolo em maio de 2022 atraves do MWEB (MimbleWimble Extension Blocks), permitindo transacoes confidenciais opcionais dentro da sua rede."
  - question: "O MimbleWimble e seguro?"
    answer: "Sim. O MimbleWimble utiliza criptografia de curva eliptica e transacoes confidenciais comprovadas. A rede verifica matematicamente que nenhuma moeda e criada ou destruida de forma ilicita, sem necessidade de expor dados sensiveis das transacoes."
  - question: "O que e Litecoin MWEB?"
    answer: "MWEB (MimbleWimble Extension Blocks) e uma atualizacao do Litecoin ativada em maio de 2022 que permite realizar transacoes confidenciais opcionais. Os utilizadores podem mover LTC para a camada MWEB para ocultar montantes e enderecos, melhorando a privacidade sem sacrificar a escalabilidade."
  - question: "Como o MimbleWimble pode ser integrado ao Bitcoin?"
    answer: "O MimbleWimble pode ser incorporado ao Bitcoin como um soft fork ou como uma sidechain, permitindo que os utilizadores movam fundos atraves de atomic swaps para realizar transacoes privadas. No entanto, o Bitcoin tem priorizado outras melhorias como Taproot e Schnorr."
---

MimbleWimble e um protocolo publicado por um utilizador anonimo num chat de desenvolvedores de Bitcoin com o nome de Tom Elvis Jedusor (o nome frances de Voldemort nos livros de Harry Potter). MimbleWimble em si e o nome do feitico utilizado para selar as linguas das vitimas nos livros de J.K. Rowling.

<!--more-->

Jedusor deixou um link para um <a rel="nofollow" href="https://download.wpsoftware.net/bitcoin/wizardry/mimblewimble.txt">whitepaper</a> no qual descreve como, utilizando este protocolo, se poderia melhorar significativamente tanto a escalabilidade como a privacidade da rede Bitcoin.

Satoshi Nakamoto foi muito sincero no whitepaper do Bitcoin quando falou das [limitacoes da privacidade do BTC](/es-bitcoin-anonimo/). Nele explicava como tres campos seriam publicamente conhecidos para qualquer transacao realizada:

- O endereco publico do remetente.
- A quantidade de moedas enviadas.
- O endereco publico do destinatario.

O motivo pelo qual e necessario fazer isto e para garantir que um remetente nunca envie mais fundos do que possui no seu endereco.

MimbleWimble, por outro lado, consegue ocultar estes tres parametros de uma forma compativel com a rede Bitcoin. Ao contrario de outras implementacoes de privacidade como [ZCash](/que-es-zcash/) ou [Monero](/que-es-monero/) que adicionam ofuscacao as transacoes, MimbleWimble obtem a privacidade eliminando quase toda a informacao das transacoes que acaba por ser gravada na blockchain.

Imaginem que faco uma transacao para o Bob, que por sua vez faz outra transacao para a Carol, que de seguida a faz para o David. O resultado final e que as minhas moedas originais estao agora na posse do David. Entao, porque mantemos a informacao adicional? MimbleWimble elimina toda a informacao intermediaria combinando-as numa unica transacao autorizada.

As transacoes MimbleWimble sao uma evolucao de dois conceitos ja conhecidos no mundo do Bitcoin:

- **As transacoes confidenciais**, desenvolvidas por um programador de Bitcoin chamado Gregory Maxwell, permitem aos utilizadores cifrar o numero de moedas que estao a ser enviadas, ocultando-as de qualquer observador externo a transacao.
- **CoinJoin** (tambem proposto por Gregory Maxwell) e um mecanismo no qual diferentes transacoes sao combinadas entre si com o objetivo de ofuscar os montantes emitidos pelos diferentes utilizadores, de tal forma que um observador nao consegue saber, de todos os remetentes, quem enviou exatamente que montante e para que destinatario.

A combinacao de ambos os conceitos produz um bloco que simplesmente tem uma lista de entradas de dinheiro, outra lista de saidas e uma assinatura digital, o que poupa um espaco consideravel no bloco de 1MB caracteristico da rede Bitcoin, porque o resto da informacao ja nao precisa de ser guardada e, consequentemente, mais transacoes podem ser incluidas por bloco, melhorando a escalabilidade da rede ao mesmo tempo que a privacidade.

MimbleWimble pode ser implementado na rede de BTC como um soft fork ou uma sidechain (tal como a Lightning Network) na qual os utilizadores, atraves de *atomic swaps*, poderiam passar as suas moedas da rede de BTC para a de MimbleWimble e entao realizar transacoes privadas.

Da mesma forma que Bitcoin e um protocolo e Bitcoin Core e uma das suas implementacoes, MimbleWimble e um protocolo com varias implementacoes: **Grin**, **BEAM** e, desde 2022, **Litecoin MWEB**.

## Implementacoes do MimbleWimble

### Grin

Grin foi a primeira implementacao do protocolo MimbleWimble a lancar a sua rede principal, a **15 de janeiro de 2019**. Ao contrario da maioria das criptomoedas, Grin nao teve ICO, nem pre-mineracao, nem recompensa para fundadores: trata-se de um projeto completamente comunitario financiado por doacoes.

Grin utiliza um modelo de emissao linear sem limite maximo de oferta, semelhante a politica monetaria que teria uma moeda fiduciaria digital. Os seus primeiros anos incluiram hard forks programados e mudancas no algoritmo de prova de trabalho. Atualmente, o projeto encontra-se numa fase estavel de manutencao, com contribuicoes ativas de desenvolvedores veteranos como Yeastplume e Tromp, embora com menos atividade de desenvolvimento do que nos seus inicios.

### BEAM

BEAM e a outra implementacao principal do MimbleWimble, tambem lancada em janeiro de 2019. Ao contrario de Grin, BEAM foi desenvolvido por uma empresa sediada em Telavive e tem uma abordagem mais empresarial. Utiliza os protocolos Lelantus e MimbleWimble combinados para oferecer privacidade por defeito em todas as transacoes.

BEAM ampliou o seu alcance para alem dos pagamentos privados, oferecendo ativos confidenciais, um DEX confidencial, NFTs privados e ate stablecoins com privacidade integrada. O seu modelo de governacao esta em transicao para um DAO (BeamX DAO), com uma emissao deflacionaria que se reduz periodicamente.

### Litecoin MWEB

A adocao mais significativa do MimbleWimble chegou a **19 de maio de 2022**, quando o Litecoin ativou os **MWEB (MimbleWimble Extension Blocks)**, a maior atualizacao na historia da criptomoeda. MWEB permite aos utilizadores de Litecoin realizar transacoes confidenciais de forma opcional: os utilizadores podem mover os seus LTC para a camada MWEB para ocultar tanto os montantes como os enderecos das transacoes.

A adocao tem crescido de forma constante desde a sua ativacao:

- Mais de 90% dos mineiros e nos do Litecoin validam blocos MWEB.
- Mais de 350.000 LTC encontram-se depositados na camada MWEB.
- Carteiras como Litecoin Core, Cake Wallet (desde outubro de 2024) e Tristero (desde marco de 2026) suportam transacoes MWEB em computador e telemovel.

A tecnica de *cut-through* herdada do MimbleWimble permite ainda que os dados de transacoes ja gastas sejam eliminados da cadeia, reduzindo o espaco de armazenamento necessario e melhorando a escalabilidade do Litecoin.

## MimbleWimble e a regulacao das moedas de privacidade

A integracao do MWEB no Litecoin tambem evidenciou a tensao entre privacidade e regulacao no mercado cripto. Apos a ativacao do MWEB, as cinco principais exchanges da Coreia do Sul (Upbit, Bithumb, Coinone, Korbit e Gopax) removeram o Litecoin das suas plataformas, classificando-o como uma "moeda escura" por alegada incompatibilidade com as normas contra o branqueamento de capitais (AML) do pais.

A Binance, por seu lado, anunciou que nao processaria transacoes de Litecoin que utilizassem a funcionalidade MWEB, embora tenha mantido a negociacao convencional de LTC. Nas exchanges americanas como a Coinbase, o Litecoin continuou a operar normalmente.

Este episodio reflete um debate mais amplo que afeta todo o setor das moedas de privacidade: em 2024, a Binance removeu o Monero (XMR) da sua plataforma, e a OKX fez o mesmo com XMR, DASH, ZEC e ZEN. A privacidade financeira continua a ser uma das propostas de valor mais importantes da criptografia, mas choca cada vez mais com os quadros regulatorios globais.

## O futuro do MimbleWimble

MimbleWimble provou ser muito mais do que uma proposta teorica publicada num chat de Bitcoin em 2016. Com implementacoes ativas em Grin, BEAM e Litecoin, o protocolo demonstrou a sua viabilidade tecnica para melhorar a privacidade e a escalabilidade na blockchain.

O caso do Litecoin MWEB e especialmente relevante: demonstrou que um protocolo de privacidade pode ser integrado numa criptomoeda estabelecida com uma base de utilizadores existente, embora nao sem desafios regulatorios. Olhando para o futuro, a evolucao do MimbleWimble dependera tanto dos avancos tecnicos como da capacidade do ecossistema para navegar o equilibrio entre privacidade e conformidade regulatoria.
