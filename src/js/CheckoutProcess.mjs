import { getLocalStorage } from "./utils.mjs";

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
        document.querySelector("#total").innerHTML = this.orderTotal;
    }

    calculateTax () {
        this.tax = (this.subtotal * 0.06).toFixed(2);
    }

    calculateShipping () {
        let cost = 0;
        for(let i = 0; i < this.list.length; i++) {
            if(i == 0) {
                cost += 10;
            } else {
                cost += 2;
            }
        }
        this.shipping = cost.toFixed(2)


    }

    calculateOrderTotal() {
        this.orderTotal = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);

    }
}