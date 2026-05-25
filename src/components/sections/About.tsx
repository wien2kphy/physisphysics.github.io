import { Target, Eye, Award, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";
import { Counter } from "../Counter";
import faculty from "@/assets/faculty.jpg";

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-4">
              — About the Institute
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Engineering minds for the <span className="text-gradient-cyan">frontiers of physics</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              PHYSIS is built on a singular conviction — that conceptual clarity, rigorous
              problem solving, and disciplined practice produce scholars capable of leading
              the next generation of scientific inquiry.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-cyan/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl shadow-elegant border border-border">
                <img src={faculty} alt="Lead faculty" className="w-full aspect-[4/5] object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                  <div className="text-xs font-mono uppercase tracking-widest text-cyan">Founding Faculty</div>
                  <div className="mt-1 font-display text-2xl font-semibold">Dr. A. Mahanta</div>
                  <div className="text-sm text-muted-foreground">PhD, Theoretical Physics · 18+ years teaching</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  body: "To cultivate disciplined, curious, and analytically rigorous students prepared for HS, FYUGP and competitive examinations in physics.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  body: "To become a reference institution for concept-based physics learning — where pedagogy meets research and every student finds their pathway.",
                },
                {
                  icon: Award,
                  title: "Academic Excellence",
                  body: "Curriculum aligned with university syllabi, supplemented with derivations, PYQ archives, numerical practice, and weekly conceptual reviews.",
                },
                {
                  icon: Sparkles,
                  title: "Concept-First Approach",
                  body: "We resist memorisation. Every formula is derived; every law is contextualised; every numerical is reasoned from first principles.",
                },
              ].map((b) => (
                <div key={b.title} className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-11 w-11 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                      <b.icon className="h-5 w-5 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: 2400, s: "+", l: "Students Taught" },
              { v: 150, s: "+", l: "Recorded Lectures" },
              { v: 98, s: "%", l: "Board Pass Rate" },
              { v: 18, s: "+", l: "Years of Pedagogy" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6 text-center">
                <div className="font-display text-4xl sm:text-5xl font-semibold text-gradient-cyan">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
