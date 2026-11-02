'use client';

import { Mail, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/portfolio/icons';
import ScrollReveal from '@/components/portfolio/scroll-reveal';
import SpotlightCard from '@/components/portfolio/spotlight-card';

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 sm:py-32 md:py-36 relative overflow-hidden">
      {/* Background Kinetic Typography Parallax Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 inset-x-0 overflow-hidden pointer-events-none -z-10 select-none opacity-[0.03] dark:opacity-[0.04]"
      >
        <div className="whitespace-nowrap font-black font-syne text-[16vw] leading-none uppercase tracking-tighter">
          CONNECT • COLLABORATE • PARTNERSHIP • INQUIRY
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <ScrollReveal yOffset={25}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne tracking-tight text-foreground">
              Let's Build Something Together
            </h2>
            <p className="mt-3 text-sm sm:text-base font-space-grotesk text-foreground/60 leading-relaxed max-w-xl">
              Have an inquiry or project in mind? Reach out directly through your preferred channel.
            </p>
          </div>
        </ScrollReveal>

        {/* Single Minimalist Direct Contact Card */}
        <ScrollReveal yOffset={35} delay={0.1}>
          <div className="w-full max-w-xl mx-auto">
            <SpotlightCard
              enableTilt={true}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="p-6 sm:p-9 md:p-10 rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300"
            >
              {/* Card Title */}
              <div className="mb-6 text-left">
                <h3 className="text-2xl sm:text-3xl font-bold font-syne text-foreground tracking-tight">
                  Direct Contact
                </h3>
              </div>

              {/* Interactive Uniform Contact Channel Links */}
              <div className="space-y-3">
                {/* Email Channel */}
                <a
                  href="mailto:julian.dsatrio@gmail.com"
                  className="group flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white/[0.08] group-hover:text-foreground transition-all">
                      <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-space-grotesk text-foreground/40 tracking-wider block font-semibold mb-0.5">
                        Email Message
                      </span>
                      <span className="text-sm sm:text-base font-bold font-space-grotesk text-foreground/90 group-hover:text-foreground transition-colors">
                        julian.dsatrio@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-foreground/40 group-hover:text-foreground group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>

                {/* Instagram Channel */}
                <a
                  href="https://instagram.com/juliandwii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white/[0.08] group-hover:text-foreground transition-all">
                      <InstagramIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-space-grotesk text-foreground/40 tracking-wider block font-semibold mb-0.5">
                        Instagram DM
                      </span>
                      <span className="text-sm sm:text-base font-bold font-space-grotesk text-foreground/90 group-hover:text-foreground transition-colors">
                        @juliandwii
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-foreground/40 group-hover:text-foreground group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>

                {/* LinkedIn Channel */}
                <a
                  href="https://linkedin.com/in/juliandwi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.16] transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-white/[0.08] group-hover:text-foreground transition-all">
                      <LinkedinIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-space-grotesk text-foreground/40 tracking-wider block font-semibold mb-0.5">
                        LinkedIn Message
                      </span>
                      <span className="text-sm sm:text-base font-bold font-space-grotesk text-foreground/90 group-hover:text-foreground transition-colors">
                        Julian Dwi Satrio
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-foreground/40 group-hover:text-foreground group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
