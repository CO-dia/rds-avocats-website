"use client";

import {
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  HeartCrack,
  Home,
  Gavel,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { useTranslations } from "next-intl";

const serviceIcons = [
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  HeartCrack,
  Home,
  Gavel,
  FileText,
  MoreHorizontal,
];

export default function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as Array<{
    title: string;
    tags: string[];
  }>;

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {t("label")}
          </span>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
            style={{ letterSpacing: "0.05em" }}
          >
            {t("headingLine1")}
            <br />
            {t("headingLine2")}
          </h2>

          <p
            className="max-w-md font-body text-sm text-text lg:text-right"
            style={{ letterSpacing: "0.02em" }}
          >
            {t("subtext")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = serviceIcons[i];

            return (
              <div key={service.title} className="group relative">
                <div className="relative h-full overflow-hidden border border-black/5 bg-white/60 backdrop-blur-sm transition-all duration-400 hover:border-accent/25 hover:bg-white/75">
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-400 bg-linear-to-r from-transparent via-accent/50 to-transparent group-hover:opacity-100" />

                  <div className="flex h-full flex-col p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/5 text-accent transition-all duration-400 group-hover:bg-accent/10 group-hover:text-accent">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <h3 className="mt-4 font-heading text-base font-bold tracking-wide text-accent">
                      {service.title}
                    </h3>

                    <div className="mt-3 flex flex-1 flex-wrap content-start gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block self-start rounded-full border border-accent/15 bg-accent/5 px-3 py-1 font-body text-xs tracking-wide text-text transition-colors duration-300 group-hover:border-accent/25 group-hover:text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5">
                      <a
                        href="#rendez-vous"
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(
                            new CustomEvent("select-service", {
                              detail: service.title,
                            })
                          );
                          document
                            .getElementById("rendez-vous")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-accent/70 transition-colors hover:text-accent"
                      >
                        {t("cta")}
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
