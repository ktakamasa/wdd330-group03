import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    if (getLocalStorage(item.Id)) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images["PrimaryMedium"]}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${getLocalStorage(item.Id)}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-card__delete ${item.Id}">X</button>
  </li>`;
    localStorage.removeItem(item.Id);
    return newItem;
  }
}

// onclick="deleteItem('${item.Id}')"

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

    // deleteItem(Id) {
    //   const cart = getLocalStorage("so-cart");
    //       for (let i = 0; i < cart.length; i++) {
    //         let id = cart[i].Id;
    //         if (id == Id) {
    //           cart.splice(i, 1);
    //           setLocalStorage("so-cart", cart);
    //           location.reload();
    //           return;
    //         }
    //       }
    //     }
  }

export function deleteItem(Id) {
    const cart = getLocalStorage("so-cart");
        for (let i = 0; i < cart.length; i++) {
          let id = cart[i].Id;
          if (id == Id) {
            cart.splice(i, 1);
            setLocalStorage("so-cart", cart);
            location.reload();
            return;
          }
        }
      }

  // document.querySelector(".cart-card__delete").addEventListener("click", this.deleteItem(cartItems));
