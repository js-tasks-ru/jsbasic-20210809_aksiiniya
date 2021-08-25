function showSalary(users, age) {
  //*create array that contains all items that fit age 
  let arr = users.filter((item, index, arr) => {
    return item.age <= age;
  });
  //*return name and balance from that array
  let string = arr.map((item, index, arr) => {
    return `${item.name}, ${item.balance}`;
  });
  //*add join by line translation
  return string.join('\n');

}
