import SharedNavbar from '@/components/SharedNavbar'
import { footerSectionHtml } from '@/sections/footerSectionHtml'

export const metadata = {
  title: 'Terms of Service | Yo Marketing Company',
  description: 'Terms of Service for Yo Marketing Company - Read our terms and conditions for using our website and services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] text-white">
      <SharedNavbar />
      
      <section className="w-full py-20 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, Satoshi, sans-serif' }}>
              Please read these terms carefully before using our services.
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                By accessing or using the website and services of Yo Marketing Company (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, then you may not access our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">2. Services</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Yo Marketing Company provides digital marketing services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Website design and development</li>
                <li>Google Business Profile optimization and management</li>
                <li>Search Engine Optimization (SEO) services</li>
                <li>Lead generation and advertising campaigns</li>
                <li>Local marketing strategies and consulting</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any service at any time with or without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">3. Use of Our Services</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Use our services in any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Use automated systems to access our website without permission</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. Free Website Offers</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We may offer free website design services to qualifying businesses. These offers are subject to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Eligibility requirements as determined by us</li>
                <li>Availability and capacity limitations</li>
                <li>Our right to modify or discontinue offers at any time</li>
                <li>Additional terms and conditions that may apply to specific offers</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                Free website offers do not include ongoing hosting, maintenance, or additional services unless specifically stated.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. Service Agreements</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                When you engage our services, a separate service agreement or contract will be provided that outlines:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Scope of work and deliverables</li>
                <li>Pricing and payment terms</li>
                <li>Timeline and milestones</li>
                <li>Intellectual property rights</li>
                <li>Cancellation and refund policies</li>
              </ul>
              <p className="text-white/80 leading-relaxed">
                The terms of any service agreement will supersede these general Terms of Service where they conflict.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">6. Communications</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                By providing your contact information and checking the terms and conditions box on our forms, you authorize Yo Marketing Company to contact you via:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Email regarding service inquiries, updates, and marketing communications</li>
                <li>Phone calls regarding free website offers, business growth services, and related updates</li>
                <li>SMS/text messages regarding service updates, offers, and related communications</li>
              </ul>
              <p className="text-white/80 leading-relaxed mb-4">
                <strong>Message and data rates may apply for SMS communications.</strong> You may opt out of SMS communications at any time by replying <strong>STOP</strong> to any message or by contacting us directly.
              </p>
              <p className="text-white/80 leading-relaxed">
                You may opt out of marketing emails by clicking the unsubscribe link in any email or by contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                All content on our website, including text, graphics, logos, images, and software, is the property of Yo Marketing Company or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                For services we provide:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>You retain ownership of your business content, branding, and materials</li>
                <li>We retain ownership of our methodologies, processes, and proprietary tools</li>
                <li>Deliverables (websites, designs, etc.) ownership will be specified in your service agreement</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">8. Payment Terms</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Payment terms will be specified in your service agreement. Generally:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Payment is due according to the schedule outlined in your agreement</li>
                <li>Late payments may result in service suspension or termination</li>
                <li>Refund policies will be specified in your service agreement</li>
                <li>All prices are subject to change without notice until a service agreement is signed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Specific results from SEO, advertising, or marketing campaigns</li>
                <li>Uninterrupted or error-free service</li>
                <li>That our services will meet all of your requirements</li>
                <li>That any errors will be corrected</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                To the maximum extent permitted by law, Yo Marketing Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
                <li>Your use or inability to use our services</li>
                <li>Any unauthorized access to or use of our servers or your data</li>
                <li>Any errors or omissions in our services</li>
                <li>Any interruption or cessation of our services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">11. Indemnification</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                You agree to indemnify and hold harmless Yo Marketing Company, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or relating to your use of our services or violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">12. Termination</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use our services will cease immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">13. Governing Law</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved in the courts of Mahoning County, Ohio.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">14. Changes to Terms</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">15. Contact Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

