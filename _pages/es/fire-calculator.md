---
title: "\U0001F4B5 Calculadora de FIRE"
permalink: "/calculadora-fire/"
layout: page
description: "\U0001F4B5 Calculadora online de (Independencia Financiera), FIRE, calcula
  cuando te podrías jubilar ó retirar y obtener la independencia o libertad financiera."
banner_image: pages/fi.webp
schema: true
rating: 5
totalVotes: 15
comments: false
sitemap: true
lang: es
ref: fire-calculator
---

<small>
    Calcula en cuántos años podrías jubilarte con la calculadora de Independencia Financiera FIRE.
    Esta herramienta supone que todo el dinero ahorrado está generando rendimientos al porcentaje que elijas.
</small>
<div class="calculator-block  calculator-fi">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-age">Edad:</label>
        </div>
        <div class="calculator-col-end">
            <input id="fi-age" type="number" value="30" max="100" oninput="calculateFI()">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-fiat">Divisa:</label>
        </div>
        <div class="calculator-col-end">
            <select id="fi-fiat" onchange="updateCurrency()">
                <option>EUR</option>
                <option>USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-accumulated">Ahorros Actuales Invertidos:</label>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-accumulated" type="number" value="1000" onchange="calculateFI()" step="500" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">EUR</span>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-salary">Ingresos Anuales:</label>
            <div>
                <small>(<span id="monthly-salary-text">2500</span> <span class="currency-text">EUR</span> mensuales)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-salary" type="number" value="30000" oninput="updateMonthlyRevenue();calculateFI()" step="500" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">EUR</span>
        </div>
    </div>

    <div class="calculator-form-row">
            <div class="calculator-col-start">
                <label for="fi-savings-ratio">Tasa de Ahorro:</label>
                <div>
                    <small>( 
                        <span id="savings-ratio-text">10</span>% de ahorro:
                        <span id="savings-ratio-monthly-text">100 </span>
                        <span class="currency-text">EUR</span> mensuales / 
                        <span id="savings-ratio-yearly-text">1200 </span> 
                        <span class="currency-text">EUR</span> anuales)
                    </small>
                </div>
            </div>
            <div class="calculator-col-end">
                <input id="fi-savings-ratio" type="range" min="0" max="100" value="10" step="5" oninput="updateSavingsRatio()">
            </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-investment-returns">Rendimiento Inversiones:</label>
            <div>
                <small>( <span id="returns-ratio-text">10</span>% de retorno anual esperado)</small>
            </div>
        </div>
        <div class="calculator-col-end">
            <input id="fi-investment-returns" type="range" min="0.5" max="50" value="10" step="0.5" oninput="updateReturnsRatio();calculateFI()">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-method">Método de retiro:</label>
            <div>
                <small>(Patrimonio Deseado / <a href="/que-es-fire/">SWR</a>)</small>
            </div>
        </div>
        <div class="calculator-col-end">
            <div class="onoffswitch">
                <input type="checkbox" name="fi-method" class="onoffswitch-checkbox" onchange="updateFIMethod()" id="fi-method" tabindex="0">
                <label class="onoffswitch-label" for="fi-method"></label>
            </div>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-desired-networth">Patrimonio Deseado:</label>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-desired-networth" type="number" value="1250000" oninput="updateDesiredNetworth()" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">EUR</span>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-yearly-spending">Gastos Anuales:</label>
            <div>
                <small>(<span id="monthly-income-text">4166.67</span> <span class="currency-text">EUR</span> mensuales)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-yearly-spending" type="number" value="50000" onchange="updateSWR()" class="InputAddOn-field" disabled> <span class="currency-text InputAddOn-item">EUR</span>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="fi-swr">Tasa de Retiro Anual:</label>
            <div>
                <small>(Debería ser menor o igual que el Rendimiento esperado)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-swr" type="number" value="4" max="100" onchange="updateSWR()" class="InputAddOn-field" disabled> <span class="InputAddOn-item">%</span>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="fi-calculator-result-container">
        <!-- <button class="calculate-button" onclick="calculateFI()">Calcular</button> -->
        
        <div id="fi-calculator-results">
<!--             Con unos ingresos de <span class="results-income"></span> al año si inviertes un <span class="results-save-rate"></span>% estarías ahorrando <span class="results-yearly-savings"></span> al año y podrías jubilarte dentro de <span class="results-years-to-fi"></span> años a la edad de <span class="results-fi-age"></span> años con un patrimonio de <span class="results-networth"></span>. -->

            <div id="fi-results-table">
                <table>
                        <thead>
                            <tr>
                                <th>Ahorro</th>
                                <th>Gastos anuales</th>
                                <th>Ahorro anual</th>
                                <th>Años para IF</th>
                                <th>Edad de jubilación</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                </table>
            </div>
        </div>

    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/fi.js?{{site.time | date: '%s%N'}}"></script>
