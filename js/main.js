var TYPEROOME = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']


var getRandomNumber = (maxNumber, minNumber = 0) => {
  var number =  Math.floor(Math.random() * maxNumber);
  if (number >= minNumber) return number
  else getRandomNumber(maxNumber, minNumber);
};

var createAds = () => {
  var ads = []

  for (var i = 1; i <= 8; i++) {

    var newAd = {
      'id': i,
      'author': {
        'avatar': `img/avatars/user0${i}.png`
      },
      'offer': {
        'title': 'Заголовок',
        'address': `${getRandomNumber(1000)}, ${getRandomNumber(1000)}`,
        'price': getRandomNumber(50000),
        'type': TYPEROOME[getRandomNumber(TYPEROOME.length)],
        'rooms': getRandomNumber(20, 1),
        'guests': getRandomNumber(100, 1),
        'checkin': CHECKIN[getRandomNumber(CHECKIN.length)],
        'checkout': CHECKOUT[getRandomNumber(CHECKOUT.length)],
        'features': FEATURES[getRandomNumber(FEATURES.length)],
        'description': 'Описание',
        'photos': [ 'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
        'location': {
          'x': getRandomNumber(1000, 130) + 25,
          'y': getRandomNumber(630, 130) + 70,
        }
      }
    }
    ads.push(newAd);
  }
  return ads;
}
var ads = createAds();


var $map = document.querySelector('.map');


var $mapFiltersContainer = document.querySelector('.map__filters-container');
var $pin = document.querySelector('#pin').content.querySelector('.map__pin');
var $mapPins = document.querySelector('.map__pins');



var $fieldsets = document.querySelectorAll('fieldset');

var disabledForm = function (state) {
  if (state) {
    for (var i = 0; i < $fieldsets.length; i++) {
    $fieldsets[i].disabled = true;
    };
  } else {
      for (var i = 0; i < $fieldsets.length; i++) {
      $fieldsets[i].disabled = false;
      };
    }
};

var setAdressValue = function (pin) {
  var left = pin.style.left.slice(0, -2);
  var top = pin.style.top.slice(0, -2)
  $adressInput.value = `${left}, ${top}`
}

disabledForm(true);

var $pinMain = document.querySelector('.map__pin--main');
$pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    disabledForm(false);
    $map.classList.remove('map--faded');
    setAdressValue($pinMain);
  };
});

$pinMain.addEventListener('keydown', function (evt) {
  if (evt.code == 'Enter') {
    disabledForm(false);
    $map.classList.remove('map--faded');
    setAdressValue($pinMain);
  };
});

var $adressInput = document.querySelector('input[name=address]');


var $roomNumberSelect = document.querySelector('#room_number');
var $capacitySelect = document.querySelector('#capacity');
var capacityOptions = $capacitySelect.querySelectorAll('option');

var getValuesCapacity = function (room) {
  switch (room){
    case '1':
      return ['1'];
    case '2':
      return ['1', '2'];
    case '3':
      return ['1', '2', '3'];
    case '100':
      return ['0'];
  }
}

var resetCapacityValue = function (capacity) {
  for (var i = 0; i < capacityOptions.length; i++) {
    if (capacity.indexOf(capacityOptions[i].value) != -1) {
      $capacitySelect.appendChild(capacityOptions[i]);
    }
    else {
      console.log(capacityOptions[i]);
      capacityOptions[i].remove();
    };
  }
}
$roomNumberSelect.addEventListener('change', function (evt) {
  var capacity = getValuesCapacity(evt.target.value);
  resetCapacityValue(capacity);

}
)



var fragment = document.createDocumentFragment()
for (var i = 0; i < ads.length ; i++) {
  var newPin = $pin.cloneNode(true);
  var img = newPin.querySelector('img');
  img.src = ads[i].author.avatar;
  img.alt = ads[i].offer.title;
  newPin.style.left = `${ads[i].offer.location.x}px`;
  newPin.style.top = `${ads[i].offer.location.y}px`;
  newPin.setAttribute('data-id', ads[i].id)
  fragment.appendChild(newPin);
}
$mapPins.appendChild(fragment)


var $card = document.querySelector('#card').content.querySelector('.map__card');


var createCardAd = (adInfo) => {
  var newCard = $card.cloneNode(true);
  var cardClose = newCard.querySelector('.popup__close');
  newCard.querySelector('.popup__title').textContent = adInfo.offer.title;
  newCard.querySelector('.popup__text--address').textContent = adInfo.offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${adInfo.offer.price}₽/ночь`;
  switch (adInfo.offer.type) {
    case 'flat':
      newCard.querySelector('.popup__type').textContent = 'Квартира';
      break
    case 'bungalo':
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
      break
    case 'house':
      newCard.querySelector('.popup__type').textContent = 'Дом';
      break
    case 'palace':
      newCard.querySelector('.popup__type').textContent = 'Дворец';
  }

  newCard.querySelector('.popup__text--capacity').textContent = `${adInfo.offer.rooms} комнаты для ${adInfo.offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${adInfo.offer.checkin}, выезд до ${adInfo.offer.checkout}`;
  newCard.querySelector('.popup__features').textContent = adInfo.offer.features;
  newCard.querySelector('.popup__description').textContent = adInfo.offer.description;

  var $photoAd = newCard.querySelector('.popup__photo');
  $photoAd.src = adInfo.offer.photos[0];
  var $photos = newCard.querySelector('.popup__photos');
  for (var i = 1; i < adInfo.offer.photos.length; i++) {
    var newPhoto = $photoAd.cloneNode(true)
    newPhoto.src = adInfo.offer.photos[i];
    $photos.appendChild(newPhoto);
  }

  newCard.querySelector('.popup__avatar').src = adInfo.author.avatar;
  newCard.classList.add('cardShow');

  cardClose.addEventListener('click', function () {
    newCard.remove();


  })



  return newCard;
}

$mapPins.addEventListener('click', function ( evt ) {
  if (evt.target.classList.contains('map__pin')) {
    var pinId = evt.target.getAttribute('data-id');
    $map.insertBefore(createCardAd(ads[pinId - 1]), $mapFiltersContainer);
  }
  else if (evt.target.classList.contains('map__pin--img')) {
    var pinId = evt.target.parentElement.getAttribute('data-id');
    $map.insertBefore(createCardAd(ads[pinId - 1]), $mapFiltersContainer);
  }
})


