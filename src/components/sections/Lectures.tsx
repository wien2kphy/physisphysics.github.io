import { useState } from "react";
import { Play, ListVideo, Filter } from "lucide-react";
import { Reveal } from "../Reveal";

const topics = ["All", "Mechanics", "Electrodynamics", "Optics", "Modern Physics", "Quantum"];

const videos = [
  { id: "abc1", title: "Newton's Laws — A Conceptual Rebuild", topic: "Mechanics", duration: "42:18", views: "12.4K", thumb: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" },
  { id: "abc2", title: "Maxwell's Equations Derived From Scratch", topic: "Electrodynamics", duration: "58:02", views: "8.2K", thumb: "https://images.unsplash.com/photo-1636953099414-bd4d54bbeb50?w=800&q=80" },
  { id: "abc3", title: "Wave-Particle Duality Explained", topic: "Quantum", duration: "36:45", views: "21.7K", thumb: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80" },
  { id: "abc4", title: "Diffraction Patterns & Single Slit", topic: "Optics", duration: "28:11", views: "5.6K", thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
  { id: "abc5", title: "Photoelectric Effect — Full Derivation", topic: "Modern Physics", duration: "44:30", views: "9.1K", thumb: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80" },
  { id: "abc6", title: "Rotational Dynamics Master Class", topic: "Mechanics", duration: "1:12:04", views: "14.3K", thumb: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80" },
];

export function Lectures() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? videos : videos.filter((v) => v.topic === active);

  return (
    <section id="lectures" className="relative py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">
                — Video Lectures
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold">Watch & Learn</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Curated playlists, master classes, and weekly conceptual deep-dives — published
                on our YouTube channel.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      active === t
                        ? "bg-cyan text-primary-foreground"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <a
                href={`https://www.youtube.com/@physis`}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-2xl overflow-hidden glass hover:border-cyan/40 transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-cyan/90 backdrop-blur flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur text-[10px] font-mono">
                    {v.duration}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">
                    {v.topic}
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-cyan transition-colors">
                    {v.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ListVideo className="h-3.5 w-3.5" />
                      {v.views} views
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/@physis"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-secondary/60 text-sm font-medium transition"
            >
              View full YouTube playlist →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
