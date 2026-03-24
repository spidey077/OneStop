export default function Contact() {
  return (
    <section id="order" className="contact section">
      <h2>Send an Inquiry</h2>

      <form id="inquiry-form" action="https://formsubmit.co/ha581741@gmail.com" method="POST">
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" name="name" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="_subject" placeholder="Inquiry Subject" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" rows="5" placeholder="How can we help you?" required></textarea>
        </div>

        <input type="hidden" name="_next" value="https://onestopwholesale.vercel.app/thank-you.html" />
        <input type="hidden" name="_autoresponse"
          value="Thank you for your inquiry! We will get back to you as soon as possible." />

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </section>
  );
}
