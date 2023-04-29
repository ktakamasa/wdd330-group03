import { getLocalStorage } from "./utils.mjs";

export function displayCounter() {
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    const element = document.querySelector("#cart-count");
    element.textContent = 0;
  } else {
    cartItems = getLocalStorage("so-cart").length;
    const element = document.querySelector("#cart-count");
    element.textContent = cartItems;
  }

}