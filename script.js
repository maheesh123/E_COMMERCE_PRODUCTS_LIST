// Fetch products from the mock API
const apiUrl = "https://fakestoreapi.com/products";
let products = [];
let filteredProducts = [];

// Fetch the products when the page loads
window.onload = async function () {
  const res = await fetch(apiUrl);
  products = await res.json();
  filteredProducts = products;
  displayProducts(products);
};

// Display products in the UI
function displayProducts(productArray) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  productArray.forEach((product) => {
    productList.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <p class="card-text">${product.description.substring(0, 50)}...</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartList = document.getElementById("cartList");

  cartList.innerHTML += `
    <li class="list-group-item">
      ${product.title} - $${product.price}
    </li>`;
}

// Filter products by category
document.getElementById("categoryFilter").addEventListener("change", function () {
  const category = this.value;
  if (category === "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((product) => product.category === category);
  }
  displayProducts(filteredProducts);
});

// Sort products by price
document.getElementById("priceSort").addEventListener("change", function () {
  const sortOrder = this.value;
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  displayProducts(filteredProducts);
});
