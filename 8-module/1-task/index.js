import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
    // console.log(this.elem);
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {
        once: true
      });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    //main element
    if (document.querySelector(".cart-icon") !==null && document.querySelector(".cart-icon").classList.contains('cart-icon_visible')) {
      let cardHolder = document.querySelector(".cart-icon");
      //at first it is 0, then - 57, 62it means we see this icon


      let cont = document.querySelector("h3 + div");
      cont.style.position = "relative";


      if (window.scrollY >= 50) {
        cardHolder.style.position = "fixed";
        cardHolder.style.top = `50px`;
        cardHolder.style.right = `10px `;
        cardHolder.style.left = `auto`;
      }

      if (cardHolder.scrollIntoView || cardHolder.offsetWidth >= (window.innerWidth - document.querySelector('.container').offsetWidth)) {
        let leftIndent = Math.min(
          document.querySelector('.container').getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';

        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          left: leftIndent,
          right: "auto",
        });
      } else {
        cardHolder.style.position = "absolute";
        cardHolder.style.right = "20px";
        cardHolder.style.left = "auto";


      }
      if (document.documentElement.clientWidth <= 767) {
        cardHolder.style.position = "";
        cardHolder.style.right = "";
        cardHolder.style.left = "";
        cardHolder.style.top = "";

      }
    }
  }
}
