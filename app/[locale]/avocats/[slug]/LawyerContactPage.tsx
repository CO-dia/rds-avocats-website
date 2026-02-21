"use client";

import { useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Phone,
  Mail,
  CalendarDays,
  UserPlus,
  QrCode,
  X,
  Share2,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import type { Lawyer } from "@/app/data/lawyers";

const socialIcons: Record<string, typeof Globe> = {
  linkedin: Linkedin,
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

  lawyer.socials.forEach((s) => {
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
  const [qrOpen, setQrOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const lawyerTitle = tLawyers(lawyer.titleKey);
  const lawyerDescription = tLawyers(lawyer.descriptionKey);

  function openQr() {
    setPageUrl(window.location.href);
    setQrOpen(true);
  }

  return (
    <div className="relative min-h-dvh bg-background">
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold-dim backdrop-blur-md transition-colors hover:text-gold"
      >
        <ArrowLeft size={14} />
        {t("backHome")}
      </Link>

      {/* Desktop: two-column card layout */}
      <div className="hidden lg:flex lg:min-h-dvh lg:items-center lg:justify-center lg:p-12">
        <div className="flex w-full max-w-5xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
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
                <span className="text-accent">{lawyer.lastName}</span>
              </h1>
              <p className="mt-1 font-body text-sm text-gold-dim">
                {lawyerTitle}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-black/40 backdrop-blur-xl">
            <div className="p-8 xl:p-10">
              <div className="grid grid-cols-3 gap-3">
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
                <button
                  onClick={openQr}
                  className="group flex flex-col items-center gap-2 border border-white/10 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 active:scale-95"
                >
                  <QrCode size={22} strokeWidth={1.5} className="text-accent transition-transform group-hover:scale-110" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">{t("qrCode")}</span>
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {lawyer.phones.map((phone) => (
                  <a key={phone.number} href={`tel:${phone.number.replace(/\s/g, "")}`} className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                      <Phone size={18} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dim/60">{t(phone.labelKey)}</p>
                      <p className="font-body text-sm text-gold">{phone.number}</p>
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
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dim/60">{t(email.labelKey)}</p>
                      <p className="truncate font-body text-sm text-gold">{email.address}</p>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-gold-dim/30 transition-colors group-hover:text-accent" />
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-5 bg-accent" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{t("about")}</span>
                </div>
                <div className="border border-white/5 bg-white/2 p-5">
                  <p className="font-body text-sm leading-relaxed text-gold/80">{lawyerDescription}</p>
                </div>
              </div>

              {lawyer.socials.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-px w-5 bg-accent" />
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{t("socials")}</span>
                  </div>
                  <div className="space-y-3">
                    {lawyer.socials.map((social) => {
                      const Icon = socialIcons[social.platform] || Globe;
                      return (
                        <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10">
                            <Icon size={18} strokeWidth={1.5} className="text-accent" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-body text-sm font-bold text-gold">{social.label}</p>
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
                className="mt-6 flex w-full items-center justify-center gap-3 border border-white/10 bg-white/2 p-4 font-body text-xs font-bold uppercase tracking-widest text-gold-dim transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-gold active:scale-[0.98]"
              >
                <Share2 size={16} strokeWidth={1.5} />
                {t("share")}
              </button>

              <div className="mt-8 flex flex-col items-center gap-2">
                <Link href="/" className="font-heading text-lg font-bold tracking-wider text-accent transition-colors hover:text-accent-light">
                  RDS<span className="text-gold">.</span>Avocats
                </Link>
                <p className="font-heading text-xs italic text-gold/40">{t("tagline")}</p>
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
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-background" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-6">
            <div className="mx-auto max-w-lg">
              <div className="border border-white/10 bg-black/80 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="h-px w-5 bg-accent" />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    {lawyer.company}
                  </span>
                </div>
                <h1 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  {lawyer.firstName}{" "}
                  <span className="text-accent">{lawyer.lastName}</span>
                </h1>
                <p className="mt-1 font-body text-sm text-gold-dim">
                  {lawyerTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-lg px-6 pb-40 pt-24 sm:pt-28">
        <div className="grid grid-cols-3 gap-3">
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

          <button
            onClick={openQr}
            className="group flex flex-col items-center gap-2 border border-white/10 bg-white/2 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 active:scale-95"
          >
            <QrCode
              size={22}
              strokeWidth={1.5}
              className="text-accent transition-transform group-hover:scale-110"
            />
            <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gold-dim">
              {t("qrCode")}
            </span>
          </button>
        </div>

        <div className="mt-8 space-y-3">
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
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dim/60">
                  {t(phone.labelKey)}
                </p>
                <p className="font-body text-sm text-gold group-hover:text-gold">
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
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dim/60">
                  {t(email.labelKey)}
                </p>
                <p className="truncate font-body text-sm text-gold group-hover:text-gold">
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

        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-5 bg-accent" />
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              {t("about")}
            </span>
          </div>
          <div className="border border-white/5 bg-white/2 p-5">
            <p className="font-body text-sm leading-relaxed text-gold/80">
              {lawyerDescription}
            </p>
          </div>
        </div>

        {lawyer.socials.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-5 bg-accent" />
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {t("socials")}
              </span>
            </div>
            <div className="space-y-3">
              {lawyer.socials.map((social) => {
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
                      <p className="font-body text-sm font-bold text-gold">
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
          className="mt-8 flex w-full items-center justify-center gap-3 border border-white/10 bg-white/2 p-4 font-body text-xs font-bold uppercase tracking-widest text-gold-dim transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-gold active:scale-[0.98]"
        >
          <Share2 size={16} strokeWidth={1.5} />
          {t("share")}
        </button>

        <div className="mt-12 flex flex-col items-center gap-2">
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-wider text-accent transition-colors hover:text-accent-light"
          >
            RDS<span className="text-gold">.</span>Avocats
          </Link>
          <p className="font-heading text-xs italic text-gold/40">
            {t("tagline")}
          </p>
        </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="animate-fade-in-up relative mx-6 w-full max-w-xs border border-white/10 bg-black/95 p-8 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrOpen(false)}
              className="absolute right-4 top-4 text-gold-dim transition-colors hover:text-gold"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-5 bg-accent" />
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {t("scanToShare")}
                </span>
                <div className="h-px w-5 bg-accent" />
              </div>

              <h3 className="mb-6 font-heading text-lg font-bold text-gold">
                {lawyer.firstName} {lawyer.lastName}
              </h3>

              <div className="rounded-sm border border-white/10 bg-white p-4">
                <QRCodeSVG
                  value={pageUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#6A1B2E"
                  level="M"
                />
              </div>

              <p className="mt-4 text-center font-body text-xs text-gold-dim/60">
                {t("scanDescription")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
