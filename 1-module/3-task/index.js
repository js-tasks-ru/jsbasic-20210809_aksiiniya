function ucFirst(str) {
  if (str.length === 0) {
    return str;
  } else {
    return str[0].toUpperCase() + str.substring(1);
  }
}
