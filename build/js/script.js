'use strict';


var regex = /^-?\d*$/;

/*
anchors.forEach(function (item) {
  item.addEventListener('click', onAnchorClick);
});*/

document.querySelector('html').classList.remove('no-js');

setInputFilter(phoneField, function(value) {
  return regex.test(value);
});

function onAnchorClick(evt) {
  evt.preventDefault();

  var blockId = evt.currentTarget.getAttribute('href');
  document.querySelector(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  evt.currentTarget.blur();
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
