'use strict';

var headerBtn = $('.header__btn');
var tabsNavButtons = $('.tickets__tabs-nav-btn');
var footerMenulinks = $('.footer__menu-link');

var phoneField = document.querySelector('.js-phone');
var regex = /^-?\d*$/;

headerBtn.click(onAnchorClick);
tabsNavButtons.each(function (index, item) {
  $(item).click(onTabsBtnClick);
});
footerMenulinks.each(function (index, item) {
  $(item).click(onAnchorClick);
});
setInputFilter(phoneField, function(value) {
  return regex.test(value);
});

function onAnchorClick(evt) {
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


function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

$(document).ready(function () {
  /* eslint-disable no-new */
  new Swiper('.coaches__slider .swiper-container', {
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

$(document).ready(function () {
  /* eslint-disable no-new */
  new Swiper('.reviews__slider .swiper-container', {
    speed: 800,
    navigation: {
      nextEl: '.reviews__slider-btn--next',
      prevEl: '.reviews__slider-btn--prev'
    }
  });
});
