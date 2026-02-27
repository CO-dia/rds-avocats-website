import { Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = [
    { label: t("home"), href: "#accueil" },
    { label: t("about"), href: "#a-propos" },
    { label: t("team"), href: "#equipe" },
    { label: t("services"), href: "#services" },
    { label: t("booking"), href: "#rendez-vous" },
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
          </div>

          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {t("navigation")}
            </h4>
            <div className="mt-4 flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-text transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-text/60">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-accent/50" />
            <div className="h-1 w-1 rounded-full bg-accent/30" />
            <div className="h-1 w-1 rounded-full bg-accent/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
