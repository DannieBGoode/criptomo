---
title: Simulador de Precio Futuro de Bitcoin y Criptomonedas
permalink: "/simulador/"
layout: page
description: "Simula el valor futuro de tus criptomonedas. Introduce tu cantidad y un precio objetivo para ver cuánto valdrían tus holdings."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
schema: true
css: calculator
comments: false
sitemap: true
ref: simulator
body_class: calculator-page
lang: es
mailchimp_tracking: false
---

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Criptomoneda</label>
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
                <option class="editable">Otra moneda...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Es posible que no todas las monedas estén soportadas por la API.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Cantidad que tienes</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1" step="any" class="data-hj-allow">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-target-price">Precio Futuro</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-target-price" type="number" value="100000" step="any" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Moneda</label>
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>

    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateSimulator()">Calcular</button>
        <div class="simulator-placeholder">
            <div class="simulator-placeholder-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            </div>
            <p>Introduce los datos y pulsa <strong>Calcular</strong> para ver tu simulación</p>
        </div>
        <div id="simulator-results">
            <div id="simulator-results-table">
                <table>
                    <tr>
                        <th>Criptomoneda</th>
                        <td><span class="result-coin"></span></td>
                    </tr>
                    <tr>
                        <th>Cantidad</th>
                        <td><span class="result-quantity"></span></td>
                    </tr>
                    <tr>
                        <th class="label-current-price" data-prefix="Precio">Precio 1 BTC</th>
                        <td><span class="result-current-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valor actual</th>
                        <td><span class="result-current-value"></span></td>
                    </tr>
                    <tr>
                        <th>Precio Futuro</th>
                        <td><span class="result-target-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valor futuro</th>
                        <td><span class="result-future-value"></span></td>
                    </tr>
                    <tr>
                        <th>Ganancia / Pérdida</th>
                        <td><span class="result-gain"></span></td>
                    </tr>
                    <tr>
                        <th>Porcentaje</th>
                        <td><span class="gained-percentage"></span></td>
                    </tr>
                </table>
            </div>
            {% include calculator_affiliate_banner.html %}
        </div>
        <div class="error coin-error">
            <span>Esta criptomoneda no está cubierta por nuestro sistema.</span>
            <div>Recuerda probar con el código de la moneda en lugar del nombre completo.</div>
            <div>Por ejemplo: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
        </div>
    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/simulator.js?{{site.time | date: '%s%N'}}"></script>

## Cómo usar el simulador

Introduce la criptomoneda que tienes, la cantidad que posees y el precio futuro al que crees que podría llegar. El simulador calculará cuánto valdrían tus holdings a ese precio y cuál sería tu ganancia o pérdida respecto al valor actual.

## Cómo se calcula el valor futuro

**Valor futuro = Cantidad × Precio objetivo**

**Ganancia (%) = ((Valor futuro / Valor actual) − 1) × 100**

Por ejemplo: si tienes 2 BTC y crees que Bitcoin llegará a 200.000 $, el simulador muestra que tus 2 BTC valdrían 400.000 $ en ese escenario.
