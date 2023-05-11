import CheckoutProcess from "./CheckoutProcess.mjs";

let checkout = new CheckoutProcess("so-cart");

checkout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault(); 
    checkout.checkout();
});
