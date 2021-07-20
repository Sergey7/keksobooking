'use strict';

export var load = function (onSuccess, onError) {
  console.log(onError);
  var URL = 'https://23.javascript.pages.academy/keksobooking/data'
  var xhr = new XMLHttpRequest();
  xhr.timeout = 10000;
  xhr.responseType = 'json';

  xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа ${xhr.status} ${xhr.statusText}`);
    }
  })
  xhr.addEventListener('error', function() {
    onError('Произошла ошибка соединения')
  })
  xhr.addEventListener('timeout', function () {
    onError('Запрос выполнялся слишком долго')
  })

  xhr.open('GET', URL);
  xhr.send();
}


export var save = function (data, onLoad, onError) {
  var URL = 'https://23.javascript.pages.academy/keksobooking'
  var xhr = new XMLHttpRequest();
  xhr.timeout = 10000;
  xhr.responseType = 'json';

  xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
      onLoad();
    } else {
      onError(`Статус ответа ${xhr.status} ${xhr.statusText}`);
    }
  })
  xhr.addEventListener('error', function() {
    onError('Произошла ошибка соединения')
  })
  xhr.addEventListener('timeout', function () {
    onError('Запрос выполнялся слишком долго')
  })

  xhr.open('POST', URL);
  xhr.send(data);
}
