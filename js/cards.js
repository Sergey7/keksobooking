var $card = document.querySelector('#card').content.querySelector('.map__card');

export var createCardAd = (adInfo) => {
  var newCard = $card.cloneNode(true);
  var cardClose = newCard.querySelector('.popup__close');
  newCard.querySelector('.popup__title').textContent = adInfo.offer.title;
  newCard.querySelector('.popup__text--address').textContent = `${adInfo.offer.location.x + 25} ${adInfo.offer.location.y + 70}`;
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
