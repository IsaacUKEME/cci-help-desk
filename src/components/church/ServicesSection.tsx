import worshipImg from "@/assets/worship.jpg";

const services = [
  {
    day: "SUNDAY",
    time: "8:00 AM",
    title: "First Service",
    desc: "Start your week in the presence of God with worship and the Word.",
    icon: "🌅",
  },
  {
    day: "SUNDAY",
    time: "10:30 AM",
    title: "Main Service",
    desc: "Our flagship celebration — full worship, teaching, and community.",
    icon: "🙌",
  },
  {
    day: "WEDNESDAY",
    time: "7:00 PM",
    title: "Bible Study",
    desc: "Deep dive into Scripture and grow in your understanding of God's Word.",
    icon: "📖",
  },
  {
    day: "SATURDAY",
    time: "4:00 PM",
    title: "Youth Service",
    desc: "A dynamic gathering for the next generation of believers.",
    icon: "🔥",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-orange" />
          <span className="font-display text-orange text-xs tracking-[0.3em]">JOIN US</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-foreground mb-4">
              SERVICE <span className="text-gradient-orange">TIMES</span>
            </h2>
            <p className="text-muted-foreground font-body mb-10">
              Come as you are. There's always a seat for you at Celebration Church.
            </p>

            <div className="space-y-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-4 bg-church-card border border-border rounded-lg p-5 hover:border-orange/50 transition-all group"
                >
                  <div className="text-3xl mt-1 shrink-0">{s.icon}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display text-xs font-bold tracking-[0.2em] text-orange">{s.day}</span>
                      <span className="font-display text-xs text-muted-foreground">{s.time}</span>
                    </div>
                    <h4 className="font-display text-base font-semibold text-foreground group-hover:text-orange transition-colors">
                      {s.title}
                    </h4>
                    <p className="text-muted-foreground text-sm font-body mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worship image + location */}
          <div className="space-y-6">
            <img
              src={worshipImg}
              alt="Worship service"
              loading="lazy"
              width={800}
              height={600}
              className="w-full rounded-lg h-[320px] object-cover"
            />
            <div className="bg-gradient-orange rounded-lg p-6">
              <h3 className="font-display text-xl font-bold text-primary-foreground tracking-widest mb-2">
                📍 FIND A CAMPUS
              </h3>
              <p className="text-primary-foreground/80 font-body text-sm mb-4">
                We have campuses across multiple cities and countries. Find the Celebration Church nearest you.
              </p>
              <a
                href="#connect"
                className="inline-block font-display text-xs font-bold tracking-widest bg-church-black text-foreground px-6 py-3 rounded-sm hover:bg-church-surface transition-colors"
              >
                SEE ALL CAMPUSES →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
