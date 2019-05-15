# Parsons MPSCD

## Developing
1. Install the [Jekyll gem] with `gem install jekyll bundler`
3. Navigate to root directory
4. Run `bundle exec jekyll serve`
5. Compiles to `/_site`
6. Opens at 'http://localhost:4000'
6. Configure `_config.yml`
7. Configure `application.js` to import the JS components you need
8. Configure `application.scss` with project variables and imports for the SCSS components you need

SCSS and JS are compiled with Codekit.

## Typeface
The typeface is open-source and available here: https://github.com/XXIX/mps-typeface

To update the webfonts:
1. Follow directions in [the repo](https://github.com/XXIX/mps-typeface) to export from Glyphs
2. Replace the `.woff` files
