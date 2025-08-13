
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});
document.addEventListener('click', (e) => {
  const isClickInside = nav.contains(e.target) || hamburger.contains(e.target);

  if (!isClickInside) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
  if (e.target.tagName === 'A' && nav.classList.contains('active')) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.35
});

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
});
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️ Light Mode';
}
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');

  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const searchIcon = document.querySelector('.search-icon');
const navSearch = document.querySelector('.nav-search');
const searchInput = document.getElementById('product-search');
const products = document.querySelectorAll('.product-card');
const allSections = document.querySelectorAll('main > section');
const productsSection = document.querySelector('#products');

searchIcon.addEventListener('click', () => {
  if (navSearch.classList.contains('active') && searchInput.value.trim() !== '') {
    applyFilter(searchInput.value.toLowerCase().trim());
    productsSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    navSearch.classList.toggle('active');
    if (navSearch.classList.contains('active')) {
      searchInput.focus();
    } else {
      resetPage();
    }
  }
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query) {
    applyFilter(query);
  } else {
    resetPage();
  }
});

function applyFilter(query) {
  allSections.forEach(sec => {
    if (sec !== productsSection) sec.style.display = 'none';
  });
  productsSection.style.display = 'block';
  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}

function resetPage() {
  allSections.forEach(sec => sec.style.display = '');
  products.forEach(product => product.style.display = '');
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const placeOrderBtn = document.getElementById('place-order-btn');

cartBtn.addEventListener('click', () => {
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const item = cart.find(p => p.name === name);

    if (item) {
      item.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x ${item.quantity}</span>
        <span>${item.price * item.quantity} RS</span>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  cartTotal.textContent = total + ' RS';
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

updateCart();

document.getElementById("place-order-btn").addEventListener("click", function () {
  let cartItemsData = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItemsData.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orderText = cartItemsData
    .map(item => `${item.name} - ${item.quantity} x ${item.price} RS`)
    .join("\n");

  let total = cartItemsData.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  document.getElementById("message").value = 
    orderText + `\n\nTotal: ${total} RS\nPayment: Cash on Delivery`;

  document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
});
cartBtn.addEventListener('click', () => {
  cartDropdown.classList.toggle('show');
});
