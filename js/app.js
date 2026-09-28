const phoneGrid = document.getElementById("phoneProducts");
const filters = document.querySelectorAll(".filter");

function renderProducts(list) {
  phoneGrid.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image">
        <span class="badge">${product.badge}</span>
        <img src="${product.image}" alt="${product.brand} ${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="brand">${product.brand}</span>
        <h3>${product.name}</h3>
        <p class="description">Smartphone de alto rendimiento · 5G · gran pantalla</p>
        <div class="price-row">
          <strong>S/ ${product.price.toLocaleString("es-PE")}</strong>
          <del>S/ ${product.oldPrice.toLocaleString("es-PE")}</del>
        </div>
        <button class="add-button" onclick="addToCart(${product.id})">Agregar al carrito</button>
      </div>
    </article>
  `).join("");
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const brand = button.dataset.brand;
    renderProducts(brand === "Todos" ? products : products.filter(p => p.brand === brand));
  });
});

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", event => {
  if (event.target.id === "cartOverlay") closeCart();
});
document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.length) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Pedido preparado! Esta es una demo; puedes conectar aquí tu sistema de pagos.");
});

renderProducts(products);
renderCart();
