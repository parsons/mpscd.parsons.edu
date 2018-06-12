// var randomizePosition = function(selector) {
//   $(this).load(function() { // get image sizes
//     $(selector).each(function(){
//       var windowHeight = $(window).height();
//       var windowWidth = $(window).width();
//       var objHeight = $(this).height();
//       var objWidth = $(this).width();
//       var top = Math.ceil(Math.random() * windowHeight);
//       var left = Math.ceil(Math.random() * windowWidth);
//
//       console.log('objWidth ' + objWidth);
//       console.log('objHeight ' + objHeight);
//       console.log('top '+ top);
//       console.log('left '+ left);
//
//       $(this).css('position','absolute');
//
//       // if (object size)-(position) will be negative, just use positioning, otherwise subtract the size from the offset
//
//       if (objHeight > top) {
//         $(this).css({
//           'top': top
//         });
//       } else {
//         $(this).css({
//           'top': top - objHeight
//         });
//       }
//
//       if (objWidth > left) {
//         $(this).css({
//           'left': left
//         });
//       } else {
//         $(this).css({
//           'left': left - objWidth
//         });
//       }
//
//     });
//   });
// }
