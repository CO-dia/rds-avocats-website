import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLawyerBySlug, getAllLawyerSlugs } from "@/app/data/lawyers";
import LawyerContactPage from "./LawyerContactPage";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllLawyerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) return {};

  return {
    title: `${lawyer.firstName} ${lawyer.lastName} | ${lawyer.company}`,
    description: lawyer.description,
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
