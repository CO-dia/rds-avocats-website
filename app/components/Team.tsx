import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { lawyers } from "@/app/data/lawyers";

export default function Team() {
  const t = useTranslations("Team");
  const tLawyers = useTranslations("Lawyers");

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lawyers.map((lawyer) => (
            <Link
              key={lawyer.slug}
              href={`/avocats/${lawyer.slug}`}
              className="group relative flex flex-col overflow-hidden border border-white/5 bg-white/2 transition-all duration-500 hover:border-accent/30 hover:bg-accent/5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={lawyer.photo}
                  alt={`${lawyer.firstName} ${lawyer.lastName}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={14} className="text-gold" />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-px w-4 bg-accent" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    {lawyer.company}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-gold">
                  {lawyer.firstName}{" "}
                  <span className="text-accent">{lawyer.lastName}</span>
                </h3>
                <p className="mt-1 font-body text-sm text-text">
                  {tLawyers(`${lawyer.slug}.title`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
