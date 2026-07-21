import SharedNavbar from '@/components/SharedNavbar'
import { footerSectionHtml } from '@/sections/footerSectionHtml'

export const metadata = {
  title: 'Performance Guarantee & Refund Policy | YoMarketingCo',
  description: 'YoMarketingCo Performance Guarantee Terms & Conditions — Learn how our "Guaranteed or You Don\'t Pay" offer works, eligibility requirements, and refund policy.',
}

function RawHtml({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] text-white">
      <SharedNavbar />

      {/* Hero Header */}
      <section className="w-full pt-24 pb-12 md:pt-28 md:pb-16 px-4 md:px-8 text-center relative overflow-hidden">
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Guarantee badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 backdrop-blur-sm mb-6">
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Performance Guarantee
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Guaranteed — Or You Don&apos;t Pay.
        </h1>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Last updated: July 11, 2026. These terms govern the &quot;Guaranteed — Or You Don&apos;t Pay&quot; offer referenced on yomarketingco.com.
        </p>
        <div className="w-24 h-1 rounded-full mx-auto mt-8" style={{ background: 'linear-gradient(90deg, #C9A84C, #F0CF6E, #C9A84C)' }} />
      </section>

      {/* Content */}
      <section className="w-full pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>

          {/* Intro card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              By signing a service agreement with YoMarketingCo (&quot;we,&quot; &quot;us&quot;), the Client (&quot;you&quot;) agrees to these terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-6">How Our Guarantee Works</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Our job is to get you leads and build out the systems your business needs to grow — websites, CRM, Google Business Profile, tracking, and automation — to the scope agreed in your service package. Different packages produce results on different timelines, and we&apos;ll tell you what to expect for yours before we begin.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Here&apos;s the honest part: we can deliver the leads, but closing them and making money is a partnership. If you answer your calls promptly, quote fast, and run a solid business with good service, you will close deals from the leads we send and make money from them. If you don&apos;t have good systems in place, or you let leads sit unanswered, it becomes very hard to grow you — no matter how good our marketing is.
            </p>
            <p className="text-white/80 leading-relaxed">
              We&apos;re always happy to coach and guide you toward those systems. But to be covered under our Guarantee Policy, you must meet all of the conditions below.
            </p>
          </div>

          {/* Section 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>1</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Business Qualification Guidelines</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              To be eligible for the Guarantee Policy, your business must:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Have been operating for at least three (3) years.',
                'Currently generate at least $10,000/month in revenue.',
                'Have an established track record — this guarantee is built to grow a working business, not to build one from scratch.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-l-2 border-[#C9A84C]/50 pl-4 bg-[#C9A84C]/5 rounded-r-lg py-3 pr-4">
              <p className="text-white/70 leading-relaxed text-sm">
                If you&apos;re starting from zero or haven&apos;t seen consistent results yet, we can still help you — but we cannot guarantee the same results on our basic packages. In that case you&apos;re better off growing with our support until you qualify. We recommend beginning with our <strong className="text-[#C9A84C]">Business Starter plan</strong> (our entry-level package) and working your way up until you&apos;re ready to invest in marketing and apply for the Guarantee Policy.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>2</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Your Responsibilities — Speed to Lead &amp; Systems</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-5">
              Leads only turn into revenue if you work them. To stay covered under the guarantee, you are responsible for:
            </p>
            <div className="space-y-4">
              {[
                { title: 'Speed to lead.', desc: 'Every lead must be called back within a 90-second window, or you must answer 90% of inbound calls on the first ring.' },
                { title: 'Follow-up & nurture.', desc: 'You must have lead follow-up and nurture campaigns in place for any lead that isn\'t manually answered or reached immediately. We\'ll build these with you; keeping them running is on you.' },
                { title: 'Tracking & verification.', desc: 'You must track and verify all lead data — volume, response times, and lead quality — and keep those records accurate.' },
                { title: 'Communication.', desc: 'You must share these numbers with our team, sit down with us to review lead quality and lead flow, and stay in regular contact so we can see what\'s working and where the drop-off is.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex-shrink-0 w-1 h-full min-h-[20px] rounded-full" style={{ background: '#C9A84C' }} />
                  <div>
                    <span className="text-[#C9A84C] font-semibold">{item.title}</span>{' '}
                    <span className="text-white/80">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>3</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Advertising — No Money Guarantee</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              We do not guarantee any monetary return on ad campaigns or advertising, and we do not guarantee or refund the money spent on ads, ad setup fees, or ad management costs.
            </p>
            <p className="text-white/80 leading-relaxed">
              Advertising results depend on the business owner&apos;s systems, offer, and follow-through as much as on the campaigns themselves. Our commitment on ads is to build and run strong campaigns and give you clear, regular reporting so you can see we are doing our part. Your systems are equally important to the outcome — and the ad spend is yours.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-[#C9A84C]/20">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>4</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Guarantee &amp; Refund</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              If you meet the qualification guidelines (Section 1), fulfill your responsibilities (Section 2), and follow the systems we build for you — and we still cannot get you results after genuinely working with you over multiple months — you may be eligible for a refund, subject to all of the following:
            </p>
            <div className="space-y-4 mb-6">
              {[
                { title: 'Minimum engagement.', desc: 'To be eligible for any guarantee or refund, you must have engaged at least two (2) of our monthly services for nine (9) consecutive months. Results and profit cannot be fairly evaluated before this period is complete, and no refund is assessed before then.' },
                { title: 'Written notice.', desc: 'You must notify your rep in writing that you are unhappy and not seeing the results you want, and schedule a meeting with us to review your results.' },
                { title: 'Active participation.', desc: 'Throughout the engagement you must be actively taking calls and meetings with us, providing your data, giving us advance notice of issues, and working the problem alongside us. The refund is for clients who did the work and still didn\'t get results — not for clients who disengaged.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/15">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                  <div>
                    <span className="text-[#C9A84C] font-semibold">{item.title}</span>{' '}
                    <span className="text-white/80">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <p className="text-green-400 font-semibold text-sm mb-2">✓ What is refundable</p>
                <p className="text-white/70 text-sm leading-relaxed">If you have done all of the above and we still cannot help you, we will refund your setup cost and the build-out of your website and any CRM-related work.</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <p className="text-red-400 font-semibold text-sm mb-2">✗ What is not refundable</p>
                <p className="text-white/70 text-sm leading-relaxed">This does not apply to advertising, ad spend, ad setup, ad management, or anything else related to our agency in the form of sales.</p>
              </div>
            </div>

            <div className="border-l-2 border-[#C9A84C]/50 pl-4 bg-[#C9A84C]/5 rounded-r-lg py-3 pr-4">
              <p className="text-white/70 text-sm leading-relaxed">
                Our first step is always to keep working with you to fix it. A refund is the last resort, available only after a genuine, documented effort on both sides.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>5</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Campaign Minimums</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              All campaigns must remain active for six to nine (6–9) months before being turned off. Marketing — and SEO and local ranking especially — needs time to compound. Shutting campaigns down early <strong className="text-white">voids the Guarantee Policy.</strong>
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>6</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Custom Quotes &amp; SEO</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              All custom quotes and SEO engagements are governed by a separate custom agreement, negotiated per campaign between the business owner and the agency. The terms of that individual agreement control for that specific work.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>7</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Excluded Categories</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              The Guarantee Policy is not offered to certain industries, including firearms, cannabis, and other restricted or high-risk categories. If your business falls into an excluded category, we&apos;re still glad to work with you — the guarantee simply does not apply.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #C9A84C, #F0CF6E)', color: '#000' }}>8</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">General</h2>
            </div>
            <ul className="space-y-3">
              {[
                'These terms are governed by the laws of the State of Ohio.',
                'We may update these terms; the version in effect when you sign your service agreement governs your engagement.',
                'If any provision is found unenforceable, the remaining provisions stay in full effect.',
                'These terms, together with your signed service agreement, are the entire agreement regarding this guarantee and supersede any prior or verbal representations.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <span className="flex-shrink-0 text-[#C9A84C] mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Footer Card */}
          <div className="rounded-2xl p-8 md:p-10 border border-[#C9A84C]/30 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(240,207,110,0.04))' }}>
            <svg className="w-10 h-10 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <p className="text-white/60 text-sm mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Questions about our guarantee? We&apos;re happy to walk you through it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="text-white/50">YoMarketingCo</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="text-white/50">4954 Mahoning Ave, Austintown, OH 44515</span>
              <span className="hidden sm:block text-white/20">·</span>
              <a href="mailto:Yomarketingco@gmail.com" className="text-[#C9A84C] hover:underline transition-all">Yomarketingco@gmail.com</a>
              <span className="hidden sm:block text-white/20">·</span>
              <a href="tel:+13305579354" className="text-[#C9A84C] hover:underline transition-all">(330) 557-9354</a>
            </div>
          </div>

        </div>
      </section>

      <RawHtml html={footerSectionHtml} />
    </div>
  )
}
