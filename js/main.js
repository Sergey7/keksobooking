



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
        'rooms': getRandomNumber(20),
        'guests': getRandomNumber(100),
        'checkin': CHECKIN[getRandomNumber(CHECKIN.length)],
        'checkout': CHECKOUT[getRandomNumber(CHECKOUT.length)],
        'features': FEATURES[getRandomNumber(FEATURES.length)],
        'description': 'Описание',
        'photos': [ 'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
        'location': {
          'x': getRandomNumber(500, 130) + 25,
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
var $pin = document.querySelector('#pin').content.querySelector('.map__pin');
var $mapPins = document.querySelector('.map__pins');
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
