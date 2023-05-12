import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

let myCheckout = new CheckoutProcess("so-cart");

myCheckout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  let myForm = document.forms[0];
  let validity = myForm.checkValidity();
  myForm.reportValidity();
  if (validity) {
    myCheckout.checkout();
  }
});
