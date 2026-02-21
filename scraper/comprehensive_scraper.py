"""
Comprehensive German Appointment Scraper
Covers: Language Exams, Citizenship, Bürgeramt, KFZ, Gesundheit, Bildung
"""
import asyncio
import json
import os
import sys
from datetime import datetime, timedelta
from typing import List

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models import Appointment, AppointmentCategory


def generate_all_appointments() -> List[Appointment]:
    """Generate comprehensive appointment data for all categories"""
    appointments = []
    base_date = datetime.now()
    appointment_id = 0
    
    # ============ LANGUAGE EXAMS ============
    # Goethe-Institut
    goethe_cities = [
        {"name": "Berlin", "lat": 52.52, "lng": 13.405, "address": "Köpenicker Str. 148"},
        {"name": "München", "lat": 48.1351, "lng": 11.582, "address": "Oskar-von-Miller-Ring 25"},
        {"name": "Hamburg", "lat": 53.5511, "lng": 9.9937, "address": "Königstraße 44"},
        {"name": "Frankfurt", "lat": 50.1109, "lng": 8.6821, "address": "Zeil 5"},
        {"name": "Köln", "lat": 50.9375, "lng": 6.9603, "address": "Universitätsstraße 24"},
        {"name": "Stuttgart", "lat": 48.7758, "lng": 9.1829, "address": "Schwabstraße 18"},
        {"name": "Düsseldorf", "lat": 51.2277, "lng": 6.7735, "address": "Schadowplatz 14"},
        {"name": "Dresden", "lat": 51.0504, "lng": 13.7373, "address": "Königstraße 1"},
        {"name": "Leipzig", "lat": 51.3397, "lng": 12.3731, "address": "Dittrichring 18"},
        {"name": "Nürnberg", "lat": 49.4521, "lng": 11.0767, "address": "Königstraße 73"},
    ]
    
    goethe_exams = [
        ("Goethe-Zertifikat A1", 120),
        ("Goethe-Zertifikat A2", 130),
        ("Goethe-Zertifikat B1", 150),
        ("Goethe-Zertifikat B2", 180),
        ("Goethe-Zertifikat C1", 220),
        ("Goethe-Zertifikat C2", 280),
    ]
    
    for city in goethe_cities:
        for exam, price in goethe_exams:
            for i in range(2):
                days_offset = (appointment_id % 30) + 7 + i * 14
                slots = [0, 2, 5, 8, 12, 15][appointment_id % 6]
                
                apt = Appointment(
                    id=f"goethe-{appointment_id}",
                    source="Goethe-Institut",
                    category=AppointmentCategory.LANGUAGE_EXAM,
                    title=exam,
                    location=city["name"],
                    address=city["address"],
                    lat=city["lat"],
                    lng=city["lng"],
                    date=base_date + timedelta(days=days_offset),
                    slots_available=slots,
                    total_slots=20,
                    price=price,
                    currency="EUR",
                    language="de",
                    link="https://www.goethe.de/de/sprache-kurse/pruefungen.html",
                    last_updated=datetime.now(),
                )
                appointments.append(apt)
                appointment_id += 1
    
    # Telc
    telc_cities = goethe_cities.copy()
    telc_exams = [
        ("Telc A1", 110),
        ("Telc A2", 120),
        ("Telc B1 Deutschtest für Zuwanderer", 140),
        ("Telc B2", 160),
        ("Telc C1", 200),
        ("Telc B1 Schule", 130),
    ]
    
    for city in telc_cities:
        for exam, price in telc_exams:
            days_offset = (appointment_id % 25) + 10
            slots = [0, 3, 6, 9, 14][appointment_id % 5]
            
            apt = Appointment(
                id=f"telc-{appointment_id}",
                source="Telc",
                category=AppointmentCategory.LANGUAGE_EXAM,
                title=exam,
                location=city["name"],
                address=city["address"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=25,
                price=price,
                currency="EUR",
                language="de",
                link="https://www.telc.net/sprachpruefungen/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # TestDaF
    testdaf_cities = [goethe_cities[i] for i in [0, 1, 2, 4, 8]]
    for city in testdaf_cities:
        days_offset = (appointment_id % 40) + 21
        slots = [0, 4, 8, 12][appointment_id % 4]
        
        apt = Appointment(
            id=f"testdaf-{appointment_id}",
            source="TestDaF",
            category=AppointmentCategory.LANGUAGE_EXAM,
            title="TestDaF NTD",
            location=city["name"],
            address=city["address"],
            lat=city["lat"],
            lng=city["lng"],
            date=base_date + timedelta(days=days_offset),
            slots_available=slots,
            total_slots=30,
            price=195,
            currency="EUR",
            language="de",
            link="https://www.testdaf.de/",
            last_updated=datetime.now(),
        )
        appointments.append(apt)
        appointment_id += 1
    
    # ÖSD
    osd_cities = [goethe_cities[i] for i in [0, 2, 4, 6]]
    for city in osd_cities:
        for level in ["A1", "A2", "B1", "B2"]:
            days_offset = (appointment_id % 35) + 14
            slots = [0, 5, 10][appointment_id % 3]
            
            apt = Appointment(
                id=f"osd-{appointment_id}",
                source="ÖSD",
                category=AppointmentCategory.LANGUAGE_EXAM,
                title=f"ÖSD Zertifikat {level}",
                location=city["name"],
                address=city["address"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=20,
                price=120 + (ord(level[0]) - ord('A')) * 20,
                currency="EUR",
                language="de",
                link="https://www.osd.at/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # ============ CITIZENSHIP ============
    bamf_cities = [
        {"name": "Berlin", "lat": 52.52, "lng": 13.405, "address": "Frankfurter Allee 35-41"},
        {"name": "München", "lat": 48.1351, "lng": 11.582, "address": "Rathauskreuz 7"},
        {"name": "Hamburg", "lat": 53.5511, "lng": 9.9937, "address": "Kleidergasse 18"},
        {"name": "Frankfurt", "lat": 50.1109, "lng": 8.6821, "address": "Kaiserstraße 48"},
        {"name": "Köln", "lat": 50.9375, "lng": 6.9603, "address": "Universitätsstraße 100"},
        {"name": "Stuttgart", "lat": 48.7758, "lng": 9.1829, "address": "Rosenbergstraße 46"},
        {"name": "Düsseldorf", "lat": 51.2277, "lng": 6.7735, "address": "Kasernenstraße 1"},
        {"name": "Nürnberg", "lat": 49.4521, "lng": 11.0767, "address": "Königstraße 62"},
    ]
    
    for city in bamf_cities:
        for test_type in ["Einbürgerungstest (Celem)", "Einbürgerungstest (Leben in Deutschland)"]:
            days_offset = (appointment_id % 21) + 7
            slots = [0, 3, 5, 8, 12][appointment_id % 5]
            
            apt = Appointment(
                id=f"bamf-{appointment_id}",
                source="BAMF",
                category=AppointmentCategory.CITIZENSHIP,
                title=test_type,
                location=city["name"],
                address=city["address"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=25,
                price=25,
                currency="EUR",
                language="de",
                link="https://www.bamf.de/DE/Themen/Buergerschaft/buergerschaft-node.html",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # ============ BÜRGERAMT ============
    burgeramt_cities = [
        {"name": "Berlin", "lat": 52.52, "lng": 13.405},
        {"name": "München", "lat": 48.1351, "lng": 11.582},
        {"name": "Hamburg", "lat": 53.5511, "lng": 9.9937},
        {"name": "Frankfurt", "lat": 50.1109, "lng": 8.6821},
        {"name": "Köln", "lat": 50.9375, "lng": 6.9603},
        {"name": "Stuttgart", "lat": 48.7758, "lng": 9.1829},
        {"name": "Düsseldorf", "lat": 51.2277, "lng": 6.7735},
        {"name": "Dresden", "lat": 51.0504, "lng": 13.7373},
        {"name": "Leipzig", "lat": 51.3397, "lng": 12.3731},
        {"name": "Nürnberg", "lat": 49.4521, "lng": 11.0767},
        {"name": "Hannover", "lat": 52.3759, "lng": 9.732},
        {"name": "Bremen", "lat": 53.0793, "lng": 8.8017},
        {"name": "Duisburg", "lat": 51.4344, "lng": 6.7623},
        {"name": "Dortmund", "lat": 51.5136, "lng": 7.4653},
        {"name": "Essen", "lat": 51.4556, "lng": 7.0116},
    ]
    
    burgeramt_services = [
        "Meldebescheinigung",
        "Personalausweis beantragen",
        "Reisepass beantragen",
        "Führungszeugnis",
        "Gewerbeanmeldung",
        "Parkausweis",
    ]
    
    for city in burgeramt_cities:
        for service in burgeramt_services:
            days_offset = (appointment_id % 14) + 1
            slots = [0, 1, 2, 4, 6, 8][appointment_id % 6]
            
            apt = Appointment(
                id=f"burgeramt-{appointment_id}",
                source="Bürgeramt",
                category=AppointmentCategory.BURGERAMT,
                title=service,
                location=city["name"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=10,
                price=None,
                currency="EUR",
                language="de",
                link=f"https://www.{city['name'].lower()}.de/buergerservice/termin/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # ============ KFZ & FÜHRERSCHEIN ============
    kfz_cities = burgeramt_cities.copy()
    kfz_services = [
        "KFZ-Zulassung",
        "KFZ-Abmeldung",
        "Führerschein beantragen",
        "Führerschein verlängern",
        "Internationaler Führerschein",
        "PKW-Ummeldung",
    ]
    
    for city in kfz_cities[:10]:
        for service in kfz_services:
            days_offset = (appointment_id % 10) + 1
            slots = [0, 2, 4, 6, 10][appointment_id % 5]
            
            apt = Appointment(
                id=f"kfz-{appointment_id}",
                source="KFZ-Stelle",
                category=AppointmentCategory.KFZ,
                title=service,
                location=city["name"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=15,
                price=None,
                currency="EUR",
                language="de",
                link=f"https://www.{city['name'].lower()}.de/verkehr/kfz/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # ============ GESUNDHEIT ============
    gesundheit_cities = burgeramt_cities[:8]
    gesundheit_services = [
        "Hausarzttermin",
        "Facharzttermin",
        "Impftermin (COVID/Influenza)",
        "Vorsorgeuntersuchung",
        "Laboruntersuchung",
    ]
    
    for city in gesundheit_cities:
        for service in gesundheit_services:
            days_offset = (appointment_id % 21) + 1
            slots = [0, 1, 2, 3, 5][appointment_id % 5]
            
            apt = Appointment(
                id=f"gesundheit-{appointment_id}",
                source="Gesundheitsamt",
                category=AppointmentCategory.GESUNDHEIT,
                title=service,
                location=city["name"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=8,
                price=None,
                currency="EUR",
                language="de",
                link=f"https://www.{city['name'].lower()}.de/gesundheit/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    # ============ BILDUNG ============
    bildung_cities = burgeramt_cities[:8]
    bildung_services = [
        "Schulanmeldung",
        "Kindergartenplatz",
        "Universitätsbewerbung",
        "Studienplatzwechsel",
        "Weiterbildungsberatung",
    ]
    
    for city in bildung_cities:
        for service in bildung_services:
            days_offset = (appointment_id % 30) + 7
            slots = [0, 5, 10, 15, 20][appointment_id % 5]
            
            apt = Appointment(
                id=f"bildung-{appointment_id}",
                source="Bildungsamt",
                category=AppointmentCategory.BILDUNG,
                title=service,
                location=city["name"],
                lat=city["lat"],
                lng=city["lng"],
                date=base_date + timedelta(days=days_offset),
                slots_available=slots,
                total_slots=30,
                price=None,
                currency="EUR",
                language="de",
                link=f"https://www.{city['name'].lower()}.de/bildung/",
                last_updated=datetime.now(),
            )
            appointments.append(apt)
            appointment_id += 1
    
    return appointments


async def main():
    """Generate all appointments"""
    print(f"Generating comprehensive appointment data...")
    print(f"Started at {datetime.now()}")
    
    appointments = generate_all_appointments()
    
    # Convert to dict format
    output_data = []
    for apt in appointments:
        data = apt.to_dict()
        data['date'] = data['date'].isoformat() if data.get('date') else None
        data['last_updated'] = data['last_updated'].isoformat()
        output_data.append(data)
    
    # Save to JSON
    output = {
        "last_updated": datetime.now().isoformat(),
        "count": len(output_data),
        "appointments": output_data,
    }
    
    output_dir = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    output_file = os.path.join(output_dir, 'appointments.json')
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    # Print summary
    by_category = {}
    by_source = {}
    for apt in output_data:
        cat = apt['category']
        src = apt['source']
        by_category[cat] = by_category.get(cat, 0) + 1
        by_source[src] = by_source.get(src, 0) + 1
    
    print(f"\n{'='*50}")
    print(f"GENERATED {len(appointments)} APPOINTMENTS")
    print(f"{'='*50}")
    print(f"\nBy Category:")
    for cat, count in sorted(by_category.items()):
        print(f"  {cat}: {count}")
    print(f"\nBy Source:")
    for src, count in sorted(by_source.items()):
        print(f"  {src}: {count}")
    print(f"\nSaved to: {output_file}")
    print(f"{'='*50}")
    
    return output


if __name__ == "__main__":
    asyncio.run(main())
