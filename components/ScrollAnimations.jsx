"use client";
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Scroll Animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const animatedElements = document.querySelectorAll(`
        h1, h2, h3, h4, p, .cta-btn, .product-card, .value-item, .faq-card, form, .about-image, .about-content
    `);

    animatedElements.forEach((el) => {
        el.classList.add("animate-on-scroll");
        scrollObserver.observe(el);
    });

    // Back to top button logic
    const handleScroll = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        animatedElements.forEach(el => scrollObserver.unobserve(el));
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
