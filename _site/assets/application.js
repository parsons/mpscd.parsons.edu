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


// caption showing for explore

let caption;
let creator;

let addCaption = function(){
  caption = $(this).children("img").data("caption");
  creator = $(this).children("img").data("creator");
  $(".hover-caption").html("<h1 class='text-outline'>"+ caption +"</h1><h1 class='text-outline'>"+ creator +"</h1>");
};

let removeCaption = function(){
  $(".hover-caption").html("");
};

$(".explore-item").hover(addCaption,removeCaption);


// isotope

let $explore = $('.explore').isotope({
  // options
  itemSelector: '.explore-item',
  layoutMode: 'masonry'
});

$explore.imagesLoaded().progress( function(){
  $explore.isotope("layout");
});


// listing functionality

$(".listing").on("click", function() {
  var $description = $(this).children(".listing-description");

  if(!$description.hasClass("expanded"))
  {
    $description.addClass("expanded");
    $(this).children(".ui-arrow").addClass("rotate-180");
  } else {
    $description.removeClass("expanded");
    $(this).children(".ui-arrow").removeClass("rotate-180");
  }
});

$(".listing").hover( 
  function() {
  $(this).children(".col-sm-8").children("h3").addClass("text-outline");
  $(this).children(".ui-arrow").addClass("text-outline");
  }, function() {
    $(this).children(".col-sm-8").children("h3").removeClass("text-outline");
    $(this).children(".ui-arrow").removeClass("text-outline");
    }
);


// nav functionality

$(".nav-title").on("click", function() {
  console.log("hello!");
  var $menu = $(".nav-menu");
  var $title = $(this).children("h4");

  if(!$menu.hasClass("collapse"))
  {
    $menu.addClass("collapse");
    $title.html("menu");
    $("body").removeClass("overflow-hidden");
  } else {
    $menu.removeClass("collapse");
    $title.html("close");
    $("body").addClass("overflow-hidden");
  }

});


// explore functionality

$(".explore").hover(function() {
  console.log("hello!");
  $(".info").addClass("push-left");
  $(this).removeClass("blur-full").addClass("blur-hover");
},
  function() {
    console.log("goodbye!");
    $(".info").removeClass("push-left");
    $(this).removeClass("blur-hover").addClass("blur-full");
  }
);

$(".explore").on("click", function() {
  console.log("whaat!");
  $(".info").addClass("push-left-full");
  $(this).removeClass("blur-hover").addClass("blur-none");
}
);