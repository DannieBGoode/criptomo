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

<div>
	<table data-order='[[ 1, "asc" ]]' data-page-length='25'>
		<thead>
			<th>#</th>
			<th></th>
			<th>Nombre</th>
			<th>Cotización</th>
			<th>Tokens en Circulación</th>
			<th>Precio</th>
			<th>1h</th>
			<th>24h</th>
		</thead>
		<tbody id="marketcaps-panel">
		</tbody>
	</table>
</div>

<div style="text-align:right">
	<a href="https://coinmarketcap.com/">Más Cotizaciones</a>
</div>


<table id="example" class="display" width="100%"></table>

<script type="text/javascript" src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

<script type="text/javascript" src="{{ site.baseurl }}/js/marketcaps.js?{{site.time | date: '%s%N'}}"></script>