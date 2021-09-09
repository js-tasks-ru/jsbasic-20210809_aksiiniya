import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = createElement(`<div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>
         <h3 class="modal__title">
        </h3>
        </div>
           <div class="modal__body">
      </div>
    </div>
  </div>`);

    let button = this.elem.querySelector(".modal__close");

    button.addEventListener("click", () => {
      this.close();
    });

    //не понимаю разницы между this._modal и this.elem почему при написании
    //this.elem - тесты не проходят, хотя на странице все работает, а при написании
    //this._modal - тесты проходит, и на странице все работает так же
    console.log(this._modal, this.elem);

    //Keydown
    function onkeydown(event) {
      console.log(this);
      if (event.code === "Escape") {
        console.log(this);

        this.close();
      }
    }

    document.body.onkeydown = onkeydown.bind(this);
  }


  get elem() {
    return this._modal;
  }
  open() {
    document.body.append(this._modal);
    document.body.classList.add("is-modal-open");
    document.body.addEventListener("keydown", this.onkeydown);
  }

  //выбрать элемент на странице и записать внутрь тексконтента нужный  аргумент
  setTitle(title) {
    this._modal.querySelector(".modal__title").textContent = title;
  }

  //аргумент - то, что мы хотим показать в модальном окне, вставляет в modal__body
  setBody(body) {
    this._modal.querySelector(".modal__body").innerHTML = "";
    this._modal.querySelector(".modal__body").append(body);
  }
  close() {
    this._modal.remove();
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.onkeydown);
  }
}
