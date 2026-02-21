import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLawyerBySlug, getAllLawyerSlugs } from "@/app/data/lawyers";
import LawyerContactPage from "./LawyerContactPage";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return getAllLawyerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) return {};

  const t = await getTranslations({ locale, namespace: "Lawyers" });

  return {
    title: `${lawyer.firstName} ${lawyer.lastName} | ${lawyer.company}`,
    description: t(lawyer.descriptionKey),
  };
}

export default async function LawyerPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) notFound();

  return <LawyerContactPage lawyer={lawyer} />;
}
