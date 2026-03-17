---
title: Simulateur de Prix Futur Bitcoin
permalink: "/fr/simulateur/"
layout: page
description: "Simulez la valeur future de vos cryptomonnaies. Entrez votre quantité et un prix cible pour voir ce que vaudrait votre investissement."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
css: calculator
rating: 5
totalVotes: 1
comments: false
sitemap: true
ref: simulator
body_class: calculator-page
lang: fr
mailchimp_tracking: false
---

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Crypto-monnaie</label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-currency">
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="LTC">Litecoin</option>
                <option value="MIOTA">IOTA</option>
                <option value="XMR">Monero</option>
                <option value="ADA">Cardano</option>
                <option value="XRP">Ripple</option>
                <option class="editable">Autre actif...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Il se peut que toutes les crypto-monnaies ne soient pas couvertes par le serveur.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Quantité que vous détenez</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1" step="any" class="data-hj-allow">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-target-price">Prix futur</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-target-price" type="number" value="100000" step="any" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Devise</label>
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>

    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateSimulator()">Calculer</button>
        <div class="simulator-placeholder">
            <div class="simulator-placeholder-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            </div>
            <p>Entrez vos données et appuyez sur <strong>Calculer</strong> pour voir votre simulation</p>
        </div>
        <div id="simulator-results">
            <div id="simulator-results-table">
                <table>
                    <tr>
                        <th>Crypto-monnaie</th>
                        <td><span class="result-coin"></span></td>
                    </tr>
                    <tr>
                        <th>Quantité</th>
                        <td><span class="result-quantity"></span></td>
                    </tr>
                    <tr>
                        <th class="label-current-price" data-prefix="Prix">Prix 1 BTC</th>
                        <td><span class="result-current-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valeur actuelle</th>
                        <td><span class="result-current-value"></span></td>
                    </tr>
                    <tr>
                        <th>Prix futur</th>
                        <td><span class="result-target-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valeur future</th>
                        <td><span class="result-future-value"></span></td>
                    </tr>
                    <tr>
                        <th>Gain / Perte</th>
                        <td><span class="result-gain"></span></td>
                    </tr>
                    <tr>
                        <th>Pourcentage</th>
                        <td><span class="gained-percentage"></span></td>
                    </tr>
                </table>
            </div>
            {% include calculator_affiliate_banner.html %}
        </div>
        <div class="error coin-error">
            <span>Cette crypto-monnaie n'est pas dans notre système.</span>
            <div>N'oubliez pas d'essayer avec le code de devise au lieu du nom complet.</div>
            <div>Par exemple: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
        </div>
    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/simulator.js?{{site.time | date: '%s%N'}}"></script>

## Comment utiliser le simulateur

Entrez la crypto-monnaie que vous détenez, la quantité que vous possédez et le prix futur auquel vous pensez qu'elle pourrait atteindre. Le simulateur calculera combien vaudrait votre portefeuille à ce prix et quel serait votre gain ou perte par rapport à la valeur actuelle.

## Comment la valeur future est-elle calculée

**Valeur future = Quantité × Prix cible**

**Gain (%) = ((Valeur future / Valeur actuelle) − 1) × 100**

Par exemple : si vous détenez 2 BTC et pensez que Bitcoin atteindra 200 000 $, le simulateur montre que vos 2 BTC vaudraient 400 000 $ dans ce scénario.
