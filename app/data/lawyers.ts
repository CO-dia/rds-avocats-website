export interface Lawyer {
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  photo: string;
  phones: { label: string; number: string }[];
  emails: { label: string; address: string }[];
  description: string;
  calLink: string;
  socials: { platform: string; url: string; label: string }[];
}

export const lawyers: Lawyer[] = [
  {
    slug: "hanitra",
    firstName: "Hanitra",
    lastName: "Ravalimanantsoa",
    title: "Avocat en droit des affaires",
    company: "RDS Avocats",
    photo: "/Hanitra.jpeg",
    phones: [{ label: "Bureau", number: "+1 514 569 8793" }],
    emails: [
      { label: "Professionnel", address: "hravalimanantsoa@rds-avocats.com" },
    ],
    description:
      "Spécialisée en droit de l'immigration d'affaires, Hanitra accompagne entrepreneurs et entreprises étrangères dans leur implantation au Canada. Son approche stratégique et humaine permet à ses clients de naviguer les complexités de l'immigration avec confiance.",
    calLink: "https://cal.com/rds-avocats/hanitra",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/",
        label: "LinkedIn",
      },
    ],
  },
  // Add more lawyers here following the same structure
];

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  return lawyers.find((l) => l.slug === slug);
}

export function getAllLawyerSlugs(): string[] {
  return lawyers.map((l) => l.slug);
}
