---
title: Cotizaciones
permalink: "/cotizaciones/"
layout: page
description: Cotización, Capitalización total de Bitcoin, Ethereum, Ripple y las principales
  criptomonedas en el mercado.
banner_image: pages/marketcaps.webp
sitemap: true
noMargins: true
sidebar: false
lang: es
ref: marketcap
jquery: true
---

<small class="error api-error">Error de conexión, tu Adblock bloquea la API de cotizaciones.</small>
<div class="marketcaps-table-top">
    <div class="marketcaps-table-filter">
        <label>
            Buscar
            <input type="search" id="marketcaps-filter-input">
        </label>
    </div>
    <div class="marketcaps-table-currency">
        <label>
            Moneda
            <select id="marketcaps-currency-select">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
            </select>
        </label>
    </div>
    <div class="marketcaps-table-pagelength">
        <label>
            Items
            <select id="marketcaps-pagelength-select">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option selected="selected" value="100">100</option>
            </select>
        </label>
    </div>
</div>

<table id="marketcaps-table" class="display" width="100%"></table>

<div class="marketcaps-table-footer">
	<a href="https://coinmarketcap.com/" rel="nofollow">Más Cotizaciones</a>
</div>

<script defer src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
<script defer src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>
<script defer src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script>
    var coins = {{ site.data.coins | jsonify }};
    var iconsBaseUrl = '{{ site.iconsBaseUrl }}';
    var marketcapsCoinsLimit = '{{ site.marketcapsCoinsLimit }}';
</script>

<script defer src="{{ site.baseurl }}/js/lang.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/marketcaps.js?{{site.time | date: '%s%N'}}"></script>
