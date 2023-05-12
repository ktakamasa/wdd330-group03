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


export function calculateDiscountPercentage(msrp, final) {
  return Math.round((msrp - final) / msrp * 100);
}


export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export let loadNewsletter = document.addEventListener("DOMContentLoaded", function() {

  const newsletterButton = document.getElementById("newsletter-button");
  const newsletterModal = document.getElementById("newsletter-modal");
  const closeButton = document.getElementsByClassName("close")[0];
  const form = document.getElementById("newsletter-form");
  const thankYou = document.getElementById("thank-you");
  
  newsletterButton.addEventListener("click", function () {
    newsletterModal.style.display = "block";
  });
  
  closeButton.addEventListener("click", function () {
    newsletterModal.style.display = "none";
  });
  
  window.addEventListener("click", function (event) {
    if (event.target == newsletterModal) {
      newsletterModal.style.display = "none";
    }
  });
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const fname = document.getElementById("news-fname").value;
    document.getElementById(
      "thank-you"
    ).innerHTML = `Thank you for subscribing, ${fname}!`;
    thankYou.style.display = "block";
  });
});