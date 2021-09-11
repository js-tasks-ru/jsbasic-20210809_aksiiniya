import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.steps = steps;
    this.value = value;
    console.log(this);
    this._slider = createElement(`<!--Корневой элемент слайдера-->
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>`);

    //change value in .slider__value
    this._slider.querySelector(".slider__value").textContent = this.value;

    console.log(this.steps);


    //vertical lines ==== this.steps
    for (let i = 0; i < this.steps; i++) {
      this.span = createElement(`<span> </span>`);
      this._slider.querySelector(".slider__steps").append(this.span);
    }
    let sliderValue = this._slider.querySelector(".slider__value");
    //НАЧАЛЬНАЯ ШИРИНА ПОЛОСКИ
    this._slider.querySelector(".slider__progress").style.width = "50%";
    //НАЧАЛЬНОЕ ВАЛЬЮ ПОЛОСКИ
    this._slider.querySelector(".slider__value").textContent = 2;
    this._slider.querySelectorAll("span")[1].className = "slider__step-active";

    this._slider.addEventListener("click", (event) => {
      //ШИРИНА СЛАЙДЕРА
      //console.log(this._slider.offsetWidth);

      //CLIENTX - СОБЫТИЕ ОТНОСИТЕЛЬНО ОКНА ПО ГОРИЗОНТАЛИ
      //THIS BOUNDING _ Крайнее леввое положение точки слайдера(действие внутри прямоугольника)
      console.log(this._slider.getBoundingClientRect());
      let left = event.clientX - this._slider.getBoundingClientRect().left;
      // console.log(event.clientX);
      //ШАГ ОТ 0 ДО ОДНОГО * на 4 сегмента
      let leftRelative = left / this._slider.offsetWidth;
      console.log(leftRelative);
      //КОЛИЧЕСТВО ШАГОВ СЛАЙДЕРА - КОЛИЧЕСТВО СПАНОВ ВНУТРИ от 0 до 4 поэтому минус 1
      let sliderSteps = this.steps - 1;
      console.log(sliderSteps);
      //КОНКРЕТНОЕ ЗНАЧЕНИЕ СЛАЙДЕРА ОТ 0 ДО 1 ОТСЧЕТ ИДЕТ С НУЛЯ!!
      let sliderAmount = Math.round(leftRelative * sliderSteps);
      console.log(sliderAmount);
      //change value in .slider__value
      this._slider.querySelector(".slider__value").textContent = sliderAmount;
      //ПЕРВЫЙ ШАГ ДОЛЖЕН БЫТЬ АКТИВНЫМ ШИРИНА ЦВЕТА == ЗНАЧЕНИЮ ВАЛЬЮ ШАГОВ - 0,1,2,3,4
      //ЗАКРАШИВАЕТСЯ ОПРЕДЕЛЕННЫЙ СЕГМЕНТ ЧЕРЕЗ if
      console.log(this._slider.querySelector(".slider__value"));
      //ШИРИНА СЛАЙДЕРА ЕСЛИ КЛИК - МЕНЯЕТСЯ ШИРИНА SLIDER__PROGRESS через STYLE =
      if (sliderAmount === 0) {
        this._slider.querySelector(".slider__progress").style.width = "0";
        this._slider.querySelectorAll("span")[1].className = "slider__step-active";


      } else if (sliderAmount === 1) {
        this._slider.querySelector(".slider__progress").style.width = "50%";
        this._slider.querySelectorAll("span")[2].className = "slider__step-active";


      } else if (sliderAmount === 2) {
        this._slider.querySelector(".slider__progress").style.width = "50%";
        this._slider.querySelectorAll("span")[3].className = "slider__step-active";

      } else if (sliderAmount === 3) {
        this._slider.querySelector(".slider__progress").style.width = "75%";
        this._slider.querySelectorAll("span")[4].className = "slider__step-active";

      } else if (sliderAmount === 4) {
        this._slider.querySelector(".slider__progress").style.width = "100%";
        this._slider.querySelectorAll("span")[5].className = "slider__step-active";

      }




      this._slider.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: sliderAmount,
        bubbles: true
      }));
      console.log("DISPATCHE");
    });
  }



  get elem() {
    return this._slider;
  }

}
