import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Reveal } from "../Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-navy-deep/40">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Get in Touch</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Visit · Call · Write</h2>
            <p className="mt-4 text-muted-foreground">
              Admissions, doubts, or collaboration enquiries — we'd love to hear from you.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4 h-full">
              {[
                { icon: MapPin, title: "Address", body: "PHYSIS Institute, Beltola Tiniali, Guwahati 781028, Assam, India" },
                { icon: Phone, title: "Phone", body: "+91 98765 43210" },
                { icon: Mail, title: "Email", body: "admissions@physis.edu" },
                { icon: Clock, title: "Office Hours", body: "Mon–Sat · 9:00 AM – 7:00 PM" },
              ].map((c) => (
                <div key={c.title} className="glass rounded-2xl p-5 flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                    <c.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{c.title}</div>
                    <div className="mt-1 text-sm">{c.body}</div>
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-cyan text-primary-foreground py-4 font-medium shadow-glow hover:scale-[1.01] transition"
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={120}>
            <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  setTimeout(() => setSent(false), 3500);
                }}
                className="space-y-4 flex-1"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" placeholder="A. Borah" />
                  <Field label="Email" type="email" placeholder="you@example.com" />
                </div>
                <Field label="Subject" placeholder="Admissions enquiry" />
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your academic background and what you're looking for..."
                    className="mt-1.5 w-full rounded-xl bg-input/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan text-primary-foreground px-6 py-3 text-sm font-medium hover:shadow-glow transition"
                >
                  {sent ? "Message Sent ✓" : (<><Send className="h-4 w-4" /> Send Message</>)}
                </button>
              </form>

              <div className="mt-8 rounded-xl overflow-hidden border border-border aspect-[16/9]">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps?q=Guwahati,Assam&output=embed"
                  className="w-full h-full grayscale-[40%] contrast-110"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-input/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
      />
    </div>
  );
}
