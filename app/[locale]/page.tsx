import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import Booking from "../components/Booking";
import Footer from "../components/Footer";

export default function Home() {
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
