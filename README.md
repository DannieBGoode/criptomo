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

## Browser Smoke Checks

* Run `npm run test:page-console` to crawl the generated pages in `_site/` with headless Edge/Chrome and fail on console/runtime errors.
* The command rewrites third-party analytics/CDN scripts to local stubs so the smoke check stays deterministic and does not depend on external network access.
* Rebuild the site first if `_site/` is stale.
* The command writes a Markdown and JSON report to `artifacts/page-console/`.

## Live API Contract Checks

* Run `npm run test:api-contracts` to verify the current external API contracts used by the repo.
* The command writes a Markdown and JSON report to `artifacts/api-contracts/`.
* A separate GitHub Actions workflow in `.github/workflows/live-api-contracts.yml` runs the same checks on a schedule and by manual dispatch, outside the normal PR test path.
* If CryptoCompare rate limits the scheduled job, add `CRYPTOCOMPARE_API_KEY` as a repository secret.

## Collaborate

To collaborate with Criptomo and create your own posts:

* Create your own branch from `master`
* Commit your additions.
* Create a Pull Request pointing to `master`
* If the PR is approved it will be merged and automatically deployed.