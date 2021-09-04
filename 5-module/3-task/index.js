function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner');
  //create new data-attribute to count steps
  if ('count' in carouselInner.dataset === false) {
    //if inner don't have attribute, create it and set it value 0
    carouselInner.dataset.count = 0;
  }
  //create variable for count 
  let count = carouselInner.dataset.count;
  //variables for arrows
  let arrows = document.querySelectorAll('.carousel__arrow');
  let left = document.querySelector('.carousel__arrow_left');
  let right = document.querySelector('.carousel__arrow_right');
  //create variable for width
  let width = carouselInner.offsetWidth;
  //add listeners for arrows 
  arrows.forEach(element => {
    element.addEventListener('click', initCarousel);
  });
  if (this === left) {
    //decrement count when click left button
    count--;
  } else if (this === right) {
    //increment count when click right button
    count++;
  }
  //with increment/decrement above we change value of count, so now we replace it with new 
  carouselInner.dataset.count = count;

  // умножаем шаг на ширину слайда, чтобы сдвигать карусель на нужное количетво слайдов 
  carouselInner.style.transform = `translateX(-${count * width}px)`;

  //check count value and change style for arrows
  if (count == 0) {
    left.style.display = 'none';
  } else if (count != 0) {
    left.style.display = '';
  }

  if (count == 3) {
    right.style.display = 'none';
  } else if (count != 3) {
    right.style.display = '';
  }
}
