---
layout: page
title: Bitcoin and Cryptocurrencies Profit Calculator
description: 💵 Bitcoin Calculator, calculate how much profit you could have earned investing in Bitcoin and other cryptocurrencies. 💹 Profits.
banner_image: pages/calculator.webp
permalink: /en/calculator/
schema: true
rating: 5
totalVotes: 39
comments: false
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
            If you had invested <span class="result-invest"></span> on <span class="result-tokentype"></span> the day <span class="result-date"></span> you would have had the opportunity of buying at a price of 
            <span class="result-old-price"></span> a total of
            <span class="result-tokencount"></span> <span class="result-tokentype"></span>
            valued today <span class="result-currentvalue"></span>.
            <div>Profits: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>PURCHASE</small></th>
                            <th>Asset</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Original Investment</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Purchase Date</th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Purchase Price</th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Assets Bought</th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>SALE</small></th>
                            <th>Sale Date</th>
                            <td><span>Today</span></td>
                        </tr>
                        <tr>
                            <th>Sale Price</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Investment Value</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Profit Percentage</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
            </div>
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

<script defer src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
