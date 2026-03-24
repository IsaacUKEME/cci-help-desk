import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "General",
  "Healing",
  "Family",
  "Financial Breakthrough",
  "Salvation of Loved Ones",
  "Marriage & Relationships",
  "Career & Purpose",
  "Mental Health",
  "Bereavement",
  "Thanksgiving",
];

export default function PrayerRequestSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General",
    request: "",
    is_urgent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!form.name.trim() || form.name.length > 100) {
      setError("Please enter your name (max 100 characters).");
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.request.trim() || form.request.length < 10) {
      setError("Please describe your prayer request (at least 10 characters).");
      return;
    }
    if (form.request.length > 2000) {
      setError("Prayer request must be under 2000 characters.");
      return;
    }

    setLoading(true);

    const { error: dbError } = await supabase.from("prayer_requests").insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      category: form.category,
      request: form.request.trim(),
      is_urgent: form.is_urgent,
    });

    setLoading(false);

    if (dbError) {
      setError("Unable to submit your request. Please try again.");
      console.error("Prayer request error:", dbError.message);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="prayer" className="section-padding relative overflow-hidden" style={{ backgroundColor: "hsl(0 0% 6%)" }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-orange" />
            <span className="font-display text-orange text-xs tracking-[0.3em]">WE STAND WITH YOU</span>
            <div className="h-px w-16 bg-orange" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase text-foreground mb-4">
            PRAYER <span className="text-gradient-orange">REQUESTS</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed">
            "The prayer of a righteous person is powerful and effective." — James 5:16.
            Our pastoral team personally prays over every request submitted.
          </p>
        </div>

        {submitted ? (
          <div className="bg-church-card border border-orange/50 rounded-2xl p-10 text-center shadow-orange">
            <div className="text-6xl mb-5">🙏</div>
            <h3 className="font-display text-3xl font-bold text-orange mb-3">WE'RE PRAYING!</h3>
            <p className="text-muted-foreground font-body text-base mb-6 max-w-md mx-auto leading-relaxed">
              Your prayer request has been received by our pastoral team. We will be standing with you in prayer.
              Expect to hear from us within 24–48 hours. God is faithful!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", email: "", phone: "", category: "General", request: "", is_urgent: false });
              }}
              className="font-display text-xs tracking-widest text-orange border border-orange px-6 py-2.5 rounded-sm hover:bg-orange hover:text-primary-foreground transition-colors"
            >
              SUBMIT ANOTHER REQUEST
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-church-card border border-border rounded-2xl p-6 md:p-10 shadow-card"
          >
            {/* Error */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/40 text-destructive text-sm font-body rounded-lg px-4 py-3 mb-6">
                ⚠️ {error}
              </div>
            )}

            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  FULL NAME <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  EMAIL <span className="text-orange">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  placeholder="your@email.com"
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>
            </div>

            {/* Phone & Category */}
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  PHONE <span className="text-muted-foreground text-xs normal-case font-body">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  PRAYER CATEGORY <span className="text-orange">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prayer request */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="block font-display text-xs tracking-widest text-muted-foreground">
                  YOUR PRAYER REQUEST <span className="text-orange">*</span>
                </label>
                <span className="text-muted-foreground text-xs font-body">
                  {form.request.length}/2000
                </span>
              </div>
              <textarea
                name="request"
                value={form.request}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Share your prayer need openly — our pastoral team holds every request in confidence..."
                className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors resize-none"
              />
            </div>

            {/* Urgent flag */}
            <label className="flex items-start gap-3 cursor-pointer mb-8 group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="is_urgent"
                  checked={form.is_urgent}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-border rounded peer-checked:bg-orange peer-checked:border-orange transition-all flex items-center justify-center">
                  {form.is_urgent && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="font-display text-sm font-semibold text-foreground tracking-wide group-hover:text-orange transition-colors">
                  This is urgent
                </span>
                <p className="text-muted-foreground text-xs font-body mt-0.5">
                  Check this if your situation requires immediate prayer attention
                </p>
              </div>
            </label>

            {/* Privacy note */}
            <div className="bg-church-surface border border-border rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
              <span className="text-orange text-lg mt-0.5">🔒</span>
              <p className="text-muted-foreground text-xs font-body leading-relaxed">
                Your prayer request is <strong className="text-foreground">strictly confidential</strong>. Only authorized pastoral team members have access to the information you share. We will never share your request publicly.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-display text-sm font-bold tracking-widest py-4 bg-gradient-orange text-primary-foreground rounded-sm shadow-orange hover:scale-[1.01] active:scale-100 transition-transform disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  SENDING PRAYER REQUEST...
                </>
              ) : (
                "🙏  SUBMIT PRAYER REQUEST"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
