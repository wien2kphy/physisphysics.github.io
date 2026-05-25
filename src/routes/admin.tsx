import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, FileText, Video, Newspaper, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { extractDriveId } from "@/lib/drive";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin · PHYSIS" }, { name: "robots", content: "noindex" }] }),
});

type Tab = "notes" | "lectures" | "blog";

function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("notes");

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  if (loading || !user) return <main className="min-h-screen bg-background"><Loader /></main>;
  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background grid-bg">
        <Navbar />
        <div className="pt-40 text-center px-4">
          <ShieldCheck className="mx-auto h-12 w-12 text-cyan mb-4" />
          <h1 className="font-display text-3xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-muted-foreground">Your account does not have administrator privileges.</p>
          <Link to="/dashboard" className="inline-block mt-6 px-4 py-2 rounded-lg bg-cyan text-primary-foreground text-sm">
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Control Center</div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold">Admin Panel</h1>
            <p className="mt-3 text-muted-foreground">Publish notes, lectures, and articles to the institute.</p>
          </div>

          <div className="flex gap-1 p-1 rounded-lg bg-secondary mb-8 w-fit">
            {([
              ["notes", FileText, "Notes"],
              ["lectures", Video, "Lectures"],
              ["blog", Newspaper, "Blog"],
            ] as const).map(([k, Icon, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition ${
                  tab === k ? "bg-cyan text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          {tab === "notes" && <NotesAdmin />}
          {tab === "lectures" && <LecturesAdmin />}
          {tab === "blog" && <BlogAdmin />}
        </div>
      </section>
    </main>
  );
}

function NotesAdmin() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", description: "", category: "HS", tags: "", drive_url: "" });
  const { data } = useQuery({
    queryKey: ["admin-notes"],
    queryFn: async () => (await supabase.from("notes").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const create = useMutation({
    mutationFn: async () => {
      if (!form.title || !form.drive_url) throw new Error("Title and Drive URL required");
      const drive_file_id = extractDriveId(form.drive_url);
      const { error } = await supabase.from("notes").insert({
        title: form.title,
        description: form.description,
        category: form.category,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        drive_url: form.drive_url,
        drive_file_id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Note published");
      setForm({ title: "", description: "", category: "HS", tags: "", drive_url: "" });
      qc.invalidateQueries({ queryKey: ["admin-notes"] });
      qc.invalidateQueries({ queryKey: ["notes-public"] });
    },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-notes"] });
      qc.invalidateQueries({ queryKey: ["notes-public"] });
    },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form
        onSubmit={(e) => { e.preventDefault(); create.mutate(); }}
        className="lg:col-span-2 glass-strong rounded-2xl p-6 h-fit space-y-3"
      >
        <h3 className="font-display text-lg font-semibold mb-2">New Note</h3>
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
        <Select label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })}
          options={["HS", "FYUGP", "PYQ", "Theory", "Practice"]} />
        <Input label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <Input label="Google Drive share URL" value={form.drive_url} onChange={(v) => setForm({ ...form, drive_url: v })}
          hint="Make sure the file is set to 'Anyone with the link'" />
        <button disabled={create.isPending}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan text-primary-foreground font-medium hover:shadow-glow transition disabled:opacity-60">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Publish Note
        </button>
      </form>
      <div className="lg:col-span-3 space-y-3">
        {data?.length === 0 && <Empty label="No notes yet" />}
        {data?.map((n) => (
          <div key={n.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan">{n.category}</div>
              <h4 className="font-display font-semibold">{n.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.description}</p>
            </div>
            <button onClick={() => del.mutate(n.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LecturesAdmin() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", description: "", topic: "Mechanics", youtube_id: "", duration: "" });
  const { data } = useQuery({
    queryKey: ["admin-lectures"],
    queryFn: async () => (await supabase.from("lectures").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const create = useMutation({
    mutationFn: async () => {
      let id = form.youtube_id;
      const m = id.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
      if (m) id = m[1];
      if (!form.title || !id) throw new Error("Title and YouTube ID/URL required");
      const { error } = await supabase.from("lectures").insert({ ...form, youtube_id: id });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lecture added");
      setForm({ title: "", description: "", topic: "Mechanics", youtube_id: "", duration: "" });
      qc.invalidateQueries({ queryKey: ["admin-lectures"] });
      qc.invalidateQueries({ queryKey: ["lectures-public"] });
    },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("lectures").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-lectures"] }); qc.invalidateQueries({ queryKey: ["lectures-public"] }); },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form onSubmit={(e) => { e.preventDefault(); create.mutate(); }} className="lg:col-span-2 glass-strong rounded-2xl p-6 h-fit space-y-3">
        <h3 className="font-display text-lg font-semibold mb-2">New Lecture</h3>
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
        <Select label="Topic" value={form.topic} onChange={(v) => setForm({ ...form, topic: v })}
          options={["Mechanics", "Electromagnetism", "Optics", "Modern Physics", "Thermodynamics", "Quantum"]} />
        <Input label="YouTube URL or ID" value={form.youtube_id} onChange={(v) => setForm({ ...form, youtube_id: v })} />
        <Input label="Duration (e.g. 42:15)" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        <button disabled={create.isPending} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan text-primary-foreground font-medium hover:shadow-glow transition disabled:opacity-60">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Publish Lecture
        </button>
      </form>
      <div className="lg:col-span-3 space-y-3">
        {data?.length === 0 && <Empty label="No lectures yet" />}
        {data?.map((n) => (
          <div key={n.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan">{n.topic}</div>
              <h4 className="font-display font-semibold">{n.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{n.duration}</p>
            </div>
            <button onClick={() => del.mutate(n.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogAdmin() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ slug: "", title: "", excerpt: "", content: "", cover_url: "", category: "News" });
  const { data } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => (await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const create = useMutation({
    mutationFn: async () => {
      if (!form.title || !form.content) throw new Error("Title and content required");
      const slug = (form.slug || form.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const { error } = await supabase.from("blog_posts").insert({ ...form, slug });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post published");
      setForm({ slug: "", title: "", excerpt: "", content: "", cover_url: "", category: "News" });
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      qc.invalidateQueries({ queryKey: ["blog-public"] });
    },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("blog_posts").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-blog"] }); qc.invalidateQueries({ queryKey: ["blog-public"] }); },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form onSubmit={(e) => { e.preventDefault(); create.mutate(); }} className="lg:col-span-2 glass-strong rounded-2xl p-6 h-fit space-y-3">
        <h3 className="font-display text-lg font-semibold mb-2">New Post</h3>
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Input label="Slug (optional)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
        <Select label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })}
          options={["News", "Announcement", "Research", "Tutorial"]} />
        <Input label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} />
        <Input label="Cover image URL" value={form.cover_url} onChange={(v) => setForm({ ...form, cover_url: v })} />
        <label className="block">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Content (markdown ok)</span>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={8} className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-secondary border border-border focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/30 text-sm font-mono" />
        </label>
        <button disabled={create.isPending} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan text-primary-foreground font-medium hover:shadow-glow transition disabled:opacity-60">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Publish Post
        </button>
      </form>
      <div className="lg:col-span-3 space-y-3">
        {data?.length === 0 && <Empty label="No posts yet" />}
        {data?.map((n) => (
          <div key={n.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan">{n.category}</div>
              <h4 className="font-display font-semibold">{n.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.excerpt}</p>
            </div>
            <button onClick={() => del.mutate(n.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-secondary border border-border focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/30 text-sm" />
      {hint && <span className="text-[10px] text-muted-foreground mt-1 block">{hint}</span>}
    </label>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full px-3 py-2.5 rounded-lg bg-secondary border border-border focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/30 text-sm">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Empty({ label }: { label: string }) {
  return <div className="glass rounded-xl p-10 text-center text-sm text-muted-foreground">{label}</div>;
}
