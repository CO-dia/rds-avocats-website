import { Shield, Globe, Users, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const strengthIcons = [Shield, Globe, Users, TrendingUp];

export default function About() {
  const t = useTranslations("About");
  const strengths = t.raw("strengths") as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <section id="a-propos" className="relative py-24 lg:py-32">
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

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              {t("paragraph1")}
            </p>
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              <strong className="text-gold">{t("paragraph2Strong")}</strong>{" "}
              {t("paragraph2")}
            </p>
            <p className="font-body text-base leading-relaxed text-gold/90 sm:text-lg" style={{ letterSpacing: "0.02em" }}>
              {t("paragraph3")}
            </p>

            <div className="mt-8 border-l-2 border-accent/50 pl-6">
              <p className="font-heading text-lg italic text-gold/80 sm:text-xl">
                {t("quote")}
              </p>
              <p className="mt-2 font-body text-sm text-gold-dim" style={{ letterSpacing: "0.02em" }}>
                {t("subquote")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strengths.map((item, i) => {
              const Icon = strengthIcons[i];
              return (
                <div
                  key={item.title}
                  className="group border border-white/5 bg-white/2 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                >
                  <Icon
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
