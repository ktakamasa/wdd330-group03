import { getLocalStorage } from "./utils.mjs";
import { displayCounter } from "./cartCount.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
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
 
  return total;  
}

renderCartContents();
displayCounter();
renderCartTotal();
