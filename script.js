const hamburger = document.getElementById("hamburger"),
    navLinks = document.getElementById("nav-links"),
    navOverlay = document.getElementById("nav-overlay"),
    body = document.body;

function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");
    body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
}

hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
});

navOverlay.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
        toggleMenu();
    }
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            toggleMenu();
        }
    });
});
// --- Granular Scroll Animations ---
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            scrollObserver.unobserve(entry.target); // Animate only once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
});

// Elements to animate
const animatedElements = document.querySelectorAll(`
    h1, h2, h3, h4,
    p,
    .cta-btn,
    .product-card,
    .value-item,
    .faq-card,
    form,
    .about-image,
    .about-content
`);

animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    // Optional: Add manual stagger index if needed, but CSS nth-child handles siblings well.
    scrollObserver.observe(el);
});

window.addEventListener("load", () => {
    document.getElementById("loader").classList.add("hidden");
});
const toggleBtn = document.getElementById("theme-toggle"), savedTheme = localStorage.getItem("theme");
"dark" === savedTheme && body.classList.add("dark-mode"), toggleBtn.addEventListener("click", (() => { body.classList.toggle("dark-mode"); const e = body.classList.contains("dark-mode"); localStorage.setItem("theme", e ? "dark" : "light") }));

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
    const isSearching = query.length > 0;

    // Smoothly update grid
    productGrid.style.opacity = "0";

    setTimeout(() => {
        let matchCount = 0;
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

        productGrid.style.opacity = "1";
    }, 200);

    // Scroll to products section smoothly
    productsSection.scrollIntoView({ behavior: "smooth" });
}

function resetPage() {
    productGrid.style.opacity = "0";

    setTimeout(() => {
        products.forEach(card => card.style.display = "");
        searchFeedback.style.display = "none";
        productGrid.style.opacity = "1";
    }, 200);
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

// --- Advanced Custom Cursor Logic ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0, mouseY = 0; // Mouse position
let dotX = 0, dotY = 0; // Current dot position
let outlineX = 0, outlineY = 0; // Current outline position

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const lerp = (a, b, n) => (1 - n) * a + n * b;

function animateCursor() {
    // Smooth Lerp
    dotX = lerp(dotX, mouseX, 0.2);
    dotY = lerp(dotY, mouseY, 0.2);
    outlineX = lerp(outlineX, mouseX, 0.1);
    outlineY = lerp(outlineY, mouseY, 0.1);

    document.documentElement.style.setProperty('--cursor-x', `${dotX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${dotY}px`);
    document.documentElement.style.setProperty('--outline-x', `${outlineX}px`);
    document.documentElement.style.setProperty('--outline-y', `${outlineY}px`);

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Hover Effects & Magnetic Elements
const interactiveElements = document.querySelectorAll('a, button, .faq-question, .sort-option, .theme-toggle');
const images = document.querySelectorAll('.product-thumb img, .about-image img, .hero-images img');

interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => cursorOutline.classList.add("hovered"));
    el.addEventListener("mousemove", (e) => {
        // Magnetic effect for specific elements
        if (el.classList.contains('cta-btn1') || el.classList.contains('hamburger') || el.classList.contains('search-icon')) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("hovered");
        el.style.transform = "";
    });
});

images.forEach(img => {
    img.addEventListener("mouseenter", () => cursorOutline.classList.add("image-hover"));
    img.addEventListener("mouseleave", () => cursorOutline.classList.remove("image-hover"));
});

// Parallax Stabilization & Reset Logic Removed

// --- Navbar Scroll Behavior ---
let lastScrollTop = 0;
const navbar = document.querySelector('nav');
const scrollThreshold = 100; // Threshold before navbar starts hiding

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Scrolled state (background change)
    if (scrollTop > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }

    // Hide/Show on scroll
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down
        navbar.classList.add('nav-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('nav-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// --- FAQ Accordion Logic with Event Delegation ---
document.querySelector('.faq-container').addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (!question) return;

    const card = question.parentElement;
    const answer = card.querySelector('.faq-answer');
    const isActive = card.classList.contains('active');

    // Close all other cards first for accordion behavior
    document.querySelectorAll('.faq-card').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('active');
            otherCard.querySelector('.faq-answer').style.maxHeight = null;
        }
    });

    // Toggle the clicked one
    if (!isActive) {
        card.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        card.classList.remove('active');
        answer.style.maxHeight = null;
    }
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
            const priceA = parseInt(a.querySelector(".product-price").textContent.replace(/[^\d]/g, ''));
            const priceB = parseInt(b.querySelector(".product-price").textContent.replace(/[^\d]/g, ''));

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



