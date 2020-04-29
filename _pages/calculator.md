---
layout: page
title: Calculadora de beneficios de criptos
description: Calculadora, calcula cuánto dinero podrías haber ganado invirtiendo en Bitcoin y otras criptomonedas a tiempo.
banner_image: pages/calculator.png
permalink: /calculadora/
schema: true
rating: 5
totalVotes: 15
comments: true
sitemap: true
loadsPlugins: true
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>Para cálculos de inversión periódica teneis la <a href="/inversion">calculadora avanzada</a>.</small>
    </div>
</div>

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Inversión</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000">
            <select id="invest-fiat">
                <option>EUR</option>
                <option>USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Criptomoneda</label>
        </div>
        <div class="calculator-col-end">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08">Ethereum</option>
				<option value="LTC"  min="2013-09-15">Litecoin</option>
                <option value="IOT"  min="2017-06-14">IOTA</option>
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="DASH" min="2014-02-04">Dash</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">Otra moneda...</option>
			</select>
            <input width="150" class="calculator-othercoins" autofocus />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Es posible que no todas las monedas estén soportadas por la API.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Fecha de compra</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calcular</button>
        
        <div id="calculator-results">
            Si hubieras invertido <span id="result-invest"></span> en <span id="result-tokentype1"></span> el día <span id="result-date"></span> hubieras podido comprar a un precio de 
            <span id="result-old-price"></span> un total de 
            <span id="result-tokencount"></span> <span id="result-tokentype2"></span>
            valorados a día de hoy en <span id="result-currentvalue"></span>.
            <div>Ganancia: <span id="gained-percentage"></span></div>
        </div>
        <p>
            <span class="error coin-error">Esta criptomoneda no está cubierta por nuestro sistema.</span>
            <span class="error date-error">Esta fecha no está cubierta en nuestro historial.</span>
        </p>
    </div>

    <!-- Calculator Banner -->
    <ins class="adsbygoogle white-ad"
         style="display:block"
         data-ad-client="ca-pub-1252171391624665"
         data-ad-slot="1002456567"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>

<script src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
