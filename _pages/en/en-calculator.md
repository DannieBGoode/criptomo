---
layout: page
title: Cryptocurrencies Profit Calculator
description: 💵 Calculator, calculate how much money you could have won investing in Bitcoin and other cryptocurrencies. 💹 Profits.
banner_image: pages/calculator.webp
permalink: /en/calculator/
schema: true
rating: 5
totalVotes: 39
comments: true
sitemap: true
loadsPlugins: true
lang: en
redirect_from:
    - /calculator
    - /calculator/
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>For periodical investments please use our <a href="/investment">advanced calculator</a>.</small>
    </div>
</div>
<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Investment</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000">
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Cryptocurrency</label>
        </div>
        <div class="calculator-col-end">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08">Ethereum</option>
				<option value="LTC"  min="2013-09-15">Litecoin</option>
                <option value="MIOTA"  min="2017-06-14">IOTA</option>
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="DASH" min="2014-02-04">Dash</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">Other asset...</option>
			</select>
            <input width="150" class="calculator-othercoins" autofocus />
        </div>
    </div>
    <div class="calculator-othercoins"><span>It might possible that not all cryptocurrencies are covered by the server.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Purchase Date</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calculate</button>
        <div id="calculator-results">
            If you had invested <span id="result-invest"></span> on <span id="result-tokentype1"></span> the day <span id="result-date"></span> you would have had the opportunity of buying at a price of 
            <span id="result-old-price"></span> a total of
            <span id="result-tokencount"></span> <span id="result-tokentype2"></span>
            valued today <span id="result-currentvalue"></span>.
            <div>Profits: <span id="gained-percentage"></span></div>
        </div>
        <p>
            <span class="error coin-error">This cryptocurrency is not in our system.</span>
            <span class="error date-error">This date is not in our register.</span>
        </p>
    </div>

    <!-- Calculator Banner -->
    <ins class="adsbygoogle white-ad"
         style="display:block"
         data-ad-client="ca-pub-1252171391624665"
         data-ad-slot="1002456567"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    
</div>

<script src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
