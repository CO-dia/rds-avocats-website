import { useTranslations } from "next-intl";
import BookingWidget from "./BookingWidget";

export default function Booking() {
  const t = useTranslations("Booking");

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

        <p
          className="mt-6 max-w-2xl font-body text-base text-gold-dim sm:text-lg"
          style={{ letterSpacing: "0.02em" }}
        >
          {t("description")}
        </p>

        <BookingWidget />
      </div>
    </section>
  );
}
