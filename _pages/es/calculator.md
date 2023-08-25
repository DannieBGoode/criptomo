---
title: ▷ Calculadora de Bitcoin y Criptomonedas
permalink: "/calculadora/"
layout: page
description: "\U0001F4B5 Calculadora de Bitcoin, Ethereum y otras Criptomonedas. Simulador de ganancias."
banner_image: pages/calculator.webp
schema: true
rating: 5
totalVotes: 15
comments: false
sitemap: true
css: calculator
ref: calculator
popular: true
lang: es
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>Para cálculos de inversión periódica teneis la <a href="/inversion">calculadora avanzada</a>.</small>
    </div>
</div>

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Inversión</label>
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
            <label for="invest-currency">Criptomoneda</label>
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
				<option class="editable">Otra moneda...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" autofocus placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Es posible que no todas las monedas estén soportadas por la API.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-date">Fecha de compra</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calcular</button>
        
        <div id="calculator-results">
            <div class="calculator-results-text">
                Si hubieras invertido <span class="result-invest"></span> en <span class="result-tokentype"></span> el día <span class="result-date"></span> hubieras podido comprar a un precio de 
                <span class="result-old-price"></span> un total de 
                <span class="result-tokencount"></span> <span class="result-tokentype"></span>
                valorados a día de hoy en <span class="result-currentvalue"></span>.
            </div>
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

            {% include share_result.html %}

        </div>

        <p>
            <div class="error coin-error">
                <span>Esta criptomoneda no está cubierta por nuestro sistema.</span>
                <div>Recuerda probar con el código de la moneda en lugar del nombre completo.</div>
                <div>Por ejemplo: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
            </div>
            <div class="error date-error">
                <span>Esta fecha no está cubierta en nuestro historial.</span>
                <div>Prueba con otra fecha, por ejemplo <a class="suggestedDate">2022-05-01</a>.</div>
            </div>
        </p>

        

    </div>  

    {% include cta.html %}

    <div class="recommended-articles-wrapper" style="display: none">
        <h4>Artículos Recomendados</h4>
        <div class="recommended-articles"></div>
    </div>
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}"></script>

## Instrucciones de la calculadora de Bitcoin

La calculadora de bitcoin y criptomonedas te permite averiguar cuál habría sido tu beneficio si hubieras invertido en Bitcoin y otras criptomonedas a tiempo.

Para utilizar esta calculadora como simulador de ganancias, simplemente ingresa la inversión inicial que deseas calcular y elige la criptomoneda que deseas simular.

Puedes seleccionar otras criptomonedas que no estén incluidas en el menú desplegable de la calculadora, pero asegúrate de ingresar el código exacto de la criptomoneda que deseas simular. Por ejemplo:

- Para DOGECOIN, utiliza el código "DOGE".
- Para ETHEREUM, utiliza el código "ETH".
- Para BITCOIN, utiliza el código "BTC".

Ten en cuenta que es posible que la calculadora y el conversor no incluyan todas las criptomonedas disponibles.

Al seleccionar la fecha de venta en la calculadora, es posible que no puedas elegir el día actual si los mercados aún no han cerrado. En ese caso, elige "Ayer" como fecha de venta.

Además, ten en cuenta que al simular las ganancias de una criptomoneda, es posible que elijas una fecha anterior a la creación de la misma. En caso de que esto ocurra, recibirás un mensaje de error indicando que la fecha seleccionada no está disponible en nuestro historial.

Por último, el conversor y la calculadora de bitcoin te permiten elegir entre las monedas euros (EUR) o dólares (USD) al calcular tus ganancias.