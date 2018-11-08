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
var $listing = $('div.listing');



/////////////////
// LOADING PAGE

$window.load(function(){
  pageLoaded = true;
  $body.scrollTop(0).removeClass("preload");
});


/////////////////
// FACULTY PAGE

// listing functionality -------------------------------------------------

$listing.hover( function() {
  $(this).find("h3, .ui-arrow").toggleClass("text-outline");
});







// Captioning ---------------------------------------------

var caption;
var creator;

var addCaption = function(source, destination){
  caption = $(source).children("img").data("caption");
  creator = $(source).children("img").data("creator");
  $(destination).html("<h1 class='text-outline'>"+ caption +"</h1><h1 class='text-outline caption-student'>"+ creator +"</h1>");
  var text = $(destination);
  blastText(text);
};

var removeCaption = function(destination){
  $(destination).html("");
};


// Caption for explore ----------------------------------------------

$(".explore-item").hover(function(){
    source = $(this);
    addCaption(source, ".hover-caption");
},function(){
    removeCaption(".hover-caption");
});


// isotope ------------------------------------------------------------

var $explore = $('.explore').isotope({
  // options
  itemSelector: '.explore-item',
  layoutMode: 'masonry'
});

$explore.imagesLoaded().progress( function(){
  var $filter = $(".ui-pill-black").data("filter");
  if ($filter === "everything") { $explore.isotope({ filter: "*" }); }
  else { $explore.isotope({ filter: "." + $filter }); }
  $explore.isotope("layout");
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


// sets up array of elements to change in explore state
var exploreArray = [".page-filter", ".sidebar", ".explore", ".explore-item", ".sidebar-info", ".sidebar-arrow", ".hover-caption", ".background-container", ".lightbox-container"];


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

// clicking into explore section ----------------------------------------------
function exploreOpen(element) {
  $(element).addClass("explore-open");
};

function exploreClose(element) {
  $(element).removeClass("explore-open");
};


$(".explore").on("click", function() {
  $(".info").addClass("push-left-full");
  $(".filter-list").removeClass("hidden");
  $(this).removeClass("blur-hover").addClass("blur-none");

  exploreArray.forEach(exploreOpen);
}
);

// leaving the explore section ----------------------------------------------------

$(".sidebar, .sidebar-info, .sidebar-arrow").hover(function() {
    if ($(this).hasClass("explore-open")) {
        $(".sidebar-arrow").addClass("text-outline");
    }
   }, function() {
    if ($(this).hasClass("explore-open")) {
        $(".sidebar-arrow").removeClass("text-outline");
    }
   }
);


$(".sidebar, .sidebar-info, .sidebar-arrow").on("click", function() {
 if ($(this).hasClass("explore-open")) {
  $(".info").removeClass("push-left-full");
  $(".filter-list").addClass("hidden");
  $(".explore").addClass("blur-full").removeClass("blur-none");

    if ($(".sidebar-arrow").hasClass("text-outline")) {
    $(".sidebar-arrow").removeClass("text-outline");
    }
    if ($(".info").hasClass("push-left")) {
        $(".info").removeClass("push-left");
        }
  exploreArray.forEach(exploreClose);
 }

});

// Lightbox!!!! -------------------------------------------------

function lightboxOpen(element) {
    $(element).addClass("lightbox-open");
  };

  function lightboxClose(element) {
    $(element).removeClass("lightbox-open");
  };

function studentCaptionLink(source, link) {
    var linkUrl = $(source).children("img").data("link");
    console.log(linkUrl);
    console.log(link);
    $(link).addClass("hover-reverse");
    $(link).wrap("<a href='" + linkUrl + "'></a>")
};


$(".explore-item").on("click", function(){
    if($(this).hasClass("explore-open")) {
        exploreArray.forEach(lightboxOpen);
        $body.addClass("overflow-hidden");
        $(".hover-caption").addClass("hidden");
        $(".filter-button").addClass("hidden");

        source = $(this);
        addCaption(source, ".lightbox-caption");

        link = $(".lightbox-caption").children(".caption-student");
        if (link.html()!== ""){link.append("<div class='mps-sans'>&#x2192;</div>");};
        studentCaptionLink(source, link);

        var image = $(this).html();
        $(".lightbox-detail").html(image);
    };
});

$(".lightbox-close").on("click", function(){
        exploreArray.forEach(lightboxClose);
        $body.removeClass("overflow-hidden");
        $(".hover-caption").removeClass("hidden");
        $(".filter-button").removeClass("hidden");
});




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




// font replacer! --------------------------------------------------
$(document).ready(function(){

  var text = $("h1, h3, h4");
  blastText(text);
});


function blastText(text) {
  $(text).blast({
    delimiter: "character",
    generateValueClass: true
  });

  // test for caps,
  $('.blast').each(function(){
    var character = this.innerHTML;
    // console.log(character);
              if (character == character.toUpperCase()) {
            //   console.log('upper case true');
              $(this).addClass('uppercase');
                    if ($(this).hasClass("blast-character-!")) {
                        $(this).addClass("blast-character-excl").removeClass("blast-character-!");
                    }
                    if ($(this).hasClass("blast-character-?")) {
                        $(this).addClass("blast-character-quest").removeClass("blast-character-?");
                    }
                    if ($(this).hasClass("blast-character-1")) {
                        $(this).addClass("blast-character-one").removeClass("blast-character-1");
                    }
                    if ($(this).hasClass("blast-character-2")) {
                        $(this).addClass("blast-character-two").removeClass("blast-character-2");
                    }
          } else {
            $(this).addClass('lowercase');
          }
  });
}


// announcements -----------------------------------------

function titleRepeat(title) {
    var copy = title.html();
    for(i = 0; i < 9; i++) {
        title.append("<br>" + copy);
    }
}

var announcementTitle = $('.announcement-title');

titleRepeat(announcementTitle);

$(".announcement-close").on("click", function(){
    $(".announcement-container").addClass("hidden");
});
