var randomizeLayer = function(selector, z) {
  $(selector).each(function(){
    var layer = Math.ceil(Math.random() * 1000);
    $(this).css('z-index', layer);
  });
}
