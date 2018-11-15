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

/////////////////
// VARIABLES

var $body = $('body');
var $window = $(window);
var $document = $(document);

var blastArray = [];

var $listing = $('div.listing');
var $listingCurriculum = $('div.listing-curriculum');
var $announcement = $('.announcement-container');
var $announcementTitle = $('.announcement-title');
var $announcementClose = $('.announcement-close');
var $cookies = $('.cookies-container');
var $cookiesTitle = $('.cookies-title');
var $cookiesClose = $('.cookies-close');
var $textReplaced = $("h1, h3, nav h4");
var $exploreOuter = $('.explore');
var $draggable = $('.explore-items');
var $sidebar = $('.sidebar');
var $exploreArray = $('.exploreOff');
var $exploreItem = $('.explore-item');
var $caption = $('.hover-caption');
var $lightboxCaption = $(".lightbox-caption");
var $lightboxClose = $(".lightbox-close");
var $info = $('.info');

var regexLetters = new RegExp("^[a-z]+$");
var letterRecurrence = 3; // Ex: 4 = 1/4 of the letters replaced
var imagesMin = 150;
var imagesMax = 250;
var pad = 5;


/////////////////
// COOKIES CONFIG

$document.ready(function(){
  if (Cookies.get('announcement') == 'seen') {
    $announcement.addClass("hidden");
  }
  if (Cookies.get('cookies') == 'seen') {
    $cookies.addClass("hidden");
  }
});


/////////////////
// LOADING PAGE

$window.load(function(){
  pageLoaded = true;
  $body.scrollTop(0).removeClass("preload");
});


/////////////////
// TYPEFACE

$document.ready(function(){
  $textReplaced.blast({
    delimiter: "character",
    generateValueClass: true
  });
  $('.blast').each(function(){
    if (regexLetters.test(this.innerHTML)) {
      blastArray.push(this);
    };
  });
  blastArray.sort(function() {
    return 0.5 - Math.random()
  });
  for (var i = 0; i < blastArray.length; i = i + letterRecurrence){
    blastArray[i].classList.add('mps-sans');
  }
});


/////////////////
// FACULTY PAGE

// listing functionality -------------------------------------------------

$listing.hover( function() {
  $(this).find("h3, .ui-arrow").toggleClass("text-outline");
});


/////////////////
// CURRICULUM PAGE

// listing toggle -------------------------------------------------

$listingCurriculum.click( function() {
  $(this).toggleClass("expanded");
});


/////////////////
// ANNOUNCEMENTS

$document.ready(function(){
  for (var i = 0; i < 12; i++) {
    $announcementTitle.append($announcementTitle.html());
  }
});

$announcementClose.on("click", function(){
  $announcement.addClass("off");
  Cookies.set('announcement', 'seen');
});


/////////////////
// COOKIES

$document.ready(function(){
  for (var i = 0; i < 12; i++) {
    $cookiesTitle.append($cookiesTitle.html());
  }
});

$cookiesClose.on("click", function(){
  $cookies.addClass("off");
  Cookies.set('cookies', 'seen');
});


/////////////////
// EXPLORE

// draggable and random positioning -------------------------------------------------

$document.ready(function() {
  $draggable.draggable({
    drag : function(event,ui){
      var parent = ui.helper[0].parentNode;

		  var dragWidth = ui.helper[0].clientWidth;
      var parentWidth = parent.clientWidth;
      var dragHeight = ui.helper[0].clientHeight;
      var parentHeight = parent.clientHeight;

      var widthDifference = dragWidth - parentWidth;
      var heightDifference = dragHeight - parentHeight;

      if(ui.position.left > 0) ui.position.left = 0;
      else if(ui.position.left < -widthDifference) ui.position.left = -widthDifference;

      if(ui.position.top > 0) ui.position.top = 0;
      else if(ui.position.top < -heightDifference) ui.position.top = -heightDifference;
      }
	});
});

var $explore = $('.explore-items').isotope({
  itemSelector: '.explore-item',
  layoutMode: 'masonry'
});

$explore.imagesLoaded().progress( function(){
  var $filter = $(".ui-pill-black").data("filter");
  if ($filter === "everything") { $explore.isotope({ filter: "*" }); }
  else { $explore.isotope({ filter: "." + $filter }); }
  $explore.isotope("layout");
});


// open/close explore section ----------------------------------------------

$exploreOuter.on("click", function() {
  $info.addClass("push-left-full");
  $exploreOuter.removeClass("blur-hover").addClass("blur-none");
  $exploreArray.addClass("explore-open");
  // $(".filter-list").removeClass("hidden");
});

$sidebar.on("click", function() {
  if ($(this).hasClass("explore-open")) {
    $info.removeClass("push-left-full");
    $exploreOuter.addClass("blur-full").removeClass("blur-none");
    $exploreArray.removeClass("explore-open");
  }
});


// Captioning ---------------------------------------------

$exploreItem.hover(function(){
  $caption.html("<h1 class='text-outline'>" + $(this).find('img').data('caption') +
  "</h1><h1 class='text-outline caption-student'>" + $(this).find('img').data('creator') + "</h1>");
},function(){
  $caption.html("");
});


/////////////////
// LIGHTBOX

$exploreItem.on("click", function(){
  if($(this).hasClass("explore-open")) {
    $exploreArray.addClass("lightbox-open");
    $body.addClass("overflow-hidden");
    $(".hover-caption, .filter-button").addClass("hidden");
    $lightboxCaption.html("<h1 class='text-outline'>" + $(this).find('img').data('caption') +
    "</h1><h1 class='text-outline caption-student'><a class='hover-reverse' href='" + $(this).find('img').data('link') + "'>" + $(this).find('img').data('creator') + "</a></h1>");
    $(".lightbox-detail").html($(this).html());
  };
});

$lightboxClose.on("click", function(){
    $exploreArray.removeClass("lightbox-open");
    $body.removeClass("overflow-hidden");
    $(".hover-caption, .filter-button").removeClass("hidden");
});















// nav functionality -----------------------------------------------------

$(".nav-title").on("click", function() {
  console.log("hello!");
  var $menu = $(".nav-menu");
  var $title = $(this).children("h4");

  if(!$menu.hasClass("collapse"))
  {
    $menu.addClass("collapse");
    $title.html("menu");
    $body.removeClass("overflow-hidden");
  } else {
    $menu.removeClass("collapse");
    $title.html("close");
    $body.addClass("overflow-hidden");
  }

});


// explore functionality ---------------------------------------------------


// hover blur

$(".explore").hover(function() {
  if (!$(".explore").hasClass("explore-open")){
    $(".info").addClass("push-left");
    $(this).removeClass("blur-full").addClass("blur-hover");
  }
},
  function() {
    if (!$(".explore").hasClass("explore-open")){
    $(".info").removeClass("push-left");
    $(this).removeClass("blur-hover").addClass("blur-full");
    }
  }
);



// leaving the explore section ----------------------------------------------------










// image filtering functions --------------------------------------------------

$(".filter-list").children().first().on("click", function() {
  var $subMenu = $(this).siblings();

  if ( !$(this).hasClass("expanded") ) {
    $(this).html("Filters -");
    $subMenu.removeClass("hidden");
    $(this).addClass("expanded");
  } else {
    $(this).html("Filters +");
    $subMenu.addClass("hidden");
    $(this).removeClass("expanded");
  }
}
);

$(".filter-list").children(".sub-menu").children(".ui-pill").on("click", function() {
  var $title = $(this).html();
  $(".ui-pill-black").html($title);
  var $filter = $(this).data("filter");
  if ($filter === "everything") { $explore.isotope({ filter: "*" }); }
  else { $explore.isotope({ filter: "." + $filter }); }
}
);
