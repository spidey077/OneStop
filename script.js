
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