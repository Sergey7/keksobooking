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
var $card = document.querySelector('#card').content.querySelector('.map__card');
$map.classList.remove('map--faded');

var fragment = document.createDocumentFragment()

for (var i = 0; i < ads.length; i++) {
  var newPin = $pin.cloneNode(true);
  var img = newPin.querySelector('img');
  img.src = ads[i].author.avatar;
  img.alt = ads[i].offer.title;
  newPin.style.left = `${ads[i].offer.location.x}px`;
  newPin.style.top = `${ads[i].offer.location.y}px`;
  fragment.appendChild(newPin);
}

$mapPins.appendChild(fragment)

var createCardAd = (adInfo) => {
  var newCard = $card.cloneNode(true);
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

  return newCard;
}

$map.insertBefore(createCardAd(ads[0]), $mapFiltersContainer);
