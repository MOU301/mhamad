import React from "react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className='text-[var(--main-color)] text-2xl font-bold my-4'>Terms of Service</h1>
      <p>Welcome to foryoulearn ! By using our services, you agree to these terms.</p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>1. Acceptance of Terms</h2>
      <p>By creating an account or using our app, you accept these Terms of Service and our Privacy Policy.</p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>2. Account Rules</h2>
      <ul>
        <li>One account per user.</li>
        <li>You are responsible for your login information.</li>
        <li>You can delete your account at any time.</li>
      </ul>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>3. Content Ownership</h2>
      <p>All learning content belongs to [Your App Name] and cannot be redistributed.</p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>4. Prohibited Actions</h2>
      <ul>
        <li>Spamming, harassment, illegal activity.</li>
        <li>Attempting to hack or disrupt systems.</li>
      </ul>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>5. Liability Disclaimer</h2>
      <p>We are not responsible for errors in lessons or learning outcomes.</p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>6. Modifications</h2>
      <p>We may update terms and notify users of significant changes.</p>

      <h2 className='text-[var(--main-color)] text-xl font-bold my-4'>7. Governing Law</h2>
      <p>These Terms are governed by German and EU law.</p>

      <p>Contact: <a href="mailto:support@foryoulearn.com">support@foryoulearn.com</a></p>
    </div>
  );
};

export default TermsOfService;
