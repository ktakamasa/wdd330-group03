import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listHeading = document.querySelector("#product-list-heading");

const category = getParam("category");

let headingText = "Top Products: ";

switch (category) {
  case "tents":
    headingText += "Tents";
    break;
  case "sleeping-bags":
    headingText += "Sleeping Bags";
    break;
  case "backpacks":
    headingText += "Backpacks";
    break;
  case "hammocks":
    headingText += "Hammocks";
    break;
  default:
    headingText += "All Products";
}

listHeading.textContent = headingText;

const dataSource = new ProductData();

const listElement = document.querySelector(".product-list");

const productList = new ProductListing(category, dataSource, listElement);

productList.init();

loadHeaderFooter();
