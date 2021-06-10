---
title: ▷ Bitcoin and Crypto Profit Calculator
permalink: "/en/calculator/"
layout: page
description: "\U0001F4B5 Bitcoin Returns Calculator, Ethereum Calculator. Crypto Investment
  Profits."
banner_image: pages/calculator.webp
schema: true
rating: 5
totalVotes: 39
comments: false
sitemap: true
lang: en
css: calculator
ref: calculator
popular: true
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px">
        <small>For periodical investments please use our <a href="/investment">advanced calculator</a>.</small>
    </div>
</div>
<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Investment</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000" class="data-hj-allow">
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Cryptocurrency</label>
        </div>
        <div class="calculator-col-end">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08">Ethereum</option>
				<option value="LTC"  min="2013-09-15">Litecoin</option>
                <option value="MIOTA"  min="2017-06-14">IOTA</option>
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="ADA" min="2017-10-02">Cardano</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">Other asset...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" autofocus placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>It might be possible that not all cryptocurrencies are covered by the server.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-date">Purchase Date</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
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
            <div class="error coin-error">
                <span>This cryptocurrency is not in our system.</span>
                <div>
                    Remember to try with the currency code instead of the full name. 
                </div>
                <div>
                    For example: <a>DOGE</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...
                </div>
            </div>
            <div class="error date-error">
                <span>This date is not in our register.</span>
                <div>Try another date, for example <a>2021-04-01</a>.</div>
            </div>
        </p>
    </div>

    <!-- Calculator Banner -->
    <div class="lazy-load-ad" data-slot="1002456567"></div>

    <div class="recommended-articles-wrapper" style="display: none">
        <h2>Recommended Articles</h2>
        <div class="recommended-articles"></div>
    </div>
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}"></script>



## Bitcoin Calculator Instructions

With this crypto profit calculator you can find out what profit you could have obtained by investing in Bitcoin and other cryptocurrencies in time. 

In order to use this **bitcoin calculator** to find out your bitcoin profits (or other crypto profits), please enter the initial investment you'd like to calculate and choose the crypto you'd like to simulate.

You can choose other cryptos not included in the dropdown but make sure to enter the exact ticket the crypto has. For example, instead of DOGECOIN type in **DOGE**, or instead of ETHEREUM enter **ETH**. It might be possible not all cryptocurrencies are covered by the API.

When selecting the sale date, depending on the time it might not be possible to choose today if the markets have not yet been registered as closed. If so please choose Yesterday as the sale date.

The Bitcoin profit calculator will return the investment value both in profit percentage and absolute crypto profit gains.