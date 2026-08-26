"use client";

import { useState, useEffect, useRef } from "react";
import {
  Clock,
  Phone,
  FileCheck,
  Globe,
  ChevronDown,
  Calendar,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getCalApi } from "@calcom/embed-react";
import { Link } from "@/i18n/navigation";
import bookingServicesData from "@/app/data/booking-services.json";

const consultationIcons = [Globe, Phone, Clock, FileCheck];

const consultationSlugs = [
  "hanitra-ravalimanantsoa/1ere-consultation-en-immigration",
  "hanitra-ravalimanantsoa/appel-decouverte",
  "hanitra-ravalimanantsoa/consultation-strategique",
  "hanitra-ravalimanantsoa/consultation-approfondie",
];

/** Cal.com path + query: dark theme + optional notes (embed reads path only; theme helps match overlay). */
function buildCalEmbedPath(slug: string, notes: string | null) {
  const params = new URLSearchParams();
  params.set("theme", "dark");
  if (notes) params.set("title", notes);
  return `${slug}?${params.toString()}`;
}

const calEmbedUiConfig = {
  layout: "month_view" as const,
  theme: "dark" as const,
  /** Stack slots on small widths instead of squeezing 3 columns */
  useSlotsViewOnSmallScreen: "true" as const,
};

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

  const [selectedConsultation, setSelectedConsultation] = useState(1);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);
  const [selectedSubjectValue, setSelectedSubjectValue] = useState<string>("");
  const [customService, setCustomService] = useState("");
  const [calOpen, setCalOpen] = useState(false);
  const calContainerRef = useRef<HTMLDivElement | null>(null);

  const serviceIds = Object.keys(bookingServicesData) as string[];
  const selectedServiceTitle =
    selectedServiceIndex !== null
      ? services[selectedServiceIndex]?.title
      : null;
  const isOtherService =
    selectedServiceIndex !== null &&
    serviceIds[selectedServiceIndex] === "other";
  const isOtherSubject = selectedSubjectValue === "other";
  const showCustomInput = isOtherService || isOtherSubject;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "appel-decouverte" });
      cal("ui", {
        hideEventTypeDetails: false,
        ...calEmbedUiConfig,
      });
    })();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const title = (e as CustomEvent<string>).detail;
      const idx = services.findIndex((s) => s.title === title);
      if (idx !== -1) {
        setSelectedServiceIndex(idx);
        setSelectedSubjectValue("");
      }
    };
    window.addEventListener("select-service", handler);
    return () => window.removeEventListener("select-service", handler);
  }, [services]);

  const subjectLabel =
    selectedServiceIndex !== null &&
    selectedSubjectValue !== "" &&
    selectedSubjectValue !== "other"
      ? services[selectedServiceIndex].tags[parseInt(selectedSubjectValue, 10)]
      : null;
  const serviceNote =
    showCustomInput && customService.trim()
      ? `Service: ${selectedServiceTitle} — ${customService}`
      : selectedServiceIndex !== null && subjectLabel
        ? `Service: ${services[selectedServiceIndex].title} — ${subjectLabel}`
        : "";

  const calLink = buildCalEmbedPath(
    consultationSlugs[selectedConsultation],
    serviceNote || null,
  );

  const hasValidSubject =
    selectedSubjectValue !== "" &&
    (selectedSubjectValue !== "other" || customService.trim() !== "");
  const canBook = selectedServiceIndex !== null && hasValidSubject;

  const currentSubServiceIds =
    selectedServiceIndex !== null
      ? ((bookingServicesData as Record<string, string[]>)[
          serviceIds[selectedServiceIndex]
        ] ?? [])
      : [];
  const currentSubServiceLabels =
    selectedServiceIndex !== null ? services[selectedServiceIndex].tags : [];

  useEffect(() => {
    if (!calOpen) return;
    const node = calContainerRef.current;
    if (!node) return;

    let cancelled = false;
    node.innerHTML = "";

    (async () => {
      const cal = await getCalApi({ namespace: "appel-decouverte" });
      if (cancelled) return;
      cal("ui", {
        hideEventTypeDetails: false,
        ...calEmbedUiConfig,
      });
      cal("inline", {
        calLink,
        elementOrSelector: node,
        config: {
          layout: calEmbedUiConfig.layout,
          theme: calEmbedUiConfig.theme,
          useSlotsViewOnSmallScreen: calEmbedUiConfig.useSlotsViewOnSmallScreen,
        },
      });
    })();

    const applyIframeSizing = () => {
      const iframe = node.querySelector("iframe") as HTMLIFrameElement | null;
      if (!iframe) return false;
      iframe.style.width = "100%";
      iframe.style.maxWidth = "100%";
      iframe.style.border = "0";
      iframe.style.display = "block";
      iframe.style.backgroundColor = "transparent";
      // Payment + Stripe needs height; desktop min ~1000px so "Pay" isn’t clipped.
      // Narrow viewports use almost full height so inner Cal.com can scroll if needed.
      if (typeof window !== "undefined") {
        const gap = 16;
        const available = window.innerHeight - gap;
        const minH = window.innerWidth >= 768 ? 1000 : Math.min(available, 720);
        iframe.style.height = `${Math.max(available, minH)}px`;
      } else {
        iframe.style.height = "min(100dvh - 1rem, 1100px)";
      }
      // Must allow scrolling — required when Cal content is taller than iframe.
      iframe.setAttribute("scrolling", "yes");
      return true;
    };

    applyIframeSizing();
    const observer = new MutationObserver(() => {
      applyIframeSizing();
    });
    observer.observe(node, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [calOpen, calLink]);

  useEffect(() => {
    if (!calOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [calOpen]);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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

              <h3 className="mt-6 font-heading text-lg font-bold text-accent">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="font-body text-xs uppercase tracking-wider text-text">
                  {item.duration}
                </span>
              </div>

              <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text">
                {item.desc}
              </p>

              <div className="mt-6 border-t border-white/5 pt-4">
                <span className="font-heading text-2xl font-bold text-accent">
                  {item.price}
                </span>
                {item.priceNote && (
                  <span className="ml-2 font-body text-xs text-text">
                    {item.priceNote}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="max-w-md flex-1 space-y-3">
          <div>
            <label className="mb-2 block font-body text-xs font-bold uppercase tracking-[0.2em] text-text">
              {t("serviceLabel")}
            </label>
            <div className="relative">
              <select
                value={
                  selectedServiceIndex === null ? "" : selectedServiceIndex
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedServiceIndex(
                    val === "" ? null : parseInt(val, 10),
                  );
                  setSelectedSubjectValue("");
                  if (val === "" || serviceIds[parseInt(val, 10)] !== "other") {
                    setCustomService("");
                  }
                }}
                className="w-full appearance-none border border-black/10 bg-white px-4 py-3 pr-10 font-body text-sm text-text transition-colors focus:border-accent/40 focus:outline-none"
              >
                <option value="">{t("servicePlaceholder")}</option>
                {serviceIds.map((id, i) => (
                  <option key={id} value={i}>
                    {services[i].title}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text/50"
                size={16}
              />
            </div>
          </div>

          {selectedServiceIndex !== null && (
            <div>
              <label className="mb-2 block font-body text-xs font-bold uppercase tracking-[0.2em] text-text">
                {t("subServiceLabel")}
              </label>
              <div className="relative">
                <select
                  value={selectedSubjectValue}
                  onChange={(e) => setSelectedSubjectValue(e.target.value)}
                  className="w-full appearance-none border border-black/10 bg-white px-4 py-3 pr-10 font-body text-sm text-text transition-colors focus:border-accent/40 focus:outline-none"
                >
                  <option value="">{t("subServicePlaceholder")}</option>
                  {currentSubServiceIds.map((_, j) => (
                    <option key={j} value={String(j)}>
                      {currentSubServiceLabels[j]}
                    </option>
                  ))}
                  <option value="other">{t("subjectOtherOption")}</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text/50"
                  size={16}
                />
              </div>
            </div>
          )}

          {showCustomInput && (
            <input
              type="text"
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder={t("customServicePlaceholder")}
              className="w-full border border-black/10 bg-white px-4 py-3 font-body text-sm text-text transition-colors placeholder:text-text/50 focus:border-accent/40 focus:outline-none"
            />
          )}
        </div>

        <button
          disabled={!canBook}
          type="button"
          onClick={async () => {
            if (!canBook) return;
            setCalOpen(true);
          }}
          className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-8 py-3 font-body text-sm font-bold uppercase tracking-widest text-accent transition-all hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Calendar size={16} strokeWidth={1.5} />
          {t("bookButton")}
        </button>
      </div>

      <p className="mt-4 max-w-xl font-body text-xs leading-relaxed text-text/50">
        {t.rich("legalNotice", {
          privacy: (chunks) => (
            <Link
              href={{
                pathname: "/politique",
                hash: "partie-confidentialite",
              }}
              className="text-accent/70 underline decoration-accent/20 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
            >
              {chunks}
            </Link>
          ),
          terms: (chunks) => (
            <Link
              href={{ pathname: "/politique", hash: "partie-conditions" }}
              className="text-accent/70 underline decoration-accent/20 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      {calOpen && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto overscroll-y-contain bg-black/80 px-2 pb-6 pt-2 backdrop-blur-md [-webkit-overflow-scrolling:touch]"
          aria-modal="true"
          role="dialog"
        >
          <button
            type="button"
            onClick={() => setCalOpen(false)}
            className="fixed right-2 top-2 z-101 inline-flex cursor-pointer items-center gap-2 border border-white/20 bg-zinc-950/95 px-3 py-1.5 font-body text-xs font-bold uppercase tracking-widest text-white/90 shadow-lg transition-colors hover:border-accent/50 hover:text-white sm:right-3 sm:top-3"
            aria-label="Close"
          >
            <X size={14} strokeWidth={1.5} className="text-accent" />
            Fermer
          </button>

          {/* Wide shell: Cal 3-col calendar; shell must not clip — scroll = overlay + iframe */}
          <div className="mt-10 w-full max-w-[min(100vw-1rem,1320px)] shrink-0 sm:mt-12">
            <div
              id="cal-inline-container"
              className="cal-embed-shell w-full overflow-x-auto overflow-y-visible rounded-lg bg-zinc-950 ring-1 ring-white/10 shadow-2xl"
              ref={calContainerRef}
            />
          </div>
        </div>
      )}
    </>
  );
}
