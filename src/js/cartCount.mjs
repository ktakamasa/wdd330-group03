export function displayCounter() {
    let totalQty = localStorage.length + 1;
    const element = document.querySelector("#cart-count");
    element.innerHTML = totalQty;
}


