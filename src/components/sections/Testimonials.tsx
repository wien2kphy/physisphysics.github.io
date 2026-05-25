import { Quote, Star } from "lucide-react";
import { Reveal } from "../Reveal";

const items = [
  {
    name: "Riya Borah",
    role: "HS 2nd Year · 96% in Physics",
    body: "The way derivations are explained at PHYSIS made me actually understand physics for the first time. I scored 96 in boards — but more importantly, I now love the subject.",
  },
  {
    name: "Arnab Saikia",
    role: "FYUGP Sem III · Gauhati University",
    body: "From Maxwell's equations to statistical mechanics, every concept was rebuilt from scratch. The PYQ discussions alone are worth the entire course.",
  },
  {
    name: "Priyanka Das",
    role: "HS 1st Year",
    body: "Small batch, personal attention, and notes that are honestly better than any textbook I've used. The faculty answers doubts as if you're the only student in the room.",
  },
  {
    name: "Manash Goswami",
    role: "Cleared JEE Advanced 2024",
    body: "Concept-first teaching at PHYSIS gave me the intuition I needed for JEE. The mock test reviews were transformative.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Voices of Students</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Trusted by scholars</h2>
            <p className="mt-4 text-muted-foreground">
              Real stories from students who walked into PHYSIS and walked out as physicists.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <article className="glass rounded-2xl p-8 h-full relative overflow-hidden group hover:border-cyan/40 transition-all">
                <Quote className="absolute top-6 right-6 h-16 w-16 text-cyan/10 group-hover:text-cyan/20 transition" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-cyan text-cyan" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">"{t.body}"</p>
                <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan to-navy flex items-center justify-center font-display font-semibold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
