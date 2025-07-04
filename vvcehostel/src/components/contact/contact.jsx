import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      {/* Centered Page Headings */}
      <div className="contact-heading">
        <h3 className="small-title">CONTACT US</h3>
        <h1 className="main-title">Get In Touch</h1>
      </div>

      {/* Two-column layout */}
      <div className="contact-content">
        <div className="contact-left">
          <p className="description">
            "We’d love to hear from you! Whether you have questions, feedback, or
            collaboration opportunities, feel free to reach out. Our team is here
            to assist you and ensure you have the best experience. Connect with
            us today!"
          </p>

          <div className="info-box">
            <p><strong>📧 Email:</strong> vvcehostel@vvce.ac.in</p>
            <p><strong>📞 Phone:</strong> (+91) 9449447654</p>
            <p><strong>📍 Address:</strong> VVCE, Gokulam III Stage, Mysore – 570002</p>
          </div>
        </div>

        <div className="contact-right">
          <form
            className="contact-form"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            {/* Replace with your own access key */}
            <input type="hidden" name="access_key" value="a1693254-041f-4a5e-9f40-2333c7028edf" />
            <input type="hidden" name="from_name" value="VVCE Hostel" />
            <input type="hidden" name="subject" value="New Contact Form Submission" />

            <label>Your Name</label>
            <input type="text" name="name" placeholder="Enter your name" required />

            <label>Phone Number</label>
            <input type="text" name="phone" placeholder="Enter phone number" required />

            <label>Your Message</label>
            <textarea name="message" rows="5" placeholder="Write your message here" required></textarea>

            <button type="submit">Submit Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
