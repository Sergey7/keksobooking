var $adressInput = document.querySelector('input[name=address]');
var $roomNumberSelect = document.querySelector('#room_number');
var $capacitySelect = document.querySelector('#capacity');
var capacityOptions = $capacitySelect.querySelectorAll('option');
var $fieldsets = document.querySelectorAll('fieldset');
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
      capacityOptions[i].remove();
    };
  }
}
$roomNumberSelect.addEventListener('change', function (evt) {
  var capacity = getValuesCapacity(evt.target.value);
  resetCapacityValue(capacity);
});

export var disabledForm = function (state) {
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

export var setAdressValue = function (pin) {
  var left = pin.style.left.slice(0, -2);
  var top = pin.style.top.slice(0, -2)
  $adressInput.value = `${left}, ${top}`
}
