import { getRandomNumber } from './utils.js';

var TYPEROOME = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

export var createAds = (maxX, maxY) => {
  var ads = []

  for (var i = 1; i <= 8; i++) {
    var newAd = {
      id: i,
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: 'Заголовок',
        address: function () {
          return `Координаты ${this.location.x}, ${this.location.y}`
        },
        price: getRandomNumber(50000),
        type: TYPEROOME[getRandomNumber(TYPEROOME.length)],
        rooms: getRandomNumber(20, 1),
        guests: getRandomNumber(100, 1),
        checkin: CHECKIN[getRandomNumber(CHECKIN.length)],
        checkout: CHECKOUT[getRandomNumber(CHECKOUT.length)],
        features: FEATURES[getRandomNumber(FEATURES.length)],
        description: 'Описание',
        photos: [ 'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
        location: {
          x: getRandomNumber(maxX - 50),
          y: getRandomNumber(maxY - 180, 130),
        }
      }
    };
    ads.push(newAd);
  }
  return ads;
}
