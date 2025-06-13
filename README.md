# Parsons MPSCD

Production URL: https://mpscd.parsons.edu

## Developing (circa June 2025)

This project uses Jekyll `3.9.5` and the latest compatible plugin versions.

### Setup on a modern Mac

Assuming you have [Homebrew](https://brew.sh) installed:

```sh
# Install rbenv and Ruby build tools
brew install rbenv ruby-build
rbenv init
exec $SHELL

# Install Ruby 2.7.8
rbenv install 2.7.8
rbenv global 2.7.8

# Install Bundler and dependencies
gem install bundler:2.4.22
bundle _2.4.22_ install
```

### Running the site

1. Run `bundle exec jekyll serve`
1. Compiles locally to `/_site` (don’t check this in!)
1. This is served at 'http://localhost:4000'

Jekyll will compile your SCSS and changes to `application.js`. If you need to combine `.js` files, you can use Codekit to compile them.

## Deploying/Publishing
1. Merge your changes into `master` and push
1. Check your changes on production by using the Preview link in Siteleaf
1. When you’re ready, click Publish
1. The site is built back on GitHub, serving up the Jekyll artifact

## CMS and updating
- Year filter needs to be added manually to `_data/filters.yml`
- Countdown date needs to be formatted as `05/11/2021 7:01 PM EDT`. Do not use Siteleaf's date picker.
- By tagging a project `important`, you can create a special announcement block in the Explore section
- You can choose whether a post should be a `text` or `image`
