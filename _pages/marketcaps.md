---
layout: page
title: Cotizaciones
description: Cotización de Bitcoin, Ethereum, Ripple y las principales criptomonedas en el mercado.
banner_image: marketcaps.jpg
permalink: /cotizaciones/
comments: true
sitemap: true
loadsPlugins: true
noMargins: true
---

<table id="marketcaps-table" class="display" width="100%"></table>

<div class="marketcaps-table-footer">
	<a href="https://coinmarketcap.com/">Más Cotizaciones</a>
</div>

<script type="text/javascript" src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/js/marketcaps.js?{{site.time | date: '%s%N'}}"></script>