import { getLocalStorage } from "./utils.mjs";

export function displayCounter() {
  let cartItems = getLocalStorage("so-cart").length;
    const element = document.querySelector("#cart-count");
    element.textContent = cartItems;
}