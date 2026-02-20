"""
Main scraper entry point - runs all scrapers and aggregates results
"""
import asyncio
import json
from datetime import datetime
from typing import List

from scrapers import GoetheScraper, TelcScraper, BamfScraper, BurgeramtScraper


async def run_all_scrapers() -> List[dict]:
    """Run all scrapers and aggregate results"""
    all_appointments = []
    
    # Run Goethe scraper
    print("Running Goethe scraper...")
    goethe = GoetheScraper()
    try:
        results = await goethe.run()
        for apt in results:
            all_appointments.append({
                "source": apt.source,
                "category": apt.category,
                "title": apt.title,
                "location": apt.location,
                "date": apt.date.isoformat() if apt.date else None,
                "slots": apt.slots,
                "link": apt.link,
                "last_updated": apt.last_updated.isoformat(),
            })
    except Exception as e:
        print(f"Goethe scraper error: {e}")
    
    # Run Telc scraper
    print("Running Telc scraper...")
    telc = TelcScraper()
    try:
        results = await telc.run()
        for apt in results:
            all_appointments.append({
                "source": apt.source,
                "category": apt.category,
                "title": apt.title,
                "location": apt.location,
                "date": apt.date.isoformat() if apt.date else None,
                "slots": apt.slots,
                "link": apt.link,
                "last_updated": apt.last_updated.isoformat(),
            })
    except Exception as e:
        print(f"Telc scraper error: {e}")
    
    # Run BAMF scraper
    print("Running BAMF scraper...")
    bamf = BamfScraper()
    try:
        results = await bamf.run()
        for apt in results:
            all_appointments.append({
                "source": apt.source,
                "category": apt.category,
                "title": apt.title,
                "location": apt.location,
                "date": apt.date.isoformat() if apt.date else None,
                "slots": apt.slots,
                "link": apt.link,
                "last_updated": apt.last_updated.isoformat(),
            })
    except Exception as e:
        print(f"BAMF scraper error: {e}")
    
    # Run Bürgeramt scraper
    print("Running Bürgeramt scraper...")
    burgeramt = BurgeramtScraper()
    try:
        results = await burgeramt.run()
        for apt in results:
            all_appointments.append({
                "source": apt.source,
                "category": apt.category,
                "title": apt.title,
                "location": apt.location,
                "date": apt.date.isoformat() if apt.date else None,
                "slots": apt.slots,
                "link": apt.link,
                "last_updated": apt.last_updated.isoformat(),
            })
    except Exception as e:
        print(f"Bürgeramt scraper error: {e}")
    
    return all_appointments


async def main():
    """Main entry point"""
    print(f"Starting scraper run at {datetime.now()}")
    
    appointments = await run_all_scrapers()
    
    # Save to JSON (in production, this would go to a database)
    output = {
        "last_updated": datetime.now().isoformat(),
        "count": len(appointments),
        "appointments": appointments,
    }
    
    with open("appointments.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"Scraped {len(appointments)} appointments")
    print("Results saved to appointments.json")


if __name__ == "__main__":
    asyncio.run(main())
