---
title: "\U0001F4B5 FIRE Calculator"
permalink: "/en/fire-calculator/"
layout: page
description: "\U0001F4B5 Online FI (Financial Independence) calculator, calculate
  when you could retire and obtain financial independence / freedom."
banner_image: pages/fi.webp
schema: true
rating: 5
totalVotes: 35
comments: false
sitemap: true
lang: en
---

<small>
    Calculate in how many years you could retire with the Financial Independence calculator.
    This tool assumes that all the money saved is generating returns at the percentage you choose.
</small>
<div class="calculator-block  calculator-fi">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Age:</label>
        </div>
        <div class="calculator-col-end">
            <input id="fi-age" type="number" value="30" max="100" oninput="calculateFI()">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Currency:</label>
        </div>
        <div class="calculator-col-end">
            <select id="fi-fiat" onchange="updateCurrency()">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Currently Saved:</label>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-accumulated" type="number" value="1000" oninput="calculateFI()" step="500" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">USD</span>
            
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Yearly Income:</label>
            <div>
                <small>( <span id="monthly-salary-text">2500</span> <span class="currency-text">USD</span> monthly)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-salary" type="number" value="30000" oninput="updateMonthlyRevenue();calculateFI()" step="500" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">USD</span>
        </div>
    </div>

    <div class="calculator-form-row">
            <div class="calculator-col-start">
                <label>Savings Rate:</label>
                <div>
                    <small>(<span id="savings-ratio-text">10</span>% savings: <span id="savings-ratio-yearly-text">1200 <span class="currency-text">USD</span></span> yearly)</small>
                </div>
            </div>
            <div class="calculator-col-end">
                <input id="fi-savings-ratio" type="range" min="0" max="100" value="10" step="5" oninput="updateSavingsRatio()">
            </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Investment Returns:</label>
            <div>
                <small>(<span id="returns-ratio-text">10</span>% of expected annual return)</small>
            </div>
        </div>
        <div class="calculator-col-end">
            <input id="fi-investment-returns" type="range" min="0.5" max="50" value="10" step="0.5" oninput="updateReturnsRatio();calculateFI()">
        </div>

    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Retirement Method:</label>
            <div>
                <small>(Desired Networth / SWR)</small>
            </div>
        </div>
        <div class="calculator-col-end">
            <div class="onoffswitch">
                <input type="checkbox" name="fi-method" class="onoffswitch-checkbox" onchange="updateFIMethod()" id="fi-method" tabindex="0">
                <label class="onoffswitch-label" for="fi-method"></label>
            </div>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Desired Networth:</label>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-desired-networth" type="number" value="1250000" oninput="updateDesiredNetworth()" class="InputAddOn-field"> <span class="currency-text InputAddOn-item">USD</span>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Yearly Spending:</label>
            <div>
                <small>(<span id="monthly-income-text">4166.67</span> <span class="currency-text">USD</span> monthly)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-yearly-spending" type="number" value="50000" onchange="updateSWR()" class="InputAddOn-field" disabled> <span class="currency-text InputAddOn-item">USD</span>
        </div>
    </div>

    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label>Yearly Withdrawal Rate:</label>
            <div>
                <small>(Should be lower or equal to the expected Investment returns)</small>
            </div>
        </div>
        <div class="calculator-col-end InputAddOn">
            <input id="fi-swr" type="number" value="4" max="100" onchange="updateSWR()" class="InputAddOn-field" disabled> <span class="InputAddOn-item">%</span>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="fi-calculator-result-container">
        <!-- <button class="calculate-button" onclick="calculateFI()">Calcular</button> -->
        
        <div id="fi-calculator-results">

            <div id="fi-results-table">
                <table>
                        <thead>
                            <tr>
                                <th>Savings Rate</th>
                                <th>Yearly Expenses</th>
                                <th>Yearly Savings</th>
                                <th>Years to FIRE</th>
                                <th>Retiring Age</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                </table>
            </div>
        </div>

    </div>

    <!-- Calculator Banner -->
    <ins class="adsbygoogle white-ad"
         style="display:block"
         data-ad-client="ca-pub-1252171391624665"
         data-ad-slot="1002456567"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>

<script defer src="{{ site.baseurl }}/js/fi.js?{{site.time | date: '%s%N'}}"></script>
