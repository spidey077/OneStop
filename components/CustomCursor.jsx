"use client";
import React, { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    let mouseX = 0, mouseY = 0; 
    let dotX = 0, dotY = 0; 
    let outlineX = 0, outlineY = 0; 

    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (e.target && typeof e.target.closest === 'function') {
           const footer = e.target.closest('footer, .footer');
           if (footer) {
             cursorDot?.classList.add("light-mode-cursor");
             cursorOutline?.classList.add("light-mode-cursor");
           } else {
             cursorDot?.classList.remove("light-mode-cursor");
             cursorOutline?.classList.remove("light-mode-cursor");
           }
        }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    let animationFrameId;
    function animateCursor() {
        dotX = lerp(dotX, mouseX, 0.2);
        dotY = lerp(dotY, mouseY, 0.2);
        outlineX = lerp(outlineX, mouseX, 0.1);
        outlineY = lerp(outlineY, mouseY, 0.1);

        document.documentElement.style.setProperty('--cursor-x', `${dotX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${dotY}px`);
        document.documentElement.style.setProperty('--outline-x', `${outlineX}px`);
        document.documentElement.style.setProperty('--outline-y', `${outlineY}px`);

        animationFrameId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // The event listeners for interactive elements are better handled globally or via MutationObserver 
    // since React components can unmount/remount. We can use event delegation on document body.
    const handleMouseEnter = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('a, button, .faq-question, .sort-option, .theme-toggle');
      if (el) cursorOutline?.classList.add("hovered");
      
      const img = e.target.closest('.product-thumb img, .about-image img, .hero-images img');
      if (img) cursorOutline?.classList.add("image-hover");
    };

    const handleMouseLeave = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('a, button, .faq-question, .sort-option, .theme-toggle');
      if (el) {
        cursorOutline?.classList.remove("hovered");
        el.style.transform = "";
      }

      const img = e.target.closest('.product-thumb img, .about-image img, .hero-images img');
      if (img) cursorOutline?.classList.remove("image-hover");
    };

    const handleInteractiveMove = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('a, button, .faq-question, .sort-option, .theme-toggle');
      if (el && (el.classList.contains('cta-btn1') || el.classList.contains('hamburger') || el.classList.contains('search-icon'))) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };

    const handleMouseOver = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const footer = e.target.closest('footer, .footer');
      if (footer) {
        cursorDot?.classList.add("light-mode-cursor");
        cursorOutline?.classList.add("light-mode-cursor");
      } else {
        cursorDot?.classList.remove("light-mode-cursor");
        cursorOutline?.classList.remove("light-mode-cursor");
      }
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mousemove", handleInteractiveMove, true);
    document.addEventListener("mouseover", handleMouseOver, true);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseenter", handleMouseEnter, true);
        document.removeEventListener("mouseleave", handleMouseLeave, true);
        document.removeEventListener("mousemove", handleInteractiveMove, true);
        document.removeEventListener("mouseover", handleMouseOver, true);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </>
  );
}
