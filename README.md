# README

## Windows Installation Guide

* Download [Ruby 2.4.x version](http://rubyinstaller.org/downloads/).
* Download [RubyDevKit](http://rubyinstaller.org/downloads/), for example: `DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe`
* Run Ruby installer. When setup is finishing, choose to run the 'ridk install', and select option [3] MSYS2 and MINGW development toolchain.
* Extract RubyDevKit to `C:\RubyDevKit` (you can choose a different path if you want to)
* Go to `cd C:\RubyDevKit` and run `ruby dk.rb init` and `ruby dk.rb install`
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
