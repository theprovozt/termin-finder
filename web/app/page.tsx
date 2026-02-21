"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { clsx } from "clsx";

interface Appointment {
  id: string;
  source: string;
  category: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  date: string | null;
  slots_available: number;
  total_slots?: number;
  price?: number;
  link: string;
}

const categories = [
  { id: "all", name: "Alle Termine", icon: "📅" },
  { id: "language-exam", name: "Sprachprüfungen", icon: "📝" },
  { id: "citizenship", name: "Einbürgerung", icon: "🇩🇪" },
  { id: "buergeramt", name: "Bürgeramt", icon: "🏛️" },
  { id: "kfz", name: "KFZ & Führerschein", icon: "🚗" },
  { id: "gesundheit", name: "Gesundheit", icon: "🏥" },
  { id: "bildung", name: "Bildung", icon: "🎓" },
];

const locations = [
  { name: "Ganz Deutschland", lat: 51.1657, lng: 10.4515 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "München", lat: 48.1351, lng: 11.582 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "Dresden", lat: 51.0504, lng: 13.7373 },
  { name: "Leipzig", lat: 51.3397, lng: 12.3731 },
];

const categoryIcons: Record<string, string> = {
  "language-exam": "📝",
  "citizenship": "🇩🇪",
  "buergeramt": "🏛️",
  "kfz": "🚗",
  "gesundheit": "🏥",
  "bildung": "🎓",
};

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-slate-100 rounded-xl">
      <div className="spinner"></div>
    </div>
  ),
});

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointments');
        const data = await res.json();
        if (data.success) {
          setAppointments(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
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
      const loc = locations.find((l) => l.name === selectedLocation);
      if (loc) return [loc.lat, loc.lng] as [number, number];
    }
    return [51.1657, 10.4515] as [number, number];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">📅</div>
            TerminPro
          </a>
          <nav className="nav">
            <a href="#" className="nav-link">So funktioniert's</a>
            <a href="#" className="nav-link">Alle Kategorien</a>
            <a href="#" className="nav-link">Über uns</a>
            <a href="#" className="nav-cta">Termin hinzufügen</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Deutschlands größte Termin-Suchmaschine
          </div>
          <h1>
            Finde deinen <span className="text-gradient">Termin</span>
            <br />in ganz Deutschland
          </h1>
          <p className="hero-subtitle">
            Sprachprüfungen, Einbürgerungstests, Bürgeramt-Termine und mehr — 
            alles an einem Ort.
          </p>

          {/* Search */}
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Wonach suchst du? (z.B. Goethe B1, Einbürgerungstest...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="search-select"
              >
                <option value="">Alle Städte</option>
                {locations.slice(1).map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <button className="search-btn">Suchen</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="categories-header">
          <h2>Nach Kategorie suchen</h2>
          <p>Wähle eine Kategorie, um verfügbare Termine zu finden</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={clsx(
                "category-card",
                selectedCategory === cat.id && "active"
              )}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="results">
        <div className="results-header">
          <h3 className="results-count">
            {filteredAppointments.length} <span>Termine gefunden</span>
          </h3>
          <div className="view-toggle">
            <button
              onClick={() => setViewMode("list")}
              className={clsx("view-btn", viewMode === "list" && "active")}
            >
              Liste
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={clsx("view-btn", viewMode === "map" && "active")}
            >
              Karte
            </button>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="results-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div className="map-container">
              <MapView
                appointments={filteredAppointments}
                center={getCenter()}
              />
            </div>
            <div className="space-y-4">
              {filteredAppointments.slice(0, 10).map((apt) => (
                <ResultCard key={apt.id} appointment={apt} />
              ))}
            </div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">Keine Termine gefunden</h3>
            <p className="empty-text">
              Versuche es mit anderen Suchbegriffen oder einer anderen Kategorie.
            </p>
          </div>
        ) : (
          <div className="results-grid">
            {filteredAppointments.map((apt) => (
              <ResultCard key={apt.id} appointment={apt} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span>📅</span> TerminPro
              </div>
              <p className="footer-desc">
                Die größte Suchmaschine für Termine in Deutschland. 
                Finde schnell und einfach deinen nächsten Termin.
              </p>
            </div>
            <div className="footer-col">
              <h4>Kategorien</h4>
              <ul className="footer-links">
                <li><a href="#">Sprachprüfungen</a></li>
                <li><a href="#">Einbürgerung</a></li>
                <li><a href="#">Bürgeramt</a></li>
                <li><a href="#">KFZ & Führerschein</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Städte</h4>
              <ul className="footer-links">
                <li><a href="#">Berlin</a></li>
                <li><a href="#">München</a></li>
                <li><a href="#">Hamburg</a></li>
                <li><a href="#">Frankfurt</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Unternehmen</h4>
              <ul className="footer-links">
                <li><a href="#">Über uns</a></li>
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Datenschutz</a></li>
                <li><a href="#">Impressum</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 TerminPro. Made in Germany 🇩🇪</p>
            <p>Wir aggregieren öffentliche Termindaten. Bitte überprüfe alle Angaben auf den offiziellen Seiten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ResultCard({ appointment }: { appointment: Appointment }) {
  const icon = categoryIcons[appointment.category] || "📅";
  
  return (
    <div className="result-card">
      <div className="result-image">{icon}</div>
      <div className="result-content">
        <span className="result-source">
          {appointment.source}
        </span>
        <h3 className="result-title">{appointment.title}</h3>
        <div className="result-meta">
          <span className="result-meta-item">📍 {appointment.location}</span>
          {appointment.date && (
            <span className="result-meta-item">
              📅 {new Date(appointment.date).toLocaleDateString("de-DE")}
            </span>
          )}
          <span className="result-meta-item">
            {appointment.slots_available > 0 ? `✅ ${appointment.slots_available} Plätze` : "❌ Voll"}
          </span>
        </div>
        <div className="result-footer">
          <span className="result-price">
            {appointment.price ? `€${appointment.price}` : "Kostenlos"}
          </span>
          <a
            href={appointment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="result-btn"
          >
            Buchen →
          </a>
        </div>
      </div>
    </div>
  );
}
