import { NextResponse } from 'next/server';

const sampleAppointments = [
  // Language Exams - Goethe
  { id: "1", source: "Goethe-Institut", category: "language-exam", title: "Goethe-Zertifikat B1", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-15", slots_available: 8, total_slots: 20, price: 150, link: "https://www.goethe.de" },
  { id: "2", source: "Goethe-Institut", category: "language-exam", title: "Goethe-Zertifikat A2", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-18", slots_available: 12, total_slots: 20, price: 130, link: "https://www.goethe.de" },
  { id: "3", source: "Goethe-Institut", category: "language-exam", title: "Goethe-Zertifikat C1", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-03-22", slots_available: 5, total_slots: 15, price: 220, link: "https://www.goethe.de" },
  { id: "4", source: "Goethe-Institut", category: "language-exam", title: "Goethe-Zertifikat B2", location: "Frankfurt", lat: 50.1109, lng: 8.6821, date: "2026-03-20", slots_available: 3, total_slots: 18, price: 180, link: "https://www.goethe.de" },
  { id: "5", source: "Goethe-Institut", category: "language-exam", title: "Goethe-Zertifikat A1", location: "Köln", lat: 50.9375, lng: 6.9603, date: "2026-03-12", slots_available: 15, total_slots: 20, price: 120, link: "https://www.goethe.de" },
  
  // Language Exams - Telc
  { id: "6", source: "Telc", category: "language-exam", title: "Telc B1 Deutschtest für Zuwanderer", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-16", slots_available: 6, total_slots: 25, price: 140, link: "https://www.telc.net" },
  { id: "7", source: "Telc", category: "language-exam", title: "Telc B2", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-25", slots_available: 9, total_slots: 25, price: 160, link: "https://www.telc.net" },
  { id: "8", source: "Telc", category: "language-exam", title: "Telc C1", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-04-01", slots_available: 4, total_slots: 20, price: 200, link: "https://www.telc.net" },
  { id: "9", source: "Telc", category: "language-exam", title: "Telc A2", location: "Stuttgart", lat: 48.7758, lng: 9.1829, date: "2026-03-14", slots_available: 11, total_slots: 20, price: 120, link: "https://www.telc.net" },
  
  // Citizenship - BAMF
  { id: "10", source: "BAMF", category: "citizenship", title: "Einbürgerungstest (Celem)", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-20", slots_available: 3, total_slots: 25, price: 25, link: "https://www.bamf.de" },
  { id: "11", source: "BAMF", category: "citizenship", title: "Einbürgerungstest (Leben in Deutschland)", location: "Frankfurt", lat: 50.1109, lng: 8.6821, date: "2026-03-22", slots_available: 5, total_slots: 25, price: 25, link: "https://www.bamf.de" },
  { id: "12", source: "BAMF", category: "citizenship", title: "Einbürgerungstest", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-28", slots_available: 0, total_slots: 20, price: 25, link: "https://www.bamf.de" },
  
  // Bürgeramt
  { id: "13", source: "Bürgeramt", category: "buergeramt", title: "Meldebescheinigung", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-05", slots_available: 2, total_slots: 10, price: null, link: "https://service.berlin.de" },
  { id: "14", source: "Bürgeramt", category: "buergeramt", title: "Personalausweis beantragen", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-03-08", slots_available: 4, total_slots: 10, price: null, link: "https://www.hamburg.de" },
  { id: "15", source: "Bürgeramt", category: "buergeramt", title: "Reisepass beantragen", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-10", slots_available: 1, total_slots: 8, price: null, link: "https://www.muenchen.de" },
  { id: "16", source: "Bürgeramt", category: "buergeramt", title: "Führungszeugnis", location: "Köln", lat: 50.9375, lng: 6.9603, date: "2026-03-06", slots_available: 6, total_slots: 10, price: null, link: "https://www.stadt-koeln.de" },
  { id: "17", source: "Bürgeramt", category: "buergeramt", title: "Gewerbeanmeldung", location: "Frankfurt", lat: 50.1109, lng: 8.6821, date: "2026-03-12", slots_available: 3, total_slots: 8, price: null, link: "https://www.frankfurt.de" },
  
  // KFZ
  { id: "18", source: "KFZ-Stelle", category: "kfz", title: "KFZ-Zulassung", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-07", slots_available: 4, total_slots: 15, price: null, link: "https://www.berlin.de" },
  { id: "19", source: "KFZ-Stelle", category: "kfz", title: "Führerschein beantragen", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-03-09", slots_available: 2, total_slots: 12, price: null, link: "https://www.hamburg.de" },
  { id: "20", source: "KFZ-Stelle", category: "kfz", title: "KFZ-Abmeldung", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-05", slots_available: 8, total_slots: 15, price: null, link: "https://www.muenchen.de" },
  { id: "21", source: "KFZ-Stelle", category: "kfz", title: "Führerschein verlängern", location: "Stuttgart", lat: 48.7758, lng: 9.1829, date: "2026-03-11", slots_available: 5, total_slots: 10, price: null, link: "https://www.stuttgart.de" },
  
  // Gesundheit
  { id: "22", source: "Gesundheitsamt", category: "gesundheit", title: "Impftermin (COVID/Influenza)", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-06", slots_available: 20, total_slots: 50, price: null, link: "https://www.berlin.de" },
  { id: "23", source: "Gesundheitsamt", category: "gesundheit", title: "Facharzttermin", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-03-15", slots_available: 2, total_slots: 8, price: null, link: "https://www.hamburg.de" },
  { id: "24", source: "Gesundheitsamt", category: "gesundheit", title: "Vorsorgeuntersuchung", location: "München", lat: 48.1351, lng: 11.582, date: "2026-03-20", slots_available: 5, total_slots: 10, price: null, link: "https://www.muenchen.de" },
  
  // Bildung
  { id: "25", source: "Bildungsamt", category: "bildung", title: "Kindergartenplatz", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-04-01", slots_available: 15, total_slots: 30, price: null, link: "https://www.berlin.de" },
  { id: "26", source: "Bildungsamt", category: "bildung", title: "Schulanmeldung", location: "Hamburg", lat: 53.5511, lng: 9.9937, date: "2026-04-10", slots_available: 25, total_slots: 50, price: null, link: "https://www.hamburg.de" },
  { id: "27", source: "Bildungsamt", category: "bildung", title: "Weiterbildungsberatung", location: "Frankfurt", lat: 50.1109, lng: 8.6821, date: "2026-03-18", slots_available: 8, total_slots: 15, price: null, link: "https://www.frankfurt.de" },
  
  // TestDaF
  { id: "28", source: "TestDaF", category: "language-exam", title: "TestDaF NTD", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-04-15", slots_available: 12, total_slots: 30, price: 195, link: "https://www.testdaf.de" },
  { id: "29", source: "TestDaF", category: "language-exam", title: "TestDaF NTD", location: "München", lat: 48.1351, lng: 11.582, date: "2026-04-20", slots_available: 8, total_slots: 30, price: 195, link: "https://www.testdaf.de" },
  
  // ÖSD
  { id: "30", source: "ÖSD", category: "language-exam", title: "ÖSD Zertifikat B1", location: "Berlin", lat: 52.52, lng: 13.405, date: "2026-03-25", slots_available: 10, total_slots: 20, price: 140, link: "https://www.osd.at" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  let filtered = [...sampleAppointments];

  if (category && category !== 'all') {
    filtered = filtered.filter(apt => apt.category === category);
  }

  if (location) {
    filtered = filtered.filter(apt => 
      apt.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (source) {
    filtered = filtered.filter(apt => 
      apt.source.toLowerCase() === source.toLowerCase()
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(apt => 
      apt.title.toLowerCase().includes(searchLower) ||
      apt.location.toLowerCase().includes(searchLower) ||
      apt.source.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
    lastUpdated: new Date().toISOString(),
  });
}
