---
title: "+100 criptomonedas explicadas"
permalink: "/criptomonedas/"
layout: default
description: Explicación breve de más de 100 criptomonedas y sus casos de uso más comunes.
progress: true
lang: es
---

<div class="site-content">

    <div class="inner">

        <main class="site-main">
			<header class="entry-header">
		    	<div class="entry-header-wrap">  
		        	<h1 class="entry-title">{{page.title}}</h1>
			    </div>
			</header>

            <div id="filters" class="coinlist-filter">
            {% for filter in site.data.filters %}
                <a data-filter="{{ filter.filter }}" href="javascript:;" class="{{ filter.class }}" onclick="setActiveFilter(this)">
                    <div style="background-image: url(/images/general/coin-filters/{{ filter.image }});"></div>
                    <span>{{ filter.name }}</span>
                 </a>
            {% endfor %}
            </div>

            <div class="cryptocurrencies-filter-input-block">
		        <label>
		            Buscar
		            <input type="search" id="cryptocurrencies-filter-input" placeholder="Buscar criptomoneda">
		        </label>
		    </div>

			<div class="grid">
				{% for coin in site.data.coins %}
				
				{% assign currency = coin[1] %}
				{% if currency.description %}
				<div class="coinlist-box item {{ currency.class }}">
				    <div class="coinlist-info">
						<div class="coinlist-info-1">
							<div class="coinlist-icon" style="background-image: url(/images/general/cryptocurrencies/{{ currency.icon }});"></div>
							<div class="coinlist-name"><h2>{{ currency.name }}</h2></div>
						</div>
						<div class="coinlist-info-2">
				            <p>{{ currency.description }}</p>
				            <span class="coin-links">
								{% if currency.article %}
					            <span class="coin-article"><i class="icon-link" aria-hidden="true"></i> <a href="{{ currency.article }}"> En detalle</a></span>
								{% endif %}
								<span class="coin-website"><i class="icon-chevron-right" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> web oficial</a></span>
							</span>
				        </div><!-- .coinlist-details -->
				    </div><!-- .coinlist-info -->
				</div><!-- .coinlist-box -->
				{% endif %}
				{% endfor %}
			</div>

		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->

<script src="{{ site.baseurl }}/js/jquery.js?{{site.time | date: '%s%N'}}"></script>
<script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
<script src="{{ site.baseurl }}/js/filters.js?{{site.time | date: '%s%N'}}"></script>
