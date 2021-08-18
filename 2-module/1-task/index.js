/*
//*FIRST VERSION OF SOLUTION 

function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    if (typeof salaries[key] === 'number' &&
      typeof salaries[key] !== 'string' &&
      typeof salaries[key] !== 'object' &&
      typeof salaries[key] !== 'undefined' &&
      typeof salaries[key] !== 'boolean' &&
      isNaN(salaries[key]) === false &&
      isFinite(salaries[key]) === true) {
      sum += salaries[key];
    } else if (Object.keys(salaries).length === 0) {
      return 0;
    }
  }
  return sum;
}*/

//*SECOND VERSION OF SOLUTION

function sumSalary(salaries) {
  let sum = 0;
  let values = Object.values(salaries);

  for (let i in values) {

    if (typeof values[i] === 'number' &&
      typeof values[i] !== 'string' &&
      typeof values[i] !== 'boolean' &&
      isNaN(values[i]) === false &&
      isFinite(values[i]) === true) {

      sum += values[i];

    } else if (Object.values(salaries).length === 0) {

      return 0;
    }
  }
  return sum;
}
