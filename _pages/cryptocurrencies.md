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

			<div class="author-box">
			    <div class="author-info">
			        <div class="author-avatar" style="background-image: url(/images/general/cryptocurrencies/{{ currency.icon }})"></div>
					<div class="author-details">
			            <h2 class="author-title">{{ currency.name }}</h2>
			            <p class="author-bio">{{ currency.description }}</p>
			            <span class="author-location"><i class="fa-map-marker" aria-hidden="true"></i> {{ writer.author_location }}</span>
			            <span class="author-website"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> {{ currency.website }}</a></span>
			        </div><!-- .author-details -->
			    </div><!-- .author-info -->
			</div><!-- .author-box -->

			 {% endfor %}
		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->