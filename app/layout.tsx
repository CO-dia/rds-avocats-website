import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "RDS Avocats | Votre avenir, notre mission",
  description:
    "Cabinet d'avocats spécialisé en droit des affaires, immigration d'affaires, droit commercial, corporatif, familial, pénal et civil. Accompagnement stratégique pour bâtir, investir et réussir au Canada.",
  keywords: [
    "avocats",
    "droit des affaires",
    "immigration",
    "Canada",
    "corporatif",
    "commercial",
    "RDS Avocats",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
