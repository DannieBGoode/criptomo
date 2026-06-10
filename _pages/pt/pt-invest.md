---
title: Calculadora DCA de Criptomoedas
permalink: "/pt/calculadora-dca/"
layout: page
description: Calculadora DCA de criptomoedas. Invista regularmente em Bitcoin, Ethereum e outras criptomoedas e calcule o valor atual.
banner_image: pages/investment.webp
schema: true
sitemap: true
lang: pt
ref: invest
jquery: true
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>Para investimentos únicos, use a nossa <a href="/pt/calculadora/">calculadora simples</a>.</small>
    </div>
</div>
<div class="calculator-block" style="margin-bottom: 20px">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Se tivesse investido</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000">
            <label for="invest-fiat" class="screen-reader-text">Moeda</label>
            <select id="invest-fiat">
                <option value="USD">USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">na criptomoeda</label>
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
                <option class="editable">Outro ativo...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" autofocus />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Pode ser que nem todas as criptomoedas sejam suportadas pela API.</span></div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-interval">a cada </label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-interval">
                <option value="9999">Apenas uma vez</option>
                <option value="1">Dia</option>
                <option value="7">Semana</option>
                <option value="30">Mês</option>
                <option value="365">Ano</option>
            </select>
            <div class="calculator-col-start" style="display:inline">
                <label for="invest-date">a partir de </label>
            </div>
            <div class="calculator-col-end" style="display:inline">
                <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">
            </div>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calcular</button>
        <div id="calculator-results">
            Agora teria um total de
            <span id="result-tokencount"></span> <span id="result-tokentype"></span>
            avaliados hoje em <span id="result-currentvalue"></span> <span id="result-fiat"></span>.
        </div>
        <p>
            <span class="error coin-error">Esta criptomoeda não está coberta pelo nosso sistema.</span>
            <span class="error date-error">Esta data não está incluída no nosso histórico.</span>
            <span class="error api-error">Os dados de preço do mercado não estão disponíveis neste momento. Tente novamente em alguns minutos.</span>
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
