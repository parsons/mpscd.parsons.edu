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
var newLetters = 8;

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
var $exploreItem = $('.explore-item:not(.important)');
var $caption = $('.hover-caption');
var $lightbox = $(".lightbox-container");
var $lightboxCaption = $(".lightbox-caption");
var $lightboxClose = $(".lightbox-close");
var $info = $('.info');
var $main = $('main');

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

$window.on('load', function(){
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
  var lettersInterval = setInterval(function(){
    if (newLetters != 0){

      blastArray.sort(function() {
        return 0.5 - Math.random()
      });
      for (var i = 0; i < blastArray.length; i = i + newLetters){
        blastArray[i].classList.add('mps-sans');
      }
      newLetters -= 1;
    } else {
      console.log('stop')
      clearInterval(lettersInterval);
    }
  }, 3000)
});


/////////////////
// FACULTY PAGE

// listing functionality -------------------------------------------------

$listing.hover( function() {
  $(this).find("h3, .ui-arrow").toggleClass("text-outline-screen");
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
    },
    start: function(event, ui) {
      ui.helper.bind("click.prevent", function(event) {
        event.preventDefault();
      });
    },
    stop: function(event, ui) {
      setTimeout(function(){
        ui.helper.unbind("click.prevent");
      }, 300);
    }
	});
});

var $explore = $('.explore-items').isotope({
  itemSelector: '.explore-item',
  layoutMode: 'masonry'
});

$explore.imagesLoaded().progress( function(){
  $explore.isotope("layout");
});


// hover explore section ----------------------------------------------

$document.on('mousemove', function(e) {
  if ($(e.target).hasClass("exploreOff") && $(e.target).hasClass("explore")) {
    $('div#exploreHover').removeClass('hidden').css({'top': e.pageY, 'left': e.pageX});
  } else {
    $('div#exploreHover').addClass('hidden');
  }
});


// open/close explore section ----------------------------------------------

$exploreOuter.on("click", function() {
  if ($(this).hasClass("exploreOff")) {
    $('.exploreOff').removeClass('exploreOff').addClass("exploreOn");
    $('.blurOn').addClass("blurOff").removeClass("blurOn");
    $('div#exploreHover').addClass('hidden');
  }
});

$sidebar.on("click", function() {
  if ($(this).hasClass("exploreOn")) {
    $('.exploreOn').removeClass('exploreOn').addClass("exploreOff");
    $('.blurOff').addClass("blurOn").removeClass("blurOff");
  }
});


// Captioning ---------------------------------------------

$exploreItem.hover(function(){
  $caption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
},function(){
  $caption.html("");
});


// Filtering ----------------------------------------------

var filters = {};
$("span#title-sections").text('Everything');

$(".filter-list").on('click', '.ui-pill', function(e) {
  var $button = $(e.currentTarget);
  var $buttonGroup = $button.parents('.sub-menu');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  filters[ filterGroup ] = $button.attr('data-filter');
  var filterValue = concatValues( filters );
  $explore.isotope({ filter: filterValue });
});

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
  $main.addClass("blurred");
  $lightbox.addClass('lightboxOn');
  $body.addClass("overflow-hidden");
  $(".hover-caption").addClass("hidden");
  var content = $(this).find('img').length !== 0 ? $(this).find('img').attr('data-content').trim() : '';
  if (content != '') {
    $lightboxCaption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
    $('.lightbox-more').show();
  } else {
    $lightboxCaption.html("<h1 class='text-outline'>" + $(this).find('img, div').data('caption') + "</h1>");
    $('.lightbox-more').hide();
  }
  if (!$(this).hasClass('imagepost')) {
    $(".lightbox-detail").html('<div>' + $(this).find('div').html() + '</div>');
  } else {
    $(".lightbox-detail").html($(this).html());
    $('.lightbox-description').html($(this).find('img').attr('data-content'));
  }
});

$lightboxClose.on("click", function(){
  $lightbox.removeClass('lightboxOn');
  $main.removeClass("blurred");
  $body.removeClass("overflow-hidden");
  $lightboxCaption.css('transform', 'translateY(0)');
  $('.lightbox-description').removeClass('active');
  $('.lightbox-description').html("");
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
