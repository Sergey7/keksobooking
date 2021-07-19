import { disabledForm, setAdressValue } from "./form.js ";
import { maxValueX, maxValueY } from './main.js';
import { load } from "./backend.js";
import { setPins, deletePins } from "./pins.js"

var $map = document.querySelector('.map');
var $pinMain = document.querySelector('.map__pin--main');


$pinMain.addEventListener('keydown', function (evt) {
  if (evt.code == 'Enter') {
    disabledForm(false);
    $map.classList.remove('map--faded');
    setAdressValue($pinMain);
    deletePins()
    load(setPins)
  };
});


$pinMain.addEventListener('mousedown', function ( evt ) {
  evt.preventDefault();
  var startCords = {
    x: evt.clientX,
    y: evt.clientY
  }

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCords.x - moveEvt.clientX,
      y: startCords.y - moveEvt.clientY,
    };

    startCords.x = moveEvt.clientX;
    startCords.y = moveEvt.clientY

    if ($pinMain.offsetLeft - shift.x < -32.5) {
      $pinMain.style.left = '-32.5px';
    };
    if ($pinMain.offsetLeft - shift.x > maxValueX -32.5) {

      $pinMain.offsetLeft = `${maxValueX + 32.5}px `;
    };
    if ($pinMain.offsetTop - shift.y < 120) {
      $pinMain.style.top = '120px';
    };
    if ($pinMain.offsetTop - shift.y > maxValueY - 130) {
      $pinMain.offsetTop = `${maxValueY - 130}px`;
    };

    $pinMain.style.left =  $pinMain.offsetLeft - shift.x + 'px';
    $pinMain.style.top =  $pinMain.offsetTop - shift.y + 'px';
    setAdressValue($pinMain);
  }

  var onMouseUp = function ( upEvt ) {
    upEvt.preventDefault();
    disabledForm(false);
    $map.classList.remove('map--faded');
    deletePins()
    load(setPins)

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }


  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
})





