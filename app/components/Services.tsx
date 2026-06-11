"use client";

import {
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const serviceIcons = [
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  MoreHorizontal,
];

export default function Services() {
  const t = useTranslations("Services");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

        <div className="mt-14 space-y-3">
          {items.map((service, i) => {
            const Icon = serviceIcons[i];
            const isOpen = openIndex === i;

            return (
              <div
                key={service.title}
                className="overflow-hidden border border-black/5 bg-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent/25"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/5 text-accent">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="flex-1 font-heading text-base font-bold tracking-wide text-accent">
                    {service.title}
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-accent/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] border-t border-white/5" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-4">
                      <ul className="space-y-2">
                        {service.tags.map((tag) => (
                          <li
                            key={tag}
                            className="list-disc ml-5 font-body text-sm text-text marker:text-black/80"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 pt-4 border-t border-white/5">
                        <a
                          href="#rendez-vous"
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(
                              new CustomEvent("select-service", {
                                detail: service.title,
                              }),
                            );
                            document
                              .getElementById("rendez-vous")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-accent/70 transition-colors hover:text-accent"
                        >
                          {t("cta")}
                          <span className="text-[10px]">→</span>
                        </a>
                      </div>
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
