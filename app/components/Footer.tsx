import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = [
    { label: t("home"), hash: "accueil" },
    { label: t("about"), hash: "a-propos" },
    { label: t("team"), hash: "equipe" },
    { label: t("services"), hash: "services" },
    { label: t("booking"), hash: "rendez-vous" },
  ];

  const legalLinks = [
    {
      label: t("privacy"),
      href: { pathname: "/politique" as const, hash: "partie-confidentialite" },
    },
    {
      label: t("terms"),
      href: { pathname: "/politique" as const, hash: "partie-conditions" },
    },
  ];

  return (
    <footer
      id="contact"
      className="relative border-t border-white/5 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="RDS Avocats"
                width={420}
                height={126}
                className="h-14 w-auto sm:h-20"
              />
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {t("contact")}
            </h4>
            <a
              href="mailto:info@rds-avocats.com"
              className="mt-4 flex items-center gap-3 font-body text-sm text-text transition-colors hover:text-accent"
            >
              <Mail size={16} strokeWidth={1.5} />
              info@rds-avocats.com
            </a>
            <a
              href="https://www.linkedin.com/company/rds-avocats/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-3 font-body text-sm text-text transition-colors hover:text-accent"
            >
              <Linkedin size={16} strokeWidth={1.5} />
              LinkedIn
            </a>
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {t("navigation")}
            </h4>
            <div className="mt-4 flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.hash}
                  href={{ pathname: "/", hash: link.hash }}
                  className="font-body text-sm text-text transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-text/60">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-xs text-text/60 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
