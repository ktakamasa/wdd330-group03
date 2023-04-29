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
      renderList() {
        const productCards = this.productList.map(product => {
          return productCardTemplate(product);
        });
    
        this.container.innerHTML = productCards.join("");
      }
    }
  };


  function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.id}">
          <img src="${product.imageUrl}" alt="Image of ${product.name}">
          <h3 class="card__brand">${product.brand}</h3>
          <h2 class="card__name">${product.name}</h2>
          <p class="product-card__price">$${product.price.toFixed(2)}</p>
        </a>
      </li>
    `;
  }