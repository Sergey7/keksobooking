import { createCardAd } from './cards.js';
import { createAds } from './server.js';
import { maxValueX, maxValueY } from './main.js';



var ads = createAds(maxValueX, maxValueY);

var $pin = document.querySelector('#pin').content.querySelector('.map__pin');
var $mapPins = document.querySelector('.map__pins');
var $map = document.querySelector('.map');
var $mapFiltersContainer = document.querySelector('.map__filters-container');



export var getPins = function () {
  var fragment = document.createDocumentFragment()

  for (var i = 0; i < ads.length ; i++) {
    var newPin = $pin.cloneNode(true);
    var img = newPin.querySelector('img');
    img.src = ads[i].author.avatar;
    img.alt = ads[i].offer.title;

    newPin.style.left = `${ads[i].offer.location.x + 25}px`;
    newPin.style.top = `${ads[i].offer.location.y + 70}px`;
    newPin.setAttribute('data-id', ads[i].id)
    fragment.appendChild(newPin);
  }

  $mapPins.appendChild(fragment)

}



$mapPins.addEventListener('click', function ( evt ) {
  if (evt.target.classList.contains('map__pin') && !(evt.target.classList.contains('map__pin--main'))) {
    var pinId = evt.target.getAttribute('data-id');
    $map.insertBefore(createCardAd(ads[pinId - 1]), $mapFiltersContainer);
  }
  else if (evt.target.classList.contains('map__pin--img')) {
    var pinId = evt.target.parentElement.getAttribute('data-id');
    $map.insertBefore(createCardAd(ads[pinId - 1]), $mapFiltersContainer);
  }
})
