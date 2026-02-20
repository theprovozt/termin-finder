import { NextResponse } from 'next/server';

// In-memory cache for demo (would use database in production)
let cachedData = {
  lastUpdated: null,
  appointments: []
};

// Sample data for demonstration
const sampleAppointments = [
  {
    id: "1",
    source: "Goethe",
    category: "language-exam",
    title: "Goethe-Zertifikat B1",
    location: "Berlin",
    lat: 52.52,
    lng: 13.405,
    date: "2026-03-15",
    slots_available: 5,
    total_slots: 20,
    price: 120,
    link: "https://goethe.de",
  },
  {
    id: "2",
    source: "Telc",
    category: "language-exam",
    title: "Telc B1 Deutschtest für Zuwanderer",
    location: "München",
    lat: 48.1351,
    lng: 11.582,
    date: "2026-03-20",
    slots_available: 12,
    total_slots: 20,
    price: 130,
    link: "https://telc.net",
  },
  {
    id: "3",
    source: "BAMF",
    category: "citizenship",
    title: "Einbürgerungstest",
    location: "Frankfurt",
    lat: 50.1109,
    lng: 8.6821,
    date: "2026-04-01",
    slots_available: 3,
    total_slots: 15,
    price: 25,
    link: "https://bamf.de",
  },
  {
    id: "4",
    source: "Goethe",
    category: "language-exam",
    title: "Goethe-Zertifikat A2",
    location: "Hamburg",
    lat: 53.5511,
    lng: 9.9937,
    date: "2026-03-10",
    slots_available: 8,
    total_slots: 20,
    price: 100,
    link: "https://goethe.de",
  },
  {
    id: "5",
    source: "Telc",
    category: "language-exam",
    title: "Telc B2 Deutschtest",
    location: "Köln",
    lat: 50.9375,
    lng: 6.9603,
    date: "2026-03-25",
    slots_available: 6,
    total_slots: 20,
    price: 140,
    link: "https://telc.net",
  },
  {
    id: "6",
    source: "Goethe",
    category: "language-exam",
    title: "Goethe-Zertifikat C1",
    location: "Stuttgart",
    lat: 48.7758,
    lng: 9.1829,
    date: "2026-03-18",
    slots_available: 4,
    total_slots: 15,
    price: 180,
    link: "https://goethe.de",
  },
  {
    id: "7",
    source: "BAMF",
    category: "citizenship",
    title: "Einbürgerungstest",
    location: "Düsseldorf",
    lat: 51.2277,
    lng: 6.7735,
    date: "2026-04-05",
    slots_available: 7,
    total_slots: 15,
    price: 25,
    link: "https://bamf.de",
  },
  {
    id: "8",
    source: "Telc",
    category: "language-exam",
    title: "Telc A2-B1 Schule",
    location: "Dresden",
    lat: 51.0504,
    lng: 13.7373,
    date: "2026-03-22",
    slots_available: 10,
    total_slots: 20,
    price: 110,
    link: "https://telc.net",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  let filtered = [...sampleAppointments];

  // Apply filters
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
