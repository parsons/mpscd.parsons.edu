/* v0
 *
*= require _lib/v0/v0
 *= require _lib/touch/jquery.ui.touch-punch.min
 *= require _lib/ajaxchimp/jquery.ajaxchimp
 *= require _lib/ajaxchimp/jquery.ajaxchimp.langs
 *= require _lib/jquery.finger/jquery.finger
 *= require _lib/hypher/hypher
 *= require _lib/hypher/en-us
*= require _lib/v0/v0.pageController
 *
*/

!function($) {

  $('.js-hyphenate, .js-hyphenate p').hyphenate('en-us');

  // All Projects module
  $.each(data, function (key, value) {

    // console.log(key + ": " + value.length);

    var container = $('.project-index-list');
    //$('body').append(container);

    $.each(value, function (index, field) {

      container.append(
        '<div class="project-index-item ' + field.status + '"><a href="/projects/' + field.permalink + '"><div class="col-xs-7 col-sm-3 u-sm-pln"><p>' + field.name + '</p></div><div class="col-sm-8 hidden-xs"><p>' + field.short_description + '</p></div><div class="col-sm-1"><p class="permalink">&rarr;</p></div><div class="clearfix"></div></a><img src="' + field.thumbnail_url + '"></div>'
      );
    });
  });

  // Client List module
  $.each(data, function (key, value) {

    var container = $('.js-client-list');

    $.each(value, function (index, field) {

      container.append(
        field.name + ', '
      );

    });
  });

  $.each(data, function (key, value) {
    var container = $('.project-header');

    $.each(value, function (index, field) {

      // join tags
      var taglist = '<li>' + field.tags.join('</li><li>') + '</li>';

      // get project ids from json
      var id = field.id;
      console.log('ids: ' + id);

      // get project id from project page
      var projectid = $('.project-id').attr('id');
      console.log("projectid: " + projectid);

      // match page and json ids
      if (id == projectid) {
        console.log("This is project" + field.id);

          container.append(

            '<div class="project-header-inner"><div class="container-fluid"><div class="project-header-nav"><div class="row"><div class="col-xs-12 col-sm-1"><h1><a href="http://www.xxix.co/">&larr;</a></h1></div><div class="col-xs-12 col-sm-6 col-sm-offset-1 col-lg-5 col-lg-offset-2"><h1>' + field.name + '</h1> </div> <div class="col-xs-7 col-sm-3 col-sm-offset-1 col-lg-2 col-lg-offset-1 hidden-xs"><div class="project-status u-relative"><p>' + field.project_status + '</p></div></div></div></div><div class="project-header-body"><div class="row"><div class="col-sm-6 col-sm-offset-2 col-lg-5 col-lg-offset-3"><p class="project-header-body-description t-reading">' + field.description + '</p><div class="project-status visible-xs"><p>' + field.project_status + '</p></div></div><div class="col-xs-10 col-sm-3 col-sm-offset-1 col-lg-2 col-lg-offset-1"> <ul class="project-header-tags">' + taglist + '</ul><ul class="project-header-credits"><li>' + field.credits + '</li></ul> </div></div></div></div></div>'

          );
      } else {
        console.log("Wrong project page");
      }

    });
  });


}(window.jQuery);

$(window).load(function(){
  console.log('window loaded!');
  pageLoaded = true;
  $("body").scrollTop(0);
  $("body").removeClass("preload");
});

$(window).resize(function(){
  console.log('window resized!');
});
