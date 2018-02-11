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
			<div id="filters" class="button-group">
				<button data-filter="*">Todas</button>
				<button data-filter=".storage">Almacenamiento</button>
				<button data-filter=".finance">Bancos y Finanzas</button>
				<button data-filter=".interblockchain">Conexión entre Blockchains</button>
				<button data-filter=".crowdfunding">Crowdfunding</button>
				<button data-filter=".currency">Dinero / Pagos</button>		
				<button data-filter=".business">Empresarial</button>
				<button data-filter=".exchanges">Exchanges</button>
				<button data-filter=".gaming">Gaming y Gambling</button>
				<button data-filter=".iot">Internet of Things</button>
				<button data-filter=".marketplace">Marketplace</button>
				<button data-filter=".dapps">Plataforma de Aplicaciones Descentralizadas</button>
				<button data-filter=".computing">Procesamiento de datos</button>
				<button data-filter=".ads">Publicidad</button>
				<button data-filter=".private">Seguridad y Anonimato</button>
				<button data-filter=".social">Social</button>
				<button data-filter=".card">Tarjetas de Débito</button>
				<button data-filter=".web">Web</button>

				<!-- https://isotope.metafizzy.co/filtering.html -->
			</div>

			<div class="grid">
				{% for currency in site.data.cryptos %}
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
					            <span class="coin-article"><i class="fa-chain" aria-hidden="true"></i> <a href="{{ currency.article }}"> En detalle</a></span>
								{% endif %}
								<span class="coin-website"><i class="fa-chevron-right" aria-hidden="true"></i> <a href="{{ currency.website }}" target="_blank"> web oficial</a></span>
							</span>
				        </div><!-- .coinlist-details -->
				    </div><!-- .coinlist-info -->
				</div><!-- .coinlist-box -->
				{% endfor %}
			</div>

		</main><!-- .site-main -->
        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->

<script src="{{ site.baseurl }}/js/plugins.js?{{site.time | date: '%s%N'}}"></script>
<script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
<script src="{{ site.baseurl }}/js/filters.js?{{site.time | date: '%s%N'}}"></script>