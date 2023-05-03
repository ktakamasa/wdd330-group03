import ProductData from "./ProductData.mjs";
<<<<<<< HEAD
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();
=======
import ProductListing from "./ProductList.mjs";
import { displayCounter } from "./cartCount.mjs";

const category = "tents";

const dataSource = new ProductData(category);

const listElement = document.querySelector(".product-list");

const productList = new ProductListing(category, dataSource, listElement);
productList.init();

displayCounter();
>>>>>>> origin/main
