export const pricingSectionHtml = String.raw`<section id="pricing" class="w-full py-20 md:py-32 bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] relative overflow-x-hidden" style="scroll-margin-top:120px">
 <div class="absolute inset-0 opacity-5">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,185,232,0.1),transparent_50%)]">
  </div>
 </div>
 <div class="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
  <div class="text-center mb-16 md:mb-20">
   <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4" style="font-family:Inter, Satoshi, sans-serif">
    Pricing Plans
   </h2>
   <div class="w-20 h-1 rounded-full bg-gradient-to-r from-[#7BB9E8] to-[#5fa6db] mb-6 mt-2 mx-auto shadow-lg shadow-[#7BB9E8]/50">
   </div>
   <p class="text-xl text-white/70 max-w-2xl mx-auto mb-4" style="font-family:Inter, Satoshi, sans-serif">
    Choose the plan that fits your business needs
   </p>
   <!-- Trust Indicator -->
   <div class="flex items-center justify-center gap-2 text-white/50 text-sm">
    <svg class="w-5 h-5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
    <span style="font-family:Inter, Satoshi, sans-serif">Trusted by 100+ businesses</span>
   </div>
  </div>
  
  <!-- Pricing Cards Grid with Staggered Layout -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full max-w-[1800px] mx-auto overflow-visible justify-items-center lg:justify-items-stretch items-start">
   <!-- DIY Plan -->
   <div class="pricing-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/30 hover:-translate-y-2 flex flex-col relative w-full group overflow-hidden">
    <!-- Animated Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/0 via-[#7BB9E8]/10 to-[#7BB9E8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    
    <div class="mb-8 relative z-10">
     <div class="mb-6">
      <span class="text-4xl mb-3 block">💻</span>
      <h3 class="text-2xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">
       DIY Plan
      </h3>
     </div>
     <div class="mb-4">
      <div class="flex items-baseline gap-2">
       <span class="text-5xl font-extrabold text-[#7BB9E8] group-hover:scale-110 transition-transform duration-300" style="font-family:Inter, Satoshi, sans-serif">$65</span>
       <span class="text-white/60 text-lg">/mo</span>
      </div>
     </div>
     <p class="text-white/80 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">
      Perfect for business owners who want to build and manage everything themselves.
     </p>
    </div>
    <div class="space-y-4 mb-8 flex-grow relative z-10">
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Full software access</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">CRM+ platform</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Automation access</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Website builder</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Pre-built templates</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Limited support</span>
     </div>
    </div>
    <a href="#contact" class="mt-auto w-full px-6 py-4 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-semibold rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7BB9E8]/50 hover:scale-105 active:scale-95 relative z-10 group/btn" style="font-family:Inter, Satoshi, sans-serif">
     <span class="relative z-10">Get Started</span>
     <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
    </a>
   </div>
   
   <!-- Growth Plan - Featured -->
   <div class="pricing-card featured-plan bg-gradient-to-br from-[#7BB9E8]/20 via-[#7BB9E8]/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 lg:p-8 border-2 border-[#7BB9E8]/50 hover:border-[#7BB9E8]/80 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/50 hover:-translate-y-2 flex flex-col relative scale-105 lg:scale-110 z-10 w-full group overflow-hidden">
    <!-- Enhanced Animated Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/20 via-[#7BB9E8]/30 to-[#7BB9E8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl animate-pulse"></div>
    
    <div class="mb-8 relative z-10">
     <div class="mb-6">
      <span class="text-5xl mb-3 block">🚀</span>
      <h3 class="text-2xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">
       Growth Plan
      </h3>
     </div>
     <div class="mb-4">
      <div class="flex items-baseline gap-2">
       <span class="text-6xl font-extrabold text-[#7BB9E8] group-hover:scale-110 transition-transform duration-300" style="font-family:Inter, Satoshi, sans-serif">$300</span>
       <span class="text-white/70 text-xl">/mo</span>
      </div>
     </div>
     <p class="text-white/90 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">
      Designed for businesses ready to scale with automation & visibility.
     </p>
    </div>
    <div class="space-y-4 mb-8 flex-grow relative z-10">
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Google Business Profile Management</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">SEO optimization</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Premium support</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Automations done for you</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">AI integration</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Everything from lower plans</span>
     </div>
    </div>
    <a href="#contact" class="mt-auto w-full px-8 py-4 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-bold rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7BB9E8]/60 hover:scale-105 active:scale-95 text-lg relative z-10 group/btn" style="font-family:Inter, Satoshi, sans-serif">
     <span class="relative z-10">Get Started</span>
     <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
    </a>
   </div>
   
   <!-- Executive Coaching Flip Card - With 3D Effect -->
   <div class="flip-card pricing-card featured-plan bg-gradient-to-br from-[#7BB9E8]/20 via-[#7BB9E8]/10 to-white/[0.02] backdrop-blur-xl rounded-3xl p-0 border-2 border-[#7BB9E8]/50 hover:border-[#7BB9E8]/80 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/50 hover:-translate-y-2 flex flex-col relative scale-105 lg:scale-110 z-10 w-full group overflow-hidden -mt-4 lg:-mt-4" style="perspective: 1000px;">
    <div class="flip-card-inner" id="flip-card-inner">
     <!-- Height Spacer - Establishes card height (matches Growth Plan exactly) -->
     <div class="flip-card-spacer invisible p-6 lg:p-8" aria-hidden="true">
      <div class="mb-8 relative z-10">
       <div class="mb-6">
        <span class="text-5xl mb-3 block">🚀</span>
        <h3 class="text-3xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">Growth Plan</h3>
       </div>
       <div class="mb-4">
        <div class="flex items-baseline gap-2">
         <span class="text-6xl font-extrabold text-[#7BB9E8]" style="font-family:Inter, Satoshi, sans-serif">$300</span>
         <span class="text-white/70 text-xl">/mo</span>
        </div>
       </div>
       <p class="text-white/90 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">Designed for businesses ready to scale with automation & visibility.</p>
      </div>
      <div class="space-y-4 mb-8 flex-grow relative z-10">
       <div class="flex items-start gap-3" style="min-height: 40px;"></div>
       <div class="flex items-start gap-3" style="min-height: 26px;"></div>
       <div class="flex items-start gap-3" style="min-height: 26px;"></div>
       <div class="flex items-start gap-3" style="min-height: 26px;"></div>
       <div class="flex items-start gap-3" style="min-height: 26px;"></div>
       <div class="flex items-start gap-3" style="min-height: 26px;"></div>
      </div>
       <div class="h-[3.5rem] w-full"></div>
     </div>
     <!-- Front Side - Executive Coaching -->
     <div class="flip-card-front p-6 lg:p-8">
      <!-- Enhanced Animated Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/20 via-[#7BB9E8]/30 to-[#7BB9E8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl animate-pulse"></div>
      
      <!-- Small Toggle Switch - Top Right -->
      <div class="absolute top-2 right-2 z-20">
       <button onclick="document.getElementById('flip-card-inner').classList.toggle('flipped')" class="flex items-center justify-center gap-1 px-2 py-0.5 md:px-1 md:py-0.5 bg-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 min-w-[3.5rem] md:min-w-[3rem] touch-manipulation" style="font-family:Inter, Satoshi, sans-serif; height: 18px;" aria-label="Toggle to Campaign Management" title="Switch to Campaign Management">
        <span class="block w-2 h-2 bg-white rounded-full flex-shrink-0 self-center"></span>
        <span class="text-[8px] md:text-[7px] text-white/60 md:text-white/50 font-medium md:font-light uppercase tracking-wider whitespace-nowrap leading-none self-center" style="font-family:Inter, Satoshi, sans-serif">Campaign</span>
       </button>
      </div>
      <div class="mb-8 relative z-10">
       <div class="mb-6">
        <span class="text-5xl mb-3 block">🎯</span>
        <h3 class="text-2xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">
         Executive Coaching
        </h3>
       </div>
       <div class="mb-4">
        <div class="flex items-baseline gap-2">
         <span class="text-6xl font-extrabold text-[#7BB9E8] group-hover:scale-110 transition-transform duration-300" style="font-family:Inter, Satoshi, sans-serif">$1,000</span>
         <span class="text-white/70 text-xl">/mo</span>
        </div>
       </div>
       <p class="text-white/90 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">
        High-touch private coaching for business owners who want rapid growth.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow relative z-10">
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">(4) weekly 1-hour private coaching calls</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">4-hour monthly retainer with CEO Dom</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Strategy, systems, ads, scaling, and leadership guidance</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Priority access & support</span>
       </div>
      </div>
      <a href="#contact" class="mt-auto w-full px-8 py-4 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-bold rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7BB9E8]/60 hover:scale-105 active:scale-95 text-lg relative z-10 group/btn" style="font-family:Inter, Satoshi, sans-serif">
       <span class="relative z-10">Get Started</span>
       <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      </a>
     </div>
     
     <!-- Back Side - Campaign Management -->
     <div class="flip-card-back p-6 lg:p-8">
      <!-- Enhanced Animated Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/20 via-[#7BB9E8]/30 to-[#7BB9E8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl animate-pulse"></div>
      
      <!-- Small Toggle Switch - Top Right -->
      <div class="absolute top-2 right-2 z-20">
       <button onclick="document.getElementById('flip-card-inner').classList.toggle('flipped')" class="flex items-center justify-start gap-1 px-2 py-0.5 md:px-1 md:py-0.5 bg-[#7BB9E8]/40 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 min-w-[3.5rem] md:min-w-[3rem] touch-manipulation" style="font-family:Inter, Satoshi, sans-serif; height: 18px;" aria-label="Toggle to Executive Coaching" title="Switch to Executive Coaching">
        <span class="block w-2 h-2 bg-white rounded-full flex-shrink-0 self-center order-1"></span>
        <span class="text-[8px] md:text-[7px] text-white/60 md:text-white/50 font-medium md:font-light uppercase tracking-wider whitespace-nowrap leading-none self-center text-left order-2" style="font-family:Inter, Satoshi, sans-serif">Coaching</span>
       </button>
      </div>
      <div class="mb-8 relative z-10">
       <div class="mb-6">
        <span class="text-5xl mb-3 block">📈</span>
        <h3 class="text-2xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">
         Campaign Management
        </h3>
       </div>
       <div class="mb-4">
        <div class="flex items-baseline gap-2 flex-wrap">
         <span class="text-5xl font-extrabold text-[#7BB9E8] group-hover:scale-110 transition-transform duration-300" style="font-family:Inter, Satoshi, sans-serif">Custom</span>
         <span class="text-white/70 text-xl">Quote</span>
        </div>
        <div class="mt-2 text-xs text-white/50" style="font-family:Inter, Satoshi, sans-serif">
         Contact us for a personalized quote
        </div>
       </div>
       <p class="text-white/90 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">
        Let us run it all for you — you focus on the business.
       </p>
      </div>
      <div class="space-y-4 mb-8 flex-grow relative z-10 overflow-y-auto">
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Full campaign management</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">A/B split testing</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Ad management</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Video + copywriting</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Google Analytics tracking</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">High-converting funnel creation</span>
       </div>
       <div class="flex items-start gap-3 feature-item">
        <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-white/90 text-sm" style="font-family:Inter, Satoshi, sans-serif">Ongoing optimization</span>
       </div>
      </div>
      <a href="#contact" class="mt-auto w-full px-8 py-4 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-bold rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7BB9E8]/60 hover:scale-105 active:scale-95 text-lg relative z-10 group/btn" style="font-family:Inter, Satoshi, sans-serif">
       <span class="relative z-10">Contact for Quote</span>
       <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      </a>
     </div>
    </div>
   </div>
   
   <!-- Done-For-You Website -->
   <div class="pricing-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10 hover:border-[#7BB9E8]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7BB9E8]/30 hover:-translate-y-2 flex flex-col relative w-full group overflow-hidden">
    <!-- Animated Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8]/0 via-[#7BB9E8]/10 to-[#7BB9E8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    
    <div class="mb-8 relative z-10">
     <div class="mb-6">
      <span class="text-4xl mb-3 block">✨</span>
      <h3 class="text-2xl font-bold text-white mb-3" style="font-family:Inter, Satoshi, sans-serif">
       Done-For-You Website
      </h3>
     </div>
     <div class="mb-4">
      <div class="flex items-baseline gap-2">
       <span class="text-5xl font-extrabold text-[#7BB9E8] group-hover:scale-110 transition-transform duration-300" style="font-family:Inter, Satoshi, sans-serif">$145</span>
       <span class="text-white/60 text-lg">/mo</span>
      </div>
     </div>
     <p class="text-white/80 text-base leading-relaxed" style="font-family:Inter, Satoshi, sans-serif">
      Great for businesses that want a custom-built site plus essential support.
     </p>
    </div>
    <div class="space-y-4 mb-8 flex-grow relative z-10">
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Custom website built for you</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Basic support (phone, call & text)</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Branding & logo creation</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Automation library access</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">DIY library access</span>
     </div>
     <div class="flex items-start gap-3 feature-item">
      <svg class="w-6 h-6 text-[#7BB9E8] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-white/80 text-sm" style="font-family:Inter, Satoshi, sans-serif">Monthly performance reports</span>
     </div>
    </div>
    <a href="#contact" class="mt-auto w-full px-6 py-4 bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-white font-semibold rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7BB9E8]/50 hover:scale-105 active:scale-95 relative z-10 group/btn" style="font-family:Inter, Satoshi, sans-serif">
     <span class="relative z-10">Get Started</span>
     <div class="absolute inset-0 bg-gradient-to-r from-[#7BB9E8] to-[#5fa6d6] rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
    </a>
   </div>
  </div>
 </div>
</section>
`;
