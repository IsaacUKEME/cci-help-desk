import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PrayerRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  request: string;
  is_urgent: boolean;
  status: "new" | "praying" | "answered";
  pastoral_notes: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "text-orange border-orange/40 bg-orange/10",
  praying: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  answered: "text-green-400 border-green-400/40 bg-green-400/10",
};

const statusLabels: Record<string, string> = {
  new: "🔔 New",
  praying: "🙏 Praying",
  answered: "✅ Answered",
};

export default function PastoralDashboard() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "praying" | "answered">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("is_urgent", { ascending: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data as PrayerRequest[]);
      const initialNotes: Record<string, string> = {};
      data.forEach((r: PrayerRequest) => {
        initialNotes[r.id] = r.pastoral_notes || "";
      });
      setNotes(initialNotes);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await supabase
      .from("prayer_requests")
      .update({ status, pastoral_notes: notes[id] || null })
      .eq("id", id);
    await fetchRequests();
    setUpdatingId(null);
  };

  const saveNotes = async (id: string) => {
    setUpdatingId(id);
    await supabase
      .from("prayer_requests")
      .update({ pastoral_notes: notes[id] || null })
      .eq("id", id);
    await fetchRequests();
    setUpdatingId(null);
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    praying: requests.filter((r) => r.status === "praying").length,
    answered: requests.filter((r) => r.status === "answered").length,
  };

  return (
    <section id="pastoral" className="section-padding bg-church-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-16 bg-orange" />
          <span className="font-display text-orange text-xs tracking-[0.3em]">PASTORAL TEAM</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground">
              PRAYER REQUEST <span className="text-gradient-orange">DASHBOARD</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Manage and respond to submitted prayer requests
            </p>
          </div>
          <button
            onClick={fetchRequests}
            className="font-display text-xs tracking-widest border border-border text-muted-foreground px-4 py-2 rounded-sm hover:border-orange hover:text-orange transition-colors self-start"
          >
            ↻ REFRESH
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(["all", "new", "praying", "answered"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg p-4 border text-left transition-all ${
                filter === s
                  ? "border-orange bg-orange/10"
                  : "border-border bg-card hover:border-orange/40"
              }`}
            >
              <p className="font-display text-2xl font-bold text-foreground">{counts[s]}</p>
              <p className={`font-display text-xs tracking-widest mt-1 capitalize ${filter === s ? "text-orange" : "text-muted-foreground"}`}>
                {s === "all" ? "Total" : statusLabels[s]}
              </p>
            </button>
          ))}
        </div>

        {/* Request list */}
        {loading ? (
          <div className="text-center py-20">
            <span className="w-8 h-8 border-2 border-orange/30 border-t-orange rounded-full animate-spin inline-block" />
            <p className="text-muted-foreground font-body text-sm mt-4">Loading requests...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-border rounded-xl">
            <p className="text-5xl mb-4">🙏</p>
            <p className="text-muted-foreground font-body">No {filter === "all" ? "" : filter} requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((req) => (
              <div
                key={req.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all ${
                  req.is_urgent ? "border-orange/50" : "border-border"
                }`}
              >
                {/* Row summary */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {req.is_urgent && (
                      <span className="shrink-0 text-orange text-lg mt-0.5" title="Urgent">🚨</span>
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-display text-sm font-bold text-foreground">{req.name}</span>
                        <span className="font-display text-xs text-muted-foreground">·</span>
                        <span className="font-display text-xs text-orange tracking-wider">{req.category}</span>
                      </div>
                      <p className="text-muted-foreground text-sm font-body truncate">{req.request}</p>
                      <p className="text-muted-foreground text-xs font-body mt-1">
                        {new Date(req.created_at).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`font-display text-xs tracking-widest px-3 py-1 rounded-full border ${statusColors[req.status]}`}>
                      {statusLabels[req.status]}
                    </span>
                    <svg
                      className={`w-4 h-4 text-muted-foreground transition-transform ${expandedId === req.id ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded detail */}
                {expandedId === req.id && (
                  <div className="border-t border-border px-5 pb-5 pt-4 space-y-4">
                    {/* Full request */}
                    <div>
                      <p className="font-display text-xs tracking-widest text-muted-foreground mb-2">PRAYER REQUEST</p>
                      <p className="text-foreground font-body text-sm leading-relaxed bg-church-surface rounded-lg px-4 py-3">
                        {req.request}
                      </p>
                    </div>

                    {/* Contact info */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">EMAIL</p>
                        <a href={`mailto:${req.email}`} className="text-orange text-sm font-body hover:underline">
                          {req.email}
                        </a>
                      </div>
                      {req.phone && (
                        <div>
                          <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">PHONE</p>
                          <a href={`tel:${req.phone}`} className="text-orange text-sm font-body hover:underline">
                            {req.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Pastoral notes */}
                    <div>
                      <p className="font-display text-xs tracking-widest text-muted-foreground mb-2">PASTORAL NOTES</p>
                      <textarea
                        value={notes[req.id] ?? ""}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [req.id]: e.target.value }))}
                        rows={3}
                        placeholder="Add internal notes visible only to the pastoral team..."
                        className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors resize-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {["new", "praying", "answered"].map((s) => (
                        <button
                          key={s}
                          disabled={req.status === s || updatingId === req.id}
                          onClick={() => updateStatus(req.id, s)}
                          className={`font-display text-xs tracking-widest px-4 py-2 rounded-sm border transition-all disabled:opacity-40 ${
                            req.status === s
                              ? "bg-gradient-orange text-primary-foreground border-orange"
                              : "border-border text-muted-foreground hover:border-orange hover:text-orange"
                          }`}
                        >
                          {statusLabels[s]}
                        </button>
                      ))}
                      <button
                        onClick={() => saveNotes(req.id)}
                        disabled={updatingId === req.id}
                        className="font-display text-xs tracking-widest px-4 py-2 rounded-sm border border-border text-muted-foreground hover:border-orange hover:text-orange transition-all disabled:opacity-40 ml-auto"
                      >
                        {updatingId === req.id ? "SAVING..." : "SAVE NOTES"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
