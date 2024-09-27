'use srtict'

async function getResponse() {
    let response = await fetch('https://dummyjson.com/products');
    let data = await response.json();

    let products = data.products.slice(0, 15);
    products.forEach((element) => {
        document.querySelector(".product-wrapper").innerHTML += `
          <div data-index="${element.id}" class="product">
              <img src="${element.thumbnail}" alt="">
              <div class="product__title">
                  ${element.title}
              </div>
              <div class="price">
                  <p>${element.price}</p>
              </div>
          </div>
      `;
    });
}

getResponse();

document.querySelector(".product-wrapper").addEventListener("click", function (event) {
    let target = event.target.closest(".product");
    if (!target) return;

    document.querySelector(".product-wrapper").style.display = "none";
    let productId = target.dataset.index;
    async function getProduct() {
        let response = await fetch(
            `https://dummyjson.com/products/${productId}`
        );
        let product = await response.json();
        document.querySelector(".full_product").innerHTML = `
          <img src="${product.thumbnail}" alt="${product.name}" style="width: 300px;">
          <h3>${product.title}</h3>
          <p> ${product.description}</p>
          <p> ${product.price} $</p>
          <p> Категория: ${product.category}</p>
          <a href="#" class="btn">Назад</a>
      `;

        document.querySelector(".btn").addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(".full_product").innerHTML = "";
            document.querySelector(".product-wrapper").style.display = "flex";
        });
    }
    getProduct();
})
