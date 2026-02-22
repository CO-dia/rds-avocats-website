"use client";

import { useState, useEffect } from "react";
import { Clock, Phone, FileCheck, ChevronDown, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { getCalApi } from "@calcom/embed-react";

const consultationIcons = [Phone, Clock, FileCheck];

const consultationSlugs = [
  "hanitra-ravalimanantsoa/appel-decouverte",
  "hanitra-ravalimanantsoa/consultation-strategique",
  "hanitra-ravalimanantsoa/consultation-approfondie",
];

export default function BookingWidget() {
  const t = useTranslations("Booking");
  const tServices = useTranslations("Services");

  const items = t.raw("items") as Array<{
    title: string;
    duration: string;
    price: string;
    priceNote?: string;
    desc: string;
  }>;

  const services = tServices.raw("items") as Array<{
    title: string;
    tags: string[];
  }>;

  const [selectedConsultation, setSelectedConsultation] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "appel-decouverte" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const calLink = selectedService
    ? `${consultationSlugs[selectedConsultation]}?notes=${encodeURIComponent(`Service: ${selectedService}`)}`
    : consultationSlugs[selectedConsultation];

  return (
    <>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = consultationIcons[i];
          const isSelected = selectedConsultation === i;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedConsultation(i)}
              className={`group relative flex flex-col border p-8 text-left transition-all duration-300 hover:translate-y-[-2px] cursor-pointer ${
                isSelected
                  ? "border-accent/40 bg-accent/5"
                  : "border-white/5 bg-white/2 hover:border-accent/30 hover:bg-accent/5"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
              )}

              <div className="flex items-start justify-between">
                <Icon className="text-accent" size={28} strokeWidth={1.5} />
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
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
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="max-w-md flex-1">
          <label className="mb-2 block font-body text-xs font-bold uppercase tracking-[0.2em] text-gold-dim">
            {t("serviceLabel")}
          </label>
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full appearance-none border border-white/10 bg-black px-4 py-3 pr-10 font-body text-sm text-gold transition-colors focus:border-accent/40 focus:outline-none"
            >
              <option value="">{t("servicePlaceholder")}</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-dim"
              size={16}
            />
          </div>
        </div>

        <button
          data-cal-namespace="appel-decouverte"
          data-cal-link={calLink}
          data-cal-config={JSON.stringify({
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
          })}
          disabled={!selectedService}
          className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-8 py-3 font-body text-sm font-bold uppercase tracking-widest text-accent transition-all hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Calendar size={16} strokeWidth={1.5} />
          {t("bookButton")}
        </button>
      </div>
    </>
  );
}
