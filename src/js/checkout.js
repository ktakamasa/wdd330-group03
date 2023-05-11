import CheckoutProcess from "./CheckoutProcess.mjs";

let myCheckout = new CheckoutProcess("so-cart");

myCheckout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  myCheckout.checkout();
});
