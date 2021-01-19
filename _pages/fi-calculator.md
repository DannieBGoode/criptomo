---
layout: page
title: 💵 Calculadora de FIRE
description: 💵 Calculadora online de (Independencia Financiera), FIRE, calcula cuando te podrías jubilar ó retirar y obtener la independencia o libertad financiera.
banner_image: pages/fi.png
permalink: /calculadora-fire/
schema: true
rating: 5
totalVotes: 15
comments: false
sitemap: true
---
<small>
    Calcula en cuántos años podrías jubilarte con la calculadora de Independencia Financiera FIRE.
    Esta herramienta supone que todo el dinero ahorrado está generado rendimientos al porcentaje que elijas.
</small>
<div class="calculator-block  calculator-fi">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Edad:</label>
        </div>
        <div class="calculator-col-end">
            <input id="fi-age" type="number" value="30" max="100" onchange="calculateFI()">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Divisa:</label>
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
            <label>Ahorros Actuales Invertidos:</label>
        </div>
        <div class="calculator-col-end">
            <input id="fi-accumulated" type="number" value="1000" onchange="calculateFI()" step="500">  <span class="currency-text">EUR</span>
            
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Ingresos Anuales:</label>
            <div>
                <small>(<span id="monthly-salary-text">2500</span> <span class="currency-text">EUR</span> mensuales)</small>
            </div>
        </div>
        <div class="calculator-col-end">
            <input id="fi-salary" type="number" value="30000" onchange="updateMonthlyRevenue();calculateFI()" step="500"> <span class="currency-text">EUR</span>
        </div>
    </div>

    <div class="calculator-form-row">
            <div class="calculator-col-start">
                <label>Tasa de Ahorro:</label>
                <div>
                    <small>( <span id="savings-ratio-text">10</span>% de ahorro: <span id="savings-ratio-yearly-text">1200 EUR</span> anuales)</small>
                </div>
            </div>
            <div class="calculator-col-end">
                <input id="fi-savings-ratio" type="range" min="5" max="100" value="10" step="5" oninput="updateSavingsRatio()">
            </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Rendimiento Inversiones:</label>
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
            <label>Patrimonio Deseado:</label>
        </div>
        <div class="calculator-col-end">
            <input id="fi-desired-networth" type="number" value="1250000" onchange="calculateFI()"> <span class="currency-text">EUR</span>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="fi-calculator-result-container">
        <!-- <button class="calculate-button" onclick="calculateFI()">Calcular</button> -->
        
        <div id="fi-calculator-results">

            <div id="fi-results-table">
                <table>
                        <thead>
                            <tr>
                                <th>Ahorro</th>
                                <th>Gastos anuales</th>
                                <th>Ahorro anual</th>
                                <th>Años para IF</th>
                                <th>Edad de retiro</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                </table>
            </div>
        </div>

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

<script defer src="{{ site.baseurl }}/js/fi.js?{{site.time | date: '%s%N'}}"></script>
