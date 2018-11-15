// Information of pick and plate medellin  2 semester
const pickPlate = {
  car: {
    1: [0,1,2,3],
    2: [4,5,6,7],
    3: [8,9,0,1],
    4: [2,3,4,5],
    5: [6,7,8,9]
  },
  motorcycle: {
    1: [6,7],
    2: [8,9],
    3: [0,1],
    4: [2,3],
    5: [4,5]
  }
}

module.exports = async(vehicle) => {
  let digit;
  const plate = vehicle.plate;
  const kind = vehicle.kind.toLowerCase();

  // Validate if vehicle is a bike or motorcycle 4 times
  if ((vehicle.times !== 2 && vehicle.kind === 'MOTORCYCLE') || !vehicle.plate) return false;

  // Digit to validate for pick and plate
  if (vehicle.kind === 'MOTORCYCLE') {
    digit = plate.charAt(plate.length-2);
  } else {
    digit = plate.charAt(plate.length-1);
  }

  // Get actual day
  const day = new Date().getDay();

  // Array of digits with pick and plate
  const arrayOfDigit = pickPlate[kind][day];

  // Validate if the digit is in the array
  if(arrayOfDigit.includes(Number(digit))) return true;
  return false;
}