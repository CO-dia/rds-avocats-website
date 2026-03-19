import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { lawyers } from "@/app/data/lawyers";

export default function Team() {
  const t = useTranslations("Team");
  const tLawyers = useTranslations("Lawyers");
  const tLawyer = useTranslations("Lawyer");

  return (
    <section id="equipe" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {t("label")}
          </span>
        </div>

        <h2
          className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "0.05em" }}
        >
          {t("headingLine1")}
          <br />
          {t("headingLine2")}
        </h2>

        <p className="mt-6 max-w-2xl font-body text-base text-text sm:text-lg" style={{ letterSpacing: "0.02em" }}>
          {t("description")}
        </p>

        <div className="mt-12 space-y-6">
          {lawyers.map((lawyer) => {
            const title = tLawyers(`${lawyer.slug}.title`);
            const description = tLawyers(`${lawyer.slug}.description`);

            return (
              <div
                key={lawyer.slug}
                className="group overflow-hidden border border-black/5 bg-white/60 backdrop-blur-sm transition-all duration-400 hover:border-accent/25 hover:bg-white/75"
              >
                <div className="grid gap-6 p-6 sm:grid-cols-[220px_1fr] sm:items-start sm:gap-10 sm:p-8">
                  <Link href={`/avocats/${lawyer.slug}`} className="relative aspect-3/4 w-full overflow-hidden">
                    <Image
                      src={lawyer.photo}
                      alt={`${lawyer.firstName} ${lawyer.lastName}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" />
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-px">
                      <ArrowUpRight size={14} className="text-gold" />
                    </div>
                  </Link>

                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-px w-4 bg-accent" />
                      <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                        {lawyer.company}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-heading text-2xl font-bold text-gold">
                        {lawyer.firstName} <span className="text-accent">{lawyer.lastName}</span>
                      </h3>
                      <p className="font-body text-sm text-text/70">{title}</p>
                    </div>

                    <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-text">
                      {description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                      {lawyer.phones.map((p) => (
                        <a
                          key={p.number}
                          href={`tel:${p.number.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-2 border border-accent/15 bg-accent/5 px-3 py-2 font-body text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:border-accent/25 hover:bg-accent/10"
                        >
                          <Phone size={14} strokeWidth={1.5} />
                          {tLawyer(p.labelKey)}: {p.number}
                        </a>
                      ))}
                      {lawyer.emails.map((e) => (
                        <a
                          key={e.address}
                          href={`mailto:${e.address}`}
                          className="inline-flex items-center gap-2 border border-black/10 bg-white px-3 py-2 font-body text-xs font-bold uppercase tracking-widest text-text/80 transition-colors hover:border-accent/25 hover:text-accent"
                        >
                          <Mail size={14} strokeWidth={1.5} />
                          {tLawyer(e.labelKey)}: {e.address}
                        </a>
                      ))}

                      <Link
                        href={`/avocats/${lawyer.slug}`}
                        className="inline-flex items-center gap-2 border border-black/10 bg-white px-3 py-2 font-body text-xs font-bold uppercase tracking-widest text-text/80 transition-colors hover:border-accent/25 hover:text-accent"
                      >
                        Voir la fiche
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </Link>
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
