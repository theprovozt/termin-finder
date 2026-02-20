"use client";

import { useState } from "react";

// Types
interface Appointment {
  id: string;
  source: string;
  category: string;
  title: string;
  location: string;
  date: string | null;
  slots: number;
  link: string;
}

// Mock data for demo
const mockAppointments: Appointment[] = [
  {
    id: "1",
    source: "Goethe",
    category: "language-exam",
    title: "Goethe-Zertifikat B1",
    location: "Berlin",
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
    date: "2026-03-25",
    slots: 6,
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

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");

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

  const locations = [...new Set(mockAppointments.map((apt) => apt.location))];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            German Appointments,<br />
            <span className="text-blue-200">All in One Place</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find and book appointments for language exams, citizenship tests,
            and more — without the endless clicking.
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
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-8">
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

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              No appointments found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                    {apt.source}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      apt.slots > 5
                        ? "bg-green-100 text-green-700"
                        : apt.slots > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {apt.slots} slots
                  </span>
                </div>

                <h4 className="font-semibold text-slate-800 mb-2">
                  {apt.title}
                </h4>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">📍 {apt.location}</span>
                  {apt.date && (
                    <span className="flex items-center gap-1">
                      📅 {new Date(apt.date).toLocaleDateString("de-DE")}
                    </span>
                  )}
                </div>

                <a
                  href={apt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Book Now →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 TerminFinder. Made in Germany 🇩🇪</p>
          <p className="text-sm mt-2">
            We aggregate public appointment information. Always verify details
            on official sites.
          </p>
        </div>
      </footer>
    </div>
  );
}
