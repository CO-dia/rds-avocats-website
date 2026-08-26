"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function HomeNavLink({
  hash,
  className,
  onClick,
  children,
}: {
  hash: string;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={{ pathname: "/", hash }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  const navLinks = [
    { label: t("home"), hash: "accueil" },
    { label: t("about"), hash: "a-propos" },
    { label: t("team"), hash: "equipe" },
    { label: t("services"), hash: "services" },
    { label: t("booking"), hash: "rendez-vous" },
    { label: t("contact"), hash: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  const navLinkClassName =
    "text-sm font-body tracking-widest uppercase text-text/80 transition-colors duration-300 hover:text-accent";

  const localeButtonClassName =
    "flex cursor-pointer items-center gap-1.5 border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-body font-bold uppercase tracking-widest text-text/80 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30 hover:text-accent";

  const logo = (
    <span className="inline-flex items-center">
      <Image
        src="/logo.png"
        alt="RDS Avocats"
        width={420}
        height={120}
        className="h-12 w-auto md:h-24"
        priority
      />
    </span>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/90 py-3 shadow-lg shadow-black/10 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {isHome ? (
          <a href="#accueil" className="flex items-center gap-5">
            {logo}
            <span className="sr-only">RDS Avocats</span>
          </a>
        ) : (
          <Link href="/" className="flex items-center gap-5">
            {logo}
            <span className="sr-only">RDS Avocats</span>
          </Link>
        )}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <HomeNavLink
              key={link.hash}
              hash={link.hash}
              className={navLinkClassName}
            >
              {link.label}
            </HomeNavLink>
          ))}
          <button onClick={switchLocale} className={localeButtonClassName}>
            <Globe size={14} strokeWidth={1.5} />
            {t("switchLocale")}
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={solid ? "text-accent md:hidden" : "text-gold md:hidden"}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="animate-fade-in border-t border-black/5 bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <HomeNavLink
                key={link.hash}
                hash={link.hash}
                onClick={() => setMobileOpen(false)}
                className="border-b border-black/5 py-4 text-sm font-body tracking-widest uppercase text-text/80 transition-colors hover:text-accent"
              >
                {link.label}
              </HomeNavLink>
            ))}
            <button
              onClick={() => {
                switchLocale();
                setMobileOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 py-4 text-sm font-body tracking-widest uppercase text-text/80 transition-colors hover:text-accent"
            >
              <Globe size={14} strokeWidth={1.5} />
              {t("switchLocale")}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
