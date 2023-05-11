import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    if (getLocalStorage(item.Id)) {
    const newItem = `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${getLocalStorage(item.Id)}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-card__delete" onclick="deleteItem('${item.Id}')">X</button>
  </li>`;
    localStorage.removeItem(item.Id);
    return newItem;
  }
}
  export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }

    renderCartContents() {
      const cartItems = getLocalStorage(this.key);
      if (!cartItems) {
        return null;
      } else {
        this.setQuantity(cartItems)
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      }
    }

    setQuantity(cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        let id = cartItems[i].Id;
        if (getLocalStorage(id)) {
          setLocalStorage(id, parseInt(getLocalStorage(id)) + 1);
        } else {
          setLocalStorage(id, 1);
        }
      }
    }
  }

