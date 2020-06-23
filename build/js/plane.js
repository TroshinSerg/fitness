'use strict';

(function () {
  var days = $('.plan__days');
  var grid = $('.plan__grid');//
  var daysList = $('.plan__days-item');
  var daysItems = days.children();
  var times = $('.plan__times');
  var timeItems = $('.plan__times-item');
  var lessonsDays = $('.plan__column');
  var lessons = $('.plan__column-item');

  var NodeModClass = {
    TIME: 'plan__times-item--selected',
    TIME_LIST: 'plan__times--disabled',
    DAY: 'plan__days-item--selected',
    DAYS_LIST: 'plan__days--opened',
    DAY_CURRENT: 'plan__days-item--current',
    GRID: 'plan__grid--disabled',
    COLUMN: 'plan__column--active'
  };

  var WindowWidth = {
    TABLET: 1200,
    MOBILE: 768
  };

  var scrollThumbCss = {
    'height': '4px',
    'border-radius': '0',
    'background-color': '#ed0233'
  };
  var scrollTrackCss = {
    'height': '4px',
    'border-radius': '0',
    'background-color': '#feebef'
  };

  var itemAttribute = 'data-id';
  var isSelect = false;
  var isScroll = false;

  if ($(window).width() < WindowWidth.MOBILE) {
    setDaysSelect();
  }

  if ($(window).width() < WindowWidth.TABLET) {
    /* eslint-disable no-undef */
    Scrollbar.init(document.querySelector('.plan__main'), {
      alwaysShowTracks: true
    });
    $('.scrollbar-track-x').css(scrollTrackCss);
    $('.scrollbar-thumb-x').css(scrollThumbCss);
    isScroll = true;
  }


  $(window).on('resize', function () {
    if ($(window).width() < WindowWidth.MOBILE && !isSelect) {
      setDaysSelect();
    } else if ($(window).width() >= WindowWidth.MOBILE && isSelect) {
      resetOrderDays();
    }

    if ($(window).width() < WindowWidth.TABLET && !isScroll) {
      Scrollbar.init(document.querySelector('.plan__main'), {
        alwaysShowTracks: true
      });
    }
  });

  lessons.each(function (index, item) {
    var dayId = parseInt($(item).parent().attr(itemAttribute), 10);
    var day = $(daysItems[dayId]);
    var time = $(timeItems[(index + 4) % 4]);

    $(item).on('mouseover', function () {
      highlightItem(day, NodeModClass.DAY);
      highlightItem(time, NodeModClass.TIME);
    });

    $(item).on('focus', function () {
      highlightItem(day, NodeModClass.DAY);
      highlightItem(time, NodeModClass.TIME);
    });

    $(item).on('mouseout', function () {
      removeHighlightItem(day, NodeModClass.DAY);
      removeHighlightItem(time, NodeModClass.TIME);
    });

    $(item).on('blur', function () {
      removeHighlightItem(day, NodeModClass.DAY);
      removeHighlightItem(time, NodeModClass.TIME);
    });
  });

  function highlightItem(item, selector) {
    item.addClass(selector);
  }

  function removeHighlightItem(item, selector) {
    item.removeClass(selector);
  }

  function setDaysSelect() {
    for (var i = 0; i < daysItems.length; i++) {
      $(daysItems[i]).click(onDaysItemClick);
    }

    days.click(onDaysClick);
    isSelect = true;
  }

  function onDaysClick() {
    days.toggleClass(NodeModClass.DAYS_LIST);
    grid.toggleClass(NodeModClass.GRID);
    times.toggleClass(NodeModClass.TIME_LIST);
  }

  function onDaysItemClick(evt) {
    var activeItem = $(evt.currentTarget);
    var activeItemId = parseInt(activeItem.attr(itemAttribute), 10);
    var firstItem = $(daysItems[0]);
    var firstItemId = parseInt(firstItem.attr(itemAttribute), 10);

    if (activeItem !== firstItem) {
      firstItem.removeClass(NodeModClass.DAY_CURRENT);

      for (var j = 0; j < daysItems.length; j++) {
        var itemId = parseInt($(daysItems[j]).attr(itemAttribute), 10);

        if (itemId === firstItemId - 1) {
          $(daysItems[j]).after(firstItem);
          break;
        }
      }

      activeItem.addClass(NodeModClass.DAY_CURRENT);
      days.prepend(activeItem);
      showLessonsDay(activeItemId);

      daysItems = days.children();
    }
  }

  function resetOrderDays() {
    days.empty();
    days.removeClass(NodeModClass.DAYS_LIST);
    days.off('click', onDaysClick);
    daysList.each(function (index, item) {
      days.append($(item));
      $(item).off('click', onDaysItemClick);
    });

    isSelect = false;
  }

  function showLessonsDay(id) {
    lessonsDays.each(function (index, item) {
      var itemId = parseInt($(item).attr(itemAttribute), 10);

      if (itemId === id) {
        $(item).addClass(NodeModClass.COLUMN);
      } else {
        $(item).removeClass(NodeModClass.COLUMN);
      }
    });
  }

})();
