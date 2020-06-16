'use strict';

var headerBtn = $('.header__btn');
var tabsNavButtons = $('.tickets__tabs-nav-btn');

headerBtn.click(onHeaderBtnClick);
tabsNavButtons.each(function (index, item) {
  $(item).click(onTabsBtnClick);
});

function onHeaderBtnClick(evt) {
  var href = $(evt.currentTarget).attr('href');
  $('html, body').animate({scrollTop: $(href).offset().top}, 1000);
  return false;
}

function onTabsBtnClick(evt) {
  evt.preventDefault();
  var target = $(evt.currentTarget).attr('href');

  $(evt.currentTarget).siblings().removeClass('tickets__tabs-nav-btn--active');
  $(evt.currentTarget).addClass('tickets__tabs-nav-btn--active');

  $(target).addClass('tickets__tabs-content--active').siblings().removeClass('tickets__tabs-content--active');
}


$('.coaches__slider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
/*
$('.coaches__slider').owlCarousel({
  items: 4,
  margin: 0,
  responsive: {
    0: {
      items: 1
    },
    480: {
      items: 2
    },
    992: {
      items: 3,
      margin: 139
    },
    1200: {
      items: 4
    }
}
});*/
/*
(function() {
  var position = 0;
  var slidesToShow = 4;
  var slidesToScroll = 4;
  var container = $('.slider');
  var track = $('.track');
  var slide = $('.slide');
  var prev = $('.slider .prev');
  var next = $('.slider .next');
})();
*/
