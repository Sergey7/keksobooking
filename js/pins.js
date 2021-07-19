import { createCardAd } from './cards.js';
import { maxValueY, maxValueX } from './main.js';
import {getRandomNumber } from './utils.js'

var $pin = document.querySelector('#pin').content.querySelector('.map__pin');
var $mapPins = document.querySelector('.map__pins');
var $map = document.querySelector('.map');
var $mapFiltersContainer = document.querySelector('.map__filters-container');


export var setPins = function (pins) {
  var fragment = document.createDocumentFragment()
  for (var i = 0; i < 8 ; i++) {
    var newPin = $pin.cloneNode(true);
    var img = newPin.querySelector('img');
    img.src = pins[i].author.avatar;
    img.alt = pins[i].offer.title;
    img.setAttribute('data-id', i)
    newPin.setAttribute('data-id', i)
    newPin.style.left = `${getRandomNumber(maxValueX - 50) + 25}px`;
    newPin.style.top = `${getRandomNumber(maxValueY - 180, 130) + 70}px`;
    fragment.appendChild(newPin);
  }
  $mapPins.appendChild(fragment)

  $mapPins.addEventListener('click', function ( evt ) {
    if ((evt.target.classList.contains('map__pin') && !(evt.target.classList.contains('map__pin--main'))) || (evt.target.classList.contains('map__pin--img'))) {
      var $oldCard = document.querySelector('.cardShow')
      if ($oldCard) {
        $oldCard.remove();
      }

      $map.insertBefore(createCardAd(pins[evt.target.getAttribute('data-id')]), $mapFiltersContainer);
    }
  })
}


export var deletePins = function () {
  var allPins = document.querySelectorAll('.map__pin');
  if (allPins.length !== 1) {
    for (var i = 0; i < allPins.length; i++) {
      if (allPins[i].classList.contains('map__pin--main')) {
        continue
      }
      allPins[i].remove();
    }
  }
}



