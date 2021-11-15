---
title: Categorías
permalink: "/tags/"
layout: default
sitemap: false
lang: es
---

<div class="site-content">
    <div class="inner">
        <main class="site-main">
            <article class="post">
                <header class="entry-header">
                    <div class="entry-header-wrap">  
                        <h1 class="entry-title">{{page.title}}</h1>
                    </div>
                </header><!-- .entry-header -->
                <div class="entry-content">
                    <div class="archive-tags-list">
                        {% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
                        {% assign sortedTags = site_tags | split:',' | sort %}
                        {% for tag in sortedTags %}
                        <a class="tag-selector-{{ tag }}" href="#{{ tag | cgi_escape }}">{{ tag }} </a>
                        {% endfor %}
                    </div>

                </div><!-- .entry-content -->
            </article><!-- .post -->
            {% for tag in sortedTags %}
            <div class="tag tag-{{ tag }}">

                <div class="grid-view">
                    {% for post in site.tags[tag] %}
                        {% include post_grid.html %}
                    {% endfor %}
                </div>
            </div>
            {% endfor %}
        </main><!-- .site-main -->



        {% include sidebar.html %}
    </div><!-- .inner -->
</div><!-- .site-content -->


<script src="{{ site.baseurl }}/js/jquery.js?{{site.time | date: '%s%N'}}"></script>
<script src="{{ site.baseurl }}/js/tags.js?{{site.time | date: '%s%N'}}"></script>