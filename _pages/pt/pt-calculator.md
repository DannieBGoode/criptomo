---
title: ▷ Calculadora de lucro com bitcoins e criptomoedas
permalink: "/pt/calculadora/"
layout: page
description: "\U0001F4B5 Calculadora Bitcoin, calcule quanto lucro você poderia ter
  ganho investindo em Bitcoin e outras criptomoedas. \U0001F4B9 Lucros."
banner_image: pages/calculator.webp
schema: true
rating: 5
totalVotes: 39
comments: false
sitemap: true
lang: pt
css: calculator
ref: calculator
redirect_from:
- "/pt/"
- "/pt"
- "/br"
- "/br/"
- "/pt/calculator/"
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px; display: none">
        <small>For periodical investments please use our <a href="/investment">advanced calculator</a>.</small>
    </div>
</div>
<div class="calculator-block">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Investimento</label>
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
            <label for="invest-currency">Criptomoeda</label>
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
				<option class="editable">Outro ativo ...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" autofocus placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Pode ser possível que nem todas as criptomoedas sejam cobertas pelo servidor.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-date">Data de Compra</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Calcular</button>
        <div id="calculator-results">
            Se você tivesse investido <span class="result-invest"></span> em <span class="result-tokentype"></span>  no dia <span class="result-date"></span> você teria a oportunidade de comprar a um preço de 
            <span class="result-old-price"></span> um total de
            <span class="result-tokencount"></span> <span class="result-tokentype"></span>
            avaliados hoje em <span class="result-currentvalue"></span>.
            <div>Lucros: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>COMPRA</small></th>
                            <th>Ativo</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Data de Compra</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Purchase Date</th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Preço de Compra</th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Assets Bought</th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>VENDA</small></th>
                            <th>Data de venda</th>
                            <td><span>Hoje</span></td>
                        </tr>
                        <tr>
                            <th>Preço de venda</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Valor de Investimento</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Porcentagem de lucro</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
            </div>
        </div>
        <p>
            <div class="error coin-error">
                <span>Esta criptomoeda não está em nosso sistema.</span>
                <div>
                    Lembre-se de tentar com o código da moeda em vez do nome completo.
                </div>
                <div>
                    Por exemplo: <a>DOGE</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...
                </div>
            </div>
            <div class="error date-error">
                <span>Esta data não está em nosso cadastro.</span>
                <div>Tente outra data, por exemplo <a>2021-04-01</a>.</div>
            </div>
        </p>
    </div>

    <!-- Calculator Banner -->
    <div class="lazy-load-ad" data-slot="1002456567"></div>
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>


## Instruções da calculadora Bitcoin

Com esta calculadora de lucros de criptografia, você pode descobrir qual lucro poderia ter obtido investindo em Bitcoin e outras criptomoedas no tempo.

Para usar esta calculadora de bitcoin para descobrir seus lucros de criptografia, insira o investimento inicial que deseja calcular e escolha a criptografia que deseja simular.

Você pode escolher outras criptografias não incluídas na lista suspensa, mas certifique-se de inserir o bilhete exato que a criptografia possui. Por exemplo, em vez de DOGECOIN, digite **DOGE** ou, em vez de ETHEREUM, digite **ETH**. Pode ser possível que nem todas as criptomoedas sejam cobertas pela API.

Ao selecionar a data de venda, dependendo do horário pode não ser possível escolher hoje se os mercados ainda não estiverem registrados como fechados. Em caso afirmativo, escolha Ontem como data de venda. 