'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitContactMessage } from '@/app/actions';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/portfolio/scroll-reveal';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = (await submitContactMessage(data)) as any;
      if (res.success) {
        toast.success('Message sent successfully! I will get back to you soon.');
        reset();
      } else {
        toast.error(res.error || 'Failed to send message. Please try again.');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/10 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal yOffset={30}>
          <div className="mb-16">
            <span className="text-sm font-black uppercase tracking-widest text-brutalist-pink font-space-grotesk block mb-2">
              Get in touch
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase font-syne tracking-tight">
              Contact Me
            </h2>
          </div>
        </ScrollReveal>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Column */}
          <ScrollReveal yOffset={45} delay={0.15} className="lg:col-span-5">
            <div className="font-space-grotesk">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 font-syne">
                Open For Opportunities
              </h3>
              <p className="text-md font-bold text-foreground/80 leading-relaxed mb-8">
                Have an idea, a product to build, or an engineering challenge? Feel free to reach out. I'm always happy to connect.
              </p>
              <div className="flex flex-col gap-5 font-bold text-sm">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brutalist-pink block mb-1">Email</span>
                  <a href="mailto:julian.dsatrio@gmail.com" className="text-lg underline hover:text-brutalist-blue dark:hover:text-brutalist-yellow transition-colors duration-200">
                    julian.dsatrio@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-brutalist-pink block mb-1">Location</span>
                  <span className="text-lg">Bandung, Indonesia</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Column */}
          <ScrollReveal yOffset={45} delay={0.25} className="lg:col-span-7 w-full">
            <div className="bg-background brutalist-border rounded-2xl p-6 md:p-8 brutalist-shadow-black">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-black uppercase tracking-wider font-space-grotesk">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-yellow/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground"
                    />
                    {errors.name && (
                      <span className="text-xs font-black uppercase tracking-wider text-brutalist-pink font-space-grotesk">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-black uppercase tracking-wider font-space-grotesk">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your.email@domain.com"
                      className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-blue/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground"
                    />
                    {errors.email && (
                      <span className="text-xs font-black uppercase tracking-wider text-brutalist-pink font-space-grotesk">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-black uppercase tracking-wider font-space-grotesk">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    placeholder="Project Inquiry / Job Offer"
                    className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-orange/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-black uppercase tracking-wider font-space-grotesk">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    placeholder="Describe your project, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl brutalist-border bg-background focus:bg-brutalist-pink/10 focus:outline-none font-space-grotesk font-bold text-sm text-foreground resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs font-black uppercase tracking-wider text-brutalist-pink font-space-grotesk">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-brutalist-yellow text-brutalist-dark brutalist-border font-syne font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#0f0f0f] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0f0f0f] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                  data-cursor="pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
