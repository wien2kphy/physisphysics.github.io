import { Reveal } from "../Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const items = [
  { src: g1, label: "Classrooms", span: "lg:col-span-2 lg:row-span-2" },
  { src: g2, label: "Laboratory", span: "" },
  { src: g3, label: "Seminars", span: "" },
  { src: g4, label: "Library", span: "lg:col-span-2" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-28 sm:py-36 bg-navy-deep/40">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-3">— Campus Life</div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Inside PHYSIS</h2>
            <p className="mt-4 text-muted-foreground">
              Classrooms, laboratories, seminars and quiet hours of focused study.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80} className={it.span}>
              <div className="relative h-full w-full overflow-hidden rounded-2xl group cursor-pointer">
                <img
                  src={it.src}
                  alt={it.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan">PHOTO 0{i + 1}</div>
                  <div className="font-display text-xl font-semibold text-white">{it.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
