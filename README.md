# Parsons MPSCD

Production URL: https://mpscd.parsons.edu

## Developing

> [!WARNING]
> To get this running on a modern Mac (assuming Homebrew is installed):
>
> ```sh
> # Install rbenv and Ruby build tools
> brew install rbenv ruby-build
> rbenv init
> exec $SHELL
>
> # Install the older Ruby
> rbenv install 2.7.8
>
> # Install Bundler and dependencies
> gem install bundler:2.0.1
> bundle _2.0.1_ install
> ```
>
> Then you should be able to pick up as before:

1. Run `bundle exec jekyll serve`
1. Compiles to `/_site`
1. Opens at 'http://localhost:4000'
1. Work on `develop` branch and merge into `master` when you want to deploy (see below)

Jekyll will compile your SCSS and changes to `application.js`. If you need to combine `.js` files, you can use Codekit to compile them.

## Deploying/Publishing
1. Merge your changes into `master` and push.
2. Check your changes on production by using the Preview link in Siteleaf.
3. When you’re ready, click Publish.

<hr>

- by tagging a project `important`, you can create a special announcement block in the Explore section
- you can choose whether a post should be a `text` or `image`

<hr>

## Typeface
The typeface is open-source and available here: https://github.com/XXIX/mps-typeface

To update the webfonts:
1. Follow directions in [the repo](https://github.com/XXIX/mps-typeface) to export from Glyphs
2. Replace the `.woff` files

## CMS and updating
- Year filter needs to be added manually to `_data/filters.yml`
- Countdown date needs to be formatted as `05/11/2021 7:01 PM EDT`. Do not use Siteleaf's date picker.
