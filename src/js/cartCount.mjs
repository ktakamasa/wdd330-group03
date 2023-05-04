import { getLocalStorage } from "./utils.mjs";

const span = document.createElement("span");
span.id = "cart-count";
const header = document.querySelector("#main-header");
header.appendChild(span);



export async function displayCounter() {
  let cartItems = await getLocalStorage("so-cart");
  if (!cartItems) {
    const element = document.querySelector("#cart-count");
    element.textContent = 0;
  } else {
    const element = document.querySelector("#cart-count");
    cartItems = getLocalStorage("so-cart").length;
    element.textContent = cartItems;
    
  }

}