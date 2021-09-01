function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', hideSelf);
  if (this === button) {
    button.setAttribute('hidden', 'true');
  }
}
