// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export async function loadHeaderFooter() {
  const path = "../partials/"
  const headerStr = await loadTemplate(`${path}header.html`);
  const footerStr = await loadTemplate(`${path}footer.html`);
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  renderWithTemplate(headerStr, header)
  renderWithTemplate(footerStr, footer)

  displayCounter();
}

function displayCounter() {
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    const element = document.querySelector("#cart-count");
    element.textContent = 0;
  } else {
    const element = document.querySelector("#cart-count");
    cartItems = getLocalStorage("so-cart").length;
    element.textContent = cartItems;
  }
}