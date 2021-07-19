'use strict';

export var load = function (onSuccess) {
  var URL = 'https://23.javascript.pages.academy/keksobooking/data'
  var xhr = new XMLHttpRequest();
  xhr.timeout = 10000;
  xhr.responseType = 'json';

  xhr.addEventListener('load', function() {
    onSuccess(xhr.response)
  })

  xhr.open('GET', URL);
  xhr.send();
}
