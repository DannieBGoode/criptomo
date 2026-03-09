source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem "jekyll"
gem "jekyll-sass-converter", "~> 2.0" # pin to libsass; Dart Sass (v3) rejects IE hacks in _jquery.dataTables.min.scss
gem "bigdecimal" # required explicitly on Ruby 3.4+ for Liquid/Jekyll

gem "wdm", "~> 0.1.0" if Gem.win_platform?
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
gem "webrick", "~> 1.7" # required for Ruby 3.x (removed from stdlib in 3.0)

# If you have any plugins, put them here!
group :jekyll_plugins do
  # gem "jekyll-archives"
  # gem "jekyll-feed"
  gem "jekyll-sitemap"       # used in _config.yml plugins list
  gem "jekyll-redirect-from" # used in _config.yml plugins list
  gem "jekyll-paginate"      # used in _config.yml plugins list
end
