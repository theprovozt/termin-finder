#!/usr/bin/env python3
"""
Main scraper entry point - runs all scrapers and aggregates results
"""
import asyncio
import json
import os
import sys
from datetime import datetime
from typing import List

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from scrapers.goethe import GoetheScraper
from scrapers.telc import TelcScraper
from scrapers.bamf import BamfScraper
from models import Appointment


async def run_all_scrapers() -> List[dict]:
    """Run all scrapers and aggregate results"""
    all_appointments = []
    
    # Run Goethe scraper
    print("=" * 50)
    print("Running Goethe scraper...")
    print("=" * 50)
    
    goethe = GoetheScraper()
    try:
        results = await goethe.run()
        for apt in results:
            appointment_data = apt.to_dict()
            appointment_data['date'] = appointment_data['date'].isoformat() if appointment_data.get('date') else None
            appointment_data['last_updated'] = appointment_data['last_updated'].isoformat()
            all_appointments.append(appointment_data)
        print(f"Found {len(results)} Goethe appointments")
    except Exception as e:
        print(f"Goethe scraper error: {e}")
    
    # Run Telc scraper
    print("=" * 50)
    print("Running Telc scraper...")
    print("=" * 50)
    
    telc = TelcScraper()
    try:
        results = await telc.run()
        for apt in results:
            appointment_data = apt.to_dict()
            appointment_data['date'] = appointment_data['date'].isoformat() if appointment_data.get('date') else None
            appointment_data['last_updated'] = appointment_data['last_updated'].isoformat()
            all_appointments.append(appointment_data)
        print(f"Found {len(results)} Telc appointments")
    except Exception as e:
        print(f"Telc scraper error: {e}")
    
    # Run BAMF scraper
    print("=" * 50)
    print("Running BAMF scraper...")
    print("=" * 50)
    
    bamf = BamfScraper()
    try:
        results = await bamf.run()
        for apt in results:
            appointment_data = apt.to_dict()
            appointment_data['date'] = appointment_data['date'].isoformat() if appointment_data.get('date') else None
            appointment_data['last_updated'] = appointment_data['last_updated'].isoformat()
            all_appointments.append(appointment_data)
        print(f"Found {len(results)} BAMF appointments")
    except Exception as e:
        print(f"BAMF scraper error: {e}")
    
    return all_appointments


async def main():
    """Main entry point"""
    print(f"Starting scraper run at {datetime.now()}")
    print()
    
    appointments = await run_all_scrapers()
    
    # Save to JSON
    output = {
        "last_updated": datetime.now().isoformat(),
        "count": len(appointments),
        "appointments": appointments,
    }
    
    # Save to file
    output_dir = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    output_file = os.path.join(output_dir, 'appointments.json')
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print()
    print("=" * 50)
    print(f"Scraped {len(appointments)} appointments total")
    print(f"Results saved to {output_file}")
    print("=" * 50)
    
    return output


if __name__ == "__main__":
    asyncio.run(main())
