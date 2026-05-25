import { Atom } from "lucide-react";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-2 border-cyan/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-spin" />
        <div className="absolute inset-2 rounded-full border border-cyan/30 animate-pulse" />
        <Atom className="absolute inset-0 m-auto h-8 w-8 text-cyan animate-pulse" strokeWidth={1.5} />
      </div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
        <span className="inline-block w-6 text-left">
          <span className="animate-pulse">...</span>
        </span>
      </div>
    </div>
  );
}
