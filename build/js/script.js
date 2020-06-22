'use strict';

var headerBtn = $('.header__btn');
var tabsNavButtons = $('.tickets__tabs-nav-btn');
var footerMenulinks = $('.footer__menu-link');
var phoneField = document.querySelector('.js-phone');
var regex = /^-?\d*$/;
var webp = 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAMASJaQAA3AA/v7uqgAAAA==';

document.createElement('picture');

thisIsWebP().then(function () {
  $('html').addClass('webp');
}, function () {
  $('html').addClass('no-webp');
});

headerBtn.click(onAnchorClick);
tabsNavButtons.each(function (index, item) {
  $(item).click(onTabsBtnClick);
});

footerMenulinks.each(function (index, item) {
  $(item).click(onAnchorClick);
});

if (phoneField) {
  setInputFilter(phoneField, function (value) {
    return regex.test(value);
  });
}

function thisIsWebP() {
  /* eslint-disable new-cap */
  var def = $.Deferred();
  var crimg = new Image();

  crimg.onload = function () {
    def.resolve();
  };
  crimg.onerror = function () {
    def.reject();
  };
  crimg.src = webp;
  return def.promise();
}

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
  /* eslint-disable no-invalid-this */
  ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function (evt) {
    textbox.addEventListener(evt, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  });
}

/* eslint-disable no-undef */
$(document).ready(function () {
  /* eslint-disable no-new */
  if (document.querySelector('.coaches__slider .swiper-container')) {
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
  }
});

$(document).ready(function () {
  /* eslint-disable no-new */
  if (document.querySelector('.reviews__slider .swiper-container')) {
    new Swiper('.reviews__slider .swiper-container', {
      speed: 800,
      navigation: {
        nextEl: '.reviews__slider-btn--next',
        prevEl: '.reviews__slider-btn--prev'
      }
    });
  }
});
