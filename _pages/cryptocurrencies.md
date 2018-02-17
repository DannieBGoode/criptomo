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
			<div id="filters" class="coinlist-filter">
                <a data-filter="*" href="#">
                    <div style="background-image: url(/images/general/coin-filters/undo.svg);"></div>
					<span>Todas</span>
                 </a>
                <a data-filter=".storage" href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Almacenamiento</span>
                </a>
                <a data-filter=".dapps" href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Apps Descentralizadas</span>
                </a>
                <a data-filter=".finance" href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Bancos y Finanzas</span>
                </a>
                <a data-filter=".interblockchain" href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Conexión Blockchains</span>
                </a>
                <a data-filter=".crowdfunding" href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Crowdfunding</span>
                </a>
                <a data-filter=".currency"  href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Dinero / Pagos</span>                  
                </a>                                             
                <a data-filter=".business"  href="#">            
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Empresarial</span>                      
                </a>                                              
                <a data-filter=".exchanges"  href="#">            
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Exchanges</span>                     
                </a>                                           
                <a data-filter=".gaming"  href="#">            
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Gaming / Gambling</span>                
                </a>                                             
                <a data-filter=".iot"  href="#">                 
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Internet of Things</span>               
                </a>                                              
                <a data-filter=".marketplace"  href="#">          
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Marketplace</span>                     
                </a>                                             
                <a data-filter=".computing"  href="#">           
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Procesamiento de datos</span>              
                </a>                                                 
                <a data-filter=".ads"  href="#">                     
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Publicidad</span>                           
                </a>
                <a data-filter=".private"  href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Seguridad / Privacidad</span>
                </a>
                <a data-filter=".social"  href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Social</span>
                </a>
                <a data-filter=".card"  href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Tarjetas de Débito</span>
                </a>
                <a data-filter=".web"  href="#">
                    <div style="background-image: url(/images/general/coin-filters/internet.svg);"></div>
					<span>Web</span>
                </a>
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