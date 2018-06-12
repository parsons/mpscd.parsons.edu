// https://www.superhi.com/video/simple-page-transitions-with-jquery-and-javascript

console.log('v0.pageController');

// const nav
// const navLink -
// const layout =

$('.nav a').on('click', function (event) {
  event.preventDefault()

  const href = $(this).attr('href')
  console.log(href);

  window.history.pushState(null, null, href)

  $('.nav a').removeClass('active')
  $(this).addClass('active')

  $.ajax({
    url: href,
    success: function (data) {
      $('body').fadeOut(250, function () {
        const newPage = $(data).filter('body').html()

        $('body').html(newPage)


        $('body').fadeIn(250)
      })
    }
  })

})
