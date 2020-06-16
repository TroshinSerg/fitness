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

$(document).ready(function () {
  var mySwiper = new Swiper('.coaches__slider .swiper-container', {
    speed: 800,
    navigation: {
      nextEl: '.coaches__slider-btn--next',
      prevEl: '.coaches__slider-btn--prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 40
      }
    }
  });
});
