---
title: ICOs Profits
permalink: "/en/icos/"
layout: page
description: The ICOs that raised the most funds ever, search and find the most profitable ICOs.
banner_image: pages/ico.webp
sitemap: true
noMargins: true
lang: en
sidebar: false
---

<div class="entry-header"></div>
<div class="entry-content">
    Below you can find a table with the 52 ICOs that have raised the most funds together with their current price so that an assessment of how successful they have been for their investors can be made.
    The valuation of the total funds collected is calculated based on the value at which BTC and ETH were at the time of completion of each ICO, and therefore they do not have to reflect the real funds that each project has had at its disposal. The normal thing is to consider that each project spent a good amount of those collections in dollars, but they would also keep a good amount of cryptocurrencies whose prices have fluctuated over time.
    As a reference I have added at the end certain cryptocurrencies that are listed among the first positions and that also carried out ICOs but did not manage to raise such large amounts. For example IOTA raised just $ 434,000 but instead has become one of the most profitable ICOs for its few initial investors.
    In the event that a cryptocurrency has carried out more than one ICO, as is the case with NEO, only its first time has been considered when calculating its profits.
    They are left out of the ranking Filecoin that raised $ 257,000,000 for being only futures and the cryptocurrency of Telegram Open Network called GRAM that raised $ 1,700,000,000 but is not yet listed. 
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

<script type="text/javascript" src="{{ site.baseurl }}/js/jquery.js?{{site.time | date: '%s%N'}}"></script>

<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.10.16/api/processing().js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>

<script>
    const coins = {{ site.data.coins | jsonify }};
    const icos = {{ site.data.icos | jsonify }};
</script>

<script type="text/javascript" src="{{ site.baseurl }}/js/lang.js?{{site.time | date: '%s%N'}}"></script>
<script type="text/javascript" src="{{ site.baseurl }}/js/icos.js?{{site.time | date: '%s%N'}}"></script>
