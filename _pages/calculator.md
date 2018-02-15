---
layout: page
title: Calculadora de beneficios
description: Calculadora, calcula cuanto dinero podrías haber ganado invirtiendo en Bitcoin y otras criptomonedas a tiempo.
banner_image: calculator.jpg
permalink: /calculadora/
comments: true
sitemap: true
---

<div class="calculator-block">
	<p>
		Si hubieras invertido 
		<input id="invest-quantity" type="number" value="1000">
		<select id="invest-fiat">
			<option>EUR</option>
			<option>USD</option>
		</select> en 

		<span class="normal-selector">
			<select id="invest-currency" onchange="updateInputMinDate()">
				<option value="BTC"  min="2010-07-18">Bitcoin</option>
				<option value="ETH"  min="2015-08-08">Ethereum</option>
				<option value="LTC"  min="2013-09-15">Litecoin</option>
				<option value="XMR"  min="2015-01-27">Monero</option>
				<option value="DASH" min="2014-02-04">Dash</option>
				<option value="XRP"  min="2015-01-30">Ripple</option>
				<option class="editable">otro</option>
			</select>
			<input class="editOption" autofocus/>
		</span>
	</p>

	<!-- datalists are not yet supported by safari, maybe if we can check whether its supported and load it only then https://stackoverflow.com/questions/7048102/check-if-html-element-is-supported , if we detect that datalists are not supported we display the one above --> 
	<!-- <span class="datalist-selector">
		<input type="text" list="cryptocurrency" id="invest-currency" placeholder="Selecciona" onfocus="$('#invest-currency').val('')"/>
		<datalist id="cryptocurrency">
			<option value="BTC" min="2014-12-10">Bitcoin</option>
			<option value="ETH" min="2015-08-08">Ethereum</option>
			<option value="LTC" min="2013-09-15">Litecoin</option>
			<option value="XMR" min="2015-01-27">Monero</option>
			<option value="DASH" min="2014-02-04">Dash</option>
			<option value="XRP" min="2015-01-30">Ripple</option>
		</datalist>
	</span> -->
	<p>
		el día:
		<input id="invest-date" type="date" value="2014-12-10" min="2010-07-18">

		<div class="loader loader-calculator"></div>
		<!-- <img src="../images/general/loading.gif"/> -->
		<div id="calculator-results">
			hubieras podido comprar a un precio de:
			<span id="old-price"></span>
			un total de:
			<div>
				<span id="number-tokens"></span> 
				<span id="token"></span>
				valorados a día de hoy en un total de
				<span id="valued-amount"></span></div>

			<div>Ganancias: <span id="gained-percentage"></span></div>

		</div>
	</p>

	<button class="calculate-button" onclick="calculateEarnings()">Calcular</button>

	<div> Es posible que no todas las monedas estén soportadas por la API.</div>

	<span class="error coin-error">Esta criptomoneda no está cubierta por nuestro sistema.</span>
	<span class="error date-error">Esta fecha no está cubierta en nuestro historial.</span>
</div>


<script src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script defer src="{{ site.baseurl }}/js/calculator.js?{{site.time | date: '%s%N'}}"></script>	