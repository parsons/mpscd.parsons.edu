function targetBla(){$(".info a").each(function(){this.host!==window.location.host&&$(this).attr("target","_blank")})}function exploreMove(e){var t=$exploreOuter.offset().left,n=$exploreOuter.outerWidth()-10,o=$exploreOuter.outerHeight(),i=e.pageX-t,a=i/n*100,s=e.pageY/o*100;a<=0?a=0:a>=100&&(a=100),$explore.css("transform","translateX(calc("+a+"vw - "+t/2+"px - "+a+"%)) translateY(calc("+s+"vh - "+s+"%))")}function transitionExplore(e){$explore.css("transition","transform .3s ease"),exploreMove(e),setTimeout(function(){$explore.css("transition","none")},300)}function concatValues(e){var t="";for(var n in e)t+=e[n];return t}function getESTOffset(){return(new Date).getTimezoneOffset()-end.getTimezoneOffset()}function showRemaining(){var e=new Date,t=end-e-getESTOffset()*_hour;if(t<0){clearInterval(timer),document.getElementById("timer").innerHTML="0d 0h 0m 0s!",$(".countdown-timer").addClass("countdown-hidden"),$(".countdown-hero").removeClass("countdown-hidden").addClass("countdown-visible");var n=1e4,o=Date.now()+n;return void function e(){confetti({particleCount:7,angle:60,spread:55,origin:{x:0}}),confetti({particleCount:7,angle:120,spread:55,origin:{x:1}}),Date.now()<o&&requestAnimationFrame(e)}()}var i=Math.floor(t/_day),a=Math.floor(t%_day/_hour),s=Math.floor(t%_hour/_minute),r=Math.floor(t%_minute/_second);document.getElementById("timer").innerHTML=i+"d ",document.getElementById("timer").innerHTML+=a+"h ",document.getElementById("timer").innerHTML+=s+"m ",document.getElementById("timer").innerHTML+=r+"s"}window.jQuery;var $body=$("body"),$window=$(window),$document=$(document),blastArray=[],$listing=$("div.listing"),$listingCurriculum=$("div.listing-curriculum .col-11"),$announcement=$(".announcement-container"),$announcementTitle=$(".announcement-title"),$announcementClose=$(".announcement-close"),$cookies=$(".cookies-container"),$cookiesTitle=$(".cookies-title"),$cookiesClose=$(".cookies-close"),$textReplaced=$("h1, h3, nav h4, nav h4 span"),$exploreOuter=$(".explore"),$explore=$(".explore-items"),$sidebar=$(".sidebar"),$exploreItem=$(".explore-item:not(.important)"),$caption=$(".hover-caption"),$lightbox=$(".lightbox-container"),$lightboxCaption=$(".lightbox-caption"),$lightboxClose=$(".lightbox-close"),$info=$(".info"),$main=$("main"),$outline=$(".text-outline, .text-outline-screen, .text-outline a, .hover-reverse, .hover-text-outline, .lightbox-description p, .lightbox-detail p"),regexLetters=new RegExp("^[A-Za-z]+$"),letterRecurrence=10,letterTiming=3e3,imagesMin=500,imagesMax=800,pad=5,down=!1;targetBla(),$document.ready(function(){(/MSIE 10/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent))&&$outline.each(function(){$(this).addClass("text-shadow")})}),$document.ready(function(){"seen"==Cookies.get("announcement")&&$announcement.addClass("hidden"),"seen"==Cookies.get("cookies")&&$cookies.addClass("hidden")}),$window.on("load",function(){pageLoaded=!0,$body.scrollTop(0),initialFilter=".2021",$explore.imagesLoaded(function(){$explore.isotope({itemSelector:".explore-item",layoutMode:"masonry",filter:initialFilter}),$explore.isotope("layout")}),setTimeout(function(){$body.removeClass("preload")},800)}),$document.ready(function(){$textReplaced.blast({delimiter:"character",generateValueClass:!0}),$(".blast").each(function(){regexLetters.test(this.innerHTML)&&$(this).parents(".text-outline").length<1&&blastArray.push(this)});setInterval(function(){blastArray.sort(function(){return.5-Math.random()});for(var e=0;e<blastArray.length;e+=letterRecurrence)blastArray[e].classList.remove("mps-expressive"),blastArray[e].classList.add("mps-pixel"),blastArray[e+1]&&(blastArray[e+1].classList.remove("mps-pixel"),blastArray[e+1].classList.add("mps-expressive")),blastArray[e+2]&&(blastArray[e+2].classList.remove("mps-pixel"),blastArray[e+2].classList.remove("mps-expressive"))},letterTiming)}),$listing.hover(function(){$(this).find("h3:not(.no-url) a, .ui-arrow").toggleClass("text-outline-screen")}),$listingCurriculum.click(function(){console.log($(this)),$(this).parent(".listing-curriculum").toggleClass("expanded"),$(this).parent(".listing-curriculum").find(".listing-description").click(function(e){e.stopPropagation()})}),$document.ready(function(){for(var e=0;e<12;e++)$announcementTitle.append($announcementTitle.html())}),$announcementClose.on("click",function(){$announcement.addClass("off"),Cookies.set("announcement","seen")}),$(document).click(function(e){$(e.target).closest(".announcement-container").length||$(e.target).closest(".cookies-container").length||$("body").find(".announcement-container").addClass("off")}),$cookiesClose.on("click",function(){$cookies.addClass("off"),Cookies.set("cookies","seen")}),$document.on("mousemove",function(e){$(e.target).hasClass("exploreOff")&&$(e.target).hasClass("explore")?$("div#exploreHover").removeClass("hidden").css({top:e.pageY,left:e.pageX}):$("div#exploreHover").addClass("hidden")}),$(document).on("mousemove",function(e){$exploreOuter.hasClass("blurOn")||$main.hasClass("blurred")||Modernizr.mq("(max-width: 576px)")||exploreMove(e)}),$exploreOuter.on("click",function(e){$(this).hasClass("exploreOff")&&($(".exploreOff").removeClass("exploreOff").addClass("exploreOn"),$(".blurOn").addClass("blurOff").removeClass("blurOn"),$("div#exploreHover").addClass("hidden")),Modernizr.mq("(max-width: 576px)")||transitionExplore(e)}),$sidebar.on("click",function(){$(this).hasClass("exploreOn")&&($(".exploreOn").removeClass("exploreOn").addClass("exploreOff"),$(".blurOff").addClass("blurOn").removeClass("blurOff"))});var is_root="/"==location.pathname,is_firstland=!document.referrer.includes(location.hostname);$exploreOuter.hasClass("exploreOn")&&is_root&&is_firstland&&($(".exploreOff").removeClass("exploreOff").addClass("exploreOn"),$(".blurOn").addClass("blurOff").removeClass("blurOn"),$("div#exploreHover").addClass("hidden")),$exploreItem.hover(function(){/MSIE 10/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)?$caption.html("<h1 class='text-outline text-shadow'>"+$(this).find("img, div").data("caption")+"</h1>"):$caption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>")},function(){$caption.html("")});var filters={};$("span#title-categories").text("Everything"),$(".sub-menu").each(function(e,t){var n=$(t);n.children().each(function(e,t){var o=$(t);if(".2021"===o.attr("data-filter")){var i=n.attr("data-filter-group");filters[i]=o.attr("data-filter"),o.addClass("is-checked");var a="span#title-"+n.attr("id");$(a).text(o.text())}})}),$(".filter-list").on("click",".ui-pill",function(e){var t=$(e.currentTarget),n=t.parents(".sub-menu"),o=n.attr("data-filter-group");filters[o]=t.attr("data-filter");var i=concatValues(filters);$explore.isotope({filter:i})}),$(".page-filter").on("click",function(){$(".sub-menu").find(".is-checked").removeClass("is-checked"),$explore.isotope({filter:""}),filters={},$(this).find("span").empty(),$(find).find("span#title-categories").text("Everything")}),$(".page-filter").mouseenter(function(){jQuery.isEmptyObject(filters)&&(console.log(filters),$(this).addClass("disable-hover"))}),$(".page-filter").mouseleave(function(){$(this).removeClass("disable-hover")}),$(".sub-menu").each(function(e,t){var n=$(t);n.on("click",".ui-pill",function(e){n.find(".is-checked").removeClass("is-checked");var t=$(e.currentTarget);t.addClass("is-checked");var o="span#title-"+$(this).parent().attr("id");t.hasClass("filter-button")?"categories"==n.attr("id")?$(o).text("Everything"):$(o).empty():$(o).text(t.text())})}),$exploreItem.on("click",function(){if($(this).hasClass("imagepost")){$main.addClass("blurred"),$lightbox.addClass("lightboxOn"),$body.addClass("overflow-hidden"),$(".hover-caption").addClass("hidden");""!=(0!==$(this).find("img").length?$(this).find("img").attr("data-content").trim():"")?(/MSIE 10/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)?$lightboxCaption.html("<h2 class='text-outline text-shadow'>"+$(this).find("img, div").data("caption").replace("hover-reverse","hover-reverse text-shadow")+"</h2>"):$lightboxCaption.html("<h2 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h2>"),$(".lightbox-more").show()):(/MSIE 10/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)?$lightboxCaption.html("<h2 class='text-outline text-shadow'>"+$(this).find("img, div").data("caption").replace("hover-reverse","hover-reverse text-shadow")+"</h2>"):$lightboxCaption.html("<h2 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h2>"),$(".lightbox-more").hide()),$(".lightbox-detail").html($(this).html()),$(".lightbox-description").html($(this).find("img").attr("data-content"))}}),$lightboxClose.on("click",function(e){$lightbox.removeClass("lightboxOn"),$main.removeClass("blurred"),$body.removeClass("overflow-hidden"),$lightboxCaption.css("transform","translateY(0)"),$(".hover-caption").removeClass("hidden"),$(".lightbox-description").removeClass("active"),$(".lightbox-description").html(""),$(".lightbox-more").find("h1").text("+"),Modernizr.mq("(max-width: 576px)")||transitionExplore(e)}),$(".lightbox-more").on("click",function(){var e=$(".lightbox-description").outerHeight();$(".lightbox-description").toggleClass("active"),$(".lightbox-description").hasClass("active")?($(".lightbox-more").find("h1").text("\u2014"),$lightboxCaption.css("transform","translateY(-"+e+"px)")):($(".lightbox-more").find("h1").text("+"),$lightboxCaption.css("transform","translateY(0)"))}),$(".js-countdown-dismiss").click(function(){$(".countdown-wrapper").hide()});var end=new Date(countdown_date),_second=1e3,_minute=60*_second,_hour=60*_minute,_day=24*_hour,timer;timer=setInterval(showRemaining,1e3);