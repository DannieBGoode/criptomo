---
layout: page
title: Calculadora
description: Calculadora
banner_image: calculator-2.jpg
permalink: /calculadora/
sitemap: true
---

Si hubieras invertido 
<input id="invest-quantity" type="number" value="1000">$ en Bitcoin en la fecha 
<input id="invest-date" type="date" value="2014-12-10" min="2010-07-16"> ahora tendrías:


<div id="calculator-results">
	<div>
		<span id="number-bitcoins"></span> 
		Bitcoins valorados en 
		<span id="valued-amount"></span> $.</div>

	<div>Ganancias: <span id="gained-percentage"></span></div>

</div>

<button onclick="calculateEarnings()">Calcular</button>


<script src="/js/calculator.js"></script>