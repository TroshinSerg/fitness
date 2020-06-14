'use strict';

var headerBtn = $('.header__btn');
var tabsNavButtons = $('.tickets__tabs-nav-btn');

headerBtn.click(onHeaderBtnClick);
tabsNavButtons.each(function () {
  $(this).click(onTabsBtnClick);
});

function onHeaderBtnClick() {
  var href = $(this).attr('href');
  $('html, body').animate({scrollTop: $(href).offset().top}, 1000);
  return false;
}

function onTabsBtnClick() {
  var target = $(this).attr('data-target');

  $(this).siblings().removeClass('tickets__tabs-nav-btn--active').attr('disabled', false);
  $(this).addClass('tickets__tabs-nav-btn--active').attr('disabled', true);

  $(target).addClass('tickets__tabs-content--active').siblings().removeClass('tickets__tabs-content--active');
}
