import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { displayCounter } from "./cartCount.mjs";

const category = "tents";

const dataSource = new ProductData(category);

const listElement = document.querySelector(".product-list");

const productList = new ProductListing(category, dataSource, listElement);
productList.init();

displayCounter();