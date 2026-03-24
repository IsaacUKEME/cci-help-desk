export default function Footer() {
  return (
    <footer className="bg-church-black border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-lg font-bold tracking-widest text-foreground block">CELEBRATION</span>
              <span className="font-display text-xs font-medium tracking-[0.3em] text-orange block">CHURCH INTERNATIONAL</span>
            </div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              We envision all people celebrating endless life in Christ.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="font-display text-xs font-bold tracking-[0.2em] text-foreground mb-4">QUICK LINKS</h5>
            <ul className="space-y-2.5">
              {["Home", "About", "Services", "Sermons", "Connect", "Give"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-muted-foreground text-sm font-body hover:text-orange transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h5 className="font-display text-xs font-bold tracking-[0.2em] text-foreground mb-4">SERVICE TIMES</h5>
            <ul className="space-y-2.5">
              {[
                { day: "Sunday", time: "8:00 AM & 10:30 AM" },
                { day: "Wednesday", time: "7:00 PM" },
                { day: "Saturday", time: "4:00 PM (Youth)" },
              ].map((s) => (
                <li key={s.day}>
                  <span className="text-orange text-xs font-display font-bold block">{s.day}</span>
                  <span className="text-muted-foreground text-sm font-body">{s.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="font-display text-xs font-bold tracking-[0.2em] text-foreground mb-4">FOLLOW US</h5>
            <div className="space-y-3">
              {[
                { label: "YouTube", url: "https://www.youtube.com/@CelebrationGlobalTV", icon: "▶" },
                { label: "Instagram", url: "#", icon: "◉" },
                { label: "Facebook", url: "#", icon: "◈" },
                { label: "Twitter / X", url: "#", icon: "✕" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-orange transition-colors text-sm font-body group"
                >
                  <span className="text-orange group-hover:scale-110 transition-transform">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs font-body">
            © {new Date().getFullYear()} Celebration Church International. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs font-body">
            Built with ❤️ for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
