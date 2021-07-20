import { disabledForm } from "./form.js";
import { deletePins } from "./pins.js";

export var getRandomNumber = (maxNumber, minNumber = 0) => {
  var number =  Math.floor(Math.random() * maxNumber);
  while (number <= minNumber) {
    number =  Math.floor(Math.random() * maxNumber);
  }
    return number;
};


export var errorHandler = function (errorMessage) {
  var $main = document.querySelector('main');
  var $error = document.querySelector('#error').content.querySelector('.error')
  var $newError = $error.cloneNode(true);
  var $errorMessage = $newError.querySelector('.error__message')
  $errorMessage.innerText = errorMessage;
  $main.appendChild($newError)

  var $errorCloseBtn = $newError.querySelector('.error__button');

  $newError.addEventListener('click', function (evt) {
    if (evt.target === $errorCloseBtn) {
      $newError.remove();
    }
    if (evt.target === $newError) {
      $newError.remove();
    }
  })
}

export var resetAll = function () {
  var $pinMain = document.querySelector('.map__pin--main');
  var $map = document.querySelector('.map');
  var $adressInput = document.querySelector('input[name=address]');
  disabledForm(true);
  $map.classList.add('map--faded');
  deletePins();
  $adressInput.value = '';
  $pinMain.style.left = '570px';
  $pinMain.style.top = '375px';
}
