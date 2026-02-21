import { Shield, Globe, Users, TrendingUp } from "lucide-react";

const strengths = [
  {
    icon: Shield,
    title: "Expertises complémentaires",
    desc: "Droit des affaires, immigration, famille, pénal et civil sous un même toit.",
  },
  {
    icon: Globe,
    title: "Immigration d'affaires",
    desc: "Nous aidons entrepreneurs et entreprises étrangères à s'implanter au Canada.",
  },
  {
    icon: Users,
    title: "Approche humaine",
    desc: "Un accompagnement stratégique, rigoureux et humain à chaque étape.",
  },
  {
    icon: TrendingUp,
    title: "Orienté croissance",
    desc: "On comprend la réalité entrepreneuriale et on préserve votre momentum.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            À propos
          </span>
        </div>

        <h2
          className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "0.05em" }}
        >
          Un cabinet,
          <br />
          toutes les solutions.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              Chez RDS Avocats, nous réunissons une équipe aux expertises
              complémentaires en droit des affaires, commercial et corporatif,
              ainsi qu&apos;en droit de l&apos;immigration, de la famille, civil,
              pénal et criminel. Cette diversité nous permet d&apos;accompagner
              nos clients dans toutes les dimensions de leur réalité,
              personnelle comme professionnelle.
            </p>
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              <strong className="text-gold">Notre force distinctive :</strong>{" "}
              l&apos;immigration d&apos;affaires. Nous aidons les entrepreneurs et
              entreprises étrangères à s&apos;implanter au Canada tout en
              structurant leur expansion et leur projet de vie ici.
            </p>
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              Avec RDS Avocats, vous bénéficiez d&apos;un accompagnement
              stratégique, rigoureux et humain — un partenaire juridique solide
              pour bâtir, investir et réussir au Canada.
            </p>

            <div className="mt-8 border-l-2 border-accent/50 pl-6">
              <p className="font-heading text-lg italic text-gold/80 sm:text-xl">
                Notre approche : claire, stratégique et orientée croissance.
              </p>
              <p className="mt-2 font-body text-sm text-gold-dim" style={{ letterSpacing: "0.02em" }}>
                On parle votre langage, on comprend la réalité
                entrepreneuriale, et on vous aide à avancer sans ralentir votre
                momentum.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="group border border-white/5 bg-white/2 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
              >
                <item.icon
                  className="mb-4 text-accent transition-transform duration-300 group-hover:scale-110"
                  size={28}
                  strokeWidth={1.5}
                />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gold">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-gold-dim">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
