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
    <p class="text-lg md:text-xl text-white/70 max-w-xl" style="font-family:'DM Sans', sans-serif">
     From DIY solutions to full-service management, choose the plan that fits your business needs.
    </p>
   </div>
   <!-- Navigation Arrows -->
   <div class="flex items-center gap-3">
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
   
   <!-- Card 1: DIY Plan -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
     <div class="mb-6">
       <span class="text-4xl mb-4 block">💻</span>
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
       DIY Plan
      </h3>
       <div class="flex items-baseline gap-2 mb-4">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$65</span>
       <span class="text-white/60 text-lg">/mo</span>
      </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
      Perfect for business owners who want to build and manage everything themselves.
     </p>
    </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Full software access</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">CRM+ platform</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Automation access</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Website builder</span>
     </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Pre-built templates (customize or build from scratch)</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Limited support</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Tools for billing, scheduling, emails & more</span>
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
   
   <!-- Card 2: Done-For-You Website -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
     <div class="mb-6">
       <span class="text-4xl mb-4 block">✨</span>
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
        Done-For-You Website
      </h3>
       <div class="flex items-baseline gap-2 mb-4">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$145</span>
        <span class="text-white/60 text-lg">/mo</span>
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
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Basic support (phone, call & text)</span>
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
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">DIY library access</span>
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
   
   <!-- Card 3: Growth Plan -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <span class="text-4xl mb-4 block">🚀</span>
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
        Growth Plan
       </h3>
       <div class="flex items-baseline gap-2 mb-4">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$300</span>
        <span class="text-white/60 text-lg">/mo</span>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        Designed for businesses ready to scale with automation & visibility.
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
   
   <!-- Card 4: Executive Coaching -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <span class="text-4xl mb-4 block">🎯</span>
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
         Executive Coaching
        </h3>
       <div class="flex items-baseline gap-2 mb-4">
        <span class="text-5xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">$1,000</span>
        <span class="text-white/60 text-lg">/mo</span>
       </div>
       <p class="text-white/70 text-base leading-relaxed" style="font-family:'DM Sans', sans-serif">
        High-touch private coaching for business owners who want rapid growth.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow">
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">(4) weekly 1-hour private coaching calls</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">4-hour monthly retainer with CEO Dom</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Strategy, systems, ads, scaling, and leadership guidance</span>
       </div>
       <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/70 text-sm" style="font-family:'DM Sans', sans-serif">Priority access & support</span>
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
     
   <!-- Card 5: Campaign Management -->
   <div class="pricing-carousel-card flex-shrink-0 w-[340px] md:w-[380px] snap-start">
    <div class="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border-t-4 border-t-[#7BB9E8] border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/20 flex flex-col group">
     <div class="p-8 flex-grow flex flex-col">
       <div class="mb-6">
       <span class="text-4xl mb-4 block">📈</span>
       <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
         Campaign Management
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

