export default function PrivacyPolicyPage() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Last updated: April 15, 2024</p>
          </div>

          <div className="prose prose-pink max-w-none">
            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">Pinky Booth collects the following information from users of our service:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Contact information such as name, email address, and phone number</li>
              <li>Photos taken while using our digital photo booth service</li>
              <li>Device information including browser type, IP address, and operating system</li>
              <li>Payment information (through third-party payment providers)</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Provide and manage the digital photo booth service</li>
              <li>Send confirmation emails and service-related notifications</li>
              <li>Process payments</li>
              <li>Improve our service</li>
              <li>Send marketing materials with your consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Data Storage and Security</h2>
            <p className="text-muted-foreground mb-6">We store your photos for 30 days on our free plan and indefinitely for premium users. We implement appropriate security measures to protect your information from unauthorized access.</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Photo Sharing and Social Media</h2>
            <p className="text-muted-foreground mb-6">
              By using our service, you grant Pinky Booth permission to use photos taken for promotional purposes, including on social media and our website. If you do not want your photos used, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Access your personal data that we store</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for use of your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">We may update this privacy policy from time to time. Changes will be posted on this page and, if significant, we will provide notification via email.</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-6">If you have questions about our privacy policy, please contact us through our Contact page or email at privacy@pinkybooth.com.</p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">8. Cookie Policy</h2>
            <p className="text-muted-foreground mb-6">
              Our website uses cookies to enhance your browsing experience. These cookies help us analyze website traffic and customize content to your preferences. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-6">
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
