import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Video, Newspaper, ShieldCheck, LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Student Dashboard · PHYSIS" },
      { name: "description", content: "Your personalized PHYSIS learning hub." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Dashboard() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  const { data: stats } = useQuery({
    queryKey: ["dash-stats"],
    enabled: !!user,
    queryFn: async () => {
      const [n, l, b] = await Promise.all([
        supabase.from("notes").select("id", { count: "exact", head: true }),
        supabase.from("lectures").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      ]);
      return { notes: n.count ?? 0, lectures: l.count ?? 0, posts: b.count ?? 0 };
    },
  });

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-background">
        <Loader label="Authenticating" />
      </main>
    );
  }

  const tiles = [
    { icon: BookOpen, label: "Notes", value: stats?.notes ?? "—", href: "/#notes", color: "cyan" },
    { icon: Video, label: "Lectures", value: stats?.lectures ?? "—", href: "/#lectures", color: "cyan" },
    { icon: Newspaper, label: "Blog Posts", value: stats?.posts ?? "—", href: "/blog", color: "cyan" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-start justify-between gap-6 flex-wrap mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">
                — Student Portal
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold">
                Welcome back<span className="text-cyan">.</span>
              </h1>
              <p className="mt-3 text-muted-foreground max-w-xl">{user.email}</p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan/40 text-cyan hover:bg-cyan/10 transition text-sm"
                >
                  <ShieldCheck className="h-4 w-4" /> Admin Panel
                </Link>
              )}
              <button
                onClick={async () => {
                  await signOut();
                  nav({ to: "/" });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition text-sm"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {tiles.map((t) => (
              <Link
                key={t.label}
                to={t.href}
                className="group glass rounded-2xl p-6 hover:border-cyan/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
                    <t.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <Sparkles className="h-4 w-4 text-muted-foreground group-hover:text-cyan transition" />
                </div>
                <div className="font-display text-4xl font-semibold">{t.value}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {t.label} available
                </div>
              </Link>
            ))}
          </div>

          <div className="glass-strong rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold mb-2">Continue learning</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Jump back into your study material or browse the latest lectures.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" hash="notes" className="px-4 py-2 rounded-lg bg-cyan text-primary-foreground text-sm font-medium hover:shadow-glow transition">
                Browse Notes
              </Link>
              <Link to="/" hash="lectures" className="px-4 py-2 rounded-lg border border-border hover:bg-secondary text-sm transition">
                Watch Lectures
              </Link>
              <Link to="/blog" className="px-4 py-2 rounded-lg border border-border hover:bg-secondary text-sm transition">
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
