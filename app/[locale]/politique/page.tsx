import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PolicyDocumentView from "../../components/PolicyDocument";
import { getPolicy } from "@/app/data/policy";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const policy = getPolicy(locale);

  return {
    title: policy.metaTitle,
    description: policy.metaDescription,
  };
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <PolicyDocumentView policy={getPolicy(locale)} />
      </main>
      <Footer />
    </>
  );
}
