import SharedNavbar from '@/components/SharedNavbar'
import { footerSectionHtml } from '@/sections/footerSectionHtml'

export const metadata = {
  title: 'Privacy Policy | Yo Marketing Company',
  description: 'Privacy Policy for Yo Marketing Company - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] text-white">
      <SharedNavbar />
      
      <section className="w-full py-20 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Your privacy matters to us — and we take it seriously.
            </p>
            <div className="w-24 h-1 bg-[#7BB9E8] rounded-full mx-auto mt-6"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 space-y-8" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
            <div>
              <p className="text-white/60 mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Welcome to Yo Marketing Company (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-white/80 leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1 Information You Provide to Us</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Fill out contact forms, survey forms, or service request forms</li>
                <li>Request a free strategy call or consultation</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Contact us via email, phone, or other communication methods</li>
                <li>Request website revisions or updates</li>
              </ul>
              <p className="text-white/80 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Business information (business name, business address, website URL)</li>
                <li>Service preferences and requirements</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Date and time of your visit</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Provide, maintain, and improve our services (website design, Google Business Profile optimization, SEO services, lead generation, and advertising)</li>
                <li>Respond to your inquiries, requests, and provide customer support</li>
                <li>Send you marketing communications, newsletters, and promotional materials (with your consent)</li>
                <li>Contact you via phone, email, or SMS regarding free website offers, business growth services, and related updates (as authorized by you)</li>
                <li>Process and manage service requests and projects</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. SMS and Phone Communications</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                By providing your phone number and checking the terms and conditions box on our forms, you authorize Yo Marketing Company to contact you via SMS or phone call regarding:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Free website offers</li>
                <li>Business growth services</li>
                <li>Service updates and related communications</li>
              </ul>
              <p className="text-white/80 leading-relaxed mb-4">
                <strong>Message and data rates may apply.</strong> You understand that you may opt out at any time by replying <strong>STOP</strong> to any SMS message or by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as customer relationship management (CRM) systems, email marketing platforms, and analytics providers.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, or that of our clients or others.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">6. Data Security</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">7. Your Rights and Choices</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Opt out of SMS communications by replying <strong>STOP</strong></li>
                <li>Object to processing of your personal information</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We may use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">9. Third-Party Links</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-white/90 mb-2">
                  <strong>Yo Marketing Company</strong>
                </p>
                <p className="text-white/80 mb-2">
                  <strong>Email:</strong> <a href="mailto:youngstownmarketingco@gmail.com" className="text-[#7BB9E8] hover:underline">youngstownmarketingco@gmail.com</a>
                </p>
                <p className="text-white/80 mb-2">
                  <strong>Phone:</strong> <a href="tel:3302995179" className="text-[#7BB9E8] hover:underline">(330) 299-5179</a>
                </p>
                <p className="text-white/80">
                  <strong>Location:</strong> United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: footerSectionHtml }} />
    </div>
  )
}

