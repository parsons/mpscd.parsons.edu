# v0
Start a new site quickly and easily.

## Getting started
1. Install the [SV gem](https://github.com/XXIX/smallvictories-gem)
2. Download and unpackage the .zip of v0
2. Run `sv watch`
3. Compiles to `/build`
4. Configure `_sv_config.yml`
5. Configure `application.js` to import the JS components you need
6. Configure `application.scss` with project variables and imports for the SCSS components you need
2. configure `fonts.scss`

## Transporting v0
How would you install v0 in an existing project?

## Typography
- philosophy
- workflow
- usage

## Utilities and Layouting
v0 uses Bootstrap 4’s Layout and Utilities tools:

- [Bootstrap—Layout](https://getbootstrap.com/docs/4.1/layout/overview/)
- [Bootstrap—Utilities](https://getbootstrap.com/docs/4.1/utilities/borders/)

## Differences
- Use `@include sm { ... }` but Bootstrap `@include media-breakpoint-up(xl) { ... }` is also supported

## Deprecated
These are still supported but should be phased out in favor of Bootstrap helpers:

- positioning – `u-relative`, etc.
- display – `u-block`, etc.
- spacing – `u-sm-pvlg`, etc.

## To do
+ [x] Update bootstrap
+ [x] CSS grid and flexbox helpers
+ [x] Typography updates
+ [x] Variables updates
+ [x] Helpers
+ [x] Variables as classes e.g. `$letter-sm` > `.letter-sm {}`
+ [x] clean up `cursors.scss`
+ [x] make default open graph and favicons images
+ [x] move tests
+ [x] `body {-moz-osx-font-smoothing: grayscale;}`
+ [x] `.sv-badge {display: none !important;}`
+ [x] image filepath
+ [ ] update font path variable
+ [ ] variablize set and reading text namespaces - `#{$t-set}`
+ [x] move font smoothing
+ [x] add ::selection to defaults
+ [x] delete bootstrap 3
+ [x] placeholder images
+ [x] em, strong in .t-reading
+ [x] default line height on t-set headlines
+ [x] default letter on t-set reading
+ [x] letter spacing none class
+ [x] update ul > li in t-set
+ [x] nested lists
+ [x] body min height vh
+ [x] border utilities
+ [x] color reverse utilities
+ [x] background utilities
