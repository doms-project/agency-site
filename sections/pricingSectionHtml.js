export const pricingSectionHtml = String.raw`<section id="pricing" class="w-full py-20 md:py-32 bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] relative overflow-hidden" style="scroll-margin-top:120px">
 <div class="absolute inset-0 opacity-5">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,185,232,0.1),transparent_50%)]">
  </div>
 </div>
 <div class="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
  <!-- Header with Navigation -->
  <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
   <div>
   <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4" style="font-family:'DM Sans', sans-serif">
    Pricing Plans
   </h2>
    <p class="text-lg md:text-xl text-white/70 max-w-3xl" style="font-family:'DM Sans', sans-serif">
     Get a fullstack Gohighlevel custom build software to grow your business, custom website, and full time support with SEO. Cheaper than Gohighlevel and offered nowhere else.
    </p>
   </div>
   <!-- Navigation Arrows -->
   <div class="pricing-nav-arrows flex items-center gap-3">
    <button onclick="document.getElementById('pricing-carousel').scrollBy({left: -400, behavior: 'smooth'})" class="w-12 h-12 rounded-full border border-white/20 hover:border-[#7BB9E8]/50 hover:bg-[#7BB9E8]/10 flex items-center justify-center transition-all duration-300 group" aria-label="Previous">
     <svg class="w-5 h-5 text-white/60 group-hover:text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
     </svg>
    </button>
    <button onclick="document.getElementById('pricing-carousel').scrollBy({left: 400, behavior: 'smooth'})" class="w-12 h-12 rounded-full border border-white/20 hover:border-[#7BB9E8]/50 hover:bg-[#7BB9E8]/10 flex items-center justify-center transition-all duration-300 group" aria-label="Next">
     <svg class="w-5 h-5 text-white/60 group-hover:text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
    </button>
   </div>
  </div>
  
  <!-- Pricing Cards Carousel -->
  <div id="pricing-carousel" class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth scrollbar-hide" style="-webkit-overflow-scrolling: touch;">
   
   <!-- Card 1: Custom Website + GHL -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
     <div class="mb-6">
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
        Custom Website + Gohighlevel Subaccount + Support
      </h3>
       <div class="flex flex-col gap-1 mb-4">
        <div class="flex items-baseline gap-2 flex-wrap">
         <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$395</span>
         <span class="text-white/60 text-lg">one time</span>
        </div>
        <div class="flex items-baseline gap-2 flex-wrap">
         <span class="text-4xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$99</span>
         <span class="text-white/60 text-lg">/mo</span>
        </div>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        Great for businesses that want a custom-built site plus essential support.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Custom website built for you</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Gohighlevel plus with Full Time Support</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Branding & logo creation</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Automation library access</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Google My Business set up / connect</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">One month of SEO work included</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Monthly performance reports</span>
       </div>
      </div>
      <a href="#contact" class="inline-flex items-center gap-2 text-[#7BB9E8] font-semibold hover:gap-3 transition-all duration-300" style="font-family:'DM Sans', sans-serif">
       Get Started
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      </a>
     </div>
    </div>
   </div>
   
   <!-- Card 2: SEO Growth Plan -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
        SEO Growth Plan
       </h3>
       <div class="flex flex-col gap-1 mb-4">
        <div class="flex items-baseline gap-2 flex-wrap">
         <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$595</span>
         <span class="text-white/60 text-lg">upfront</span>
        </div>
        <div class="flex items-baseline gap-2 flex-wrap">
         <span class="text-4xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$350</span>
         <span class="text-white/60 text-lg">/mo</span>
        </div>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        Designed for businesses ready to scale with visibility. Guaranteed results, higher views, more leads.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Google Business Profile Management</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">SEO optimization</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Premium support</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Automations done for you</span>
        </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">AI integration</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Everything from lower plans</span>
      </div>
      </div>
      <a href="#contact" class="inline-flex items-center gap-2 text-[#7BB9E8] font-semibold hover:gap-3 transition-all duration-300" style="font-family:'DM Sans', sans-serif">
       Get Started
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      </a>
     </div>
    </div>
   </div>
   
   <!-- Card 3: Guarantee Top Page on Google -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
         Guarantee Top Page on Google
        </h3>
       <div class="flex items-baseline gap-2 mb-4 flex-wrap">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$15,000</span>
        <span class="text-white/60 text-lg">/year</span>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        We rank you top of page on Google for crucial keywords in your industry. Guarantee 2-5x your returns or you don't pay.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Top page local ranking for 10 keywords</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Increase lead volume</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Increase revenue</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">2x your return or you don't pay</span>
       </div>
      </div>
      <a href="#contact" class="inline-flex items-center gap-2 text-[#7BB9E8] font-semibold hover:gap-3 transition-all duration-300" style="font-family:'DM Sans', sans-serif">
       Get Started
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      </a>
     </div>
    </div>
   </div>
     
   <!-- Card 4: Google Ads Management -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
         Google Ads Management
        </h3>
       <div class="flex items-baseline gap-2 mb-4">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">Custom</span>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        Let us run it all for you — you focus on the business.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Full campaign management</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">A/B split testing</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Ad management</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Video + copywriting</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Google Analytics tracking</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">High-converting funnel creation</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Ongoing optimization</span>
       </div>
      </div>
      <a href="#contact" class="inline-flex items-center gap-2 text-[#7BB9E8] font-semibold hover:gap-3 transition-all duration-300" style="font-family:'DM Sans', sans-serif">
       Contact for Quote
       <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
       </svg>
      </a>
     </div>
    </div>
   </div>
   
  </div>
  
  <!-- Trust Indicator -->
  <div class="flex items-center justify-center gap-2 text-white/50 text-sm mt-12">
   <svg class="w-5 h-5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
   <span style="font-family:'DM Sans', sans-serif">Trusted by 100+ brands</span>
  </div>
 </div>
</section>
`;
