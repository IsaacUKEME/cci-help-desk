import heroImg from "@/assets/hero-church.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImg}
        alt="Church congregation worship"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-church-black" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/30 text-orange text-xs font-display tracking-[0.3em] px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-orange inline-block pulse-orange" />
          OUR VISION
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none tracking-tight text-foreground mb-4">
          WE ENVISION ALL
          <br />
          <span className="text-gradient-orange">PEOPLE CELEBRATING</span>
          <br />
          ENDLESS LIFE IN CHRIST
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mt-6 mb-10 font-body max-w-xl mx-auto">
          Dive into our teachings, events and community. Your journey of faith begins here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.youtube.com/@CelebrationGlobalTV"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display tracking-widest text-sm font-semibold px-8 py-3 bg-gradient-orange text-primary-foreground rounded-sm shadow-orange hover:scale-105 transition-transform duration-200"
          >
            WATCH LIVE
          </a>
          <a
            href="#about"
            className="font-display tracking-widest text-sm font-semibold px-8 py-3 border border-foreground/40 text-foreground rounded-sm hover:border-orange hover:text-orange transition-colors duration-200"
          >
            LEARN MORE
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs font-display tracking-widest animate-bounce">
        <span>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="0.5" y="0.5" width="15" height="23" rx="7.5" stroke="currentColor"/>
          <circle cx="8" cy="8" r="2" fill="currentColor" className="animate-bounce"/>
        </svg>
      </div>
    </section>
  );
}
