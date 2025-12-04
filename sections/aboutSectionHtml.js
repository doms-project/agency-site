export const aboutSectionHtml = String.raw`
<style>
  .cristina-chat-bubble {
    position: relative;
  }
  
  /* Desktop: tail on right side */
  @media (min-width: 768px) {
  .cristina-chat-bubble::before {
    content: '';
    position: absolute;
    right: -8px;
    bottom: 20px;
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transform: rotate(45deg);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 2px 2px 8px rgba(123, 185, 232, 0.15);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    }
  }
  
  /* Mobile: tail at top center pointing up to photo */
  @media (max-width: 767px) {
    .cristina-chat-bubble::before {
      content: '';
      position: absolute;
      left: 50%;
      top: -8px;
      width: 18px;
      height: 18px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transform: translateX(-50%) rotate(45deg);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: -2px -2px 8px rgba(123, 185, 232, 0.15);
      clip-path: polygon(0 0, 100% 0, 0 100%);
      z-index: -1;
    }
  }
</style>
<section class="w-full pt-12 pb-8 md:pb-20 bg-gradient-to-b from-[#181c22] via-[#10151a] to-[#181c22] relative overflow-hidden" id="about" style="scroll-margin-top:120px">
 <div class="absolute inset-0 opacity-5">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,185,232,0.1),transparent_50%)]">
  </div>
 </div>
 <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 overflow-visible">
  <div class="text-center mb-16 pt-12">
   <h2 class="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style="font-family:Inter, Satoshi, sans-serif">
    Meet the Team
   </h2>
   <div class="w-20 h-1 rounded-full bg-gradient-to-r from-[#7BB9E8] to-[#5fa6db] mb-6 mt-2 mx-auto shadow-lg shadow-[#7BB9E8]/50">
   </div>
   <p class="text-xl text-white/70 max-w-2xl mx-auto" style="font-family:Inter, Satoshi, sans-serif">
    Helping businesses grow, scale, and win online.
   </p>
  </div>
  
  <!-- Founder Section - Side by Side -->
  <div class="max-w-6xl mx-auto mb-12">
   <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 md:gap-8">
    
    <!-- Founder Photo Section -->
    <div class="group">
     <div class="relative">
      <div class="absolute -inset-3 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
      </div>
      <div class="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[255px] mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
       <img alt="Dom - Founder & CEO" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/images/dom photo.jpeg"/>
      </div>
     </div>
    </div>
    
    <!-- Founder Content Section -->
    <div class="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10">
     <!-- Header -->
     <div class="mb-2">
      <div class="flex items-center gap-2 mb-0.5">
       <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight" style="font-family:Inter, Satoshi, sans-serif">
        Hey, I&apos;m Dom.
       </h3>
       <!-- Instagram Link -->
       <a class="group flex items-center justify-center w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7BB9E8]/50 text-white/60 hover:text-[#7BB9E8] transition-all duration-300 hover:scale-110 flex-shrink-0" href="https://www.instagram.com/dbcooper5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" rel="noopener noreferrer" target="_blank">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewbox="0 0 24 24">
         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z">
         </path>
        </svg>
       </a>
      </div>
      <p class="text-[#7BB9E8] font-semibold text-sm md:text-base leading-tight">
       Founder &amp; CEO
      </p>
     </div>
     
     <!-- Bio -->
     <div class="space-y-1.5">
      <p class="text-white/80 leading-snug text-sm md:text-base" style="font-family:Inter, Satoshi, sans-serif">
       I&apos;m the founder of Yo Marketing, and over the years I&apos;ve worked hands-on with 100+ small businesses, dozens of creators, and several political campaigns. I&apos;ve been part of some incredible marketing wins—and have personally led campaigns that doubled client revenue through strategic ads and smart digital execution.
      </p>
      <p class="text-white/80 leading-snug text-sm md:text-base" style="font-family:Inter, Satoshi, sans-serif">
       I have a genuine passion for helping businesses grow and sharing the strategies that actually work. At Yo Marketing, we don&apos;t just create beautiful websites—we build websites that convert, backed by systems that keep your business growing on autopilot.
      </p>
      <p class="text-white/80 leading-snug text-sm md:text-base" style="font-family:Inter, Satoshi, sans-serif">
       From automation setups and CRM optimization to high-impact advertising campaigns, we help you get more customers, streamline operations, and scale effectively. Our mission is simple: help you grow, then help you handle the growth.
      </p>
     </div>
    </div>
    
   </div>
  </div>
  
  <!-- Cristina & Other Team Members Section -->
  <div class="max-w-6xl mx-auto mb-2 md:mb-12 px-4 md:px-0 overflow-visible">
   <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0 overflow-visible">
    <!-- Other Team Members Row (Evan + 3) -->
     <div class="order-2 md:order-1 flex-1 grid grid-cols-2 md:flex md:flex-row md:flex-nowrap justify-center md:justify-end gap-4 md:gap-6 mt-0 md:mt-24 lg:mt-32 w-full">
     
     <!-- Evan - Sales Manager -->
     <div class="flex flex-col items-center text-center space-y-3">
      <div class="group relative">
       <div class="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition-opacity duration-500">
       </div>
       <div class="relative w-40 h-44 md:w-44 md:h-48 lg:w-48 lg:h-52 rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
        <img
         src="/images/Evan new.jpg"
         alt="Evan - Sales Manager"
         class="w-full h-full object-cover scale-125 group-hover:scale-130 transition-transform duration-500"
         style="object-position: center 20%;"
        />
       </div>
      </div>
      <div>
       <p class="text-white font-semibold text-base" style="font-family:Inter, Satoshi, sans-serif">
        Evan
       </p>
       <p class="text-white/60 text-sm" style="font-family:Inter, Satoshi, sans-serif">
        Sales Manager
       </p>
      </div>
     </div>
     
     <!-- Andrianne - Lead Generation -->
     <div class="flex flex-col items-center text-center space-y-3">
      <div class="group relative">
       <div class="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition-opacity duration-500">
       </div>
       <div class="relative w-40 h-44 md:w-44 md:h-48 lg:w-48 lg:h-52 rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
        <img
         src="/images/andrianne.jpg"
         alt="Andrianne - Lead Generation"
         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
       </div>
      </div>
      <div>
       <p class="text-white font-semibold text-base" style="font-family:Inter, Satoshi, sans-serif">
        Andrianne
       </p>
       <p class="text-white/60 text-sm" style="font-family:Inter, Satoshi, sans-serif">
        Lead Generation
       </p>
      </div>
     </div>
     
    <!-- Muzaib - Front End Dev -->
    <div class="flex flex-col items-center text-center space-y-3">
     <div class="group relative">
      <div class="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition-opacity duration-500">
      </div>
      <div class="relative w-40 h-44 md:w-44 md:h-48 lg:w-48 lg:h-52 rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
       <img
        src="/images/Muzaib.jpeg"
        alt="Muzaib - Front End Dev"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
       />
      </div>
     </div>
     <div>
      <p class="text-white font-semibold text-base" style="font-family:Inter, Satoshi, sans-serif">
       Muzaib
      </p>
      <p class="text-white/60 text-sm" style="font-family:Inter, Satoshi, sans-serif">
       Front End Dev
      </p>
     </div>
    </div>
    
    <!-- Musaraf - Backend Dev -->
    <div class="flex flex-col items-center text-center space-y-3">
     <div class="group relative">
      <div class="absolute -inset-2 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-90 transition-opacity duration-500">
      </div>
      <div class="relative w-40 h-44 md:w-44 md:h-48 lg:w-48 lg:h-52 rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent">
       <img
        src="/images/musaraf.png"
        alt="Musaraf - Backend Dev"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
       />
      </div>
     </div>
     <div>
      <p class="text-white font-semibold text-base" style="font-family:Inter, Satoshi, sans-serif">
       Musaraf
      </p>
      <p class="text-white/60 text-sm" style="font-family:Inter, Satoshi, sans-serif">
       Backend Dev
      </p>
     </div>
    </div>
    
    </div>
    
    <!-- Cristina - Designer (Special Position) -->
    <div class="cristina-section order-1 md:order-2 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end gap-4 md:gap-6 flex-shrink-0 md:-ml-32 lg:-ml-56 w-full md:w-auto overflow-visible">
    <style>
     .cristina-section {
       margin-top: 0px !important;
     }
     @media (min-width: 768px) {
      .cristina-section {
       margin-top: 16px !important;
      }
     }
     @media (min-width: 1024px) {
      .cristina-section {
       margin-top: 24px !important;
      }
     }
    </style>
     
     <!-- Cristina Photo Section (First on Mobile) -->
     <div class="group flex-shrink-0 w-full sm:w-auto flex justify-center md:block order-1 md:order-2">
      <div class="relative">
       <div class="absolute -inset-3 bg-gradient-to-r from-[#7BB9E8]/20 to-[#5fa6db]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
       </div>
       <div class="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 max-w-[160px] sm:max-w-[192px] md:max-w-[224px] lg:max-w-[255px] aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#7BB9E8]/10 to-transparent mx-auto">
        <img alt="Cristina - Designer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/images/cristina.jpeg?v=2" loading="eager" fetchpriority="high" decoding="async"/>
       </div>
      </div>
     </div>
     
     <!-- Message Bubble - Name Section (Second on Mobile, with tail pointing up) -->
     <div class="cristina-chat-bubble bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-5 border border-white/20 shadow-lg shadow-[#7BB9E8]/20 mt-0 md:-mt-10 lg:-mt-12 overflow-visible text-center md:text-left max-w-[200px] sm:max-w-xs md:max-w-none order-2 md:order-1">
      <h3 class="text-xl md:text-2xl font-bold text-white mb-1" style="font-family:Inter, Satoshi, sans-serif">
       Hey, I&apos;m Cristina.
      </h3>
      <p class="text-[#7BB9E8] font-semibold text-sm md:text-base">
       Brand Strategist &amp; Designer
      </p>
     </div>
     
    </div>
   </div>
  </div>
 </div>
</section>
`;
