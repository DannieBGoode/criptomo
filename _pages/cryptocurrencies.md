---
layout: default
title: +100 criptomonedas explicadas
description: Explicación breve de más de 100 criptomonedas
permalink: /criptomonedas/
sitemap: false
---

<div class="site-content">
    {% include schema_post.html %}
    <div class="inner">
        <main class="site-main">
			{% for currency in site.data.cryptos %}
			<div class="criptomonedas-box">
			    <div class="criptomonedas-info">
					<div class="criptomonedas-info-1">
						<div class="criptomonedas-icon" style="background-image: url(/images/general/cryptocurrencies/{{ currency.icon }});"></div>
						<div class="criptomonedas-name"><h2>{{ currency.name }}</h2></div>
					</div>
					<div class="criptomonedas-info-2">
			            <p>{{ currency.description }}</p>
						<span class="author-website"><i class="fa fa-home" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> {{ currency.website }}</a></span>
						{% if currency.article %}
			            <span class="author-website"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.article }}" target="_blank"> {{ currency.article }}</a></span>
						{% endif %}
			        </div><!-- .criptomonedas-details -->
			    </div><!-- .criptomonedas-info -->
			</div><!-- .criptomonedas-box -->
			 {% endfor %}
		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->