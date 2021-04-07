---
title: Cartera de Inversión de Criptomonedas
permalink: "/inversion/"
layout: page
description: Cartera de Inversión de Criptomonedas, invierte periodicamente y calcula
  tus ganancias de Bitcoin
banner_image: pages/investment.webp
schema: true
rating: 5
totalVotes: 25
comments: true
sitemap: true
loadsPlugins: true
lang: es
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>Para cálculos de inversión puntuales teneis la <a href="/calculadora">calculadora simple</a>.</small>
    </div>
</div>
<div class="calculator-block" style="margin-bottom: 20px">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Si hubieras invertido</label>
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
            <label>en la criptomoneda</label>
        </div>
        <div class="calculator-col-end">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08" disabled>Ethereum</option>
				<option value="LTC"  min="2013-09-15" disabled>Litecoin</option>
                <option value="IOT"  min="2017-06-14" disabled>IOTA</option>
				<option value="XMR"  min="2015-01-27" disabled>Monero</option>
				<option value="DASH" min="2014-02-04" disabled>Dash</option>
				<option value="XRP"  min="2015-01-30" disabled>Ripple</option>
				<option class="editable" disabled>Otra moneda...</option>
			</select>
            <input width="150" class="calculator-othercoins" autofocus />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Es posible que no todas las monedas estén soportadas por la API.</span></div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>con frecuencia de cada </label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-interval">
                <option value="9999">Una sola vez</option>
                <option value="1">Día</option>
                <option value="7">Semana</option>
                <option value="30">Mes</option>
                <option value="365">Año</option>
            </select>
            <div class="calculator-col-start" style="display:inline">
                <label>empezando el día </label>
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
            Ahora tendrías un total de 
            <span id="result-tokencount"></span> <span id="result-tokentype"></span>
            valorados a día de hoy en <span id="result-currentvalue"></span> <span id="result-fiat"></span>.
        </div>
        <p>
            <span class="error coin-error">Esta criptomoneda no está cubierta por nuestro sistema.</span>
            <span class="error date-error">Esta fecha no está cubierta en nuestro historial.</span>
        </p>
    </div>
</div>

<table id="investment-table" class="display" width="100%"></table>

<div class="ad-space">
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
<script src="{{ site.baseurl }}/js/lang.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/invest.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>
