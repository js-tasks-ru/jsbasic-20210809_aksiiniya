function camelize(str) {
  //*split str to arr of symbols separated by comma 
  let arr = str.split('');

  let transformedARR = arr.map(function (item, index, array) {
    if (item === '-') {
      //*next item after '-' becomes uppercase 
      //*index - index of item, array[index + ] => item with special index, we  need to UpperCase this item
      array[index + 1] = array[index + 1].toUpperCase();

    } else {
      return item;
    }
  });

  return transformedARR.join('');

}
