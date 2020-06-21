'use strict';

var list = document.querySelector('.list');
var listItems = list.children;
//array.splice(n, 0, element);
/*
listItems.forEach(function (item) {
  item.addEventListener('click', onListItemClick);
});*/

for (var i = 0; i < listItems.length; i++) {
  console.log('ku ku epta')
  listItems[i].addEventListener('click', onListItemClick);
}
/*

При клике по элементу
1. узнаем id первого элемента
2. если

*/


function onListItemClick(evt) {
  var firstEl = listItems[0];
  var firstElId = parseInt(firstEl.getAttribute('data-id'), 10);
  console.log(firstEl);
  if (firstElId !== 0) {
    for (var j = 0; j < listItems.length; j++) {
      //console.log(j);
      var itemId = parseInt(listItems[j].getAttribute('data-id'), 10);
      if (itemId === firstElId - 1) {
        listItems[j].append(firstEl);
      }
    }
    /*listItems.forEach(function (item) {
      var itemId = parseInt(item.getAttribute('data-id'), 10);
      if (itemId === firstElId - 1) {
        item.append(firstEl);
      }
    });*/
    //listItems[firstElId - 1].append(firstEl);
  } else {
    //list.prepend(evt.currentTarget);
  }

  //console.log(listItems)
  //console.log(index);

  //var activeEl = listItems.splice(index, (index + 1));
  //console.log(firstElId);
}
