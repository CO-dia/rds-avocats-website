import {
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  Heart,
  Home,
  Gavel,
  FileText,
  MoreHorizontal,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Corporatif",
    items: ["Incorporation", "Réorganisation", "Livre corporatif", "Charte"],
  },
  {
    icon: Handshake,
    title: "Commercial",
    items: ["Contrats", "Partenariats", "Fournisseurs"],
  },
  {
    icon: KeyRound,
    title: "Repreneuriat",
    items: [
      "Lettre d'intention",
      "Lettre d'offre",
      "Vérification diligente",
      "Contrat de vente",
    ],
  },
  {
    icon: Users,
    title: "Immigration — Personnes",
    items: ["Asile", "Condition humanitaire"],
  },
  {
    icon: Briefcase,
    title: "Immigration d'affaires",
    items: ["Travail", "Entreprises"],
  },
  {
    icon: Heart,
    title: "Divorce",
    items: ["À l'amiable", "Contesté"],
  },
  {
    icon: Home,
    title: "Famille",
    items: ["Garde", "Pension alimentaire"],
  },
  {
    icon: Gavel,
    title: "Pénal / Criminel",
    items: [
      "Conduite avec facultés affaiblies",
      "Contestation de ticket",
    ],
  },
  {
    icon: FileText,
    title: "Civil",
    items: ["Réclamation", "Litige", "Mise en demeure"],
  },
  {
    icon: MoreHorizontal,
    title: "Autre",
    items: ["Situation particulière? Contactez-nous."],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Services
          </span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "0.05em" }}
          >
            Nos domaines
            <br />
            d&apos;expertise
          </h2>

          <p
            className="max-w-md font-body text-sm text-gold-dim lg:text-right"
            style={{ letterSpacing: "0.02em" }}
          >
            Chaque situation est unique — nous adaptons notre approche à vos
            besoins.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div key={service.title} className="group relative">
                <div className="relative h-full overflow-hidden border border-white/6 bg-white/2 transition-all duration-400 hover:border-accent/20 hover:bg-white/4">
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-400 bg-linear-to-r from-transparent via-accent/50 to-transparent group-hover:opacity-100" />

                  <div className="flex h-full flex-col p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/4 text-gold-dim transition-all duration-400 group-hover:bg-accent/10 group-hover:text-accent">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <h3 className="mt-4 font-heading text-base font-bold tracking-wide text-gold">
                      {service.title}
                    </h3>

                    <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="inline-block self-start border border-accent/15 bg-accent/5 px-2.5 py-1 font-body text-xs tracking-wide text-gold/70 transition-colors duration-300 group-hover:border-accent/25 group-hover:text-gold/85"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5">
                      <a
                        href="#rendez-vous"
                        className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-accent/70 transition-colors hover:text-accent"
                      >
                        Prendre rendez-vous
                        <span className="text-[10px] transition-transform group-hover:translate-x-0.5">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
