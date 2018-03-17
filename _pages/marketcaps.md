---
layout: page
title: Cotizaciones
description: Cotización de Bitcoin, Ethereum, Ripple y las principales criptomonedas en el mercado.
banner_image: pages/marketcaps.jpg
permalink: /cotizaciones/
comments: true
sitemap: true
loadsPlugins: true
noMargins: true
---

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
	<a href="https://coinmarketcap.com/">Más Cotizaciones</a>
</div>

<script type="text/javascript" src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>

<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/js/marketcaps.js?{{site.time | date: '%s%N'}}"></script>