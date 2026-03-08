# RDS Avocats

Website for RDS Avocats — law firm specializing in business law, business immigration, commercial, corporate, family, criminal and civil law.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **next-intl** — internationalization (English / French)
- **Tailwind CSS 4**
- **Cal.com** — embedded consultation booking
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the locale switcher or paths `/en` and `/fr` for language.

## Project structure

| Path              | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| `app/[locale]/`   | Locale-based routes (home, lawyer profile pages)                                    |
| `app/components/` | Shared UI (Header, Hero, About, Team, Services, Booking, Footer)                    |
| `app/data/`       | `lawyers.ts` (team data), `booking-services.json` (services & subjects for booking) |
| `messages/`       | `en.json`, `fr.json` — translations and service/tag labels                          |
| `i18n/`           | next-intl routing and request config                                                |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Booking

The booking section uses Cal.com. Service and subject (sujet) choices are driven by `app/data/booking-services.json` and labels come from `messages/*.json` (Services.items, Booking keys). Selecting “Other” in the subject dropdown shows a free-text field for the consultation note.
