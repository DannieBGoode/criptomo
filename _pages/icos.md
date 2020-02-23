---
layout: page
title: ICOs
description: Las ICOs que más dinero han recaudado de la historia. Las más exitosas.
banner_image: pages/ico.jpg
permalink: /icos/
comments: true
sitemap: true
loadsPlugins: true
noMargins: true
---

<div class="entry-header"></div>
<div class="entry-content">
    A continuación podéis encontrar una tabla con todas las <a href="/que-es-una-ico">ICOs</a> que más dinero han levantado junto a su precio actual para que se pueda hacer una valoración de cómo de exitosas han resultado para sus inversores.
    Quedan fuera del ranking Filecoin que recaudó $257,000,000 por tratarse únicamente de futuros y GRAM que recaudó 1,700,000,000 pero todavía no cotiza.
</div>

<small class="error api-error">Error de conexión, tu Adblock bloquea la API de cotizaciones.</small>
<div class="marketcaps-table-top">
    <div class="marketcaps-table-filter">
        <label>
            Buscar
            <input type="search" id="marketcaps-filter-input">
        </label>
    </div>
</div>

<table id="marketcaps-table" class="display" width="100%"></table>

<script type="text/javascript" src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script>
    const coins = {{ site.data.coins | jsonify }};
    const icos = {{ site.data.icos | jsonify }};
</script>

<script type="text/javascript" src="{{ site.baseurl }}/js/lang.js?{{site.time | date: '%s%N'}}"></script>
<script type="text/javascript" src="{{ site.baseurl }}/js/icos.js?{{site.time | date: '%s%N'}}"></script>