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
			<div class="coinlist-box">
			    <div class="coinlist-info">
					<div class="coinlist-info-1">
						<div class="coinlist-icon" style="background-image: url(/images/general/cryptocurrencies/{{ currency.icon }});"></div>
						<div class="coinlist-name"><h2>{{ currency.name }}</h2></div>
					</div>
					<div class="coinlist-info-2">
			            <p>{{ currency.description }}</p>
						<span class="author-website"><i class="fa fa-home" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> {{ currency.website }}</a></span>
						{% if currency.article %}
			            <span class="author-website"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.article }}" target="_blank"> {{ currency.article }}</a></span>
						{% endif %}
			        </div><!-- .coinlist-details -->
			    </div><!-- .coinlist-info -->
			</div><!-- .coinlist-box -->
			 {% endfor %}
		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->