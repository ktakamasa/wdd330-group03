import { getLocalStorage } from "./utils.mjs";
//import { displayCounter } from "./cartCount.mjs";

export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    return null;
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}
function renderCartTotal()
{
  document.querySelector(".total").innerHTML = cartTotalTemplate();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
function cartTotalTemplate() {
  const newItem = `<div class="cart-total-grid">


    <h3 class="cart-total">Grand Total </h3>
    <h3 class="cart-total-price">$${cartTotal()}</h3>
  
</div>`;

  return newItem;
}

function cartTotal() {
  const cartItems = getLocalStorage("so-cart");
  const price = cartItems.map((item) => (item.FinalPrice));
  let total=price.reduce((a, b) => a + b, 0);
 
  return total.toFixed(2);  
}


