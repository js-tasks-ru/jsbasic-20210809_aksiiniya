function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  if (this === button) {
    //1st solution with toggleAttribute 
    text.toggleAttribute('hidden');

    //2nd solution with if/else statements

    //if text has attribute hidden, we remove the attribute,
    //else - we set the attribute

    // if (text.getAttribute('hidden')) {
    // console.log(text.getAttribute('hidden')); //true 
    //   text.removeAttribute('hidden');
    // } else {
    //   text.setAttribute('hidden', 'true');
    // }

  }


  button.addEventListener('click', toggleText);
}
