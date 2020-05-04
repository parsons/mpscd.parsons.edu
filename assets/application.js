---
title: js
---
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
var $listingCurriculum = $('div.listing-curriculum .col-11');
var $announcement = $('.announcement-container');
var $announcementTitle = $('.announcement-title');
var $announcementClose = $('.announcement-close');
var $cookies = $('.cookies-container');
var $cookiesTitle = $('.cookies-title');
var $cookiesClose = $('.cookies-close');
var $textReplaced = $("h1, h3, nav h4");
var $exploreOuter = $('.explore');
var $explore = $('.explore-items');
var $sidebar = $('.sidebar');
var $exploreItem = $('.explore-item:not(.important)');
var $caption = $('.hover-caption');
var $lightbox = $(".lightbox-container");
var $lightboxCaption = $(".lightbox-caption");
var $lightboxClose = $(".lightbox-close");
var $info = $('.info');
var $main = $('main');
var $outline = $('.text-outline, .text-outline-screen, .text-outline a, .hover-reverse, .hover-text-outline, .lightbox-description p, .lightbox-detail p');

var regexLetters = new RegExp("^[A-Za-z]+$");
var letterRecurrence = 6; // Ex: 4 = 1/4 of the letters replaced
var letterTiming = 3000;
var imagesMin = 150;
var imagesMax = 250;
var pad = 5;
var down = false;

/////////////////
// TARGET BLANK

function targetBla(){
  $('.info a').each(function() {
    if (this.host !== window.location.host) {
      $(this).attr('target', '_blank');
    }
  });
}

targetBla();


/////////////////
/// IE BORDER

$document.ready(function() {
  if (/MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    $outline.each(function(){
      $(this).addClass('text-shadow');
    })
  }
});

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

$window.on('load', function(){
  pageLoaded = true;
  $body.scrollTop(0)
  initialFilter = "{{site.initial_filter}}";
  $explore.imagesLoaded( function(){
    $explore.isotope({
      itemSelector: '.explore-item',
      layoutMode: 'masonry',
      filter: "." + initialFilter
    });
    $explore.isotope('layout');

  });
  setTimeout(function(){
    $body.removeClass("preload");
  }, 800)
});

/////////////////
// TYPEFACE

$document.ready(function(){
  $textReplaced.blast({
    delimiter: "character",
    generateValueClass: true
  });
  $('.blast').each(function(){
    if (regexLetters.test(this.innerHTML) && $(this).parents('.text-outline').length < 1) {
      blastArray.push(this);
    };
  });
  var lettersInterval = setInterval(function(){
    blastArray.sort(function() {
      return 0.5 - Math.random()
    });
    for (var i = 0; i < blastArray.length; i = i + letterRecurrence){
      blastArray[i].classList.remove('mps-expressive');
      blastArray[i].classList.add('mps-pixel');
      if (blastArray[i + 1]) {
        blastArray[i + 1].classList.remove('mps-pixel');
        blastArray[i + 1].classList.add('mps-expressive');
      }
      if (blastArray[i + 2]) {
        blastArray[i + 2].classList.remove('mps-pixel');
        blastArray[i + 2].classList.remove('mps-expressive');
      }
    }
  }, letterTiming)
});


/////////////////
// FACULTY PAGE

// listing functionality -------------------------------------------------

$listing.hover( function() {
  $(this).find("h3:not(.no-url) a, .ui-arrow").toggleClass("text-outline-screen");
});


/////////////////
// CURRICULUM PAGE

// listing toggle -------------------------------------------------

$listingCurriculum.click( function() {
  console.log($(this));
  $(this).parent('.listing-curriculum').toggleClass("expanded");
  $(this).parent('.listing-curriculum').find('.listing-description').click(function(e) { e.stopPropagation(); })
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

//if you click on anything except the modal itself or the "open modal" link, close the modal
$(document).click(function(event) {
  if (!$(event.target).closest(".announcement-container").length) {
    $("body").find(".announcement-container").addClass("off");
    console.log('close announcement');
  }
});


/////////////////
// COOKIES

$cookiesClose.on("click", function(){
  $cookies.addClass("off");
  Cookies.set('cookies', 'seen');
});


/////////////////
// EXPLORE

// hover explore section ----------------------------------------------

$document.on('mousemove', function(e) {
  if ($(e.target).hasClass("exploreOff") && $(e.target).hasClass("explore")) {
    $('div#exploreHover').removeClass('hidden').css({'top': e.pageY, 'left': e.pageX});
  } else {
    $('div#exploreHover').addClass('hidden');
  }
});

$(document).on('mousemove', function(e) {
  if (!$exploreOuter.hasClass("blurOn") && !$main.hasClass('blurred') && !Modernizr.mq('(max-width: 576px)')) {
    exploreMove(e);
  }
})

function exploreMove(e) {
  var exploreLeft = $exploreOuter.offset().left;

  var exploreWidth = $exploreOuter.outerWidth() - 10;
  var exploreHeight = $exploreOuter.outerHeight();

  var mL = e.pageX - exploreLeft;

  var mouseLeft = mL / exploreWidth * 100;
  var mouseTop = e.pageY / exploreHeight * 100;

  if (mouseLeft <= 0) { mouseLeft = 0 } else if (mouseLeft >= 100) { mouseLeft = 100 };
  $explore.css('transform', 'translateX(calc(' + mouseLeft + 'vw - ' + exploreLeft / 2 + 'px - ' + mouseLeft + '%)) translateY(calc(' + mouseTop + 'vh - ' + mouseTop + '%))')
}

function transitionExplore(e) {
  $explore.css('transition', 'transform .3s ease');
  exploreMove(e);
  setTimeout(function(){
    $explore.css('transition', 'none');
  }, 300)
}


// open/close explore section ----------------------------------------------

$exploreOuter.on("click", function(e) {
  if ($(this).hasClass("exploreOff")) {
    $('.exploreOff').removeClass('exploreOff').addClass("exploreOn");
    $('.blurOn').addClass("blurOff").removeClass("blurOn");
    $('div#exploreHover').addClass('hidden');
  }
  if (!Modernizr.mq('(max-width: 576px)')) {
    transitionExplore(e);
  }
});

$sidebar.on("click", function() {
  if ($(this).hasClass("exploreOn")) {
    $('.exploreOn').removeClass('exploreOn').addClass("exploreOff");
    $('.blurOff').addClass("blurOn").removeClass("blurOff");
  }
});

if("{{site.is_explore_open}}"){
  var is_root = location.pathname == "/";
  if ($exploreOuter.hasClass("exploreOff") && is_root) {
    $('.exploreOff').removeClass('exploreOff').addClass("exploreOn");
    $('.blurOn').addClass("blurOff").removeClass("blurOn");
    $('div#exploreHover').addClass('hidden');
  }
}


// Captioning ---------------------------------------------

$exploreItem.hover(function(){
  if (/MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
    $caption.html("<h1 class='text-outline text-shadow'>" + $(this).find('img, div').data('caption') + "</h1>");
  } else {
    $caption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
  }
},function(){
  $caption.html("");
});



// Filtering ----------------------------------------------

var filters = {};
$("span#title-sections").text('Everything');
$('.sub-menu').each(function(i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.children().each(function(i, button) {
    var $button = $(button)
    if($button.attr("data-filter") === ".{{site.initial_filter}}") {
      $button.addClass('is-checked');
      var t = 'span#title-' + $buttonGroup.attr('id');
      $(t).text($button.text());
    }
  })

});

$(".filter-list").on('click', '.ui-pill', function(e) {
  var $button = $(e.currentTarget);
  var $buttonGroup = $button.parents('.sub-menu');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  filters[ filterGroup ] = $button.attr('data-filter');
  var filterValue = concatValues( filters );
  $explore.isotope({ filter: filterValue });
});

$('.page-filter').on('click', function(e) {
  $('.sub-menu').find('.is-checked').removeClass('is-checked');
  $explore.isotope({ filter: '' });
  $(this).find('span').empty();
  $(find).find('span#title-sections').text('Everything');
})

$('.sub-menu').each(function(i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', '.ui-pill', function(e) {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    var $button = $(e.currentTarget);
    $button.addClass('is-checked');
    var t = 'span#title-' + $(this).parent().attr('id');
    if(!$button.hasClass('filter-button')){
      $(t).text($button.text());
    } else {
      if($buttonGroup.attr('id') == "sections"){
        $(t).text('Everything');
      } else {
        $(t).empty();
      }
    }
  });
});

function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}



/////////////////
// LIGHTBOX

$exploreItem.on("click", function(){
  if ($(this).hasClass('imagepost')) {
    $main.addClass("blurred");
    $lightbox.addClass('lightboxOn');
    $body.addClass("overflow-hidden");
    $(".hover-caption").addClass("hidden");
    var content = $(this).find('img').length !== 0 ? $(this).find('img').attr('data-content').trim() : '';
    if (content != '') {
      if (/MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        $lightboxCaption.html("<h1 class='text-outline text-shadow'>" + $(this).find('img, div').data('caption').replace('hover-reverse', 'hover-reverse text-shadow') + "</h1>");
      } else {
        $lightboxCaption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
      }
      $('.lightbox-more').show();
    } else {
      if (/MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        $lightboxCaption.html("<h1 class='text-outline text-shadow'>" + $(this).find('img, div').data('caption').replace('hover-reverse', 'hover-reverse text-shadow') + "</h1>");
      } else {
        $lightboxCaption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
      }
      $('.lightbox-more').hide();
    }
    $(".lightbox-detail").html($(this).html());
    $('.lightbox-description').html($(this).find('img').attr('data-content'));
  }
});

$lightboxClose.on("click", function(e){
  $lightbox.removeClass('lightboxOn');
  $main.removeClass("blurred");
  $body.removeClass("overflow-hidden");
  $lightboxCaption.css('transform', 'translateY(0)');
  $(".hover-caption").removeClass("hidden");
  $('.lightbox-description').removeClass('active');
  $('.lightbox-description').html("");
  $(".lightbox-more").find('h1').text('+');
  if (!Modernizr.mq('(max-width: 576px)')) {
    transitionExplore(e);
  }
});

$(".lightbox-more").on("click", function(){
  var t = $('.lightbox-description').outerHeight();
  $('.lightbox-description').toggleClass('active');
  if($('.lightbox-description').hasClass('active')){
    $(".lightbox-more").find('h1').text('—');
    $lightboxCaption.css('transform', 'translateY(-' + t + 'px)');
  } else {
    $(".lightbox-more").find('h1').text('+');
    $lightboxCaption.css('transform', 'translateY(0)');
  }
})
