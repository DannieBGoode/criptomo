---
layout: page
title: Cotizaciones
description: Cotizaciones de Bitcoin y otras criptomonedas
banner_image: marketcaps.jpg
permalink: /cotizaciones/
comments: true
sitemap: true
loadsPlugins: true
---

<!-- table must allow to select either EUR or USD (both included in the response) -->

<!-- we will receive 300 results from the API, and sort / filter them directly in the frontend -->

<table id="marketcaps-table" class="display" width="100%"></table>

<div style="text-align:right">
	<a href="https://coinmarketcap.com/">Más Cotizaciones</a>
</div>

<script type="text/javascript" src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/js/marketcaps.js?{{site.time | date: '%s%N'}}"></script>