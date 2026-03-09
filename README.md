# README

## Windows Installation Guide

* Download [Ruby 3.x (latest stable)](https://rubyinstaller.org/downloads/).
* Run Ruby installer. When setup is finishing, choose to run the 'ridk install'.
* When RubyInstaller2 for Windows CLI starts, press ENTER to install needed components automatically.
* Run `gem install jekyll`
* Run `gem install bundler`
* Checkout the code source of this project
* Go to code source folder.
* Run `bundle install`
* Run `npm install`

For more information check the [official Jekyll docs](https://jekyllrb.com/docs/installation/windows/).

## Development Guide

* From the code source folder and run `bundle exec jekyll serve` to start a liveserver. Any changes to `_config.yml` will require to restart the server but other files can be edited while live.
* Changes can be seen in `http://127.0.0.1:4000/`
* Any change pushed to the branch `master` will be automatically deployed to the production server via Netlify (permissions needed).

## Collaborate

To collaborate with Criptomo and create your own posts:

* Create your own branch from `master`
* Commit your additions.
* Create a Pull Request pointing to `master`
* If the PR is approved it will be merged and automatically deployed.
