//USED TO WORK 

// import { getLocalStorage } from "./utils.mjs";


// export function displayCounter() {
//     window.onload = () => {
//         const span = document.createElement("span");
//         span.id = "cart-count";
//         const div = document.querySelector(".cart");
//         div.appendChild(span);
    
//     let cartItems = getLocalStorage("so-cart");
//     if (!cartItems) {
//           const element = document.querySelector("#cart-count");
//           element.textContent = 0;
//         } else {
//               const element = document.querySelector("#cart-count");
//               cartItems = getLocalStorage("so-cart").length;
//               element.textContent = cartItems;
//         }            
//     }
// }