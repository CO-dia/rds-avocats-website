"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Phone,
  Mail,
  CalendarDays,
  UserPlus,
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import type { Lawyer } from "@/app/data/lawyers";

const socialIcons: Record<string, typeof Globe> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
};

function generateVCard(lawyer: Lawyer, title: string, description: string): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lawyer.lastName};${lawyer.firstName};;;`,
    `FN:${lawyer.firstName} ${lawyer.lastName}`,
    `ORG:${lawyer.company}`,
    `TITLE:${title}`,
  ];

  lawyer.phones.forEach((p) => {
    lines.push(`TEL;TYPE=WORK,VOICE:${p.number.replace(/\s/g, "")}`);
  });

  lawyer.emails.forEach((e) => {
    lines.push(`EMAIL;TYPE=WORK:${e.address}`);
  });

  if (description) {
    lines.push(`NOTE:${description.replace(/\n/g, "\\n")}`);
  }

  lawyer.socials.filter((s) => s.platform !== "linkedin").forEach((s) => {
    lines.push(`URL:${s.url}`);
  });

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function downloadVCard(lawyer: Lawyer, title: string, description: string) {
  const vcf = generateVCard(lawyer, title, description);
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${lawyer.firstName}_${lawyer.lastName}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function shareContact(lawyer: Lawyer, title: string) {
  const url = window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${lawyer.firstName} ${lawyer.lastName} — ${lawyer.company}`,
        text: title,
        url,
      });
    } catch {
      // User cancelled
    }
  } else {
    await navigator.clipboard.writeText(url);
  }
}

export default function LawyerContactPage({ lawyer }: { lawyer: Lawyer }) {
  const t = useTranslations("Lawyer");
  const tLawyers = useTranslations("Lawyers");
  const [pageUrl, setPageUrl] = useState("");

  const lawyerTitle = tLawyers(lawyer.titleKey);
  const lawyerDescription = tLawyers(lawyer.descriptionKey);
  const socials = lawyer.socials.filter((s) => s.platform !== "linkedin");

  useEffect(() => {
    setPageUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  return (
    <div className="relative min-h-dvh bg-background">
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold-dim backdrop-blur-md transition-colors hover:text-gold"
      >
        <ArrowLeft size={14} />
        {t("backHome")}
      </Link>

      <button
        type="button"
        onClick={() => window.open(lawyer.calLink, "_blank")}
        className="fixed right-4 top-4 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 font-body text-xs font-bold uppercase tracking-widest text-gold-dim backdrop-blur-md transition-colors hover:border-accent/40 hover:text-gold"
      >
        <CalendarDays size={14} strokeWidth={1.5} className="text-accent" />
        {t("appointment")}
      </button>

      {/* Desktop: two-column card layout */}
      <div className="hidden lg:flex lg:min-h-dvh lg:items-center lg:justify-center lg:p-12">
        <div className="flex w-full max-w-5xl overflow-hidden border border-black/5 shadow-2xl shadow-black/10">
          <div className="relative w-[420px] shrink-0">
            <Image
              src={lawyer.photo}
              alt={`${lawyer.firstName} ${lawyer.lastName}`}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-5 bg-accent" />
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {lawyer.company}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-gold">
                {lawyer.firstName}{" "}
                <span className="text-white">{lawyer.lastName}</span>
              </h1>
              <p className="mt-1 font-body text-sm text-gold-dim">
                {lawyerTitle}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-background">
            <div className="p-8 xl:p-10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.open(lawyer.calLink, "_blank")}
                  className="group flex flex-col items-center gap-2 border border-accent/30 bg-accent/5 p-4 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 active:scale-95"
                >
                  <CalendarDays size={22} strokeWidth={1.5} className="text-accent transition-transform group-hover:scale-110" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">{t("appointment")}</span>
                </button>
                <button
                  onClick={() => downloadVCard(lawyer, lawyerTitle, lawyerDescription)}
                  className="group flex flex-col items-center gap-2 border border-white/10 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 active:scale-95"
                >
                  <UserPlus size={22} strokeWidth={1.5} className="text-accent transition-transform group-hover:scale-110" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">{t("addContact")}</span>
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1 space-y-3">
                {lawyer.phones.map((phone) => (
                  <a key={phone.number} href={`tel:${phone.number.replace(/\s/g, "")}`} className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                      <Phone size={18} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-text/70">{t(phone.labelKey)}</p>
                      <p className="font-body text-sm text-text">{phone.number}</p>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent" />
                  </a>
                ))}
                {lawyer.emails.map((email) => (
                  <a key={email.address} href={`mailto:${email.address}`} className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                      <Mail size={18} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-text/70">{t(email.labelKey)}</p>
                      <p className="truncate font-body text-sm text-text">{email.address}</p>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent" />
                  </a>
                ))}
                </div>
                {pageUrl && (
                  <div className="shrink-0 border border-white/5 bg-white/2 p-4">
                    <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      {t("qrCode")}
                    </p>
                    <QRCodeSVG
                      value={pageUrl}
                      size={120}
                      bgColor="#ffffff"
                      fgColor="#6A1B2E"
                      level="M"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-5 bg-accent" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{t("about")}</span>
                </div>
                <div className="border border-white/5 bg-white/2 p-5">
                  <p className="font-body text-sm leading-relaxed text-text">{lawyerDescription}</p>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-px w-5 bg-accent" />
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{t("socials")}</span>
                  </div>
                  <div className="space-y-3">
                    {socials.map((social) => {
                      const Icon = socialIcons[social.platform] || Globe;
                      return (
                        <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                            <Icon size={18} strokeWidth={1.5} className="text-accent" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-body text-sm font-bold text-text">{social.label}</p>
                          </div>
                          <ExternalLink size={14} className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={() => shareContact(lawyer, lawyerTitle)}
                className="mt-6 flex w-full items-center justify-center gap-3 border border-white/10 bg-white/2 p-4 font-body text-xs font-bold uppercase tracking-widest text-text transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent active:scale-[0.98]"
              >
                <Share2 size={16} strokeWidth={1.5} />
                {t("share")}
              </button>

              <div className="mt-10 flex flex-col items-center">
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src="/logo.png"
                    alt="RDS Avocats"
                    width={320}
                    height={96}
                    className="h-12 w-auto"
                  />
                  <span className="sr-only">RDS Avocats</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="relative">
          <div className="relative h-[65vh] min-h-[420px] w-full overflow-hidden sm:h-[55vh]">
            <Image
              src={lawyer.photo}
              alt={`${lawyer.firstName} ${lawyer.lastName}`}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-white" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-6">
            <div className="mx-auto max-w-lg">
              <div className="border border-white/10 bg-accent/95 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="h-px w-5 bg-accent" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    {lawyer.company}
                  </span>
                </div>
                <h1 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  {lawyer.firstName}{" "}
                  <span className="text-white">{lawyer.lastName}</span>
                </h1>
                <p className="mt-1 font-body text-sm text-gold-dim">
                  {lawyerTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-lg px-6 pb-40 pt-24 sm:pt-28">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => window.open(lawyer.calLink, "_blank")}
            className="group flex flex-col items-center gap-2 border border-accent/30 bg-accent/5 p-4 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 active:scale-95"
          >
            <CalendarDays
              size={22}
              strokeWidth={1.5}
              className="text-accent transition-transform group-hover:scale-110"
            />
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">
              {t("appointment")}
            </span>
          </button>

          <button
            onClick={() => downloadVCard(lawyer, lawyerTitle, lawyerDescription)}
            className="group flex flex-col items-center gap-2 border border-white/10 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 active:scale-95"
          >
            <UserPlus
              size={22}
              strokeWidth={1.5}
              className="text-accent transition-transform group-hover:scale-110"
            />
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">
              {t("addContact")}
            </span>
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1 space-y-3">
          {lawyer.phones.map((phone) => (
            <a
              key={phone.number}
              href={`tel:${phone.number.replace(/\s/g, "")}`}
              className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                <Phone size={18} strokeWidth={1.5} className="text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-text/70">
                  {t(phone.labelKey)}
                </p>
                <p className="font-body text-sm text-text group-hover:text-gold">
                  {phone.number}
                </p>
              </div>
              <ExternalLink
                size={14}
              className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent"
            />
          </a>
        ))}

        {lawyer.emails.map((email) => (
          <a
            key={email.address}
            href={`mailto:${email.address}`}
            className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
              <Mail size={18} strokeWidth={1.5} className="text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-text/70">
                {t(email.labelKey)}
              </p>
              <p className="truncate font-body text-sm text-text group-hover:text-gold">
                {email.address}
              </p>
            </div>
            <ExternalLink
              size={14}
              className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent"
            />
          </a>
        ))}
          </div>
          {pageUrl && (
            <div className="shrink-0 border border-white/5 bg-white/2 p-4">
              <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {t("qrCode")}
              </p>
              <QRCodeSVG
                value={pageUrl}
                size={120}
                bgColor="#ffffff"
                fgColor="#6A1B2E"
                level="M"
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-5 bg-accent" />
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              {t("about")}
            </span>
          </div>
          <div className="border border-white/5 bg-white/2 p-5">
            <p className="font-body text-sm leading-relaxed text-text">
              {lawyerDescription}
            </p>
          </div>
        </div>

        {socials.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-5 bg-accent" />
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {t("socials")}
              </span>
            </div>
            <div className="space-y-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.platform] || Globe;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-accent"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                    <p className="font-body text-sm font-bold text-text">
                      {social.label}
                    </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => shareContact(lawyer, lawyerTitle)}
          className="mt-8 flex w-full items-center justify-center gap-3 border border-white/10 bg-white/2 p-4 font-body text-xs font-bold uppercase tracking-widest text-text transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent active:scale-[0.98]"
        >
          <Share2 size={16} strokeWidth={1.5} />
          {t("share")}
        </button>

        <div className="mt-14 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="RDS Avocats"
              width={320}
              height={96}
              className="h-12 w-auto"
            />
            <span className="sr-only">RDS Avocats</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
