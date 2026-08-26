"use client";

import { useEffect, useState } from "react";
import type { PolicyBlock, PolicyDocument, PolicyPart } from "@/app/data/policy";

function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-text">
          {bold[1]}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const external = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
          className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
        >
          {link[1]}
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="mb-3.5 font-body text-[15.5px] leading-relaxed text-text last:mb-0"
            >
              {renderRichText(block.text)}
            </p>
          );
        }
        if (block.type === "callout") {
          return (
            <div
              key={i}
              className="my-5 border-l-[3px] border-accent bg-accent/5 px-5 py-4"
            >
              <p className="font-body text-sm leading-relaxed text-text/80">
                {renderRichText(block.text)}
              </p>
            </div>
          );
        }
        return (
          <ul
            key={i}
            className="mb-3.5 list-disc space-y-2 pl-5 font-body text-[15.5px] leading-relaxed text-text marker:text-accent/70"
          >
            {block.items.map((item) => (
              <li key={item}>{renderRichText(item)}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

function PolicyPartContent({ part }: { part: PolicyPart }) {
  const firstSectionId = part.sections[0]?.id;

  return (
    <section
      id={part.id}
      aria-labelledby={`${part.id}-title`}
      className="mb-16 last:mb-0"
    >
      <h2
        id={`${part.id}-title`}
        className="mb-2 border-b-2 border-accent/15 pb-3.5 font-heading text-2xl font-semibold text-accent"
      >
        {part.title}
      </h2>
      <p className="mb-8 font-body text-[15px] text-text/60">{part.intro}</p>

      {part.sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          className="mb-9 scroll-mt-28 last:mb-0"
        >
          <h3 className="mb-3 flex items-baseline gap-2 font-heading text-lg font-semibold text-text">
            <span className="font-heading text-base font-medium text-accent">
              §
            </span>
            {section.title}
          </h3>
          <PolicyBlocks blocks={section.blocks} />
        </div>
      ))}

      {firstSectionId && (
        <a
          href={`#${firstSectionId}`}
          className="mt-2 inline-block border-b border-black/10 font-body text-[13px] text-text/50 transition-colors hover:border-accent hover:text-accent"
        >
          ↑ {part.backToStart}
        </a>
      )}
    </section>
  );
}

export default function PolicyDocumentView({
  policy,
}: {
  policy: PolicyDocument;
}) {
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(
    policy.privacy.sections[0]?.id ?? null,
  );

  const tocGroups = [
    { title: policy.tocPrivacy, sections: policy.privacy.sections },
    { title: policy.tocTerms, sections: policy.terms.sections },
  ];

  useEffect(() => {
    const ids = [
      ...policy.privacy.sections,
      ...policy.terms.sections,
    ].map((s) => s.id);
    const targets = ids
      .map((id) => window.document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(top.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [policy]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-12 lg:pb-32 lg:pt-40">
      <header className="mb-10 border-b border-black/10 pb-8">
        <p className="mb-2.5 font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
          {policy.eyebrow}
        </p>
        <h1 className="font-heading text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-[40px]">
          {policy.title}
        </h1>
        <p className="mt-2.5 font-body text-[15px] text-text/60">
          <strong className="font-semibold text-text">{policy.updated}</strong>
          {" · "}
          {policy.applicable}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,780px)] lg:gap-14">
        <nav
          aria-label={policy.tocLabel}
          className="border border-black/10 lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:border-0"
        >
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-3 font-body text-sm font-semibold text-text lg:hidden"
            onClick={() => setTocOpen((open) => !open)}
            aria-expanded={tocOpen}
          >
            <span>{policy.tocLabel}</span>
            <span aria-hidden="true">{tocOpen ? "▴" : "▾"}</span>
          </button>

          <div className={`${tocOpen ? "block" : "hidden"} px-4 pb-4 lg:block lg:px-0 lg:pb-0`}>
            {tocGroups.map((group) => (
              <div key={group.title} className="mb-7 last:mb-0">
                <h2 className="mb-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.06em] text-text/50">
                  {group.title}
                </h2>
                <ul className="border-l border-black/10">
                  {group.sections.map((section) => {
                    const isActive = activeId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setTocOpen(false)}
                          className={`-ml-px block border-l-2 py-1.5 pl-3.5 font-body text-sm leading-snug transition-colors ${
                            isActive
                              ? "border-accent font-semibold text-accent"
                              : "border-transparent text-text/50 hover:text-text"
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div>
          <PolicyPartContent part={policy.privacy} />
          <PolicyPartContent part={policy.terms} />
        </div>
      </div>
    </div>
  );
}
