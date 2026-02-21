import { setRequestLocale } from "next-intl/server";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <Services />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
