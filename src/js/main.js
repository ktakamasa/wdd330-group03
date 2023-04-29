import ProductData from "./ProductData.mjs";
import ProductList from "./Productlist.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductListing("Tents", dataSource, element);

listing.init();

// const productDataInstance = new ProductData(); // create a new instance of the ProductData 
// const productListingInstance = new ProductListing(); // create a new instance of the ProductData 