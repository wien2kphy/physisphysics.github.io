import { ArrowRight, BookOpen, PlayCircle, Mail } from "lucide-react";
import heroBg from "@/assets/hero-physics.jpg";
import { ParticleField } from "../ParticleField";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.85 }} />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-cyan animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          Premier Physics Institute · Est. 2018
        </div>

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter animate-fade-up">
          <span className="text-gradient">PHYSIS</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-silver font-light tracking-wide animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Pathway to Success
        </p>

        <p className="mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          A research-oriented coaching institute pioneering concept-based physics education
          for Higher Secondary and FYUGP scholars across India.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#notes"
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
          >
            <BookOpen className="h-4 w-4" />
            Explore Notes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#lectures"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-medium hover:bg-secondary/60 transition-all"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Lectures
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl w-full animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { v: "98%", l: "Pass Rate" },
            { v: "2.4K+", l: "Students Mentored" },
            { v: "150+", l: "Video Lectures" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient-cyan">{s.v}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
      </div>
    </section>
  );
}
