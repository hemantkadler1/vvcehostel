import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="forgot-password-wrapper">
      {/* Centered Page Headings */}
      <div className="forgot-password-heading">
        <h3 className="small-title">FORGOT PASSWORD</h3>
        <h1 className="main-title">Request Password Reset</h1>
      </div>

      {/* Form Section */}
      <div className="forgot-password-content">
        <div className="forgot-password-card">
          <form
            className="forgot-password-form"
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={() => setSubmitted(true)}
          >
            {/* Web3Forms fields */}
            <input
              type="hidden"
              name="access_key"
              value="a1693254-041f-4a5e-9f40-2333c7028edf" // Web3Forms access key
            />
            <input
              type="hidden"
              name="from_name"
              value="VVCE Hostel Website"
            />
            <input
              type="hidden"
              name="subject"
              value="VVCE Hostel - Forgot Password Request"
            />
            <input
              type="hidden"
              name="redirect"
              value="https://web3forms.com/success" // You can change this to your custom URL after submission
            />

            <label>Your Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              required
            />

            <label>Additional Info (optional)</label>
            <textarea
              name="message"
              placeholder="You can mention any details if needed"
            ></textarea>

            <button type="submit">Send Reset Request</button>
          </form>
        </div>
      </div>

      {submitted && (
        <div className="success-message">
          <h2>Request Sent ✅</h2>
          <p>Your password reset request has been sent. Please check your inbox.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
