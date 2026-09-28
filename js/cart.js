let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  renderCart();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function changeQuantity(productId, change) {
  const item = cart.find(p => p.id === productId);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) removeFromCart(productId);
  renderCart();
}

function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;

  if (!cart.length) {
    container.innerHTML = '<div class="empty-cart">🛒<br><strong>Tu carrito está vacío</strong><p>Agrega tu próximo equipo tecnológico.</p></div>';
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <small>${item.brand}</small>
          <h3>${item.name}</h3>
          <strong>S/ ${item.price.toLocaleString("es-PE")}</strong>
          <div class="quantity">
            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button class="remove" onclick="removeFromCart(${item.id})">Eliminar</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  document.getElementById("cartTotal").textContent =
    `S/ ${cartTotal().toLocaleString("es-PE", {minimumFractionDigits: 2})}`;
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("show");
}
