---
layout: page
title: ICOs
description: The ICOs that raised the most funds ever.
banner_image: pages/ico.jpg
permalink: /en/icos/
comments: true
sitemap: true
loadsPlugins: true
noMargins: true
lang: en
---

<div class="entry-header"></div>
<div class="entry-content">
    Below you can find a table with all the <a href="/que-es-una-ico"> ICOs</a> that have raised the most funds next to their current price so that you can make an assessment of how successful they have turned out for their investors.

    We left out of the ranking Filecoin (FIL) that raised $257,000,000 due to only trading futures and Telegram Open Network (GRAM) that raised 1,700,000,000 but is not yet listed publicly.
</div>

<small class="error api-error">Conection error, your Adblock might be blocking the marketcaps API. Please try turning it off.</small>
<div class="marketcaps-table-top">
    <div class="marketcaps-table-filter">
        <label>
            Search
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
