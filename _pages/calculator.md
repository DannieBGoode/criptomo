---
layout: page
title: Calculadora de beneficios
description: Calculadora, calcula cuanto dinero podrías haber ganado invirtiendo en Bitcoin y otras criptomonedas a tiempo.
banner_image: calculator.jpg
permalink: /calculadora/
comments: true
sitemap: true
---

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
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="DASH" min="2014-02-04">Dash</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">Otra moneda...</option>
			</select>
            <input class="calculator-othercoins" autofocus />
            <div class="calculator-othercoins"><span>Es posible que no todas las monedas estén soportadas por la API.</span></div>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Fecha de compra</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">
        </div>
    </div>
    <button class="calculate-button" onclick="calculateEarnings()">Calcular</button>
    <div class="loader calculator-loader-container"></div>
    <div class="calculator-result-container">
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


<script src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>	