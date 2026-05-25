import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, ArrowUpRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Loader } from "@/components/Loader";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog & News · PHYSIS" },
      { name: "description", content: "Latest physics insights, announcements and research notes from PHYSIS faculty." },
      { property: "og:title", content: "Blog & News · PHYSIS" },
      { property: "og:description", content: "Insights, announcements, and research notes from PHYSIS." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function Blog() {
  const { data, isLoading } = useQuery({
    queryKey: ["blog-public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Journal</div>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold">Blog & News</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Research notes, examination strategy, and academic announcements from the PHYSIS faculty.
            </p>
          </Reveal>

          <div className="mt-16">
            {isLoading && <Loader label="Loading posts" />}
            {!isLoading && data?.length === 0 && (
              <div className="glass rounded-2xl p-16 text-center">
                <Newspaper className="mx-auto h-10 w-10 text-cyan mb-4" />
                <p className="text-muted-foreground">No posts published yet. Check back soon.</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {data?.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block glass rounded-2xl overflow-hidden hover:border-cyan/40 transition-all hover:-translate-y-1"
                  >
                    {p.cover_url && (
                      <div className="aspect-[16/9] overflow-hidden bg-secondary">
                        <img src={p.cover_url} alt={p.title} loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-cyan mb-3">
                        <span>{p.category}</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(p.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-semibold group-hover:text-cyan transition">{p.title}</h2>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-cyan group-hover:gap-2.5 transition-all">
                        Read article <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
