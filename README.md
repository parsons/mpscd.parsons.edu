# Parsons MPSCD

Production URL: https://mpscd.parsons.edu

## Developing (circa June 2025)

This project uses Jekyll `3.10.0` (and Ruby `3.1.4`). We’re limited here by older [Ruby SASS](https://sass-lang.com/blog/ruby-sass-is-unsupported/) versions/conventions, which break on upgrading past `>4.0`.

On a Mac, and assuming you have [Homebrew](https://brew.sh) installed:

```sh
# For processing the images down
brew install imagemagick webp

# Install rbenv and Ruby build tools
brew install rbenv ruby-build
rbenv init
exec $SHELL

# Install an older Ruby
rbenv install 3.1.4

# Install Bundler and dependencies
gem install bundler
bundle install
```

### Running the site

1. Run `bundle exec jekyll serve`
1. Compiles locally to `/_site` (don’t check this in!)
1. This is served at 'http://localhost:4000'

Jekyll will compile your SCSS and changes to `application.js`. If you need to combine `.js` files, you can use Codekit to compile them.

## Deploying/Publishing
1. You can make changes over on [Siteleaf](https://manage.siteleaf.com/sites/5c33862b290be2499413842e/pages)
1. …or edit the repo and merge your changes into `main`
1. The site is built back on GitHub, serving up the Jekyll artifact

## CMS and updating
- Year filter needs to be added manually to `_data/filters.yml`
- Countdown date needs to be formatted as `05/11/2021 7:01 PM EDT`. Do not use Siteleaf's date picker.
- By tagging a project `important`, you can create a special announcement block in the Explore section
- You can choose whether a post should be a `text` or `image`
