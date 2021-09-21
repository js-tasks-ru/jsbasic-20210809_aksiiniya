function getMinMax(str) {
  //*split string by spaces
  let arrFromSting = str.split(' ');
  //*create Number of each item in arr
  let mapArr = arrFromSting.map(item => Number(item));
  //*create empty arr
  let filterArr = [];
  //*if there are numbers, push them into filterArr
  mapArr.filter((item) => {
    if (isNaN(item) === false) {
      filterArr.push(item);
    }
  });
  //*Sort arr from min to max 
  let sortArr = filterArr.sort((a, b) => a - b);
  //*create obj with string template 0 index - min value, length-1 - max value
  //*use unary plus to turn template string into number
  let result = {
    min: +`${sortArr[0]}`,
    max: +`${sortArr[sortArr.length - 1]}`
  };
  //*return obj
  return result;
}
