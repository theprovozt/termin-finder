# TerminPro - German Appointment Aggregator

Find and book appointments for language exams, citizenship tests, Bürgeramt, KFZ, and more — all in one place.

## 🚀 Live Site

**https://terminpro.com**

## 📊 Features

- **30+ German cities** covered
- **9 appointment categories:**
  - 📝 Language Exams (Goethe, Telc, TestDaF, ÖSD, DSH)
  - 🇩🇪 Citizenship (BAMF, Ausländerbehörde)
  - 🏛️ Bürgeramt services
  - 🚗 KFZ & Führerschein
  - 🏥 Gesundheit
  - 🎓 Bildung
  - 💼 Jobcenter
  - 💰 Finanzamt
- **Interactive map view**
- **List/Map toggle**
- **Category & location filters**
- **Real-time search**

## 🛠 Tech Stack

- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Scraping:** Python + Playwright

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL (optional, for production)

### Install Frontend

```bash
cd web
npm install
npm run dev
```

### Install Scraper Dependencies

```bash
cd scraper
pip install -r requirements.txt
playwright install chromium
```

### Environment Variables

Create `.env` file in `web/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## 📁 Project Structure

```
termin-finder/
├── web/                    # Next.js frontend
│   ├── app/
│   │   ├── page.tsx       # Main page
│   │   ├── api/           # API routes
│   │   └── components/    # UI components
│   └── public/
├── scraper/                # Python scraper
│   ├── scrapers/          # Individual scrapers
│   ├── models.py          # Data models
│   ├── real_scrapers.py   # Real scraping logic
│   └── comprehensive_scraper.py
├── SPEC.md                 # Project specification
└── README.md
```

## 🔧 Scraper Architecture

The scraper system is designed to work with multiple booking systems:

### Supported Sources

1. **Goethe-Institut** - Language exams (A1-C2)
2. **Telc** - Language tests
3. **TestDaF** - German language test
4. **ÖSD** - Austrian language diplomas
5. **BAMF** - Einbürgerungstest (Citizenship test)
6. **Bürgeramt** - Municipal services
7. **KFZ** - Vehicle registration
8. **Ausländerbehörde** - Immigration office

### Running Scrapers

```bash
# Run all scrapers
cd scraper
python main.py

# Or with real scraping
python real_scrapers.py
```

### Notes on Real Scraping

Some booking systems require:
- **Session handling** - Some use complex auth flows
- **CAPTCHA solving** - May need third-party services
- **Rate limiting** - Respect each system's limits
- **Legal considerations** - Check terms of service

## 📝 API Endpoints

- `GET /api/appointments` - List all appointments
- `GET /api/appointments?category=language-exam` - Filter by category
- `GET /api/appointments?location=Berlin` - Filter by location

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a PR

## 📄 License

MIT

---

Made with 🇩🇪 for Germany
