function targetBla(){$(".info a").each(function(){this.host!==window.location.host&&$(this).attr("target","_blank")})}function exploreMove(e){var t=$exploreOuter.offset().left,o=$exploreOuter.width(),i=o+t,n=$exploreOuter.height(),s=e.pageX/o*100,a=e.pageX/i*100,l=e.pageY/n*100;$explore.css("transform","translateX(calc("+a+"vw - "+s+"%)) translateY(calc("+l+"vh - "+l+"%))")}function concatValues(e){var t="";for(var o in e)t+=e[o];return t}window.jQuery;var $body=$("body"),$window=$(window),$document=$(document),blastArray=[],$listing=$("div.listing"),$listingCurriculum=$("div.listing-curriculum .col-11"),$announcement=$(".announcement-container"),$announcementTitle=$(".announcement-title"),$announcementClose=$(".announcement-close"),$cookies=$(".cookies-container"),$cookiesTitle=$(".cookies-title"),$cookiesClose=$(".cookies-close"),$textReplaced=$("h1, h3, nav h4"),$exploreOuter=$(".explore"),$explore=$(".explore-items"),$sidebar=$(".sidebar"),$exploreItem=$(".explore-item:not(.important)"),$caption=$(".hover-caption"),$lightbox=$(".lightbox-container"),$lightboxCaption=$(".lightbox-caption"),$lightboxClose=$(".lightbox-close"),$info=$(".info"),$main=$("main"),regexLetters=new RegExp("^[A-Za-z]+$"),letterRecurrence=6,letterTiming=3e3,imagesMin=150,imagesMax=250,pad=5,down=!1;targetBla(),$document.ready(function(){"seen"==Cookies.get("announcement")&&$announcement.addClass("hidden"),"seen"==Cookies.get("cookies")&&$cookies.addClass("hidden")}),$window.on("load",function(){pageLoaded=!0,$body.scrollTop(0),$explore.imagesLoaded(function(){$explore.isotope({itemSelector:".explore-item",layoutMode:"masonry"}),$explore.isotope("layout")}),$body.removeClass("preload")}),$document.ready(function(){$textReplaced.blast({delimiter:"character",generateValueClass:!0}),$(".blast").each(function(){regexLetters.test(this.innerHTML)&&$(this).parents(".text-outline").length<1&&blastArray.push(this)});setInterval(function(){blastArray.sort(function(){return.5-Math.random()});for(var e=0;e<blastArray.length;e+=letterRecurrence)blastArray[e].classList.remove("mps-expressive"),blastArray[e].classList.add("mps-pixel"),blastArray[e+1]&&(blastArray[e+1].classList.remove("mps-pixel"),blastArray[e+1].classList.add("mps-expressive")),blastArray[e+2]&&(blastArray[e+2].classList.remove("mps-pixel"),blastArray[e+2].classList.remove("mps-expressive"))},letterTiming)}),$listing.hover(function(){$(this).find("h3:not(.no-url), .ui-arrow").toggleClass("text-outline-screen")}),$listingCurriculum.click(function(){console.log($(this)),$(this).parent(".listing-curriculum").toggleClass("expanded"),$(this).parent(".listing-curriculum").find(".listing-description").click(function(e){e.stopPropagation()})}),$document.ready(function(){for(var e=0;e<12;e++)$announcementTitle.append($announcementTitle.html())}),$announcementClose.on("click",function(){$announcement.addClass("off"),Cookies.set("announcement","seen")}),$document.ready(function(){for(var e=0;e<12;e++)$cookiesTitle.append($cookiesTitle.html())}),$cookiesClose.on("click",function(){$cookies.addClass("off"),Cookies.set("cookies","seen")}),$document.on("mousemove",function(e){$(e.target).hasClass("exploreOff")&&$(e.target).hasClass("explore")?$("div#exploreHover").removeClass("hidden").css({top:e.pageY,left:e.pageX}):$("div#exploreHover").addClass("hidden")}),$(document).on("mousemove",function(e){$exploreOuter.hasClass("blurOn")||$main.hasClass("blurred")||exploreMove(e)}),$exploreOuter.on("click",function(e){$(this).hasClass("exploreOff")&&($(".exploreOff").removeClass("exploreOff").addClass("exploreOn"),$(".blurOn").addClass("blurOff").removeClass("blurOn"),$("div#exploreHover").addClass("hidden")),$explore.css("transition","transform .3s ease"),exploreMove(e),setTimeout(function(){$explore.css("transition","none")},300)}),$sidebar.on("click",function(){$(this).hasClass("exploreOn")&&($(".exploreOn").removeClass("exploreOn").addClass("exploreOff"),$(".blurOff").addClass("blurOn").removeClass("blurOff"))}),$exploreItem.hover(function(){$caption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>")},function(){$caption.html("")});var filters={};$("span#title-sections").text("Everything"),$(".filter-list").on("click",".ui-pill",function(e){var t=$(e.currentTarget),o=t.parents(".sub-menu"),i=o.attr("data-filter-group");filters[i]=t.attr("data-filter");var n=concatValues(filters);$explore.isotope({filter:n})}),$(".page-filter").on("click",function(){$(".sub-menu").find(".is-checked").removeClass("is-checked"),$explore.isotope({filter:""}),$(this).find("span").empty(),$(find).find("span#title-sections").text("Everything")}),$(".sub-menu").each(function(e,t){var o=$(t);o.on("click",".ui-pill",function(e){o.find(".is-checked").removeClass("is-checked");var t=$(e.currentTarget);t.addClass("is-checked");var i="span#title-"+$(this).parent().attr("id");t.hasClass("filter-button")?"sections"==o.attr("id")?$(i).text("Everything"):$(i).empty():$(i).text(t.text())})}),$exploreItem.on("click",function(){if($(this).hasClass("imagepost")){$main.addClass("blurred"),$lightbox.addClass("lightboxOn"),$body.addClass("overflow-hidden"),$(".hover-caption").addClass("hidden");""!=(0!==$(this).find("img").length?$(this).find("img").attr("data-content").trim():"")?($lightboxCaption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>"),$(".lightbox-more").show()):($lightboxCaption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>"),$(".lightbox-more").hide()),$(".lightbox-detail").html($(this).html()),$(".lightbox-description").html($(this).find("img").attr("data-content"))}}),$lightboxClose.on("click",function(){$lightbox.removeClass("lightboxOn"),$main.removeClass("blurred"),$body.removeClass("overflow-hidden"),$lightboxCaption.css("transform","translateY(0)"),$(".hover-caption").removeClass("hidden"),$(".lightbox-description").removeClass("active"),$(".lightbox-description").html(""),$explore.css("transition","transform .3s ease"),exploreMove(e),setTimeout(function(){$explore.css("transition","none")},300)}),$(".lightbox-more").on("click",function(){var e=$(".lightbox-description").outerHeight();$(".lightbox-description").toggleClass("active"),$(".lightbox-description").hasClass("active")?($(".lightbox-more").find("h1").text("\u2014"),$lightboxCaption.css("transform","translateY(-"+e+"px)")):($(".lightbox-more").find("h1").text("+"),$lightboxCaption.css("transform","translateY(0)"))});