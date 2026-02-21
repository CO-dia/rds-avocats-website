import { Clock, Phone, FileCheck, ArrowUpRight } from "lucide-react";

const consultations = [
  {
    icon: Phone,
    title: "Appel découverte",
    duration: "15 minutes",
    price: "Gratuit",
    priceNote: "Première consultation",
    desc: "On discute de votre projet, on cerne le besoin et on vous oriente vers la meilleure solution. Simple, rapide, efficace.",
    highlight: true,
    href: "https://cal.com",
  },
  {
    icon: Clock,
    title: "Consultation stratégique",
    duration: "30 minutes",
    price: "150 $",
    priceNote: null,
    desc: "Parfait pour valider une idée, poser une question ciblée ou débloquer une situation rapidement.",
    highlight: false,
    href: "https://cal.com",
  },
  {
    icon: FileCheck,
    title: "Consultation approfondie",
    duration: "60 minutes",
    price: "300 $",
    priceNote: null,
    desc: "Pour structurer votre stratégie, analyser vos documents et repartir avec un plan d'action concret.",
    highlight: false,
    href: "https://cal.com",
  },
];

export default function Booking() {
  return (
    <section id="rendez-vous" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Rendez-vous
          </span>
        </div>

        <h2
          className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "0.05em" }}
        >
          Prendre
          <br />
          rendez-vous
        </h2>

        <p className="mt-6 max-w-2xl font-body text-base text-gold-dim sm:text-lg" style={{ letterSpacing: "0.02em" }}>
          Choisissez le format qui correspond à votre besoin. Chaque
          consultation est confidentielle et orientée solution.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {consultations.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col border p-8 transition-all duration-300 hover:translate-y-[-2px] ${
                item.highlight
                  ? "border-accent/40 bg-accent/5 hover:border-accent/60 hover:bg-accent/10"
                  : "border-white/5 bg-white/2 hover:border-accent/30 hover:bg-accent/5"
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
              )}

              <div className="flex items-start justify-between">
                <item.icon
                  className="text-accent"
                  size={28}
                  strokeWidth={1.5}
                />
                <ArrowUpRight
                  className="text-gold-dim opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={18}
                />
              </div>

              <h3 className="mt-6 font-heading text-lg font-bold text-gold">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="font-body text-xs uppercase tracking-wider text-gold-dim">
                  {item.duration}
                </span>
              </div>

              <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-gold/70">
                {item.desc}
              </p>

              <div className="mt-6 border-t border-white/5 pt-4">
                <span className="font-heading text-2xl font-bold text-accent">
                  {item.price}
                </span>
                {item.priceNote && (
                  <span className="ml-2 font-body text-xs text-gold-dim">
                    {item.priceNote}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
