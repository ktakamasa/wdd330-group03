import { renderListWithTemplate } from "./utils.mjs";

function calculateDiscountPercentage(msrp, final) {
    return Math.round((msrp - final) / msrp * 100);
}

function productCardTemplate(product) {
    if (filterProducts(product)) {
        let msrp = "";
        let msrp_val = product.SuggestedRetailPrice;
        let final_val = product.FinalPrice;
        if (msrp_val > final_val) {
            msrp = `<s>$${product.SuggestedRetailPrice}</s> -${calculateDiscountPercentage(msrp_val, final_val)}%`;
        }


        return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img src="${product.Image}" alt="Image of ${product.Name}"/>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="card__msrp">${msrp}</p>
    <p class="product-card__price">$${final_val}</p>
    </li>`;
    }
}

function filterProducts(product) {
    const activeProducts = ["880RR", "985RF", "985PR", "344YJ"];
    if (activeProducts.includes(product.Id)) {
        return true;
    }
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible.
        // Being able to define these things when we use the class will make it very flexible

        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        // render the list - to be completed
        this.renderList(list);
    }

    // render method first stretch
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    // render method before stretch activity
    // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }
}