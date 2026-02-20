# Germany Appointment Aggregator - Specification

## Project Overview
- **Name:** TerminFinder (German Appointment Aggregator)
- **Purpose:** Aggregate appointment bookings from various German government and language institutions into one easy-to-use platform
- **Target Users:** Immigrants, language learners, anyone needing German appointments

## Tech Stack
- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Next.js API Routes
- **Scraping:** Python with Playwright
- **Database:** PostgreSQL (Supabase)
- **Hosting:** Vercel (frontend) + Railway (backend)

## Features

### Phase 1: Core
1. **Search Interface** - Search by appointment type, city/region
2. **Category Filters** - Language exams, citizenship tests, KFZ, Ausländerbehörde, etc.
3. **Results Display** - Show available appointments with date, location, link
4. **Direct Booking Links** - Redirect to official booking pages

### Phase 2: Enhanced
1. **Interactive Calendar View** - Visual availability calendar
2. **Location Map** - Show appointments on map
3. **Availability Alerts** - Email notification when slots open
4. **User Accounts** - Save searches, get notifications

### Phase 3: Scale
1. More appointment types
2. Multiple cities/regions
3. i18n (German + English)

## Appointment Sources (Initial)

### Language Exams
- Goethe-Institut (goethe.de)
- Telc (telc.net)
- TestDaF (testdaf.de)

### Citizenship & Immigration
- Einbürgerungstest (BAMF)
- Ausländerbehörde appointments

### Other
- KFZ appointments
- Bürgeramt appointments

## UI Design

### Color Palette
- Primary: #2563EB (Blue)
- Secondary: #1E40AF (Dark Blue)
- Accent: #10B981 (Green for available)
- Background: #F8FAFC
- Text: #1E293B

### Layout
- **Header:** Logo, search bar, category navigation
- **Hero:** Simple tagline + quick search
- **Content:** Grid of appointment cards
- **Footer:** Links, about

## Data Model

```typescript
interface Appointment {
  id: string;
  source: string;          // e.g., "goethe", "telc", "bamf"
  category: string;       // e.g., "language-exam", "citizenship"
  title: string;          // e.g., "Goethe-Zertifikat B1"
  location: string;       // City name
  date: Date | null;       // Next available date
  slots: number;          // Available slots
  link: string;           // Direct booking URL
  lastUpdated: Date;
}
```

## Project Structure

```
termin-finder/
├── web/                   # Next.js frontend
│   ├── app/
│   │   ├── page.tsx      # Main page
│   │   ├── api/         # API routes
│   │   └── components/  # UI components
│   ├── public/
│   └── package.json
├── scraper/              # Python scraper
│   ├── scrapers/
│   ├── goethe   │.py
│   │   ├── telc.py
│   │   └── bamf.py
│   ├── main.py
│   └── requirements.txt
└── README.md
```
