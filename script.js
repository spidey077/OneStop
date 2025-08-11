    
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
// Search toggle + filtering
const searchIcon = document.querySelector('.search-icon');
const navSearch = document.querySelector('.nav-search');
const searchInput = document.getElementById('product-search');
const products = document.querySelectorAll('.product-card');
const allSections = document.querySelectorAll('main > section'); // all sections inside main
const productsSection = document.querySelector('#products'); // your products section ID

searchIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent triggering the outside click handler

  // If search box is already open and has text, apply filter + scroll
  if (navSearch.classList.contains('active') && searchInput.value.trim() !== '') {
    applyFilter(searchInput.value.toLowerCase().trim());
    productsSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Just toggle the search bar open
    navSearch.classList.toggle('active');
    if (navSearch.classList.contains('active')) {
      searchInput.focus();
    } else {
      resetPage();
    }
  }
});

searchInput.addEventListener('click', (e) => {
  e.stopPropagation(); // so clicking inside doesn't close it
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (query) {
    applyFilter(query);
  } else {
    resetPage();
  }
});

// Close search when clicking outside (but keep results if any)
document.addEventListener('click', () => {
  if (navSearch.classList.contains('active')) {
    navSearch.classList.remove('active');
    // Do NOT resetPage() here — keep the filter applied
  }
});


function applyFilter(query) {
  // Hide everything except navbar and products section
  allSections.forEach(sec => {
    if (sec !== productsSection) sec.style.display = 'none';
  });
  productsSection.style.display = 'block';

  // Filter products
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
  // Show all sections again
  allSections.forEach(sec => sec.style.display = '');
  // Show all products
  products.forEach(product => product.style.display = '');
}

