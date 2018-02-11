---
layout: default
title: +100 criptomonedas explicadas
description: Explicación breve de más de 100 criptomonedas
permalink: /criptomonedas/
progress: true
---

<div class="site-content">

    <div class="inner">

        <main class="site-main">
			<header class="entry-header">
		    	<div class="entry-header-wrap">  
		        	<h1 class="entry-title">{{page.title}}</h1>
			    </div>
			</header>

			<button href="#" tabindex="-1" data-filter="*">Todas</button>
			<button href="#" tabindex="-1" data-filter="currency">Dinero</button>
			<button href="#" tabindex="-1" data-filter="private">Privadas</button>
			<button href="#" tabindex="-1" data-filter="dapps">Dapps</button>
			<button href="#" tabindex="-1" data-filter="business">Empresarial</button>
			<button href="#" tabindex="-1" data-filter="gaming">Gaming y Casinos</button>
			<button href="#" tabindex="-1" data-filter="iot">Internet of Things</button>
			<!-- https://isotope.metafizzy.co/filtering.html -->

			{% for currency in site.data.cryptos %}
			<div class="coinlist-box {{ currency.class }}" data-filter="{{ currency.class }}">
			    <div class="coinlist-info">
					<div class="coinlist-info-1">
						<div class="coinlist-icon" style="background-image: url(/images/general/cryptocurrencies/{{ currency.icon }});"></div>
						<div class="coinlist-name"><h2>{{ currency.name }}</h2></div>
					</div>
					<div class="coinlist-info-2">
			            <p>{{ currency.description }}</p>
			            <span class="coin-links">
							{% if currency.article %}
				            <span class="coin-article"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.article }}"> En detalle</a></span>
							{% endif %}
							<span class="coin-website"><i class="fa-chevron-right" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> web oficial</a></span>
						</span>
			        </div><!-- .coinlist-details -->
			    </div><!-- .coinlist-info -->
			</div><!-- .coinlist-box -->
			 {% endfor %}

		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->

<script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>