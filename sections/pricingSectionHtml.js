export const pricingSectionHtml = String.raw`<section id="pricing" class="w-full py-28 md:py-44 bg-gradient-to-br from-[#0a0a0a] via-[#10151a] to-[#181c22] relative overflow-hidden" style="scroll-margin-top:120px">
  <div class="absolute inset-0 opacity-5">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,185,232,0.1),transparent_50%)]"></div>
  </div>
  <div class="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
    <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- Left Column: Marketing Copy -->
      <div class="lg:col-span-5 space-y-8 mt-4 lg:mt-8">
        <div>
          <span class="block uppercase tracking-[0.25em] text-xs text-neutral-400 font-semibold mb-4" style="font-family:'DM Sans', sans-serif">
            GROWTH PROGRAM
          </span>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4" style="font-family:'DM Sans', sans-serif">
            Grow Your Business. <br/>
            <span class="text-[#7BB9E8]">We'll Handle the Rest.</span>
          </h2>
          <p class="text-lg text-white/70 leading-relaxed" style="font-family:'DM Sans', sans-serif">
            Skip the guesswork. Get a custom website, high-impact SEO, automated workflows, and dedicated marketing support tailored for your business.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-[#7BB9E8]/10 flex items-center justify-center mt-1 flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-white text-base" style="font-family:'DM Sans', sans-serif">Custom-Built Platform</h4>
              <p class="text-sm text-white/60 mt-0.5" style="font-family:'DM Sans', sans-serif">High-converting website custom designed and built for your brand.</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-[#7BB9E8]/10 flex items-center justify-center mt-1 flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-white text-base" style="font-family:'DM Sans', sans-serif">Yo Marketing GHL Engine</h4>
              <p class="text-sm text-white/60 mt-0.5" style="font-family:'DM Sans', sans-serif">Full GoHighLevel subaccount setup with custom automations, CRM, & workflows.</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-[#7BB9E8]/10 flex items-center justify-center mt-1 flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-[#7BB9E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-white text-base" style="font-family:'DM Sans', sans-serif">SEO & Traffic Guarantee</h4>
              <p class="text-sm text-white/60 mt-0.5" style="font-family:'DM Sans', sans-serif">Targeted search ranking to drive consistent organic phone calls and leads.</p>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-white/10 flex items-center gap-6">
          <div>
            <div class="text-3xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">200%+</div>
            <div class="text-xs uppercase tracking-wider text-white/50 mt-1" style="font-family:'DM Sans', sans-serif">Average Client Growth</div>
          </div>
          <div class="w-px h-10 bg-white/10"></div>
          <div>
            <div class="text-3xl font-extrabold text-[#7BB9E8]" style="font-family:'DM Sans', sans-serif">100%</div>
            <div class="text-xs uppercase tracking-wider text-white/50 mt-1" style="font-family:'DM Sans', sans-serif">Dedicated Support</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Lead Capture Form -->
      <div class="lg:col-span-7">
        <div class="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 px-8 pt-10 pb-12 sm:px-12 sm:pt-12 sm:pb-14 md:px-14 md:pt-14 md:pb-16 shadow-2xl relative">
          
          <!-- Success State -->
          <div id="lead-success-container" class="hidden text-center py-12 px-4 space-y-6">
            <div class="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-white" style="font-family:'DM Sans', sans-serif">Proposal Requested!</h3>
              <p class="text-white/70 max-w-md mx-auto leading-relaxed" style="font-family:'DM Sans', sans-serif" id="lead-success-message">
                Thank you! Your growth request has been submitted. We are analyzing your industry stats and will follow up shortly.
              </p>
            </div>
          </div>

          <!-- Form State -->
          <form id="lead-capture-form" class="space-y-6">
            <div class="text-center sm:text-left mb-6">
              <h3 class="text-2xl font-bold text-white mb-2" style="font-family:'DM Sans', sans-serif">
                Request a Free Marketing Proposal
              </h3>
              <p class="text-white/60 text-sm" style="font-family:'DM Sans', sans-serif">
                Let us know your goals and we'll put together a custom plan for your business.
              </p>
            </div>

            <!-- Error message container -->
            <div id="lead-error-container" class="hidden p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm leading-relaxed"></div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Full Name -->
              <div class="space-y-2">
                <label for="lead_fullName" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Full Name <span class="text-red-400">*</span></label>
                <input type="text" id="lead_fullName" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm" placeholder="John Doe" style="font-family:'DM Sans', sans-serif" />
              </div>
              
              <!-- Business Email -->
              <div class="space-y-2">
                <label for="lead_email" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Business Email <span class="text-red-400">*</span></label>
                <input type="email" id="lead_email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm" placeholder="john@company.com" style="font-family:'DM Sans', sans-serif" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Phone Number -->
              <div class="space-y-2">
                <label for="lead_phone" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Phone Number <span class="text-red-400">*</span></label>
                <input type="tel" id="lead_phone" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm" placeholder="(330) 555-0199" style="font-family:'DM Sans', sans-serif" />
              </div>
              
              <!-- Business Name -->
              <div class="space-y-2">
                <label for="lead_businessName" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Business Name <span class="text-red-400">*</span></label>
                <input type="text" id="lead_businessName" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm" placeholder="Company LLC" style="font-family:'DM Sans', sans-serif" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Website URL -->
              <div class="space-y-2">
                <label for="lead_domainName" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Current Website (Optional)</label>
                <input type="url" id="lead_domainName" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm" placeholder="https://example.com" style="font-family:'DM Sans', sans-serif" />
              </div>

              <!-- Primary Goal -->
              <div class="space-y-2">
                <label for="lead_websiteGoals" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Primary Marketing Goal</label>
                <div class="relative">
                  <select id="lead_websiteGoals" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer" style="font-family:'DM Sans', sans-serif">
                    <option value="" class="bg-[#10151a]">Select a Goal</option>
                    <option value="Get More Leads & Customers" class="bg-[#10151a]">Get More Leads & Customers</option>
                    <option value="Build a New Website" class="bg-[#10151a]">Build a New Website</option>
                    <option value="Improve Google Ranking / SEO" class="bg-[#10151a]">Improve Google Ranking / SEO</option>
                    <option value="Google/Facebook Ads Management" class="bg-[#10151a]">Google/Facebook Ads Management</option>
                    <option value="Other" class="bg-[#10151a]">Other</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Marketing Budget -->
            <div class="space-y-2">
              <label for="lead_marketingBudget" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Monthly Marketing Budget</label>
              <div class="relative">
                <select id="lead_marketingBudget" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer" style="font-family:'DM Sans', sans-serif">
                  <option value="" class="bg-[#10151a]">Select Budget Range</option>
                  <option value="Under $1,000 / month" class="bg-[#10151a]">Under $1,000 / month</option>
                  <option value="$1,000 - $3,000 / month" class="bg-[#10151a]">$1,000 - $3,000 / month</option>
                  <option value="$3,000 - $5,000 / month" class="bg-[#10151a]">$3,000 - $5,000 / month</option>
                  <option value="$5,000+ / month" class="bg-[#10151a]">$5,000+ / month</option>
                  <option value="Not sure yet" class="bg-[#10151a]">Not sure yet</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="space-y-2">
              <label for="lead_message" class="block text-xs font-semibold uppercase tracking-wider text-white/70" style="font-family:'DM Sans', sans-serif">Project Details / Message</label>
              <textarea id="lead_message" rows="3" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#7BB9E8]/50 focus:ring-1 focus:ring-[#7BB9E8]/50 outline-none transition-all duration-300 text-sm resize-none" placeholder="Tell us about your business, target audience, or specific requirements..." style="font-family:'DM Sans', sans-serif"></textarea>
            </div>

            <!-- SMS Consent / Terms compliance -->
            <div class="flex items-start gap-3 mt-4">
              <div class="flex items-center h-5">
                <input id="lead_agreeToTerms" type="checkbox" required class="h-4.5 w-4.5 rounded border-white/10 bg-white/5 text-[#7BB9E8] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#7BB9E8]" />
              </div>
              <label for="lead_agreeToTerms" class="text-xs text-white/50 leading-relaxed cursor-pointer select-none" style="font-family:'DM Sans', sans-serif">
                I agree to the <a href="/terms-of-service" target="_blank" class="text-[#7BB9E8] hover:underline">Terms of Service</a> & <a href="/privacy-policy" target="_blank" class="text-[#7BB9E8] hover:underline">Privacy Policy</a>, and authorize Yo Marketing Company to contact me via phone, email, or SMS messages regarding my request.
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="lead-submit-btn" class="w-full bg-gradient-to-r from-[#7BB9E8] via-[#6ba8d8] to-[#5fa6d6] text-black font-extrabold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#7BB9E8]/10 hover:shadow-xl hover:shadow-[#7BB9E8]/20 text-center text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer" style="font-family:'DM Sans', sans-serif">
              <span>Send Me a Custom Proposal</span>
              <svg id="submit-btn-spinner" class="hidden animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>

        </div>
      </div>

    </div>
  </div>
</section>
`;
