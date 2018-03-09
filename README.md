# README

## Windows Installation Guide

* Download [Ruby 2.4.x version](http://rubyinstaller.org/downloads/).
* Run Ruby installer. When setup is finishing, choose to run the 'ridk install'.
* When RubyInstaller2 for Windows CLI starts, press ENTER to install needed components automatically.
* Run `gem install jekyll`
* Run `gem install bundler`
* Checkout the code source of this project
* Go to code source folder.
* Run `bundle install`

For more information on making Jekyll work on Windows check [this guide](http://jekyll-windows.juthilo.com/).

## Development Guide

* From the code source folder and run `bundle exec jekyll serve` to start a liveserver. Any changes to `config.yml` will require to restart the server but other files can be edited while live.
* Changes can be seen in `http://127.0.0.1:4000/`
* Any change pushed to the branch `gh-pages` will be automatically deployed to the production server (permissions needed).

## Collaborate

To collaborate with Criptomo and create your own posts:

* Create your own branch from `gh-pages`
* Commit your additions.
* Create a Pull Request pointing to `gh-pages`
* If the PR is approved it will be merged and automatically deployed.
