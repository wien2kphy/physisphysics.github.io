import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/blog/$slug")({
  component: Post,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} · PHYSIS Blog` },
      { property: "og:type", content: "article" },
    ],
  }),
});

function Post() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <article className="pt-32 pb-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-cyan mb-8 hover:gap-2.5 transition-all">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>
          {isLoading && <Loader label="Loading article" />}
          {data && (
            <>
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-cyan mb-4">
                <span>{data.category}</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(data.created_at).toLocaleDateString()}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">{data.title}</h1>
              {data.excerpt && <p className="mt-4 text-lg text-muted-foreground">{data.excerpt}</p>}
              {data.cover_url && (
                <img src={data.cover_url} alt={data.title}
                  className="mt-10 w-full aspect-[16/9] object-cover rounded-2xl border border-border" />
              )}
              <div className="mt-10 prose prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {data.content}
              </div>
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
