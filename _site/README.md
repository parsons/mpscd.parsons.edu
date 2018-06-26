+ [ ] add README.md and fill out information like dependencies, running site locally, development workflow, best practices, etc.
+ [ ] unpackage all the files so they’re at the top level of the repo. I want to be able to `git status` from the same directory as I run `jekyll serve`
+ [ ] when I change the SCSS, git is logging all the sass-cache files. Do some research on `.gitignore`
+ [ ] there are duplicate versions of some files. For instance, `application.scss` exists in multiple places. Also, let’s do a little clean-up on things like `__v0-master`
+ [ ] research something that works with Jekyll for compiling all the .js files into `application.js`. On the base v0 (without Jekyll) we use Grunt (or Gulp? 🤔) to compile that stuff. Maybe Codekit is a good option for us going forward?