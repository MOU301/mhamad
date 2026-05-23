import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-[var(--main-color)] text-2xl font-bold my-4'>Privacy Policy</h1>

      <p>
        Protecting your personal data is very important to us. We process your
        data exclusively in accordance with the legal regulations (GDPR).
      </p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>1. General Information</h2>
      <p>
        This privacy policy explains the type, scope, and purpose of the
        collection and use of personal data on our learning platform
        "Learn German with foryou".
      </p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>2. Data We Collect</h2>
      <ul className="ps-3">
        <li>Your name and email address during registration</li>
        <li>Your course progress and completed lessons</li>
        <li>Payment information (credit card data is not stored)</li>
        <li>Your IP address, browser type, and operating system</li>
      </ul>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>3. Purpose of Data Processing</h2>
      <ul className="ps-3">
        <li>To provide and improve our learning services</li>
        <li>To personalize your learning experience</li>
        <li>To contact you when necessary</li>
        <li>To process payments</li>
      </ul>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>4. Cookies</h2>
      <p>
        Our website uses cookies to improve your user experience. You can
        disable cookies in your browser settings at any time.
      </p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to
        protect your data from unauthorized access, loss, or misuse.
      </p>

      <h2 className="mt-5 mb-3">6. Sharing Your Data</h2>
      <ul className="ps-3">
        <li>We share data only with payment processors (e.g., Stripe, PayPal)</li>
        <li>We do not sell your data to third parties</li>
        <li>Data may be shared only when required by law</li>
      </ul>

      <h2 className="mt-5 mb-3">7. Your Rights</h2>
      <ul className="ps-3">
        <li>Access to your stored data</li>
        <li>Correction of incorrect data</li>
        <li>Deletion of your data ("right to be forgotten")</li>
        <li>Restriction of processing</li>
        <li>Data portability</li>
        <li>Objection to data processing</li>
      </ul>

      <h2 className="mt-5 mb-3">8. Contact</h2>
      <p>
        If you have questions about data protection, please contact us at:
        <br />
        <a href="https://mailto:team@foryoulearn.com" className="text-primary">
          support@foryoulearn.com
        </a>
      </p>

      <h2 className="mt-5 mb-3">9. Changes</h2>
      <p>
        We may update this privacy policy occasionally. Last updated: 2025-2024
      </p>
    </div>
  );
};

export default PrivacyPolicy;
