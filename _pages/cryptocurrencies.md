---
layout: default
title: +100 criptomonedas explicadas
description: Explicación breve de más de 100 criptomonedas
permalink: /criptomonedas/
sitemap: false
---

<div class="site-content">

    <div class="inner">
		<header class="entry-header">
	    	<div class="entry-header-wrap">  
	        	<h1 class="entry-title">{{page.title}}</h1>
		    </div>
		</header><!-- .entry-header -->
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
			            <span class="coin-links">
							{% if currency.article %}
				            <span class="coin-article"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.article }}"> En detalle</a></span>
							{% endif %}
							<span class="coin-website"><i class="fa fa-home" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> web oficial</a></span>
						</span>
			        </div><!-- .coinlist-details -->
			    </div><!-- .coinlist-info -->
			</div><!-- .coinlist-box -->
			 {% endfor %}
		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->