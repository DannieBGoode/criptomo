---
title: ▷ Calculateur de bénéfices Bitcoin et crypto-monnaies
permalink: "/fr/calculateur/"
layout: page
description: "\U0001F4B5 Bitcoin Calculator, calculez le profit que vous auriez pu
  gagner en investissant dans Bitcoin et d'autres crypto-monnaies. \U0001F4B9 Bénéfices."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
schema: true
rating: 5
totalVotes: 39
comments: false
sitemap: true
lang: fr
css: calculator
ref: calculator
mailchimp_tracking: false
body_class: calculator-page
redirect_from:
- "/fr"
faq:
  - question: "Comment le bénéfice en crypto-monnaie est-il calculé ?"
    answer: "Le bénéfice est calculé comme suit : (Prix actuel − Prix d'achat) × Quantité de pièces. Le pourcentage de profit est : ((Valeur actuelle / Investissement initial) − 1) × 100. Par exemple, si vous avez acheté 1 BTC à 10 000 $ et qu'il vaut aujourd'hui 60 000 $, votre bénéfice est de 50 000 $ soit 500%."
  - question: "Puis-je calculer le bénéfice pour des crypto-monnaies qui ne figurent pas dans la liste déroulante ?"
    answer: "Oui. Sélectionnez \"Autre actif\" et saisissez le symbole exact du ticker (ex. DOGE, SHIB, SOL, BNB). Toutes les pièces ne sont pas forcément présentes dans notre base de données."
  - question: "Quelle est la différence entre cette calculatrice et la calculatrice avancée ?"
    answer: "Cette calculatrice vous indique ce que vaudrait aujourd'hui un investissement ponctuel effectué dans le passé. La <a href=\"/fr/calculateur-dca/\">calculatrice avancée</a> simule des investissements périodiques (DCA) dans le temps."
  - question: "Pourquoi ne puis-je pas sélectionner la date d'aujourd'hui comme date d'achat ?"
    answer: "La calculatrice s'appuie sur les prix de clôture historiques. Si les marchés n'ont pas encore clôturé pour la journée en cours, les données de prix d'aujourd'hui peuvent ne pas être disponibles. Dans ce cas, sélectionnez la date d'hier."
  - question: "La calculatrice tient-elle compte des frais de trading ?"
    answer: "Non. Le résultat affiche le bénéfice brut basé uniquement sur la variation du prix. Les bénéfices réels peuvent être légèrement inférieurs après déduction des frais de trading des exchanges (généralement entre 0,1% et 0,6%)."
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px;display:none">
        <small>Pour les investissements périodiques, utilisez notre <a href="/fr/calculateur-dca/">calculateur DCA</a>.</small>
    </div>
</div>
<div class="calculator-block" data-recommendations-script="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Investissement</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Devise</label>
            <select id="invest-fiat">
                <option>EUR</option>
                <option>USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Crypto-monnaie</label>
        </div>
        <div class="calculator-col-end">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08">Ethereum</option>
				<option value="LTC"  min="2013-09-15">Litecoin</option>
                <option value="MIOTA"  min="2017-06-14">IOTA</option>
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="ADA" min="2017-10-02">Cardano</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">Autre actif...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Il se peut que toutes les crypto-monnaies ne soient pas couvertes par le serveur.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-date">Date d'achat</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calculer</button>
        <div id="calculator-results">
            <div class="calculator-results-text">
                Si vous aviez investi <span class="result-invest"></span> sur <span class="result-tokentype"></span> le jour <span class="result-date"></span> vous auriez eu l'opportunité d'acheter au prix de 
                <span class="result-old-price"></span> un total de
                <span class="result-tokencount"></span> <span class="result-tokentype"></span>
                valorisés aujourd'hui à <span class="result-currentvalue"></span>.
            </div>
            <div>Bénéfices: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>ACHAT</small></th>
                            <th>Actif</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Investissement original</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Date d'achat </th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Prix ​​d'achat </th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Actifs achetés</th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>SORTE</small></th>
                            <th>Date de vente</th>
                            <td><span>Aujourd'hui</span></td>
                        </tr>
                        <tr>
                            <th>Prix de vente</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Valeur d'investissement</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Pourcentage de profit</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
             </div>
             {% include share_result.html %}
             {% include calculator_affiliate_banner.html %}
         </div>
        <p>
            <div class="error coin-error">
                <span>Cette crypto-monnaie n'est pas dans notre système.</span>
                <div>
                    N'oubliez pas d'essayer avec le code de devise au lieu du nom complet. 
                </div>
                <div>
                    Par exemple: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...
                </div>
            </div>
            <div class="error date-error">
                <span>Cette date n'est pas dans notre registre.</span>
                <div>Essayez une autre date, par exemple <a class="suggestedDate">2022-05-01</a>.</div>
            </div>
        </p>
    </div>

    {% include ads_calculator_banner.html %}
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>

## Instructions pour la calculatrice Bitcoin

Avec ce calculateur de bénéfices cryptographiques, vous pouvez savoir quel profit vous auriez pu obtenir en investissant dans le Bitcoin et d'autres crypto-monnaies à temps.

Afin d'utiliser ce calculateur de bitcoins pour connaître vos bénéfices de crypto, veuillez entrer l'investissement initial que vous souhaitez calculer et choisissez le crypto que vous souhaitez simuler.

Vous pouvez choisir d'autres cryptos non inclus dans la liste déroulante, mais assurez-vous de saisir le ticket exact de la crypto. Par exemple, au lieu de DOGECOIN, saisissez **DOGE**, ou au lieu de ETHEREUM, saisissez **ETH**. Il est possible que toutes les crypto-monnaies ne soient pas couvertes par l'API.

Lors de la sélection de la date de vente, en fonction de l'heure, il peut ne pas être possible de choisir aujourd'hui si les marchés n'ont pas encore été enregistrés comme fermés. Si tel est le cas, veuillez choisir Hier comme date de vente.

## Comment le bénéfice en crypto-monnaie est-il calculé

Le calculateur utilise des données historiques de prix pour calculer votre bénéfice à l'aide de cette formule :

**Bénéfice ($) = (Prix actuel − Prix d'achat) × Nombre de pièces**

**Bénéfice (%) = ((Valeur actuelle / Investissement initial) − 1) × 100**

Par exemple : si vous avez investi 1 000 $ dans Bitcoin à 10 000 $ par BTC, vous avez reçu 0,1 BTC. Si Bitcoin vaut maintenant 60 000 $, vos 0,1 BTC valent 6 000 $ — un bénéfice de 5 000 $ soit 500%.

Le calculateur ne tient pas compte des frais de trading ni des impôts. Les résultats sont fournis à titre informatif uniquement.

{% include faq.html %}
