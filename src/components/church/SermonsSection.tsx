const sermons = [
  {
    title: "The Power of Endless Life",
    preacher: "Pastor Emmanuel",
    date: "March 23, 2025",
    series: "Endless Life",
    thumb: "🎬",
  },
  {
    title: "Walking in Kingdom Authority",
    preacher: "Minister Sarah",
    date: "March 16, 2025",
    series: "Kingdom Living",
    thumb: "🎬",
  },
  {
    title: "Grace That Transforms",
    preacher: "Pastor Emmanuel",
    date: "March 9, 2025",
    series: "The Grace Series",
    thumb: "🎬",
  },
  {
    title: "Becoming Who God Made You",
    preacher: "Elder David",
    date: "March 2, 2025",
    series: "Identity in Christ",
    thumb: "🎬",
  },
];

export default function SermonsSection() {
  return (
    <section id="sermons" className="section-padding bg-church-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-orange" />
          <span className="font-display text-orange text-xs tracking-[0.3em]">GROW IN THE WORD</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground">
            RECENT <span className="text-gradient-orange">SERMONS</span>
          </h2>
          <a
            href="https://www.youtube.com/@CelebrationGlobalTV"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs tracking-widest text-orange border border-orange px-5 py-2 rounded-sm hover:bg-orange hover:text-primary-foreground transition-colors self-start"
          >
            VIEW ALL SERMONS →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sermons.map((s) => (
            <div
              key={s.title}
              className="bg-church-card border border-border rounded-lg overflow-hidden hover:border-orange/50 transition-all group cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div className="relative bg-church-surface h-48 flex items-center justify-center">
                <span className="text-6xl">{s.thumb}</span>
                <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange/0 group-hover:bg-orange flex items-center justify-center transition-all duration-200 shadow-orange">
                    <svg className="w-5 h-5 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="font-display text-orange text-xs tracking-widest">{s.series}</span>
                <h4 className="font-display text-sm font-semibold text-foreground mt-1 mb-2 group-hover:text-orange transition-colors leading-snug">
                  {s.title}
                </h4>
                <p className="text-muted-foreground text-xs font-body">{s.preacher}</p>
                <p className="text-muted-foreground text-xs font-body">{s.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
