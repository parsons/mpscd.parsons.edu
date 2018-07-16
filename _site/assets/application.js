/* v0
*
*= require _lib/v0/v0
*= require _lib/touch/jquery.ui.touch-punch.min
*= require _lib/ajaxchimp/jquery.ajaxchimp
*= require _lib/ajaxchimp/jquery.ajaxchimp.langs
*= require _lib/jquery.finger/jquery.finger
*= require _lib/hypher/hypher
*= require _lib/hypher/en-us
*= require _lib/marquee/marquee
*
*/

!function($) {


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

