import communityImg from "@/assets/community.jpg";
import pastorImg from "@/assets/pastor.jpg";

const values = [
  { icon: "✝️", title: "Faith", desc: "Rooted in the Word, grounded in Grace." },
  { icon: "🙌", title: "Worship", desc: "Encounter God in spirit and in truth." },
  { icon: "🌍", title: "Community", desc: "A global family united in purpose." },
  { icon: "🔥", title: "Mission", desc: "Discipling a people for Christ, with joy." },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-church-black">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-orange" />
          <span className="font-display text-orange text-xs tracking-[0.3em]">WELCOME TO CCI</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-tight text-foreground mb-6">
              WELCOME <span className="text-gradient-orange">HOME!</span>
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              Celebration Church International (CCI) is a vibrant, Spirit-filled community of believers
              committed to celebrating endless life in Christ. We enlist, disciple, and redeploy a people
              in Christ, for Christ, with joy.
            </p>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
              Whether you're new to faith or have been walking with God for decades, you'll find a home
              here. We believe in the power of authentic worship, transformative teaching, and genuine community.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-church-card border border-border rounded-lg p-4 hover:border-orange/50 transition-colors group"
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h4 className="font-display text-sm font-bold tracking-widest text-foreground group-hover:text-orange transition-colors mb-1">
                    {v.title}
                  </h4>
                  <p className="text-muted-foreground text-xs font-body">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <img
              src={communityImg}
              alt="Church community"
              loading="lazy"
              width={800}
              height={600}
              className="w-full rounded-lg object-cover h-[350px] lg:h-[420px]"
            />
            <div className="absolute -bottom-6 -left-6 w-44 h-44 hidden lg:block">
              <img
                src={pastorImg}
                alt="Pastor preaching"
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg border-4 border-church-black shadow-orange"
              />
            </div>
            {/* Orange accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-orange rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
