import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, Atom, ChevronDown, LayoutDashboard, ShieldCheck, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

type NavItem = {
  label: string;
  href?: string;
  to?: string;
  children?: { label: string; href?: string; to?: string; desc?: string }[];
};

const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  {
    label: "Academics",
    children: [
      { label: "HS Notes", href: "/#notes", desc: "Class XI–XII curriculum aligned material" },
      { label: "FYUGP Notes", href: "/#notes", desc: "Semester-wise undergraduate resources" },
      { label: "PYQ Archive", href: "/#notes", desc: "10 years of solved papers" },
      { label: "Derivations", href: "/#notes", desc: "Step-by-step theoretical proofs" },
    ],
  },
  {
    label: "Learning",
    children: [
      { label: "Video Lectures", href: "/#lectures", desc: "Topic-wise streaming library" },
      { label: "Features", href: "/#features", desc: "How PHYSIS teaches" },
      { label: "Academic Profile", href: "/#academic", desc: "Faculty & methodology" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${scrolled ? "glass-strong shadow-soft" : ""}`}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan/30 blur-md group-hover:bg-cyan/60 transition" />
              <Atom className="relative h-7 w-7 text-cyan" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-wider">PHYSIS</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                Pathway to Success
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
            {nav.map((l) =>
              l.children ? (
                <div key={l.label} className="relative" onMouseEnter={() => setOpenMenu(l.label)}>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition">
                    {l.label} <ChevronDown className="h-3 w-3" />
                  </button>
                  {openMenu === l.label && (
                    <div className="absolute top-full left-0 pt-2 w-80">
                      <div className="glass-strong rounded-xl p-2 shadow-elegant animate-fade-up">
                        {l.children.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            className="block px-3 py-2.5 rounded-lg hover:bg-cyan/10 transition group"
                          >
                            <div className="text-sm font-medium group-hover:text-cyan">{c.label}</div>
                            {c.desc && <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : l.to ? (
                <Link
                  key={l.label}
                  to={l.to}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-cyan transition-transform group-hover:scale-x-100 origin-left" />
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-cyan transition-transform group-hover:scale-x-100 origin-left" />
                </a>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLight((v) => !v)} className="p-2 rounded-lg hover:bg-secondary transition" aria-label="Toggle theme">
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/dashboard" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm hover:bg-secondary transition">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-cyan hover:bg-cyan/10 transition">
                    <ShieldCheck className="h-4 w-4" /> Admin
                  </Link>
                )}
                <button onClick={() => signOut()} className="p-2 rounded-lg hover:bg-secondary" aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan text-primary-foreground text-sm font-medium hover:shadow-glow transition-all"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}

            <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-up space-y-1">
            {nav.map((l) =>
              l.children ? (
                <div key={l.label}>
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan">{l.label}</div>
                  {l.children.map((c) => (
                    <a key={c.label} href={c.href} onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                      {c.label}
                    </a>
                  ))}
                </div>
              ) : l.to ? (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  {l.label}
                </a>
              ),
            )}
            <div className="pt-2 mt-2 border-t border-border">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm">Dashboard</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-cyan">Admin</Link>}
                  <button onClick={() => { signOut(); setOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm">Sign out</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-cyan">Sign In / Sign Up</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
