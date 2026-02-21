"use client";

import { useState } from "react";
import {
  ChevronDown,
  Building2,
  Handshake,
  KeyRound,
  Users,
  Briefcase,
  Heart,
  Home,
  Gavel,
  FileText,
  MoreHorizontal,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Corporatif",
    desc: "Incorporation, réorganisation, livre corporatif, charte, etc.",
  },
  {
    icon: Handshake,
    title: "Commercial",
    desc: "Contrats, partenariats, fournisseurs.",
  },
  {
    icon: KeyRound,
    title: "Repreneuriat",
    desc: "Lettre d'intention, lettre d'offre, vérification diligente, contrat de vente, etc.",
  },
  {
    icon: Users,
    title: "Immigration — Personnes",
    desc: "Asile, condition humanitaire.",
  },
  {
    icon: Briefcase,
    title: "Immigration d'affaires",
    desc: "Travail, entreprises.",
  },
  {
    icon: Heart,
    title: "Divorce",
    desc: "À l'amiable ou contesté.",
  },
  {
    icon: Home,
    title: "Famille",
    desc: "Garde, pension alimentaire, etc.",
  },
  {
    icon: Gavel,
    title: "Pénal / Criminel",
    desc: "Conduite avec facultés affaiblies, contestation de ticket, etc.",
  },
  {
    icon: FileText,
    title: "Civil",
    desc: "Réclamation, litige, mise en demeure, etc.",
  },
  {
    icon: MoreHorizontal,
    title: "Autre",
    desc: "Vous avez une situation particulière? Contactez-nous pour en discuter.",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Services
          </span>
        </div>

        <h2
          className="font-heading text-3xl font-bold text-accent sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "0.05em" }}
        >
          Nos domaines
          <br />
          d&apos;expertise
        </h2>

        <p className="mt-6 max-w-2xl font-body text-base text-gold-dim sm:text-lg" style={{ letterSpacing: "0.02em" }}>
          Sélectionnez un domaine pour en savoir plus. Chaque situation est
          unique — nous adaptons notre approche à vos besoins.
        </p>

        <div className="mt-12 grid gap-3 lg:grid-cols-2 lg:gap-4">
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={service.title}
                className={`group border transition-all duration-300 ${
                  isOpen
                    ? "border-accent/40 bg-accent/5"
                    : "border-white/5 bg-white/2 hover:border-accent/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <service.icon
                    className={`shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-gold-dim group-hover:text-accent"
                    }`}
                    size={22}
                    strokeWidth={1.5}
                  />
                  <span className="flex-1 font-heading text-sm font-bold uppercase tracking-wider text-gold">
                    {service.title}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-gold-dim transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                    size={18}
                  />
                </button>
                {isOpen && (
                  <div className="animate-slide-down overflow-hidden border-t border-white/5 px-5 pb-5 pt-4">
                    <p className="font-body text-sm leading-relaxed text-gold/80">
                      {service.desc}
                    </p>
                    <a
                      href="#rendez-vous"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-widest text-accent transition-colors hover:text-accent-light"
                    >
                      Prendre rendez-vous
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
