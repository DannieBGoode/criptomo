---
layout: page
title: Gewinnrechner für Bitcoin und Kryptowährungen
description: 💵 Berechnen Sie mit dem Bitcoin-Rechner, wie viel Gewinn Sie mit der Investition in Bitcoin und andere Kryptowährungen hätten erzielen können. 💹 Gewinne.
banner_image: pages/calculator.webp
permalink: /de/calculator/
schema: true
rating: 5
totalVotes: 39
comments: false
sitemap: true
loadsPlugins: true
lang: de
css: calculator
redirect_from:
    - /de/
    - /de
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px; display:none">
        <small>For periodical investments please use our <a href="/investment">advanced calculator</a>.</small>
    </div>
</div>
<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Investition</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000" class="data-hj-allow">
            <select id="invest-fiat">
                <option>EUR</option>
                <option>USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Kryptowährung</label>
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
				<option class="editable">Sonstige...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" autofocus placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Möglicherweise werden nicht alle Kryptowährungen vom Server abgedeckt.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Kaufdatum</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Berechnung</button>
        <div id="calculator-results">
            Wenn Sie am Tag <span class="result-date"></span> <span class="result-invest"></span> in <span class="result-tokentype"></span> investiert hätten, hätten Sie die Möglichkeit gehabt, zu einem Preis von 
            <span class="result-old-price"></span> insgesamt
            <span class="result-tokencount"></span> <span class="result-tokentype"></span>
            im Wert von heute <span class="result-currentvalue"></span> zu kaufen.
            <div>Gewinn: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>KAUF</small></th>
                            <th>Vermögenswert</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Ursprüngliche Investition</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Kaufdatum </th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Kaufpreis</th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Gekaufte Vermögenswerte </th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>VERKAUF</small></th>
                            <th>Verkaufsdatum </th>
                            <td><span>Heute</span></td>
                        </tr>
                        <tr>
                            <th>Verkaufspreis</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Investitionswert</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Gewinnprozentsatz</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
            </div>
        </div>
        <p>
            <span class="error coin-error">Diese Kryptowährung befindet sich nicht in unserem System.</span>
            <span class="error date-error">Dieses Datum ist nicht in unserem Register.</span>
        </p>
    </div>

    <!-- Calculator Banner -->
    <ins class="adsbygoogle white-ad"
         style="display:block"
         data-ad-client="ca-pub-1252171391624665"
         data-ad-slot="1002456567"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
