import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.subtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateSubtotal();
    this.calculateTax();
    this.calculateShipping();
    this.calculateOrderTotal();
    this.displayTotals();
  }

  calculateSubtotal() {
    const cartItems = getLocalStorage("so-cart");
    let total = 0;
    if (cartItems) {
      const price = cartItems.map((item) => item.FinalPrice);
      total = price.reduce((a, b) => a + b, 0);
    }
    this.subtotal = total.toFixed(2);
  }

  displayTotals() {
    document.querySelector("#subtotal").innerHTML = this.subtotal;
    document.querySelector("#tax").innerHTML = this.tax;
    document.querySelector("#shipping").innerHTML = this.shipping;
    document.querySelector("#orderTotal").innerHTML = this.orderTotal;
  }

  calculateTax() {
    this.tax = (this.subtotal * 0.06).toFixed(2);
  }

  calculateShipping() {
    let cost = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (i == 0) {
        cost += 10;
      } else {
        cost += 2;
      }
    }
    this.shipping = cost.toFixed(2);
  }

  calculateOrderTotal() {
    this.orderTotal = (
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping)
    ).toFixed(2);
  }

  
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  }
}






// //instructor code
// export default class CheckoutProcess {
//   constructor(key, outputSelector) {
//     this.key = key;
//     this.outputSelector = outputSelector;
//     this.list = [];
//     this.itemTotal = 0;
//     this.shipping = 0;
//     this.tax = 0;
//     this.orderTotal = 0;
//   }
//   init() {
//     this.list = getLocalStorage(this.key);
//     this.calculateItemSummary();
//   }
//   calculateItemSummary() {
//     const summaryElement = document.querySelector(
//       this.outputSelector + " #cartTotal"
//     );
//     const itemNumElement = document.querySelector(
//       this.outputSelector + " #num-items"
//     );
//     itemNumElement.innerText = this.list.length;
//     // calculate the total of all the items in the cart
//     const amounts = this.list.map((item) => item.FinalPrice);
//     this.itemTotal = amounts.reduce((sum, item) => sum + item);
//     summaryElement.innerText = "$" + this.itemTotal;
//   }
//   calculateOrdertotal() {
//     this.shipping = 10 + (this.list.length - 1) * 2;
//     this.tax = (this.itemTotal * 0.06).toFixed(2);
//     this.orderTotal = (
//       parseFloat(this.itemTotal) +
//       parseFloat(this.shipping) +
//       parseFloat(this.tax)
//     ).toFixed(2);
//     this.displayOrderTotals();
//   }
//   displayOrderTotals() {
//     const shipping = document.querySelector(this.outputSelector + " #shipping");
//     const tax = document.querySelector(this.outputSelector + " #tax");
//     const orderTotal = document.querySelector(
//       this.outputSelector + " #orderTotal"
//     );
//     shipping.innerText = "$" + this.shipping;
//     tax.innerText = "$" + this.tax;
//     orderTotal.innerText = "$" + this.orderTotal;
//   }
//   async checkout() {
//     const formElement = document.forms["checkout"];

//     const json = formDataToJSON(formElement);
//     // add totals, and item details
//     json.orderDate = new Date();
//     json.orderTotal = this.orderTotal;
//     json.tax = this.tax;
//     json.shipping = this.shipping;
//     json.items = packageItems(this.list);
//     console.log(json);
//     try {
//       const res = await services.checkout(json);
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }