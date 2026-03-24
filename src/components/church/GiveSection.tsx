import { useState } from "react";
import { Heart } from "lucide-react";

const amounts = [25, 50, 100, 250, 500];
const giveTypes = ["Tithe", "Offering", "Special Seed", "Building Fund", "Missions"];

export default function GiveSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [giveType, setGiveType] = useState("Tithe");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [submitted, setSubmitted] = useState(false);

  const displayAmount = customAmount
    ? parseFloat(customAmount) || 0
    : selectedAmount ?? 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="give" className="section-padding relative overflow-hidden" style={{ backgroundColor: "hsl(0 0% 4%)" }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-orange" />
            <span className="font-display text-orange text-xs tracking-[0.3em]">GIVE GENEROUSLY</span>
            <div className="h-px w-16 bg-orange" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase text-foreground mb-4">
            TITHES & <span className="text-gradient-orange">OFFERINGS</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base">
            "Bring the full tithe into the storehouse..." — Malachi 3:10. Your generosity fuels the mission of God
            through CCI worldwide.
          </p>
        </div>

        {submitted ? (
          <div className="bg-church-card border border-orange/50 rounded-xl p-10 text-center">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="font-display text-2xl font-bold text-orange mb-3">GOD BLESS YOUR GIFT!</h3>
            <p className="text-muted-foreground font-body">
              Thank you for your generous {giveType.toLowerCase()} of <strong className="text-foreground">${displayAmount}</strong>.
              Your giving makes a difference in the Kingdom!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-church-card border border-border rounded-xl p-6 md:p-10 shadow-card"
          >
            {/* Give type */}
            <div className="mb-8">
              <label className="block font-display text-xs tracking-widest text-muted-foreground mb-3">
                GIVING TYPE
              </label>
              <div className="flex flex-wrap gap-2">
                {giveTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setGiveType(t)}
                    className={`font-display text-xs tracking-widest px-4 py-2 rounded-sm border transition-all ${
                      giveType === t
                        ? "bg-gradient-orange text-primary-foreground border-orange shadow-orange"
                        : "border-border text-muted-foreground hover:border-orange/50 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="mb-8">
              <label className="block font-display text-xs tracking-widest text-muted-foreground mb-3">
                FREQUENCY
              </label>
              <div className="flex gap-2">
                {(["one-time", "monthly"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`font-display text-xs tracking-widest px-6 py-2.5 rounded-sm border transition-all capitalize ${
                      frequency === f
                        ? "bg-gradient-orange text-primary-foreground border-orange shadow-orange"
                        : "border-border text-muted-foreground hover:border-orange/50 hover:text-foreground"
                    }`}
                  >
                    {f === "one-time" ? "One-Time" : "Monthly"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount buttons */}
            <div className="mb-8">
              <label className="block font-display text-xs tracking-widest text-muted-foreground mb-3">
                SELECT AMOUNT
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(a);
                      setCustomAmount("");
                    }}
                    className={`font-display text-sm font-bold py-3 rounded-sm border transition-all ${
                      selectedAmount === a && !customAmount
                        ? "bg-gradient-orange text-primary-foreground border-orange shadow-orange"
                        : "border-border text-muted-foreground hover:border-orange/50 hover:text-foreground"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount ($)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            {/* Donor info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  FULL NAME
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>
              <div>
                <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                  EMAIL
                </label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                />
              </div>
            </div>

            {/* Summary + submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
              <div className="text-center sm:text-left">
                <p className="font-display text-xs text-muted-foreground tracking-widest">{frequency === "monthly" ? "MONTHLY" : "ONE-TIME"} {giveType.toUpperCase()}</p>
                <p className="font-display text-3xl font-bold text-orange">${displayAmount}</p>
              </div>
              <button
                type="submit"
                className="font-display text-sm font-bold tracking-widest px-10 py-4 bg-gradient-orange text-primary-foreground rounded-sm shadow-orange hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Heart size={16} />
                GIVE NOW
              </button>
            </div>

            <p className="text-muted-foreground text-xs font-body text-center mt-4">
              🔒 Secure payment. Your information is always protected.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
