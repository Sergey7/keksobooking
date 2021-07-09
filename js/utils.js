export var getRandomNumber = (maxNumber, minNumber = 0) => {
  var number =  Math.floor(Math.random() * maxNumber);
  while (number <= minNumber) {
    number =  Math.floor(Math.random() * maxNumber);
  }
    return number;
};


