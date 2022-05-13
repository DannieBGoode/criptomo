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
            <div class="error coin-error">
                <span>Esta criptomoneda no está cubierta por nuestro sistema.</span>
                <div>Recuerda probar con el código de la moneda en lugar del nombre completo.</div>
                <div>Por ejemplo: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
            </div>
            <div class="error date-error">
                <span>Esta fecha no está cubierta en nuestro historial.</span>
                <div>Prueba con otra fecha, por ejemplo <a>2021-04-01</a>.</div>
            </div>
        </p>
    </div>

    {% include ads_calculator_banner.html %}

    {% if site.ads.stormgain %}
    <div class="stormgain">
        <h2><a rel="nofollow" href="https://go.stormgain.app/visit/?bta=112218&nci=5380">Compra <span class="result-tokentype"></span> Ahora!</a></h2>
        <div>
            <a href="https://go.stormgain.app/visit/?bta=112218&nci=12429" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608832"  width="492" height="328"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=12424" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608833"  width="492" height="328"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11231" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608835"  width="1200" height="630"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11147" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608836"  width="336" height="280"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11146" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608837"  width="320" height="100"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11143" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608838"  width="300" height="250"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=10110" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608840"  width="256" height="256"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=10116" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608841"  width="492" height="328"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=6602" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608842"  width="300" height="250"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=6193" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608843"  width="300" height="250"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=6155" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608844"  width="768" height="1024"></a>
        </div>
        <p class="bonus">
            Incluye:
            <ul>
                <li> Cripto Minero en la nube para principiantes y expertos</li>
                <li> Bonos por depósitos (25 usdt por depósitos desde $100)</li>
                <li> Intereses sobre depósitos (12% del monto depositado)</li>
                <li> Cartera criptográfica</li>
                <li> Cripto Exchange</li>
                <li> Trading de pares de divisas con multiplicador hasta x300</li>
                <li> Cuenta Demo de 50K USDT</li>
                <li> Plataforma Educativa</li>
                <li> Patrocinador oficial de la Lazio Fútbol Club</li>
            </ul>
        </p>
        <a rel="nofollow" href="https://go.stormgain.app/visit/?bta=112218&nci=5380">Empieza tu aventura crypto en Stormgain</a>
    </div>
    {% endif %}

    <div class="recommended-articles-wrapper" style="display: none">
        <h2>Artículos Recomendados</h2>
        <div class="recommended-articles">
        </div>
    </div>
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}"></script>

## Instrucciones de la calculadora de Bitcoin

Con está calculadora de ganancias crypto podrás averiguar qué beneficio podrías haber obtenido invirtiendo en Bitcoin y otras criptomonedas a tiempo.

Para utilizar esta calculadora de bitcoin como simulador de ganancias, ingresa la inversión inicial que deseas calcular y elije la criptomoneda que deseas simular.

Puedes elegir otras criptomonedas no incluidas en el menú desplegable, pero asegúrate de ingresar el código exacto que tiene la criptomoneda a simular. Por ejemplo:
- en lugar de DOGECOIN escribe **DOGE**.
- en lugar de ETHEREUM introduce **ETH**.
- en lugar de BITCOIN introduce **BTC**.

Es posible que la API no cubra todas las criptomonedas.

Al seleccionar la fecha de venta, dependiendo de la hora, puede que no sea posible elegir hoy si los mercados aún no se han registrado como cerrados. Si es así, elije "Ayer" como fecha de venta.

De nuevo, es posible que al simular las ganancias de una criptomoneda se elija una fecha anterior a la creación de la criptomoneda, si se da este caso se te indicará con un mensaje de error informándote de que la fecha seleccionada no se encuentra en nuestro historial.

Además con el conversor / calculadora bitcoin podrás elegir entre las monedas euros (EUR) o dólares (USD) a la hora de calcular tus ganancias de tu moneda.

