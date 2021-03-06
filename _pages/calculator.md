---
layout: page
title: Calculadora de Bitcoin y Criptomonedas
description: 💵 Calculadora, calcula cuánto dinero y beneficios podrías haber ganado invirtiendo en Bitcoin y otras criptomonedas a tiempo. 💹 Simulador de ganancias de Bitcoin.
banner_image: pages/calculator.webp
permalink: /calculadora/
schema: true
rating: 5
totalVotes: 15
comments: false
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
                <option value="MIOTA"  min="2017-06-14">IOTA</option>
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
            Si hubieras invertido <span class="result-invest"></span> en <span class="result-tokentype"></span> el día <span class="result-date"></span> hubieras podido comprar a un precio de 
            <span class="result-old-price"></span> un total de 
            <span class="result-tokencount"></span> <span class="result-tokentype"></span>
            valorados a día de hoy en <span class="result-currentvalue"></span>.
            <div>Ganancia: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>COMPRA</small></th>
                            <th>Moneda</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Inversión Original</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Fecha de Compra</th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Precio de Compra</th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Criptomonedas Compradas</th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>VENTA</small></th>
                            <th>Fecha de Venta</th>
                            <td><span>Hoy</span></td>
                        </tr>
                        <tr>
                            <th>Precio de Venta</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Valor de inversión</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Porcentaje de ganancias</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
            </div>
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

<script defer src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
