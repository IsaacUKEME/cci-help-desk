import { useState } from "react";

const fields = [
  { label: "FIRST NAME", type: "text", placeholder: "John" },
  { label: "LAST NAME", type: "text", placeholder: "Doe" },
  { label: "EMAIL", type: "email", placeholder: "john@email.com" },
  { label: "PHONE", type: "tel", placeholder: "+1 (555) 000-0000" },
];

export default function ConnectSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="connect" className="section-padding bg-church-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-16 bg-orange" />
              <span className="font-display text-orange text-xs tracking-[0.3em]">GET INVOLVED</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-6">
              CONNECT <span className="text-gradient-orange">WITH US</span>
            </h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              We'd love to hear from you! Fill out the form and someone from our team will reach out within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: "📍", title: "Visit Us", detail: "123 Faith Avenue, New City, NC 10001" },
                { icon: "📞", title: "Call Us", detail: "+1 (800) CCI-LOVE" },
                { icon: "✉️", title: "Email", detail: "hello@celebrationchurch.org" },
                { icon: "📺", title: "Watch Online", detail: "YouTube: @CelebrationGlobalTV" },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="font-display text-sm font-semibold tracking-widest text-foreground">{c.title}</h4>
                    <p className="text-muted-foreground text-sm font-body">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-church-card border border-orange/50 rounded-xl p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-orange mb-3">YOU'RE CONNECTED!</h3>
                <p className="text-muted-foreground font-body">
                  Welcome to the CCI family! We'll be in touch very soon. God bless you!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-church-card border border-border rounded-xl p-6 md:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.map((f) => (
                    <div key={f.label}>
                      <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                    HOW CAN WE HELP?
                  </label>
                  <select className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-orange transition-colors">
                    <option>I'm new & want to learn more</option>
                    <option>Prayer request</option>
                    <option>Join a cell group</option>
                    <option>Volunteer opportunities</option>
                    <option>Pastoral counseling</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-display text-xs tracking-widest text-muted-foreground mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more..."
                    className="w-full bg-church-surface border border-border text-foreground font-body rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-display text-sm font-bold tracking-widest py-4 bg-gradient-orange text-primary-foreground rounded-sm shadow-orange hover:scale-[1.01] transition-transform"
                >
                  SEND MESSAGE →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
