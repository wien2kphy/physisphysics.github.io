import { Atom, Youtube, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy-deep">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Atom className="h-7 w-7 text-cyan" strokeWidth={1.5} />
              <div>
                <div className="font-display text-xl font-bold tracking-wider">PHYSIS</div>
                <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">From Concept to Confidence</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              A research-oriented physics coaching institute committed to concept-based
              learning for HS and FYUGP scholars across India.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Youtube, Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:bg-cyan hover:text-primary-foreground transition-colors"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan mb-4">Quick Links</div>
            <ul className="space-y-2.5 text-sm">
              {["About", "Notes", "Lectures", "Features", "Gallery"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan mb-4">Resources</div>
            <ul className="space-y-2.5 text-sm">
              {["HS Physics", "FYUGP Notes", "PYQ Archive", "Derivations", "Practice Sets"].map((l) => (
                <li key={l}>
                  <a href="#notes" className="text-muted-foreground hover:text-foreground transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} PHYSIS Institute. All rights reserved.</div>
          <div className="font-mono tracking-widest uppercase">Engineered for academic excellence</div>
        </div>
      </div>
    </footer>
  );
}
