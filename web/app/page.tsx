"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { clsx } from "clsx";

// Types
interface Appointment {
  id: string;
  source: string;
  category: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  date: string | null;
  slots: number;
  link: string;
}

// Mock data with coordinates
const mockAppointments: Appointment[] = [
  {
    id: "1",
    source: "Goethe",
    category: "language-exam",
    title: "Goethe-Zertifikat B1",
    location: "Berlin",
    lat: 52.52,
    lng: 13.405,
    date: "2026-03-15",
    slots: 5,
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
    slots: 12,
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
    slots: 3,
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
    slots: 8,
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
    slots: 6,
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
    slots: 4,
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
    slots: 7,
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
    slots: 10,
    link: "https://telc.net",
  },
];

const categories = [
  { id: "all", name: "All Appointments", icon: "📅" },
  { id: "language-exam", name: "Language Exams", icon: "📝" },
  { id: "citizenship", name: "Citizenship", icon: "🇩🇪" },
  { id: "kfz", name: "KFZ & Vehicles", icon: "🚗" },
  { id: "buergeramt", name: "Bürgeramt", icon: "🏛️" },
];

const locations = [
  { name: "All Germany", lat: 51.1657, lng: 10.4515 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "München", lat: 48.1351, lng: 11.582 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "Dresden", lat: 51.0504, lng: 13.7373 },
];

// Dynamic import for map (client-side only)
const MapView = dynamic(() => import("./components/MapView"), { 
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-slate-100 rounded-xl">
      <p className="text-slate-500">Loading map...</p>
    </div>
  )
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch =
      apt.title.toLowerCase().includes(search.toLowerCase()) ||
      apt.location.toLowerCase().includes(search.toLowerCase()) ||
      apt.source.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || apt.category === selectedCategory;
    const matchesLocation =
      !selectedLocation || apt.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getCenter = () => {
    if (selectedLocation) {
      const loc = locations.find(l => l.name === selectedLocation);
      if (loc) return [loc.lat, loc.lng] as [number, number];
    }
    return [51.1657, 10.4515] as [number, number]; // Germany center
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="text-3xl">📅</span>
              TerminFinder
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-slate-600 hover:text-blue-600">
                How it works
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600">
                Add Source
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            German Appointments,<br />
            <span className="text-blue-200">All in One Place</span>
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Find and book appointments for language exams, citizenship tests, and more
          </p>

          {/* Search */}
          <div className="bg-white rounded-lg p-2 shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="What appointment do you need?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 rounded-md text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All locations</option>
              {locations.slice(1).map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories & View Toggle */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors",
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "px-4 py-2 rounded-md flex items-center gap-2 transition-colors",
                viewMode === "list"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={clsx(
                "px-4 py-2 rounded-md flex items-center gap-2 transition-colors",
                viewMode === "map"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800">
            {selectedCategory === "all"
              ? "All Appointments"
              : categories.find((c) => c.id === selectedCategory)?.name}
            <span className="text-slate-400 font-normal ml-2">
              ({filteredAppointments.length} found)
            </span>
          </h3>
        </div>

        {viewMode === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 h-[500px] rounded-xl overflow-hidden border border-slate-200">
              <MapView 
                appointments={filteredAppointments}
                center={getCenter()}
                onMarkerClick={setSelectedAppointment}
              />
            </div>
            
            {/* Sidebar List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  isSelected={selectedAppointment?.id === apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((apt) => (
              <AppointmentCard 
                key={apt.id} 
                appointment={apt} 
                onClick={() => setSelectedAppointment(apt)}
              />
            ))}
          </div>
        )}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              No appointments found. Try a different search or category.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 TerminFinder. Made in Germany 🇩🇪</p>
          <p className="text-sm mt-2">
            We aggregate public appointment information. Always verify details on official sites.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ 
  appointment, 
  onClick,
  isSelected 
}: { 
  appointment: Appointment; 
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border p-5 hover:shadow-lg transition-all cursor-pointer ${
        isSelected ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
          {appointment.source}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            appointment.slots > 5
              ? "bg-green-100 text-green-700"
              : appointment.slots > 0
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {appointment.slots} slots
        </span>
      </div>

      <h4 className="font-semibold text-slate-800 mb-2">
        {appointment.title}
      </h4>

      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1">📍 {appointment.location}</span>
        {appointment.date && (
          <span className="flex items-center gap-1">
            📅 {new Date(appointment.date).toLocaleDateString("de-DE")}
          </span>
        )}
      </div>

      <a
        href={appointment.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Book Now →
      </a>
    </div>
  );
}
