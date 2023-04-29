import { renderListWithTemplate } from './utils.mjs';

function calculateDiscountPercentage(msrp, final) {
    return Math.round((msrp - final) / msrp * 100);
}

function productCardTemplate(product) {
    let msrp = "";
    let msrp_val = product.SuggestedRetailPrice;
    let final_val = product.FinalPrice;
    if (msrp_val > final_val) {
        msrp = `<s>$${product.SuggestedRetailPrice}</s> -${calculateDiscountPercentage(msrp_val, final_val)}%`;
    }

    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="card__msrp">${msrp}</p>
        <p class="product-card__price">$${final_val}</p>
      </a>
    </li>`
}

function filterProducts(list) {
    return list.slice(0, 4);
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, filterProducts(list));
    }
}