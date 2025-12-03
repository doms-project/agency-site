export const footerSectionHtml = String.raw`<footer class="w-full bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] border-t border-white/10 py-8 px-4 md:px-8">
 <div class="max-w-7xl mx-auto">
  <div class="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 mb-6">
   <div class="flex flex-col md:hidden items-center text-center mb-8">
    <a aria-label="Yo Marketing Home" href="/">
     <img alt="Yo Marketing" class="h-12 w-auto mb-4" src="/images/logo-hq.png"/>
    </a>
    <p class="text-white/70 text-base font-medium tracking-wide" style="font-family:Inter, Satoshi, sans-serif">
     Empowering Business
    </p>
   </div>
   <div class="flex flex-col md:hidden items-center text-center mb-8 px-4">
    <h3 class="text-white font-semibold text-xl mb-3 tracking-wide" style="font-family:Inter, Satoshi, sans-serif">
     Stay in the loop
    </h3>
    <p class="text-white/60 text-sm mb-5 font-light max-w-md">
     Get cutting-edge strategies to rank higher on Google, get more leads, and grow your business with proven winning tactics.
    </p>
    <form class="w-full max-w-md">
     <div class="flex flex-col gap-3">
      <input id="email-mobile" name="email" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 focus:border-[#7BB9E8] transition-all duration-200 disabled:opacity-50 text-center" placeholder="Enter your email" required="" type="email" value=""/>
      <button class="w-full px-6 py-3 bg-[#7BB9E8] hover:bg-[#6AA8D7] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" type="submit">
       Subscribe
      </button>
     </div>
    </form>
   </div>
   <div class="flex flex-col md:hidden items-center gap-4 mb-8">
    <a class="flex items-center gap-3 text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium group" href="mailto:youngstownmarketingco@gmail.com">
     <svg class="text-[#7BB9E8] group-hover:scale-110 transition-transform duration-200" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 512 512" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
      </path>
     </svg>
     <span>
      youngstownmarketingco@gmail.com
     </span>
    </a>
    <a class="flex items-center gap-3 text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium group" href="tel:3302995179">
     <svg class="text-[#7BB9E8] group-hover:scale-110 transition-transform duration-200" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 512 512" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z">
      </path>
     </svg>
     <span>
      (330) 299-5179
     </span>
    </a>
   </div>
   <div class="flex md:hidden flex-wrap justify-center gap-6 mb-8">
    <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium" href="#services">
     Services
    </a>
    <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium" href="#portfolio">
     Portfolio
    </a>
    <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium" href="#about">
     About
    </a>
    <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-base font-medium" href="#contact">
     Contact
    </a>
   </div>
   <div class="flex md:hidden items-center justify-center gap-4 mb-8">
    <div aria-label="Instagram" class="p-3.5 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 min-w-[44px] min-h-[44px] flex items-center justify-center">
     <svg class="text-xl" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
      </path>
     </svg>
    </div>
    <div aria-label="TikTok" class="p-3.5 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 min-w-[44px] min-h-[44px] flex items-center justify-center">
     <svg class="text-xl" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z">
      </path>
     </svg>
    </div>
    <div aria-label="LinkedIn" class="p-3.5 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 min-w-[44px] min-h-[44px] flex items-center justify-center">
     <svg class="text-xl" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
      </path>
     </svg>
    </div>
   </div>
   <div class="hidden md:flex flex-col items-start text-left md:col-span-4">
    <a aria-label="Yo Marketing Home" href="/">
     <img alt="Yo Marketing" class="h-10 w-auto mb-3" src="/images/logo-hq.png"/>
    </a>
    <p class="text-white/70 text-sm font-medium tracking-wide mb-1.5" style="font-family:Inter, Satoshi, sans-serif">
     Empowering Business
    </p>
    <p class="text-white/50 text-xs font-light max-w-xs leading-relaxed">
     Expert website design, Google Business Profile optimization, local SEO, and targeted lead generation solutions.
    </p>
   </div>
   <div class="hidden md:flex flex-col items-start text-left md:col-span-2">
    <h3 class="text-white font-semibold text-xs mb-3 tracking-wider uppercase opacity-80" style="font-family:Inter, Satoshi, sans-serif">
     COMPANY
    </h3>
    <div class="flex flex-col gap-2">
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="/">
      Home
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="#services">
      Services
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="#about">
      About Us
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="#portfolio">
      Testimonials
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="#contact">
      Contact Us
     </a>
    </div>
   </div>
   <div class="hidden md:flex flex-col items-start text-left md:col-span-3">
    <h3 class="text-white font-semibold text-xs mb-3 tracking-wider uppercase opacity-80" style="font-family:Inter, Satoshi, sans-serif">
     CUSTOMER CARE
    </h3>
    <div class="flex flex-col gap-2">
     <a class="flex items-center gap-2 text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium group" href="mailto:youngstownmarketingco@gmail.com">
      <svg class="text-[#7BB9E8] group-hover:scale-110 transition-transform duration-200 w-3.5 h-3.5 flex-shrink-0" fill="currentColor" stroke="currentColor" stroke-width="0" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
       <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
       </path>
      </svg>
      <span class="break-all">youngstownmarketingco@gmail.com</span>
     </a>
     <a class="flex items-center gap-2 text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium group" href="tel:3302995179">
      <svg class="text-[#7BB9E8] group-hover:scale-110 transition-transform duration-200 w-3.5 h-3.5 flex-shrink-0" fill="currentColor" stroke="currentColor" stroke-width="0" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
       <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z">
       </path>
      </svg>
      <span>(330) 299-5179</span>
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="#contact">
      FAQ & Contact Center
     </a>
    </div>
   </div>
   <div class="hidden md:flex flex-col items-start text-left md:col-span-3">
    <h3 class="text-white font-semibold text-xs mb-3 tracking-wider uppercase opacity-80" style="font-family:Inter, Satoshi, sans-serif">
     LEGAL
    </h3>
    <div class="flex flex-col gap-2 mb-4">
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="/privacy-policy">
      Privacy Policy
     </a>
     <a class="text-white/70 hover:text-[#7BB9E8] transition-all duration-200 text-xs font-medium hover:translate-x-1" href="/terms-of-service">
      Terms of Service
     </a>
    </div>
    <h3 class="text-white font-semibold text-xs mb-2 tracking-wider uppercase opacity-80" style="font-family:Inter, Satoshi, sans-serif">
     Follow Us
    </h3>
    <div class="flex items-center gap-2.5">
     <div aria-label="Instagram" class="p-3 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center">
      <svg class="text-base" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
       <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
       </path>
      </svg>
     </div>
     <div aria-label="TikTok" class="p-3 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center">
      <svg class="text-base" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
       <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z">
       </path>
      </svg>
     </div>
     <div aria-label="LinkedIn" class="p-3 text-white/60 hover:text-[#7BB9E8] hover:bg-white/5 rounded-full transition-all duration-200 hover:scale-110 border border-white/10 hover:border-[#7BB9E8]/30 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center">
      <svg class="text-base" fill="currentColor" height="1em" stroke="currentColor" stroke-width="0" viewbox="0 0 448 512" width="1em" xmlns="http://www.w3.org/2000/svg">
       <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
       </path>
      </svg>
     </div>
    </div>
   </div>
  </div>
  <div class="flex flex-col gap-4 pt-6 border-t border-white/10">
   <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 pb-4 border-b border-white/5">
    <h3 class="text-white font-semibold text-xs tracking-wider uppercase opacity-80 whitespace-nowrap" style="font-family:Inter, Satoshi, sans-serif">
     Stay in the loop
    </h3>
    <form class="w-full md:w-auto">
     <div class="flex flex-col sm:flex-row gap-2 max-w-md md:max-w-none">
      <input id="email-desktop" name="email" class="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7BB9E8]/50 focus:border-[#7BB9E8] transition-all duration-200 disabled:opacity-50 text-xs" placeholder="Enter your email" required="" type="email" value=""/>
      <button class="px-4 py-2 bg-[#7BB9E8] hover:bg-[#6AA8D7] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs whitespace-nowrap" type="submit">
       Subscribe
      </button>
     </div>
    </form>
   </div>
   <div class="flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="text-white/50 text-sm text-center md:text-left font-light">
     © Copyright 2025. Yo Marketing Company. All Rights Reserved.
    </div>
    <div class="flex items-center gap-4 text-sm flex-wrap justify-center md:justify-end">
     <a class="text-white/50 hover:text-[#7BB9E8] transition-all duration-200 font-light" href="/privacy-policy">
      Privacy Policy
     </a>
     <span class="text-white/30">|</span>
     <a class="text-white/50 hover:text-[#7BB9E8] transition-all duration-200 font-light" href="/terms-of-service">
      Terms of Service
     </a>
    </div>
   </div>
  </div>
 </div>
</footer>
`;
