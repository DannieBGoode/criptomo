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
                    For example: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...
                </div>
            </div>
            <div class="error date-error">
                <span>This date is not in our register.</span>
                <div>Try another date, for example <a>2022-05-01</a>.</div>
            </div>
        </p>
    </div>

    {% include ads_calculator_banner.html %}

    {% if site.ads.stormgain %}
    <div class="stormgain">
        <h4 style="font-size:30px"><a rel="nofollow" href="https://go.stormgain.app/visit/?bta=112218&nci=5380">Invest <span class="result-tokentype"></span> Now!</a></h4>
        <div>
            <a href="https://go.stormgain.app/visit/?bta=112218&nci=12550" target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608745"  width="492" height="328"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=12542" target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608766"  width="300" height="250"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11892" target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608767"  width="492" height="328"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11841" target="_blank"><img loading="lazy" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608768" border="0"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11742" target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608769"  width="970" height="250"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=11739" target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608771"  width="336" height="280"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=10075" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608777"  width="600" height="600"></a>

            <a href="https://go.stormgain.app/visit/?bta=112218&nci=8907" Target="_Top"><img loading="lazy" border="0" src="https://stormgain.ck-cdn.com/tn/serve/?cid=608778"  width="480" height="320"></a>
        </div>
        <p class="bonus">
            And also enjoy:
            <ul>
                <li> Cloud Crypto Mining for beginners</li>
                <li> Zero Trading Commissions </li>
                <li> Cripto Exchange</li>
                <li> Up To 300× Leverage </li>
                <li> 25 USDT per $100 deposit</li>
                <li> Earn interest on your deposits (up to 12%)</li>
                <li> Crypto Wallet</li>
                <li> Demo Account with 50K USDT</li>
            </ul>
        </p>
        <a rel="nofollow" href="https://go.stormgain.app/visit/?bta=112218&nci=5380">Invest in crypto today</a>
    </div>
    {% endif %}

    <div class="recommended-articles-wrapper" style="display: none">
        <h4>Recommended Articles</h4>
        <div class="recommended-articles"></div>
    </div>
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}"></script>



## Bitcoin Calculator Tool Instructions / Crypto Calculator / Profit Loss Calculator

### How to calculate your cryptocurrency profit / loss with the crypto profit calculator app and convert btc to fiat

With this crypto profit calculator you can find out what profit loss you could have obtained by investing in Bitcoin and other cryptocurrencies in time. 

In order to use this **bitcoin calculator** to find out your bitcoin profits (or other crypto profits / digital assets), please enter the initial investment you would like to calculate and choose the crypto you'd like to simulate to see the coin price and investment fee.

You can choose other cryptos not included in the dropdown but make sure to enter the exact ticket the crypto has. For example, instead of DOGECOIN type in **DOGE**, or instead of ETHEREUM enter **ETH**. It might be possible not all cryptocurrencies are covered by the API.

When selecting the sale date, depending on the time it might not be possible to choose today if the markets have not yet been registered as closed. If so please choose Yesterday as the sale date.

The Bitcoin profit calculator will return the investment value and coin price both in profit percentage and absolute crypto profit gains.

Again, it is possible that when simulating the gains of a cryptocurrency, a date prior to the creation of the cryptocurrency is chosen in the cryptocurrency calculator, if this is the case you will be indicated with an error message informing you that the selected date is not found in our history.

In addition, with the bitcoin converter / profit loss calculator you can choose between euros (EUR) or dollars (USD) when calculating your crypto calculator profits / earnings or invesment exit fee from your cryptocurrency.