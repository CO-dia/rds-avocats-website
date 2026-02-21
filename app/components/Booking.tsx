import { Clock, Phone, FileCheck, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

const consultationIcons = [Phone, Clock, FileCheck];
const consultationHrefs = [
  "https://cal.com",
  "https://cal.com",
  "https://cal.com",
];

export default function Booking() {
  const t = useTranslations("Booking");
  const items = t.raw("items") as Array<{
    title: string;
    duration: string;
    price: string;
    priceNote?: string;
    desc: string;
  }>;

  return (
    <section id="rendez-vous" className="relative py-24 lg:py-32">
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

        <p className="mt-6 max-w-2xl font-body text-base text-gold-dim sm:text-lg" style={{ letterSpacing: "0.02em" }}>
          {t("description")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = consultationIcons[i];
            const highlight = i === 0;

            return (
              <a
                key={item.title}
                href={consultationHrefs[i]}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col border p-8 transition-all duration-300 hover:translate-y-[-2px] ${
                  highlight
                    ? "border-accent/40 bg-accent/5 hover:border-accent/60 hover:bg-accent/10"
                    : "border-white/5 bg-white/2 hover:border-accent/30 hover:bg-accent/5"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
                )}

                <div className="flex items-start justify-between">
                  <Icon
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
