---
title: Bitcoin Kurs-Simulator
permalink: "/de/preissimulator/"
layout: page
description: "Simuliere den zukünftigen Wert deiner Kryptowährungen. Gib deine Menge und einen Zielpreis ein, um zu sehen, wie viel deine Coins wert wären."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
schema: true
css: calculator
comments: false
sitemap: true
ref: simulator
body_class: calculator-page
lang: de
mailchimp_tracking: false
---

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Kryptowährung</label>
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
                <option class="editable">Andere Münze...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Möglicherweise werden nicht alle Münzen von der API unterstützt.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Menge, die du hältst</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1" step="any" class="data-hj-allow">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-target-price">Zukünftiger Preis</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-target-price" type="number" value="100000" step="any" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Währung</label>
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>

    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateSimulator()">Berechnen</button>
        <div class="simulator-placeholder">
            <div class="simulator-placeholder-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            </div>
            <p>Gib deine Daten ein und klicke auf <strong>Berechnen</strong>, um deine Simulation zu sehen</p>
        </div>
        <div id="simulator-results">
            <div id="simulator-results-table">
                <table>
                    <tr>
                        <th>Kryptowährung</th>
                        <td><span class="result-coin"></span></td>
                    </tr>
                    <tr>
                        <th>Menge</th>
                        <td><span class="result-quantity"></span></td>
                    </tr>
                    <tr>
                        <th class="label-current-price" data-prefix="Preis">Preis 1 BTC</th>
                        <td><span class="result-current-price"></span></td>
                    </tr>
                    <tr>
                        <th>Aktueller Wert</th>
                        <td><span class="result-current-value"></span></td>
                    </tr>
                    <tr>
                        <th>Zukünftiger Preis</th>
                        <td><span class="result-target-price"></span></td>
                    </tr>
                    <tr>
                        <th>Zukünftiger Wert</th>
                        <td><span class="result-future-value"></span></td>
                    </tr>
                    <tr>
                        <th>Gewinn / Verlust</th>
                        <td><span class="result-gain"></span></td>
                    </tr>
                    <tr>
                        <th>Prozentsatz</th>
                        <td><span class="gained-percentage"></span></td>
                    </tr>
                </table>
            </div>
            {% include calculator_affiliate_banner.html %}
        </div>
        <div class="error coin-error">
            <span>Diese Kryptowährung ist nicht in unserem System.</span>
            <div>Denke daran, den Coin-Code anstelle des vollständigen Namens zu verwenden.</div>
            <div>Zum Beispiel: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
        </div>
    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/simulator.js?{{site.time | date: '%s%N'}}"></script>

## So verwendest du den Simulator

Gib die Kryptowährung, die du besitzt, die Menge und den Zielpreis ein, den du für möglich hältst. Der Simulator berechnet, wie viel deine Holdings bei diesem Preis wert wären und wie hoch dein Gewinn oder Verlust im Vergleich zum aktuellen Wert wäre.

## So wird der zukünftige Wert berechnet

**Zukünftiger Wert = Menge × Zielpreis**

**Gewinn (%) = ((Zukünftiger Wert / Aktueller Wert) − 1) × 100**

Beispiel: Wenn du 2 BTC hältst und glaubst, dass Bitcoin 200.000 $ erreichen wird, zeigt der Simulator, dass deine 2 BTC in diesem Szenario 400.000 $ wert wären.
