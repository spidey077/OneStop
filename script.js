const hamburger = document.getElementById("hamburger"), nav = document.getElementById("navbar");
hamburger.addEventListener("click", (() => { hamburger.classList.toggle("active"), nav.classList.toggle("active") }));
document.addEventListener("click", (e => { nav.contains(e.target) || hamburger.contains(e.target) || (hamburger.classList.remove("active"), nav.classList.remove("active")), "A" === e.target.tagName && nav.classList.contains("active") && (hamburger.classList.remove("active"), nav.classList.remove("active")) }));
const observer = new IntersectionObserver((e => { e.forEach((e => { e.isIntersecting && (e.target.classList.add("show"), observer.unobserve(e.target)) })) }), { threshold: .1 });
document.querySelectorAll(".section").forEach((e => { observer.observe(e) })), window.addEventListener("load", (function () { document.getElementById("loader").classList.add("hidden") }));
const toggleBtn = document.getElementById("theme-toggle"), body = document.body, savedTheme = localStorage.getItem("theme");
"dark" === savedTheme && (body.classList.add("dark-mode"), toggleBtn.textContent = "☀️ Light Mode"), toggleBtn.addEventListener("click", (() => { body.classList.toggle("dark-mode"); const e = body.classList.contains("dark-mode"); toggleBtn.textContent = e ? "☀️ Light Mode" : "🌙 Dark Mode", localStorage.setItem("theme", e ? "dark" : "light") }));

// --- Improved Search Logic ---
const searchIcon = document.querySelector(".search-icon"),
    navSearch = document.querySelector(".nav-search"),
    searchInput = document.getElementById("product-search"),
    clearSearchBtn = document.getElementById("clear-search"),
    searchFeedback = document.getElementById("search-feedback"),
    products = document.querySelectorAll(".product-card"),
    allSections = document.querySelectorAll("section"),
    productsSection = document.querySelector("#products");

// Store original order for "Featured" sorting
const originalProducts = Array.from(products);

function applyFilter(query) {
    let matchCount = 0;
    const isSearching = query.length > 0;

    products.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = "";
            matchCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Feedback for no results
    if (isSearching && matchCount === 0) {
        searchFeedback.innerHTML = `<p>No products found with keyword: <strong>"${query}"</strong></p>`;
        searchFeedback.style.display = "block";
    } else {
        searchFeedback.style.display = "none";
    }

    // Scroll to products section smoothly
    productsSection.scrollIntoView({ behavior: "smooth" });
}

function resetPage() {
    products.forEach(card => card.style.display = "");
    searchFeedback.style.display = "none";
}

// Trigger search on Icon Click or Enter Key
function handleSearchAction() {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        applyFilter(query);
    } else {
        // If empty and bar is active, maybe reset or just collapse
        resetPage();
    }
}

searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!navSearch.classList.contains("active")) {
        navSearch.classList.add("active");
        setTimeout(() => searchInput.focus(), 100);
    } else {
        // If already active, act as a search trigger
        handleSearchAction();
    }
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearchAction();
    }
});

// Clear Button Logic
clearSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchInput.value = "";
    resetPage();
    searchInput.focus();
});

// Close search if clicking outside (only if empty)
document.addEventListener("click", (e) => {
    if (!navSearch.contains(e.target) && navSearch.classList.contains("active") && searchInput.value.trim() === "") {
        navSearch.classList.remove("active");
        resetPage();
    }
});

// Parallax Stabilization & Reset Logic
const hero = document.getElementById('hero');
const heroProducts = document.querySelectorAll('.hero .product');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    let closestProd = null;
    let minDistance = Infinity;
    let closestCenterX = 0;
    let closestCenterY = 0;

    heroProducts.forEach((prod) => {
        const rect = prod.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.hypot(clientX - centerX, clientY - centerY);

        if (distance < minDistance) {
            minDistance = distance;
            closestProd = prod;
            closestCenterX = centerX;
            closestCenterY = centerY;
        }

        // Reset others smoothly (transition in CSS handles this)
        prod.style.setProperty('--mx', `0px`);
        prod.style.setProperty('--my', `0px`);
    });

    // Only move if within a reasonable proximity threshold
    const threshold = 350;
    if (closestProd && minDistance < threshold) {
        // Calculate offset from image center to mouse
        let mx = (clientX - closestCenterX) * 0.15; // 15% intensity
        let my = (clientY - closestCenterY) * 0.15;

        // Clamp the movement
        const limit = 40;
        mx = Math.max(-limit, Math.min(limit, mx));
        my = Math.max(-limit, Math.min(limit, my));

        closestProd.style.setProperty('--mx', `${mx}px`);
        closestProd.style.setProperty('--my', `${my}px`);
    }
});

// Smooth reset on leave
hero.addEventListener('mouseleave', () => {
    heroProducts.forEach(prod => {
        prod.style.setProperty('--mx', `0px`);
        prod.style.setProperty('--my', `0px`);
    });
});

let cart = JSON.parse(localStorage.getItem("cart")) || []; const cartBtn = document.getElementById("cart-btn"), cartDropdown = document.getElementById("cart-dropdown"), cartCount = document.getElementById("cart-count"), cartItems = document.getElementById("cart-items"), cartTotal = document.getElementById("cart-total"), placeOrderBtn = document.getElementById("place-order-btn"), closeCartBtn = document.getElementById("close-cart");

function showNotification(message) {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
        document.body.appendChild(notification);
    } else {
        notification.querySelector('span').textContent = message;
    }

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function updateCart() {
    cartItems.innerHTML = "";
    let e = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
      <div class="empty-cart-msg">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty</p>
      </div>
    `;
    } else {
        cart.forEach(((t, a) => {
            e += t.price * t.quantity, cartItems.innerHTML += `
      <div class="cart-item">
        <span>${t.name} (x${t.quantity})</span>
        <span>${t.price * t.quantity} RS</span>
        <button onclick="removeItem(${a})" aria-label="Remove item">&times;</button>
      </div>
    `}));
    }

    cartTotal.textContent = e + " RS", cartCount.textContent = cart.reduce(((e, t) => e + t.quantity), 0), localStorage.setItem("cart", JSON.stringify(cart))
} function removeItem(e) { cart.splice(e, 1), updateCart() }

cartBtn.addEventListener("click", (e => { e.stopPropagation(), cartDropdown.classList.toggle("active") }));
closeCartBtn.addEventListener("click", (() => cartDropdown.classList.remove("active")));

document.addEventListener("click", (e => { cartDropdown.classList.contains("active") && !cartDropdown.contains(e.target) && !cartBtn.contains(e.target) && cartDropdown.classList.remove("active") }));

document.querySelectorAll(".add-to-cart").forEach((e => { e.addEventListener("click", (() => { const t = e.dataset.name, a = parseInt(e.dataset.price), n = cart.find((e => e.name === t)); n ? n.quantity++ : cart.push({ name: t, price: a, quantity: 1 }), updateCart(), showNotification(`${t} added to cart!`) })) })), updateCart(), document.getElementById("place-order-btn").addEventListener("click", (function () {
    let e = JSON.parse(localStorage.getItem("cart")) || []; if (0 === e.length) {
        let warning = document.querySelector('.cart-warning');
        if (!warning) {
            warning = document.createElement('div');
            warning.className = 'cart-warning';
            warning.textContent = 'Please add some items to your cart first!';
            document.querySelector('.cart-footer').prepend(warning);
        }
        warning.style.display = 'block';
        setTimeout(() => warning.style.display = 'none', 3000);
        return;
    }
    let t = e.map((e => `${e.name} - ${e.quantity} x ${e.price} RS`)).join("\n"), a = e.reduce(((e, t) => e + t.price * t.quantity), 0); document.getElementById("message").value = t + `\n\nTotal: ${a} RS\nPayment: Cash on Delivery`, document.querySelector("#order").scrollIntoView({ behavior: "smooth" }), cartDropdown.classList.remove("active")
}));

// FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const card = question.parentElement;
        const isActive = card.classList.contains('active');

        // Close all cards first for accordion behavior
        document.querySelectorAll('.faq-card').forEach(otherCard => {
            otherCard.classList.remove('active');
        });

        // Toggle the clicked one
        if (!isActive) {
            card.classList.add('active');
        }
    });
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Product Sorting Logic ---
const sortBtn = document.getElementById("sort-btn"),
    sortOptions = document.getElementById("sort-options"),
    sortOptionElements = document.querySelectorAll(".sort-option"),
    sortLabel = document.getElementById("sort-label"),
    productGrid = document.querySelector(".product-grid");

sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sortBtn.parentElement.classList.toggle("active");
});

document.addEventListener("click", () => {
    sortBtn.parentElement.classList.remove("active");
});

sortOptionElements.forEach(option => {
    option.addEventListener("click", () => {
        const sortType = option.dataset.sort;
        const label = option.textContent;

        sortLabel.textContent = `Sort by: ${label.replace('Price: ', '')}`;
        sortBtn.parentElement.classList.remove("active");

        // Update active class
        sortOptionElements.forEach(opt => opt.classList.remove("active"));
        option.classList.add("active");

        sortProducts(sortType);
    });
});

function sortProducts(type) {
    let sortedArray = [];
    const currentProducts = Array.from(document.querySelectorAll(".product-card"));

    if (type === "featured") {
        sortedArray = originalProducts;
    } else {
        sortedArray = currentProducts.sort((a, b) => {
            const priceA = parseInt(a.querySelector(".add-to-cart").dataset.price);
            const priceB = parseInt(b.querySelector(".add-to-cart").dataset.price);

            if (type === "low-high") return priceA - priceB;
            if (type === "high-low") return priceB - priceA;
            return 0;
        });
    }

    // Smoothly re-order grid
    productGrid.style.opacity = "0";
    setTimeout(() => {
        sortedArray.forEach(item => productGrid.appendChild(item));
        productGrid.style.opacity = "1";
    }, 200);
}

// Ensure productGrid has transition
productGrid.style.transition = "opacity 0.2s ease";
