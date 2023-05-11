import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

function renderCartTotal() {
  document.querySelector(".total").innerHTML = cartTotalTemplate();
}

function cartTotalTemplate() {
  const newItem = `<div class="cart-total-grid">
    <h3 class="cart-total">Grand Total </h3>
    <h3 class="cart-total-price">$${cartTotal()}</h3>
</div>`;

  return newItem;
}

export function cartTotal() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems === null) {
    let total = 0;
    return total.toFixed(2);
  } else {
    const price = cartItems.map((item) => item.FinalPrice);
    let total = price.reduce((a, b) => a + b, 0);
    return total.toFixed(2);
  }
}

renderCartTotal();
