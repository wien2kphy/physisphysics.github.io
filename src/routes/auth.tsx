import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Atom, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign In · PHYSIS" },
      { name: "description", content: "Sign in or create your PHYSIS student account." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
  fullName: z.string().trim().min(1).max(100).optional(),
});

function AuthPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav({ to: "/dashboard" });
  }, [user, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, fullName: mode === "signup" ? fullName : undefined });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created. Redirecting…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background grid-bg px-4 py-20">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-60 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <Atom className="h-8 w-8 text-cyan group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-wider">PHYSIS</span>
            <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Pathway to Success</span>
          </div>
        </Link>

        <div className="glass-strong rounded-2xl p-8 shadow-elegant">
          <div className="flex gap-1 p-1 rounded-lg bg-secondary mb-6">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm rounded-md transition ${
                  mode === m ? "bg-cyan text-primary-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {m === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <Field icon={UserIcon} label="Full name" value={fullName} onChange={setFullName} type="text" />
            )}
            <Field icon={Mail} label="Email" value={email} onChange={setEmail} type="email" />
            <Field icon={Lock} label="Password" value={password} onChange={setPassword} type="password" />
            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan text-primary-foreground font-medium hover:shadow-glow transition-all disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            By continuing you agree to PHYSIS's academic conduct policy.
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type,
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5 relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-secondary border border-border focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/30 text-sm"
        />
      </div>
    </label>
  );
}
