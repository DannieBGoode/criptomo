---
layout: post
title:  Hack de Oyster Protocol y Guerras Internas
description: El smart contract de Oyster Protocol vulnerado, nuevos tokens creados y guerra civil interna.
banner_image: 201810/oyster.jpg
rating: 5
totalVotes: 1
tags: [altcoins]
---

Uno de los proyectos más prometedores del mundo de las criptomonedas se encuentra en graves problemas y podría acabar desapareciendo.

<!--more-->

El creador anónimo del proyecto [Oyster](/que-es-oyster), Bruno Block, ha sorprendido a toda la comunidad y su equipo de desarrollo cuando el 29 de Octubre invocó la funcionalidad del [smart contract](/que-es-un-smart-contract/) de Oyster `transferDirector` concediéndose a sí mismo derechos de administrador, lo cual le ha permitido reabrir la fase de [ICO](/que-es-una-ico) y crear de la nada 3 millones de nuevos tokens a precio de preventa `1 ETH = 5000 PRL` ó 4 céntimos de dólar por PRL`. Inmediatamente después los ha enviado al exchange con más volumen que soporta PRL llamado KuCoin, y los ha vendido obteniendo unas ganancias de 300,000$ en apenas unas horas.

> Decidí mantener mi identidad anónima debido a que al inventar el protocolo, podría tener repercusiones políticas en el futuro, ya que estamos creando el primer protocolo de almacenamiento garantizado como totalmente privado.- Bruno Block

La linea 179 del [smart contract de Oyster](https://etherscan.io/address/0x1844b21593262668b7248d0f57a220caaba46ab9#code) permite a cualquier persona con la clave privada que desplegó el contrato a reabrir la fase de ICO. Aprovechándose de esta vulnerabilidad el orden de eventos inmortalizado en el blockchain de Ethereum (al tratarse de una moneda [ERC20](/token-erc20/)) fue el siguiente:

{:.table.table-striped.table-bordered.table-hover.table-condensed.table-collapsable}
| Bloques                                                                                               | Eventos                            |
|:-----------------------------------------------------------------------------------------------------:|:----------------------------------:|
| [6605271](https://etherscan.io/tx/0x2321e305c20f45429f11045b9235e9bbd66b17bacede173ca86144ac5533d3bf) | El método openSale() fue invocado reabriendo la fase de ICO en el contrato.                                                                                                    |
| [6605281](https://etherscan.io/tx/0xcd51afceea212a962398ede0787bb3fe56e6519bdf651d2d2886d8e4d9f2ce7f) | [Este wallet](https://etherscan.io/address/0x0001ee57bb28415742248d946d35c7f87cfd5a54) envía 50 ETHs al smart contract, creando 250000 PRLs.                                    |
| [6605299](https://etherscan.io/tx/0xfddf86daaaf2d7903b94b5a1129a4707645881df73c5e0aeb15f4cb5d8e48429) | 50 Eth a cambio de 250,000 PRL     | 
[6605340](https://etherscan.io/tx/0xa3671737ede8a768320ddb2aa43969bda2e692a53c15881f8caa1da9d25f3406)   | 50 Eth a cambio de 250,000 PRL     |
| [6605366](https://etherscan.io/tx/0xbd2bb5b5d8ca56614f4a8c7bacfbe56858583e5c6ff6d24a4c7af806a8e08d97) | 50 Eth a cambio de 250,000 PRL     |
| [6605608](https://etherscan.io/tx/0xdaf3558b39022c2ec0a0667a68743e16a2923c2d0b04aedd55524ff5dac45446) | 73 Eth a cambio de 356,000 PRL     |
| [6606268](https://etherscan.io/tx/0xcbe2928a5e6441fdf277b756d3ae99d06640865b19a45139a6609fb48410ad32) | 186 Eth a cambio de 930,000 PRL    |
| [6606409](https://etherscan.io/tx/0x2babab387a063356b38f0a6463b9e9a3d0e746d224d6d47275107de36c832246) | 175 Eth a cambio de 875,000 PRL    |
| [6606737](https://etherscan.io/tx/0x41aca42618c0de065d8dbf19d7a8a8c8b4f810b7db045c02e4cc653d4dba1ee2) | 173 Eth a cambio de 865,000 PRL    |
| [6605411](https://etherscan.io/tx/0xbaf3bbdfa51f1d02ba4607a1e1e9bfbb2f75e1128944f01a864924bf041bf324) | [El mismo wallet](https://etherscan.io/address/0x0001ee57bb28415742248d946d35c7f87cfd5a54) empieza a vender en KuCoin por valor de 65 Eth.                     |
| [6605411](https://etherscan.io/tx/0xedd8bfcfd23d7699748aa75c3dfc54e84bf0a6f6f886b176132a6de0aa30f037) | Ahora vende por valor de 61 Eth    |

El exit scam, cómo se denominan estas acciones, ha sido realizado 2 días antes de que KuCoin incrementara sus medidas de KYC lo cual hubiera impedido que el actor malicioso extrajera más de 2BTC sin validar su identidad.

Por el momento Kucoin y otros exchanges han congelado todo el tráfico de PRL y su moneda hermana SHL hasta que se resuelva la situación.

> Podemos confirmar que alguien ha tomado control del Smart Contract. NO COMPREIS NADA. Estamos esperando más información y estamos intentando congelar el trading en KuCoin. - Equipo de Oyster


Por lo visto el contrato de PEARL ha pasado 3 auditorías de código, y ninguna de ellas fue capaz de encontrar esta gran vulnerabilidad que permitía reabrir la fase de ICO a voluntad del creador.

No es la primera vez que los creadores de una criptomoneda realizan un exit scam. Por ejemplo la ICO Blockbroker realizó uno a pesar de haber pasado varias auditorías de código y conseguir buenas valoraciones por respetadas páginas de valoración de inversión en ICO.

El equipo de Oyster <a rel="nofollow" href="https://oysterprotocol.com/oyster-update/">ha confirmado públicamente  el desastre</a> y ha acusado a Bruno Block como único responsable yaque ellos tienen en su posesión más de un 5% del total de tokens PRL, que pasarían a valer cero si el proyecto no puede ser salvado. En consecuencia han anunciado que realizaran un [hard fork](/hard-fork-vs-soft-fork/) del PRL original a una hipotética PRL2 donde estos 3 millones de tokens creados por Bruno jamás han existido y otorgándole a los inversores tokens PRL2 en un ratio `1:1`.

> Cualquier persona que envíe Ethereum al smart contract para obtener PRL a precio de ICO se arriesga a no ser reembolsado cuando se haga el hard fork a PRL2 - Equipo de Oyster.

Por otro lado, Bruno Block ha roto su silencio y ha acusado al CEO de Oyster Bill Cordes de inside trading. Según el anónimo fundador, Bill anunció internamente que PRL iba a ser listado en el famoso exchange Binance, algo que sin duda subiría su precio considerablemente. Aprovechando esta inminente noticia, Bill y otros miembros del equipo supuestamente empezaron a comprar tokens PRL en KuCoin inflando el precio de 5 céntimos a 25 céntimos en vísperas a subidas mucho mayores en el momento en que se oficializase la salida en Binance.

En las conversaciones hechas públicas por Bruno Block, Bill se defiende diciendo que el inside trading no está penado en el mundo de las criptomonedas y que probablemente Binance también se esté aprovechando de la misma manera.

En venganza, Bruno Block decide tomar cartas en el asunto, y haciendo uso de un agujero de seguridad que él mismo dejó en el smart contract  decide reabrir la fase de ICO, crear nuevos tokens de la nada y venderlos en KuCoin tirando de nuevo el precio de 25 céntimos a unos 7 momento en el cual, KuCoin congeló el intercambio de la divisa.

Llegados a este punto, Bruno asegura que el resto del equipo está despedido, y de que el mismo implementará el protocolo de Oyster gradualmente sin necesidad de marketing ni CEOs y posiblemente revelará su identidad.

{% include image_caption.html imageurl="/images/posts/201810/bruno-0.png" popup=true caption="Comunicado de Bruno Block acusando de inside trading al resto del equipo y confesando el robo de 300,000$ de los inversores." %}

Mientras tanto el CEO de Oyster Bill Cordes ha hecho <a rel="nofollow" href="https://medium.com/oysterprotocol/oyster-update-10-31-c384696495d6">un nuevo comunicado</a> donde niega cualquier acción de inside trading y además publicada conversaciones privadas con Bruno en la que parece estar mentalmente inestable y habla de un inminente apocalipsis debido a la deuda mundial que supuestamente justifica sus acciones.

{% include image_caption.html imageurl="/images/posts/201810/bruno-1.png" popup=true %}
{% include image_caption.html imageurl="/images/posts/201810/bruno-2.png" popup=true %}
{% include image_caption.html imageurl="/images/posts/201810/bruno-3.png" popup=true %}
{% include image_caption.html imageurl="/images/posts/201810/bruno-4.png" popup=true  caption="Bruno Block confiesa que lo hizo por dinero para proteger a su familia en el inminente apocalipsis inflacionario donde los plátanos costarán 5000$." %}



### Opinión

Es un día muy oscuro para este proyecto tan prometedor, pero al mismo tiempo es importante aprender varias lecciones de él.

El peligro de invertir en proyectos con fundadores anónimos es muy alto, puesto que el fundador puede desaparecer sin consecuencias de ningún tipo. Adicionalmente por mucho que los smart contracts pasen auditorías, vulnerabilidades como ésta o la que se dio en el [DAO](/que-es-ethereum#dao) puede ser obviadas permitiendo a aquellos tecnológicamente capaces de encontrarlas la posibilidad de enriquecerse a costa de los demás.

Desde que ideó el whitepaper original de PRL se ha considerado a Bruno Block un genio, y queda por ver si realmente el equipo será capaz de entregar un PRL2 capaz de cumplir el mismo propósito. Por otro lado, no veo posible que jamás se vuelva a confiar en un smart contract desplegado por Bruno, ya que su credibilidad se ha visto totalmente destruida.

Sólo el tiempo nos dirá si este proyecto podrá sobrevivir, por el momento su supervivencia pinta muy mal.

