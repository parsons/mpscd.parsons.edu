# Parsons MPSCD

## Getting started
1. Install the [Jekyll gem] with `gem install jekyll bundler`
2. Download and unpackage the .zip of v0
3. Navigate to root directory
4. Run `bundle exec jekyll serve`
5. Compiles to `/_site`
6. Opens at 'http://localhost:4000'
6. Configure `_config.yml`
7. Configure `application.js` to import the JS components you need
8. Configure `application.scss` with project variables and imports for the SCSS components you need

## Dependencies
- v0
- Bootstrap

## Font export from Glyphs
1. Open `MPS-Sans.glyphs` on Glyphs
2. Modify the typeface as you need. First master must not be modify, second is for Expressive font and third is for Pixel.
3. Export the fonts with `⌘ + E` > Webfonts.
4. Select `Truetype`, `Automatic Hinting` and export in WOFF and WOFF2 directly in the `assets > fonts` folder of the website. Expressive and Pixel fonts will be exported.
