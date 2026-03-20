---
title: Simulador de Preço Futuro de Bitcoin
permalink: "/pt/simulador/"
layout: page
description: "Simule o valor futuro das suas criptomoedas. Insira a quantidade e um preço-alvo para ver o quanto valeriam seus holdings."
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
lang: pt
mailchimp_tracking: false
---

<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Criptomoeda</label>
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
                <option class="editable">Outro ativo...</option>
            </select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Pode ser possível que nem todas as criptomoedas sejam cobertas pelo servidor.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Quantidade que você possui</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1" step="any" class="data-hj-allow">
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-target-price">Preço Futuro</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-target-price" type="number" value="100000" step="any" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Moeda</label>
            <select id="invest-fiat">
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>

    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateSimulator()">Calcular</button>
        <div class="simulator-placeholder">
            <div class="simulator-placeholder-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            </div>
            <p>Insira os dados e clique em <strong>Calcular</strong> para ver a sua simulação</p>
        </div>
        <div id="simulator-results">
            <div id="simulator-results-table">
                <table>
                    <tr>
                        <th>Criptomoeda</th>
                        <td><span class="result-coin"></span></td>
                    </tr>
                    <tr>
                        <th>Quantidade</th>
                        <td><span class="result-quantity"></span></td>
                    </tr>
                    <tr>
                        <th class="label-current-price" data-prefix="Preço">Preço 1 BTC</th>
                        <td><span class="result-current-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valor atual</th>
                        <td><span class="result-current-value"></span></td>
                    </tr>
                    <tr>
                        <th>Preço Futuro</th>
                        <td><span class="result-target-price"></span></td>
                    </tr>
                    <tr>
                        <th>Valor futuro</th>
                        <td><span class="result-future-value"></span></td>
                    </tr>
                    <tr>
                        <th>Ganho / Perda</th>
                        <td><span class="result-gain"></span></td>
                    </tr>
                    <tr>
                        <th>Porcentagem</th>
                        <td><span class="gained-percentage"></span></td>
                    </tr>
                </table>
            </div>
            {% include calculator_affiliate_banner.html %}
        </div>
        <div class="error coin-error">
            <span>Esta criptomoeda não está em nosso sistema.</span>
            <div>Lembre-se de tentar com o código da moeda em vez do nome completo.</div>
            <div>Por exemplo: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...</div>
        </div>
    </div>

    {% include ads_calculator_banner.html %}
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/simulator.js?{{site.time | date: '%s%N'}}"></script>

## Como usar o simulador

Insira a criptomoeda que você possui, a quantidade que tem e o preço futuro que acredita que ela pode alcançar. O simulador calculará quanto valeriam seus holdings a esse preço e qual seria seu ganho ou perda em relação ao valor atual.

## Como o valor futuro é calculado

**Valor futuro = Quantidade × Preço-alvo**

**Ganho (%) = ((Valor futuro / Valor atual) − 1) × 100**

Por exemplo: se você possui 2 BTC e acredita que o Bitcoin chegará a US$ 200.000, o simulador mostra que seus 2 BTC valeriam US$ 400.000 nesse cenário.
