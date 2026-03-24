"use client";
import { useState } from "react";

const faqData = [
  {
    question: "What products do you offer?",
    answer: "We specialize in premium polo shirts, casual t-shirts, and elegant handbags for women. Our products combine comfort, quality, and style to meet your everyday fashion needs."
  },
  {
    question: "Do you offer nationwide delivery?",
    answer: "Yes, we offer fast and reliable nationwide delivery across Pakistan. Delivery times usually range from 2 to 5 working days depending on your location."
  },
  {
    question: "How can I place an order?",
    answer: "Simply browse our collection, add your desired products to the cart, and place your order directly with our team for fast processing and cash on delivery."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div className={`faq-card ${isActive ? "active" : ""}`} key={index}>
                <div className="faq-question" onClick={() => toggleAccordion(index)}>
                  <h3>{item.question}</h3>
                  <span className="faq-icon">{isActive ? "−" : "+"}</span>
                </div>
                <div 
                    className="faq-answer" 
                    style={{ maxHeight: isActive ? "200px" : null }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
}
