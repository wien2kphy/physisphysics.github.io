import { Upload, Lightbulb, MessageSquare, Brain, GraduationCap, Users } from "lucide-react";
import { Reveal } from "../Reveal";

const features = [
  { icon: Upload, title: "Regular Notes Upload", body: "Weekly fresh study material aligned with the current syllabus and pace." },
  { icon: Lightbulb, title: "Concept-Based Teaching", body: "Every topic taught from first principles — never reduced to memorisation." },
  { icon: MessageSquare, title: "PYQ Discussions", body: "Live walkthroughs of previous year papers with reasoning-first explanations." },
  { icon: Brain, title: "Advanced Problem Solving", body: "Tiered problem sets that build from foundational to olympiad-grade difficulty." },
  { icon: GraduationCap, title: "Exam Preparation", body: "Structured revision modules, mock tests, and personalised performance reviews." },
  { icon: Users, title: "Interactive Learning", body: "Small batches, doubt-clearing forums, and one-on-one academic mentorship." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36 bg-navy-deep/40">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— What We Offer</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">
              A complete pedagogical ecosystem
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six pillars that define how we teach, mentor, and prepare every scholar at PHYSIS.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="group h-full bg-card p-8 hover:bg-secondary/50 transition-all">
                <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-5 group-hover:bg-cyan/20 group-hover:shadow-glow transition-all">
                  <f.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                <div className="mt-6 text-xs font-mono text-muted-foreground/60">
                  0{i + 1} / 06
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
