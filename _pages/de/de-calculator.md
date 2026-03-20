---
title: ▷ Gewinnrechner für Bitcoin und Kryptowährungen
permalink: "/de/gewinnrechner/"
layout: page
description: "\U0001F4B5 Berechnen Sie mit dem Bitcoin-Rechner, wie viel Gewinn Sie
  mit der Investition in Bitcoin und andere Kryptowährungen hätten erzielen können.
  \U0001F4B9 Gewinne."
banner_image: pages/calculator.webp
banner_image_width: 900
banner_image_height: 360
banner_image_mobile: pages/calculator-mobile.webp
banner_image_mobile_width: 450
banner_image_sizes: "(max-width: 480px) calc(100vw - 30px), 900px"
deferred_css: calculator-deferred
schema: true
comments: false
sitemap: true
lang: de
css: calculator
ref: calculator
mailchimp_tracking: false
body_class: calculator-page
redirect_from:
- "/de/calculator/"
faq:
  - question: "Wie wird der Kryptowährungsgewinn berechnet?"
    answer: "Der Gewinn berechnet sich wie folgt: (Aktueller Preis − Kaufpreis) × Anzahl der Coins. Der Gewinnprozentsatz beträgt: ((Aktueller Wert / Anfangsinvestition) − 1) × 100. Wenn Sie beispielsweise 1 BTC für 10.000 $ gekauft haben und er heute 60.000 $ wert ist, beträgt Ihr Gewinn 50.000 $ oder 500%."
  - question: "Kann ich den Gewinn für Kryptowährungen berechnen, die nicht in der Dropdown-Liste aufgeführt sind?"
    answer: "Ja. Wählen Sie \"Sonstige\" und geben Sie das genaue Ticker-Symbol ein (z. B. DOGE, SHIB, SOL, BNB). Nicht alle Coins sind garantiert in unserer Datenbank enthalten."
  - question: "Was ist der Unterschied zwischen diesem Rechner und dem erweiterten Rechner?"
    answer: "Dieser Rechner zeigt Ihnen, wie viel eine einmalige vergangene Investition heute wert wäre. Der <a href=\"/de/dca-rechner/\">erweiterte Rechner</a> simuliert regelmäßige Investitionen (DCA) über einen bestimmten Zeitraum."
  - question: "Warum kann ich das heutige Datum nicht als Kaufdatum auswählen?"
    answer: "Der Rechner basiert auf historischen Schlusskursen. Wenn die Märkte für den aktuellen Tag noch nicht geschlossen haben, sind die heutigen Preisdaten möglicherweise noch nicht verfügbar. Wählen Sie in diesem Fall das gestrige Datum."
  - question: "Berücksichtigt der Rechner Handelsgebühren?"
    answer: "Nein. Das Ergebnis zeigt den Bruttogewinn, der ausschließlich auf der Preisänderung basiert. Reale Gewinne können nach Abzug der Handelsgebühren der Börsen (in der Regel 0,1%–0,6%) etwas geringer ausfallen."
---

<div style="margin-bottom: 10px">
    <div style="margin-top:-25px; display:none">
        <small>Für regelmäßige Käufe nutzen Sie bitte unseren <a href="/de/dca-rechner/">DCA Rechner</a>.</small>
    </div>
</div>
<div class="calculator-block" data-recommendations-script="{{ site.baseurl }}/js/recommendations.js?{{site.time | date: '%s%N'}}">
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-quantity">Investition</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-quantity" type="number" value="1000" class="data-hj-allow">
            <label for="invest-fiat" class="screen-reader-text">Währung</label>
            <select id="invest-fiat">
                <option>EUR</option>
                <option>USD</option>
            </select>
        </div>
    </div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-currency">Kryptowährung</label>
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
				<option class="editable">Sonstige...</option>
			</select>
            <input width="150" class="calculator-othercoins data-hj-allow" placeholder="XYZ" />
        </div>
    </div>
    <div class="calculator-othercoins"><span>Möglicherweise werden nicht alle Kryptowährungen vom Server abgedeckt.</span></div>
    <div class="calculator-form-row">
        <div class="calculator-col-start">
            <label for="invest-date">Kaufdatum</label>
        </div>
        <div class="calculator-col-end">
            <input id="invest-date" type="date" value="2014-12-10" min="2010-07-18" class="data-hj-allow">
        </div>
    </div>

    <div class="loader calculator-loader-container"></div>
    
    <div class="calculator-result-container">
        <button class="calculate-button" onclick="calculateEarnings()">Berechnung</button>
        <div id="calculator-results">
            <div class="calculator-results-text">
                Wenn Sie am Tag <span class="result-date"></span> <span class="result-invest"></span> in <span class="result-tokentype"></span> investiert hätten, hätten Sie die Möglichkeit gehabt, zu einem Preis von 
                <span class="result-old-price"></span> insgesamt
                <span class="result-tokencount"></span> <span class="result-tokentype"></span>
                im Wert von heute <span class="result-currentvalue"></span> zu kaufen.
            </div>
            <div>Gewinn: <span class="gained-percentage"></span></div>

            <div id="calculator-results-table">
                <table>
                        <tr>
                            <th rowspan="5" class="table-header"><small>KAUF</small></th>
                            <th>Vermögenswert</th>
                            <td><span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th>Ursprüngliche Investition</th>
                            <td><span class="result-invest"></span></td>
                        </tr>
                        <tr>
                            <th>Kaufdatum </th>
                            <td><span class="result-date"></span></td>
                        </tr>
                        <tr>
                            <th>Kaufpreis</th>
                            <td><span class="result-old-price"></span></td>
                        </tr>
                        <tr>
                            <th>Gekaufte Vermögenswerte </th>
                            <td><span class="result-tokencount"></span> <span class="result-tokentype"></span></td>
                        </tr>
                        <tr>
                            <th rowspan="4" class="table-header"><small>VERKAUF</small></th>
                            <th>Verkaufsdatum </th>
                            <td><span>Heute</span></td>
                        </tr>
                        <tr>
                            <th>Verkaufspreis</th>
                            <td><span class="result-current-price"></span></td>
                        </tr>
                        <tr>
                            <th>Investitionswert</th>
                            <td><span class="result-currentvalue"></span></td>
                        </tr>
                        <tr>
                            <th>Gewinnprozentsatz</th>
                            <td><span class="gained-percentage"></span></td>
                        </tr>
                </table>
             </div>
             {% include share_result.html %}
             {% include calculator_affiliate_banner.html %}
         </div>
        <p>
            <div class="error coin-error">
                <span>Diese Kryptowährung befindet sich nicht in unserem System.</span>
                <div>
                    Denken Sie daran, den Währungscode anstelle des vollständigen Namens zu verwenden.
                </div>
                <div>
                    Zum Beispiel: <a>DOGE</a>, <a>SHIB</a>, <a>DOT</a>, <a>FIL</a>, <a>TRX</a>, <a>BNB</a>...
                </div>
            </div>
            <div class="error date-error">
                <span>Dieses Datum ist nicht in unserem Register.</span>
                <div>Versuchen Sie es beispielsweise mit einem anderen Datum <a class="suggestedDate">2022-05-01</a>.</div>
            </div>
        </p>
    </div>

    {% include ads_calculator_banner.html %}
    
</div>

<script defer src="{{ site.baseurl }}/js/calculator-common.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>


## Anweisungen für den Bitcoin-Rechner

Mit diesem Krypto-Gewinnrechner können Sie herausfinden, welchen Gewinn Sie erzielen könnten, wenn Sie rechtzeitig in Bitcoin und andere Kryptowährungen investieren.

Um diesen Bitcoin-Rechner zu verwenden, um Ihre Krypto-Gewinne herauszufinden, geben Sie bitte die anfängliche Investition ein, die Sie berechnen möchten, und wählen Sie die Krypto aus, die Sie simulieren möchten.

Sie können andere Kryptos auswählen, die nicht in der Dropdown-Liste enthalten sind. Geben Sie jedoch genau das Ticket ein, über das die Krypto verfügt. Geben Sie beispielsweise anstelle von DOGECOIN **DOGE** ein oder geben Sie anstelle von ETHEREUM **ETH** ein. Möglicherweise werden nicht alle Kryptowährungen von der API abgedeckt.

Bei der Auswahl des Verkaufsdatums ist es je nach Uhrzeit möglicherweise nicht möglich, heute zu wählen, wenn die Märkte noch nicht als geschlossen registriert wurden. Wenn ja, wählen Sie bitte Gestern als Verkaufsdatum.

## So wird der Kryptowährungsgewinn berechnet

Der Rechner verwendet historische Preisdaten, um Ihren Gewinn anhand dieser Formel zu berechnen:

**Gewinn ($) = (Aktueller Preis − Kaufpreis) × Anzahl der Coins**

**Gewinn (%) = ((Aktueller Wert / Anfangsinvestition) − 1) × 100**

Beispiel: Wenn Sie 1.000 $ in Bitcoin zu einem Preis von 10.000 $ pro BTC investiert haben, erhielten Sie 0,1 BTC. Wenn Bitcoin jetzt 60.000 $ wert ist, sind Ihre 0,1 BTC 6.000 $ wert — ein Gewinn von 5.000 $ oder 500%.

Der Rechner berücksichtigt keine Handelsgebühren oder Steuern. Die Ergebnisse dienen nur zu Informationszwecken.

{% include faq.html %}
