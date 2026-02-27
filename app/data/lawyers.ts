export interface Lawyer {
  slug: string;
  firstName: string;
  lastName: string;
  titleKey: string;
  company: string;
  photo: string;
  phones: { labelKey: string; number: string }[];
  emails: { labelKey: string; address: string }[];
  descriptionKey: string;
  calLink: string;
  socials: { platform: string; url: string; label: string }[];
}

export const lawyers: Lawyer[] = [
  {
    slug: "hanitra",
    firstName: "Hanitra",
    lastName: "Ravalimanantsoa",
    titleKey: "hanitra.title",
    company: "RDS Avocats",
    photo: "/Hanitra.jpeg",
    phones: [{ labelKey: "office", number: "+1 514 569 8793" }],
    emails: [
      { labelKey: "professional", address: "hravalimanantsoa@rds-avocats.com" },
    ],
    descriptionKey: "hanitra.description",
    calLink: "https://cal.com/rds-avocats/hanitra",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/",
        label: "LinkedIn",
      },
    ],
  },
  {
    slug: "fanta",
    firstName: "Fanta",
    lastName: "Sylla",
    titleKey: "fanta.title",
    company: "RDS Avocats",
    photo: "/Fanta.png",
    phones: [{ labelKey: "office", number: "+15142989199" }],
    emails: [
      { labelKey: "professional", address: "fsylla@rds-avocats.com" },
    ],
    descriptionKey: "fanta.description",
    calLink: "https://cal.com/rds-avocats/fanta",
    socials: [],
  },
];

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  return lawyers.find((l) => l.slug === slug);
}

export function getAllLawyerSlugs(): string[] {
  return lawyers.map((l) => l.slug);
}
