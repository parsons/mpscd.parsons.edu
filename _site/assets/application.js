function concatValues(e){var t="";for(var o in e)t+=e[o];return t}window.jQuery;var $body=$("body"),$window=$(window),$document=$(document),blastArray=[],newLetters=8,$listing=$("div.listing"),$listingCurriculum=$("div.listing-curriculum"),$announcement=$(".announcement-container"),$announcementTitle=$(".announcement-title"),$announcementClose=$(".announcement-close"),$cookies=$(".cookies-container"),$cookiesTitle=$(".cookies-title"),$cookiesClose=$(".cookies-close"),$textReplaced=$("h1, h3, nav h4"),$exploreOuter=$(".explore"),$draggable=$(".explore-items"),$sidebar=$(".sidebar"),$exploreItem=$(".explore-item:not(.important)"),$caption=$(".hover-caption"),$lightbox=$(".lightbox-container"),$lightboxCaption=$(".lightbox-caption"),$lightboxClose=$(".lightbox-close"),$info=$(".info"),$main=$("main"),regexLetters=new RegExp("^[a-z]+$"),letterRecurrence=3,imagesMin=150,imagesMax=250,pad=5;$document.ready(function(){"seen"==Cookies.get("announcement")&&$announcement.addClass("hidden"),"seen"==Cookies.get("cookies")&&$cookies.addClass("hidden")}),$window.on("load",function(){pageLoaded=!0,$body.scrollTop(0).removeClass("preload")}),$document.ready(function(){$textReplaced.blast({delimiter:"character",generateValueClass:!0}),$(".blast").each(function(){regexLetters.test(this.innerHTML)&&blastArray.push(this)});var e=setInterval(function(){if(0!=newLetters){blastArray.sort(function(){return.5-Math.random()});for(var t=0;t<blastArray.length;t+=newLetters)blastArray[t].classList.add("mps-sans");newLetters-=1}else clearInterval(e)},3e3)}),$listing.hover(function(){$(this).find("h3, .ui-arrow").toggleClass("text-outline-screen")}),$listingCurriculum.click(function(){$(this).toggleClass("expanded")}),$document.ready(function(){for(var e=0;e<12;e++)$announcementTitle.append($announcementTitle.html())}),$announcementClose.on("click",function(){$announcement.addClass("off"),Cookies.set("announcement","seen")}),$document.ready(function(){for(var e=0;e<12;e++)$cookiesTitle.append($cookiesTitle.html())}),$cookiesClose.on("click",function(){$cookies.addClass("off"),Cookies.set("cookies","seen")}),$document.ready(function(){$draggable.draggable({drag:function(e,t){var o=t.helper[0].parentNode,i=t.helper[0].clientWidth,n=o.clientWidth,s=t.helper[0].clientHeight,l=o.clientHeight,a=i-n,r=s-l;t.position.left>0?t.position.left=0:t.position.left<-a&&(t.position.left=-a),t.position.top>0?t.position.top=0:t.position.top<-r&&(t.position.top=-r)},start:function(e,t){t.helper.bind("click.prevent",function(e){e.preventDefault()})},stop:function(e,t){setTimeout(function(){t.helper.unbind("click.prevent")},300)}})});var $explore=$(".explore-items").isotope({itemSelector:".explore-item",layoutMode:"masonry"});$explore.imagesLoaded().progress(function(){$explore.isotope("layout")}),$document.on("mousemove",function(e){$(e.target).hasClass("exploreOff")&&$(e.target).hasClass("explore")?$("div#exploreHover").removeClass("hidden").css({top:e.pageY,left:e.pageX}):$("div#exploreHover").addClass("hidden")}),$exploreOuter.on("click",function(){$(this).hasClass("exploreOff")&&($(".exploreOff").removeClass("exploreOff").addClass("exploreOn"),$(".blurOn").addClass("blurOff").removeClass("blurOn"),$("div#exploreHover").addClass("hidden"))}),$sidebar.on("click",function(){$(this).hasClass("exploreOn")&&($(".exploreOn").removeClass("exploreOn").addClass("exploreOff"),$(".blurOff").addClass("blurOn").removeClass("blurOff"))}),$exploreItem.hover(function(){$caption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>")},function(){$caption.html("")});var filters={};$("span#title-sections").text("Everything"),$(".filter-list").on("click",".ui-pill",function(e){var t=$(e.currentTarget),o=t.parents(".sub-menu"),i=o.attr("data-filter-group");filters[i]=t.attr("data-filter");var n=concatValues(filters);$explore.isotope({filter:n})}),$(".sub-menu").each(function(e,t){var o=$(t);o.on("click",".ui-pill",function(e){o.find(".is-checked").removeClass("is-checked");var t=$(e.currentTarget);t.addClass("is-checked");var i="span#title-"+$(this).parent().attr("id");t.hasClass("filter-button")?"sections"==o.attr("id")?$(i).text("Everything"):$(i).empty():$(i).text(t.text())})}),$exploreItem.on("click",function(){$main.addClass("blurred"),$lightbox.addClass("lightboxOn"),$body.addClass("overflow-hidden"),$(".hover-caption").addClass("hidden"),""!=(0!==$(this).find("img").length?$(this).find("img").attr("data-content").trim():"")?($lightboxCaption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>"),$(".lightbox-more").show()):($lightboxCaption.html("<h1 class='text-outline'>"+$(this).find("img, div").data("caption")+"</h1>"),$(".lightbox-more").hide()),$(this).hasClass("imagepost")?($(".lightbox-detail").html($(this).html()),$(".lightbox-description").html($(this).find("img").attr("data-content"))):$(".lightbox-detail").html("<div>"+$(this).find("div").html()+"</div>")}),$lightboxClose.on("click",function(){$lightbox.removeClass("lightboxOn"),$main.removeClass("blurred"),$body.removeClass("overflow-hidden"),$lightboxCaption.css("transform","translateY(0)"),$(".lightbox-description").removeClass("active"),$(".lightbox-description").html("")}),$(".lightbox-more").on("click",function(){var e=$(".lightbox-description").outerHeight();$(".lightbox-description").toggleClass("active"),$(".lightbox-description").hasClass("active")?($(".lightbox-more").find("h1").text("\u2014"),$lightboxCaption.css("transform","translateY(-"+e+"px)")):($(".lightbox-more").find("h1").text("+"),$lightboxCaption.css("transform","translateY(0)"))});