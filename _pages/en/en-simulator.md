---
title: Bitcoin and Crypto Future Price Simulator
permalink: "/en/simulator/"
layout: page
description: "Simulate the future value of your crypto holdings. Enter your quantity and a target price to see what your investment would be worth."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
css: calculator
rating: 5
totalVotes: 1
comments: false
sitemap: true
ref: simulator
body_class: calculator-page
lang: en
mailchimp_tracking: false
---

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Cryptocurrency</label>
        </div>
        <div class="calculator-col-end">
            <select id="invest-currency">
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
                <option value="LTC">Litecoin</option>
                <option value="MIOTA">IOTA</option>
                <option value="XMR">Monero</option>
                <option value="ADA">Cardano</option>
                <option value="XRP">Ripple</option>
                <option class="editable">Other coin...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Not all coins may be supported by the API.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Quantity you hold</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1" step="any" class="data-hj-allow">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-target-price">Future price</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-target-price" type="number" value="100000" step="any" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Currency</label>
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>

    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateSimulator()">Calculate</button>
        <div class="simulator-placeholder">
            <div class="simulator-placeholder-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            </div>
            <p>Enter your data and press <strong>Calculate</strong> to see your simulation</p>
        </div>
        <div id="simulator-results">
            <div id="simulator-results-table">
                <table>
                    <tr>
                        <th>Cryptocurrency</th>
                        <td><span class="result-coin"></span></td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td><span class="result-quantity"></span></td>
                    </tr>
                    <tr>
                        <th class="label-current-price" data-prefix="Price">Price 1 BTC</th>
                        <td><span class="result-current-price"></span></td>
                    </tr>
                    <tr>
                        <th>Current value</th>
                        <td><span class="result-current-value"></span></td>
                    </tr>
                    <tr>
                        <th>Future price</th>
                        <td><span class="result-target-price"></span></td>
                    </tr>
                    <tr>
                        <th>Future value</th>
                        <td><span class="result-future-value"></span></td>
                    </tr>
                    <tr>
                        <th>Gain / Loss</th>
                        <td><span class="result-gain"></span></td>
                    </tr>
                    <tr>
                        <th>Percentage</th>
                        <td><span class="gained-percentage"></span></td>
                    </tr>
                </table>
            </div>
            {% include calculator_affiliate_banner.html %}
        </div>
        <div class="error coin-error">
            <span>This cryptocurrency is not in our system.</span>
            <div>Remember to try with the coin code instead of the full name.</div>
            <div>For example: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
        </div>
    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/simulator.js?{{site.time | date: '%s%N'}}"></script>

## How to use the simulator

Enter the cryptocurrency you hold, the quantity you own, and the future price you think it could reach. The simulator will calculate how much your holdings would be worth at that price and what your gain or loss would be compared to the current value.

## How the future value is calculated

**Future value = Quantity × Target price**

**Gain (%) = ((Future value / Current value) − 1) × 100**

For example: if you hold 2 BTC and believe Bitcoin will reach $200,000, the simulator shows your 2 BTC would be worth $400,000 in that scenario.
