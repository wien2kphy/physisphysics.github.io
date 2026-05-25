import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Download, FileText, BookMarked, X, ExternalLink, Loader2 } from "lucide-react";
import { Reveal } from "../Reveal";
import { supabase } from "@/integrations/supabase/client";
import { drivePreviewUrl, driveDownloadUrl } from "@/lib/drive";

type Note = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  drive_url: string | null;
  drive_file_id: string | null;
  created_at: string;
};

const fallback: Note[] = [
  { id: "f1", title: "HS First Year Physics", description: "Mechanics, Thermodynamics, Oscillations.", category: "HS", tags: ["Class XI"], drive_url: null, drive_file_id: null, created_at: "" },
  { id: "f2", title: "HS Second Year Physics", description: "Electromagnetism, Optics, Modern Physics.", category: "HS", tags: ["Class XII"], drive_url: null, drive_file_id: null, created_at: "" },
  { id: "f3", title: "FYUGP Semester Notes", description: "Sem I–IV: Mathematical methods, Quantum, Stat. Mech.", category: "FYUGP", tags: ["FYUGP"], drive_url: null, drive_file_id: null, created_at: "" },
  { id: "f4", title: "PYQ Solutions", description: "Last 10 years of board & university papers, fully worked.", category: "PYQ", tags: ["Archive"], drive_url: null, drive_file_id: null, created_at: "" },
  { id: "f5", title: "Important Derivations", description: "Step-by-step derivations curated for examinations.", category: "Theory", tags: ["Theory"], drive_url: null, drive_file_id: null, created_at: "" },
  { id: "f6", title: "Numerical Problems", description: "Tiered problem sets — foundational to advanced.", category: "Practice", tags: ["Practice"], drive_url: null, drive_file_id: null, created_at: "" },
];

export function Notes() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<Note | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["notes-public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      return (data as Note[] | null) ?? [];
    },
  });

  const notes = data && data.length > 0 ? data : fallback;
  const categories = useMemo(() => ["All", ...Array.from(new Set(notes.map((n) => n.category)))], [notes]);

  const filtered = useMemo(
    () =>
      notes.filter((n) => {
        const qq = q.toLowerCase();
        const matchQ =
          !qq ||
          n.title.toLowerCase().includes(qq) ||
          (n.description ?? "").toLowerCase().includes(qq) ||
          n.tags.some((t) => t.toLowerCase().includes(qq));
        const matchC = cat === "All" || n.category === cat;
        return matchQ && matchC;
      }),
    [notes, q, cat],
  );

  return (
    <section id="notes" className="relative py-28 sm:py-36 bg-navy-deep/40">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Academic Resources</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight max-w-xl">
                Notes & Study Materials
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                A continuously updated library of derivations, problem sets, past papers and
                semester-aligned reading — viewable inline via Google Drive.
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, topic, tag…"
                className="w-full pl-11 pr-4 py-3 rounded-xl glass border border-border focus:outline-none focus:ring-2 focus:ring-cyan/50 text-sm"
              />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition ${
                cat === c
                  ? "bg-cyan text-primary-foreground border-cyan"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-cyan" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((n, i) => (
              <Reveal key={n.id} delay={i * 50}>
                <article className="group relative h-full glass rounded-2xl p-6 hover:border-cyan/40 transition-all hover:-translate-y-1 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center group-hover:bg-cyan/20 transition">
                      <BookMarked className="h-5 w-5 text-cyan" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                      {n.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{n.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      {n.tags.slice(0, 2).join(" · ") || "PDF"}
                    </span>
                    {n.drive_url ? (
                      <button
                        onClick={() => setOpen(n)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan hover:gap-2.5 transition-all"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View PDF
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground/60">Coming soon</span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full glass rounded-2xl p-16 text-center text-muted-foreground">
                No notes match your search.
              </div>
            )}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 animate-fade-up" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-5xl h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan">{open.category}</div>
                <h3 className="font-display font-semibold">{open.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {open.drive_url && (
                  <a href={driveDownloadUrl(open.drive_url)} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan text-primary-foreground text-xs font-medium hover:shadow-glow transition">
                    <Download className="h-3.5 w-3.5" /> Download
                  </a>
                )}
                <button onClick={() => setOpen(null)} className="p-2 rounded-lg hover:bg-secondary">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              src={drivePreviewUrl(open.drive_url!)}
              className="flex-1 w-full bg-black"
              allow="autoplay"
              title={open.title}
            />
          </div>
        </div>
      )}
    </section>
  );
}
