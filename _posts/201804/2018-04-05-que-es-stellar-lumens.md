---
layout: post
title:  Qué es Stellar Lumens (XLM)
description: La criptomoneda Stellar Lumens (XLM) explicada de manera sencilla. Dónde comprar y guardar.
banner_image: 201804/stellar.png
rating: 5
totalVotes: 2
tags: [altcoins]
---

Stellar es una plataforma híbrida descentralizada basada en blockchain que pretende facilitar transacciones inter-divisas por comisiones menores a un céntimo creando un sistema financiero que permite a gente de todos los niveles sociales acceder a servicios financieros baratos.

<!--more-->

Stellar Lumens fue creado como un fork de Ripple en 2014, por lo que es comprensible la gran influencia que tiene XRP sobre XLM. Ambos proyectos utilizan un registro distribuido para llevar los balances de las cuentas y ofrecer soporte a monedas tradicionales. La intención de Stellar es hacer que las transacciones monetarias sean más baratas, rápidas y seguras que las ofrecidas por los sistemas bancarios actuales ofreciendo un eficiente sistema de pagos sin fronteras. La red está montada sobre un gran número de servidores descentralizados soportados por un consorcio internacional de individuos y consorcios que se dedican a registrar todas las transacciones.

#### Anchors

Un anchor es una entidad en la que otros usuarios confían para que les guarde el dinero y les otorgue crédito virtual. Un anchor actua como puente entre las diferentes divisas que maneje y la red de Stellar.

Para empezar a utilizar Stellar, lo primero que tendría que hacer un usuario es enviar su dinero a un *anchor* de la red que devolvería crédito virtual al usuario.

Por ejemplo si un usuario quisiera enviarle fondos a otro desde Estados Unidos a Francia, utilizará su balance de dólares para enviarle dinero a través de la red Stellar, que convertiría automáticamente sus fondos en euros utilizando el ratio de intercambio más bajo que encontrase. Una vez recibidos los fondos, el receptor podría retirarlos de su *anchor* local.

El concepto de anchor es algo que ya existe en la vida real. Por ejemplo, para tener dinero en Paypal se les debe enviar dinero primero y Paypal asignará al usuario dinero virtual que podrá ser intercambiado entre los usuarios y canjeado de vuelta a sus cuentas bancarias cuando así lo deseen. De hecho muchos anchors son entidades bancarias tradicionales. Stellar pretende ser una red que da servicio a multitud de *anchors*, pretendiendo hacer un sistema mucho más potente que el que Paypal ofrece.

Un anchor hace dos funciones:

- Reciben los fondos fiat de los usuarios y les otorgan crédito virtual en su lugar. Lo cual requiere una gran cantidad de confianza hacia los anchors en cuestión.
- Devuelven dinero fiat a cambio de crédito virtual a cambio de una comisión.

Sin duda el gran punto flojo de este sistema es que los usuarios deben elegir en qué anchor confiar, y no existe ninguna garantía de que el *anchor* de turno vaya a honrar su promesa de devolución.

#### Exchange distribuido

Stellar ofrece a los usuarios la opción de crear órdenes de intercambio de divisas en su red. Por ejemplo si un usuario quisiera intercambiar GBP por EUR crearía una orden en el mercado. Si no existieran órdenes de intercambio directas, Stellar buscaría otros intercambios en cadena que resultará en el intercambio deseado. Por ejemplo, podría intercambiar primero GBP a USD y después USD a EUR, lo cual ofrece una flexibilidad muy grande a la hora de intercambiar divisas.

{% include image_caption.html imageurl="/images/posts/201804/distributed-exchange.png" caption="Exchange descentralizado" title="Exchange descentralizado" popup=true %}

El exchange distribuido de Stellar no se limitará a intercambio de divisas fiat, sino que también ofrecerán intercambio de criptomonedas.

Aunque las transacciones son irreversibles, es posible congelar los fondos enviados por un usuario. Por ejemplo si un usuario envía 200 EUR por error a otro usuario, podrá congelar esos fondos evitando que el otro usuario pueda utilizarlos. Todas las transacciones son públicas pero al igual que con Bitcoin, ciertos niveles de privacidad podrían ser alcanzables mediante otras herramientas de nivel dos como puede ser Lighting Network.

### Equipo

Jed McCaleb es el cofundador de Stellar. Anteriormente creó eDonkey2000 que fue uno de los clientes de intercambio de ficheros mediante torrent más conocidos. Más tarde creó Mt. Gox que fue el primer exchange descentralizado que vendió a Mark Karpeles años antes del fiasco que resultó ser, y por último creó Ripple de la cual mantiene todavía millones de XRP que financian enormemente su nueva empresa the Stellar Foundation.

{% include image_caption.html imageurl="/images/posts/201804/jed.jpg" caption="Jed McCaleb" title="Jed McCaleb" popup=true %}

Stellar actúa como una empresa sin ánimo de lucro por lo que no cobra a las instituciones que decidan utilizar sus servicios. Su financiación se realiza a través de:
- 5% de los XLM iniciales son mantenidos por la fundación con la intención de auto-financiarse.
- Stellar acepta donaciones deducibles de impuestos.
- La startup Stripe ha financiado parcialmente la empresa.

Stellar no tiene un Roadmap concreto publicado pero si que mantienen <a rel="nofollow" href="https://www.stellar.org/blog/">un blog frecuentemente actualizado</a>.

Entre los partners de Stellar se encuentran reconocidas empresas IBM y Deloitte. De hecho IBM tiene un gran número de nodos validadores de transacciones visibles en <a rel="nofollow" href="https://dashboard.stellar.org/">este dashboard</a> que la fundación pone a disposición de los usuarios.

#### Lumens (XLM)

Lumens es la moneda propia de la red Stellar. Sirve para dos propósitos:

- Anti spam para evitar ataques DDoS: cada transacción independientemente de la cantidad intercambiada cuesta una tasa fija de 0.00001 XLM. La tasa es lo suficientemente pequeña como para no impactar al coste de transacción pero lo suficientemente grande como para que un ataque de spam no resulte rentable. Las tasas recolectadas son devueltas a la red en forma de inflación. Un 1% de lumens son liberados cada año al mercado.
- Facilitan transacciones multi-divisa: Actúa como moneda puente entre intercambios de otras divisas.

### Inflación

Stellar no utiliza Proof of Stake (PoS) ni Proof of Work (PoW) como otras conocidas criptomonedas. Tampoco dispone de un sistema de reparto de dividendos como posee NEO con su criptomoneda GAS. En lugar de ello disponen de un sistema de inflación:

> La red distribuida Stellar dispone de un mecanismo nominal y fijo de inflación. Nuevos lumens son añadidos a la red con un ratio de un 1% cada año. Cada semana, el protocolo distribuye estos lumens a aquellas cuentas que reciban un 0.05% o más de los votos efectuados por otras cuentas de la red. <cite>- The Stellar Foundation</cite>

Básicamente cada semana, algunas cuentas recibirán las recompensas inflacionarias de la red en tokens XLM. Esta distribución está basada en el poder de votación que un nodo disponga, o en otras palabras, del número de lumens que posea sumado al número de votos que reciben de otras cuentas. La mínima cantidad de XLM que debería tener un nodo para optar a estas recompensas es de un 0.05% de todos los lumens en existencia, lo cual, para la mayor parte de los usuarios significa unirse a un pool para juntar sus fondos.

Esto ha sido duramente criticado puesto que crea cierta forma de centralización donde los ricos se hacen más ricos.

Cualquier usuario con lumens en su cuenta puede realizar un voto hacia futuros receptores de token inflacionarios. Este mecanismo podría servir para realizar donaciones de manera indirecta a otras organizaciones.

### ICOs y Smart Contracts

Aunque la red Stellar no es Turing-complete (por lo que no permite computaciones complejas como Ethereum), su escalabilidad y tasas bajísimas incentivan la creación de smart contracts sobre sí misma. Además ofrece una plataforma de ICOs al igual que tiene Ethereum para financiar nuevos proyectos.

### Dónde comprar Stellar (XLM)

- <a rel="nofollow" href="https://www.binance.com/?ref=11317062">Binance</a>
- <a rel="nofollow" href="https://bittrex.com/">Bitrex</a>
- <a rel="nofollow" href="kraken.com">Kraken</a>

### Dónde almacenar Stellar (XLM)

- <a rel="nofollow" href="http://amzn.to/2i5kRoG">Ledger Nano S</a>
- <a rel="nofollow" href="https://www.stellar.org/lumens/wallets/">Stellar Desktop Client</a>
- <a rel="nofollow" href="https://www.stellar.org/lumens/wallets/">Interstellar</a>

### Opinion

Aunque a los defensores de XLM les gusta decir que Stellar está mucho más descentralizado que otras criptomonedas puesto que los usuarios pueden elegir a sus anchors / validadores (mientras que en PoW/PoS un usuario no puede elegir a sus mineros), la realidad es que Bitcoin es una red que no requiere confianza en los validadores, puesto que Proof of Work garantiza una validación correcta en la red.

El hecho de ceder los usuarios su dinero a un anchor para que lo guarde por ellos nos devuelve de nuevo al sistema bancario tradicional del que muchas criptomonedas intentan huir y los obliga a tener que confiar de nuevo en los bancos. Es por ello que Stellar no se considera una herramienta disruptiva financiera sino más un complemento al sistema bancario actual que permite el envío de fondos entre países siempre y cuando exista un anchor local que sea capaz de devolver el dinero a los usuarios.

De esta manera, XLM al igual que XRP, podrían acabar abriéndose un hueco en el sistema bancario tradicional abaratando costes del día a día, aunque no necesariamente van a cambiar el mundo como otras monedas aspiran a hacer.

Recordemos, que la Stellar Foundation posee ahora mismo cerca de 90 billones de XLM en su posesión cuando sólo 18.5 billones están en circulación. A medida que estos vayan apareciendo en el mercado el precio del mismo tenderá a caer, por lo que la esperanza de los inversores es que esta gran cantidad de fondos congelados sea utilizada de manera correcta para incentivar a bancos, *anchors*, desarrolladores y usuarios a utilizar su plataforma de tal forma que la inflación sea compensada con el valor añadido traído por las nuevas incorporaciones.


