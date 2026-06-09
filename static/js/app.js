const cart = new Map();

const formatCurrency = (value) => `Bs ${value.toFixed(2)}`;

const cartItems = document.querySelector("#cartItems");
const subtotalEl = document.querySelector("#subtotal");
const totalEl = document.querySelector("#total");
const cartCountEl = document.querySelector("#cartCount");
const checkoutButton = document.querySelector("#checkoutButton");

function updateCart() {
  const items = Array.from(cart.values());
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  subtotalEl.textContent = formatCurrency(subtotal);
  totalEl.textContent = formatCurrency(subtotal);
  cartCountEl.textContent = count;

  if (!items.length) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito esta listo para recibir sabores.</p>';
    checkoutButton.href = "https://wa.me/59170000000?text=Hola%20Exofresh,%20quiero%20hacer%20un%20pedido";
    return;
  }

  cartItems.innerHTML = items.map((item) => `
    <article class="cart-item">
      <div>
        <h3>${item.name}</h3>
        <p>${formatCurrency(item.price)} por unidad</p>
      </div>
      <div class="quantity-control" aria-label="Cantidad de ${item.name}">
        <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Reducir ${item.name}">-</button>
        <input type="number" min="1" value="${item.quantity}" data-action="quantity" data-id="${item.id}" aria-label="Cantidad">
        <button type="button" data-action="increase" data-id="${item.id}" aria-label="Aumentar ${item.name}">+</button>
      </div>
      <strong>${formatCurrency(item.price * item.quantity)}</strong>
      <button class="remove-button" type="button" data-action="remove" data-id="${item.id}">Eliminar</button>
    </article>
  `).join("");

  const message = encodeURIComponent(`Hola Exofresh, quiero hacer un pedido: ${items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}. Total: ${formatCurrency(subtotal)}`);
  checkoutButton.href = `https://wa.me/59170000000?text=${message}`;
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1,
    };

    if (cart.has(item.id)) {
      cart.get(item.id).quantity += 1;
    } else {
      cart.set(item.id, item);
    }

    updateCart();
  });
});

cartItems.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;

  const item = cart.get(control.dataset.id);
  if (!item) return;

  if (control.dataset.action === "increase") item.quantity += 1;
  if (control.dataset.action === "decrease") item.quantity = Math.max(1, item.quantity - 1);
  if (control.dataset.action === "remove") cart.delete(item.id);

  updateCart();
});

cartItems.addEventListener("change", (event) => {
  const input = event.target.closest('[data-action="quantity"]');
  if (!input) return;

  const item = cart.get(input.dataset.id);
  if (!item) return;

  item.quantity = Math.max(1, Number(input.value) || 1);
  updateCart();
});

const searchInput = document.querySelector("#searchInput");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const emptyState = document.querySelector("#emptyState");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const match = card.dataset.name.includes(query) || card.dataset.description.includes(query);
    card.hidden = !match;
    if (match) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

updateCart();