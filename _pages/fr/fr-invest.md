---
title: Calculateur DCA Crypto-monnaies
permalink: "/fr/calculateur-dca/"
layout: page
description: Calculateur DCA crypto. Investissez régulièrement en Bitcoin, Ethereum et autres crypto-monnaies et calculez la valeur actuelle.
banner_image: pages/investment.webp
schema: true
sitemap: true
lang: fr
ref: invest
jquery: true
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>Pour les investissements ponctuels, utilisez notre <a href="/fr/calculateur/">calculateur simple</a>.</small>
    </div>
</div>
<div class="calculator-block" style="margin-bottom: 20px">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Si vous aviez investi</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000">
            <label for="invest-fiat" class="screen-reader-text">Devise</label>
            <select id="invest-fiat">
                <option value="USD">USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">dans la crypto-monnaie</label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-currency" onchange="updateInputMinDate()">
                <option value="BTC" min="2010-07-18">Bitcoin</option>
                <option value="ETH" min="2015-08-08">Ethereum</option>
                <option value="LTC" min="2013-09-15">Litecoin</option>
                <option value="MIOTA" min="2017-06-14">IOTA</option>
                <option value="XMR" min="2015-01-27">Monero</option>
                <option value="ADA" min="2017-10-02">Cardano</option>
                <option value="XRP" min="2015-01-30">Ripple</option>
                <option class="editable">Autre actif...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" autofocus />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Il se peut que toutes les crypto-monnaies ne soient pas prises en charge par l'API.</span></div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-interval">tous les </label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-interval">
                <option value="9999">Une seule fois</option>
                <option value="1">Jour</option>
                <option value="7">Semaine</option>
                <option value="30">Mois</option>
                <option value="365">Année</option>
            </select>
            <div class="calculator-col-start" style="display:inline">
                <label for="invest-date">à partir du </label>
            </div>
            <div class="calculator-col-end" style="display:inline">
                <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">
            </div>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calculer</button>
        <div id="calculator-results">
            Aujourd'hui, vous auriez un total de
            <span id="result-tokencount"></span> <span id="result-tokentype"></span>
            d'une valeur de <span id="result-currentvalue"></span> <span id="result-fiat"></span>.
        </div>
        <p>
            <span class="error coin-error">Cette crypto-monnaie n'est pas couverte par notre système.</span>
            <span class="error date-error">Cette date n'est pas incluse dans notre historique.</span>
        </p>
    </div>
</div>

<table id="investment-table" class="display" width="100%"></table>

<div class="ad-space">
    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/lang.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
<script defer src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>
<script defer src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>
<script defer src="{{ site.baseurl }}/js/invest.js?{{site.time | date: '%s%N'}}"></script>
