import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this.price = slides.price;
    this.name = slides.name;
    this.image = slides.image;
    this.id = slides.id;
    this.htmlString = "";
    for (let i = 0; i < slides.length; i++) {
      this.htmlString += `<div class="carousel__slide" data-id="${slides[i].id}">
            <img src="/assets/images/carousel/${slides[i].image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slides[i].price.toFixed(2)}</span>
              <div class="carousel__title">${slides[i].name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`;

    }

    this._carousel = createElement(`<div class="carousel"><div class="carousel__arrow carousel__arrow_right">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
              </div>
              <div class="carousel__arrow carousel__arrow_left">
                <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
              </div><div class="carousel__inner">${this.htmlString}</div></div>`);


    let arrows = this._carousel.querySelectorAll(".carousel__arrow");
    //hide left arrow button
    arrows[1].style.display = "none";
    let inner = this._carousel.querySelector(".carousel__inner");

    inner.dataset.counter = 0;
    arrows.forEach(arrow => arrow.addEventListener('click', (event) => {
      let inner = this._carousel.querySelector(".carousel__inner");
      //amount of slides to 
      let amountSlides = inner.childNodes.length;
      let width = inner.offsetWidth;
      let left = this._carousel.querySelector(".carousel__arrow_left");
      let right = this._carousel.querySelector(".carousel__arrow_right");
      if ('counter' in inner.dataset === false) {
        inner.dataset.counter = 0;
      }
      let counter = inner.dataset.counter;

      if (event.target.closest(".carousel__arrow_left")) {
        counter--;
      }
      if (event.target.closest(".carousel__arrow_right")) {
        counter++;
      }
      inner.dataset.counter = counter;
      inner.style.transform = `translateX(-${width * counter}px)`;

      if (counter == 0) {
        left.style.display = 'none';
      } else if (counter !== 0) {
        left.style.display = '';
      }

      if (counter == amountSlides - 1) {
        right.style.display = 'none';
      } else if (counter !== 0) {
        right.style.display = '';
      }

    }));
    console.log(inner.dataset.counter);
    let button = this._carousel.querySelectorAll('.carousel__button');
    console.log(button);
    let slide = this._carousel.querySelectorAll('.carousel__slide');

    button.forEach(button =>
      button.addEventListener('click', () => {
        this._carousel.dispatchEvent(new CustomEvent("product-add", {
          detail: slide[inner.dataset.counter].dataset.id,
          bubbles: true
        }));

        console.log(slide);
        console.log(slide[inner.dataset.counter].dataset.id);

      }));
  }

  get elem() {
    return this._carousel;
  }

}
