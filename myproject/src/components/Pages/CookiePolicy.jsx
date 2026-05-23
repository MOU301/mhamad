import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-[var(--main-color)] text-2xl font-bold my-4'>Cookie Policy</h1>
      <p>
        Our website uses cookies to improve your experience and to analyze site
        traffic. By using our site, you consent to the use of cookies.
      </p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Necessary for login and basic functionality.</li>
        <li><strong>Analytics Cookies:</strong> Google Analytics (only after consent).</li>
        <li><strong>Marketing Cookies:</strong> Used for personalized advertisements (if enabled).</li>
      </ul>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>Managing Cookies</h2>
      <p>
        You can accept or reject cookies via the cookie banner, or remove cookies from your browser settings.
      </p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>Third-Party Cookies</h2>
      <p>
        We use services from third parties such as Google LLC that may use cookies. Check their policies for details.
      </p>

      <p>Contact: <a href="mailto:support@foryoulearn.com">support@foryoulearn.com</a></p>
    </div>
  );
};

export default CookiePolicy;
