import { Scale } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(106,27,46,0.3)_50px,rgba(106,27,46,0.3)_51px),repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(106,27,46,0.3)_50px,rgba(106,27,46,0.3)_51px)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-12 bg-accent/50" />
          <Scale className="text-accent" size={28} strokeWidth={1.5} />
          <div className="h-px w-12 bg-accent/50" />
        </div>

        <h1 className="font-heading text-5xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up">
          <span className="text-gold">RDS</span>{" "}
          <span className="text-accent">Avocats</span>
        </h1>

        <p
          className="mt-6 font-heading text-xl italic text-gold-dim sm:text-2xl md:text-3xl animate-fade-in-up delay-200 opacity-0"
          style={{ letterSpacing: "0.05em" }}
        >
          {t("tagline")}
        </p>

        <div className="mt-8 flex items-center gap-3 animate-fade-in delay-400 opacity-0">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-accent/50" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
          <div className="h-px w-16 bg-linear-to-l from-transparent to-accent/50" />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row animate-fade-in-up delay-500 opacity-0">
          <a
            href="#rendez-vous"
            className="group flex items-center gap-2 rounded-none border border-accent bg-accent/10 px-8 py-3.5 text-sm font-body font-bold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-accent hover:text-white"
          >
            {t("ctaBooking")}
          </a>
          <a
            href="#a-propos"
            className="flex items-center gap-2 rounded-none border border-gold/20 px-8 py-3.5 text-sm font-body font-bold uppercase tracking-widest text-gold-dim transition-all duration-300 hover:border-gold/50 hover:text-gold"
          >
            {t("ctaDiscover")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-gold/30 p-1">
          <div className="mx-auto h-2 w-0.5 rounded-full bg-gold/50" />
        </div>
      </div>
    </section>
  );
}
