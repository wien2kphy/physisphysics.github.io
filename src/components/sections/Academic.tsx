import { GraduationCap, FlaskConical, Trophy, BookText, Lightbulb } from "lucide-react";
import { Reveal } from "../Reveal";

const items = [
  {
    icon: GraduationCap,
    label: "Qualifications",
    title: "PhD in Theoretical Physics",
    body: "Doctorate from Tezpur University, with postdoctoral work in condensed matter theory.",
  },
  {
    icon: FlaskConical,
    label: "Research Interests",
    title: "Quantum Mechanics · Statistical Physics",
    body: "Active research in many-body systems, ferromagnetic transitions, and computational modelling.",
  },
  {
    icon: Trophy,
    label: "Achievements",
    title: "National Faculty Excellence Award, 2022",
    body: "Recognised for contributions to undergraduate physics pedagogy across Northeast India.",
  },
  {
    icon: BookText,
    label: "Background",
    title: "MSc Gold Medalist · Gauhati University",
    body: "First-class honours throughout academic career; published 18+ peer-reviewed papers.",
  },
  {
    icon: Lightbulb,
    label: "Methodology",
    title: "Derive · Visualise · Solve",
    body: "A three-stage teaching method that builds intuition, geometry, and computational fluency.",
  },
];

export function Academic() {
  return (
    <section id="academic" className="relative py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Academic Profile</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">
              Scholarship rooted in research.
            </h2>
            <p className="mt-4 text-muted-foreground">
              PHYSIS is led by faculty whose academic depth informs every lecture, every
              derivation, and every interaction.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          <div className="space-y-12">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 80}>
                <div className={`relative grid sm:grid-cols-2 gap-8 items-center ${i % 2 ? "" : "sm:[&>*:first-child]:order-2"}`}>
                  <div className={`sm:text-right ${i % 2 ? "sm:text-left" : ""}`}>
                    <div className="text-xs font-mono uppercase tracking-widest text-cyan mb-2">
                      {it.label}
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">{it.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{it.body}</p>
                  </div>
                  <div className={`relative ${i % 2 ? "sm:flex sm:justify-start" : "sm:flex sm:justify-end"}`}>
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 sm:-translate-x-[calc(50%+0px)] top-6 h-3 w-3 rounded-full bg-cyan shadow-glow ring-4 ring-background" style={{ left: "calc(0px - 2rem)" }} />
                    <div className="glass rounded-2xl p-6 max-w-sm shadow-soft">
                      <div className="h-14 w-14 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                        <it.icon className="h-6 w-6 text-cyan" />
                      </div>
                      <div className="mt-4 font-mono text-xs text-muted-foreground">
                        0{i + 1} / 0{items.length}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
