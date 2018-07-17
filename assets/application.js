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


// some additional jquery--to be sorted PS




let caption;
let creator;

let addCaption = function(){
  caption = $(this).children("img").data("caption");
  creator = $(this).children("img").data("creator");
  $(".hover-caption").html("<h1>"+ caption +"</h1><h1>"+ creator +"</h1>");
};

let removeCaption = function(){
  $(".hover-caption").html("");
};

$(".explore-item").hover(addCaption,removeCaption);