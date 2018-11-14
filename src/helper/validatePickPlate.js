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
  if ((vehicle.times !== 2 && vehicle.kind === 'MOTORCYCLE') || !vehicle.plate) return false;

  const plate = vehicle.plate;
  const kind = vehicle.kind.toLowerCase();
  const digit = plate.charAt(plate.length-1);
  const day = new Date().getDay();

  const arrayOfDigit = pickPlate[kind][day];

  if(arrayOfDigit.includes(Number(digit))) return true;
  return false;
}