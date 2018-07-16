# Parsons MPSCD


## Getting started
1. Install the [Jekyll gem] with 'gem install jekyll bundler'
2. Download and unpackage the .zip of v0
3. Navigate to root directory
4. Run `jekyll serve`
5. Compiles to `/_site`
6. Opens at 'http://localhost:4000'
6. Configure `_config.yml`
7. Configure `application.js` to import the JS components you need
8. Configure `application.scss` with project variables and imports for the SCSS components you need
9. configure `fonts.scss`

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
+ [ ] add README.md and fill out information like dependencies, running site locally, development workflow, best practices, etc.
+ [x] unpackage all the files so they’re at the top level of the repo. I want to be able to `git status` from the same directory as I run `jekyll serve`
+ [x] when I change the SCSS, git is logging all the sass-cache files. Do some research on `.gitignore`
+ [x] there are duplicate versions of some files. For instance, `application.scss` exists in multiple places. Also, let’s do a little clean-up on things like `__v0-master`
+ [x] research something that works with Jekyll for compiling all the .js files into `application.js`. On the base v0 (without Jekyll) we use Grunt (or Gulp? 🤔) to compile that stuff. Maybe Codekit is a good option for us going forward?
+ [ ] move to-do items to Issues
+ [ ] implement isotope
+ [ ] decide on underlying base grid (bootstrap? Bootstrap-modified?)
+ [ ] figure out margins/spacing around content (inner, container-liquid..)
+ [ ] separate layers for content and gallery
+ [ ] add ui elements (as ::after?)
+ [ ] decide on structure for Jekyll posts (put all info in yaml front matter?)
+ [ ] create liquid template for gallery (and any other applicable sections)
+ [ ] create randomization for gallery (skewed distribution towards recent?)
+ [ ] use relative paths for navigation urls – should work locally as well as remotely
+ [ ] put nav in config and create list dynamically
+ [ ] put site title in config
+ [ ] use prefix naming convention for classes e.g. `.text-outline`
+ [ ] use relative paths for assets
+ [ ] plan for interaction between layers
+ [ ] plan for sizing of top layer
+ [ ] change grid variables
+ [ ] check `.colorway-light` for `.bg-light` functionality
+ [ ] variablize colors
+ [ ] since the layout for every page is the same let's talk about simplifying this with some logic
+ [ ] page transitions
+ [ ] loader
+ [ ] remove doctype stuff from pages, just use it in head/layout

## Code review
+ generally best to avoid styling `.col-`, `.row`, etc.
+
