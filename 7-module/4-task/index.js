import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({
    steps,
    value = 0
  }) {
    this.steps = steps;
    this.value = value;
    this._slider = createElement(`
  <div class="slider">
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">
    </div>
  </div>`);

    //change value in .slider__value
    this._slider.querySelector(".slider__value").textContent = this.value;

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
      // console.log(this._slider.getBoundingClientRect());
      let left = event.clientX - this._slider.getBoundingClientRect().left;
      // console.log(event.clientX);
      //ШАГ ОТ 0 ДО ОДНОГО * на 4 сегмента
      let leftRelative = left / this._slider.offsetWidth;
      // console.log(leftRelative);
      //КОЛИЧЕСТВО ШАГОВ СЛАЙДЕРА - КОЛИЧЕСТВО СПАНОВ ВНУТРИ от 0 до 4 поэтому минус 1
      let sliderSteps = this.steps - 1;
      // console.log(sliderSteps);
      //КОНКРЕТНОЕ ЗНАЧЕНИЕ СЛАЙДЕРА ОТ 0 ДО 1 ОТСЧЕТ ИДЕТ С НУЛЯ!!
      let sliderAmount = Math.round(leftRelative * sliderSteps);
      // console.log(sliderAmount);
      //change value in .slider__value
      this._slider.querySelector(".slider__value").textContent = sliderAmount;
      //ПЕРВЫЙ ШАГ ДОЛЖЕН БЫТЬ АКТИВНЫМ ШИРИНА ЦВЕТА == ЗНАЧЕНИЮ ВАЛЬЮ ШАГОВ - 0,1,2,3,4
      //ЗАКРАШИВАЕТСЯ ОПРЕДЕЛЕННЫЙ СЕГМЕНТ ЧЕРЕЗ if
      // console.log(this._slider.querySelector(".slider__value"));
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

      this._slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: sliderAmount,
        bubbles: true
      }));
    });


    function sliderMove(event) {
      //PART 2 
      //thumb
      let thumb = this._slider.querySelector(".slider__thumb");
      //progressbar
      let progressBar = this._slider.querySelector(".slider__progress");
      //cancel ondragstart
      thumb.ondragstart = () => false;
      //cancel pointerdown and pointermove
      event.preventDefault();
      //координата по горизонтали минус крайняя левая точка, в итоге плучаем те же 340, но с нуля
      //место, где находился курсор во время клика
      let left = event.clientX - this._slider.getBoundingClientRect().left;

      //получение в процентах относительно всего слайдера - место где находился курсор делим на ширину
      let leftRelative = left / this._slider.offsetWidth;


      //так как мы можем выходить за пределы слайдера значение нужно ограничить 0 и 1 
      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }
      console.log(leftRelative);
      //получение значения в процентах, 0 и 1 будут дробными значениями, следовательно чтобы получить более точный результат, умножаем на 100

      let percents = leftRelative * 100;
      console.log(percents);
      let sliderSteps = this.steps - 1;
      let sliderAmount = Math.round(sliderSteps * leftRelative);
      //задаем класс slider Dragging
      this._slider.classList.add("slider_dragging");
      //перемещаем ползунок
      thumb.style.left = `${percents}%`;
      //перемещаем движение полоски
      progressBar.style.width = `${percents}%`;
      this._slider.querySelector(".slider__value").textContent = sliderAmount;



      document.addEventListener("pointerup", (event) => {
        //CustomEvent
        this._slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: sliderAmount,
          bubbles: true
        }));

        //убираем класс slider Dragging,убираем прослушивание
        this._slider.classList.remove("slider_dragging");
        document.removeEventListener("onpointermove", sliderMove);
      });

    }

    document.onpointermove = sliderMove.bind(this);


  }
  get elem() {
    return this._slider;
  }

}
