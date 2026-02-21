"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  link: string;
}

interface MapViewProps {
  appointments: Appointment[];
  center: [number, number];
  onMarkerClick?: (appointment: Appointment | null) => void;
}

export default function MapView({ appointments, center, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, 6);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when appointments change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const map = mapInstanceRef.current;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers
    appointments.forEach((apt) => {
      const markerColor = apt.slots_available > 5 ? "green" : apt.slots_available > 0 ? "yellow" : "red";
      
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${markerColor === "green" ? "#10b981" : markerColor === "yellow" ? "#eab308" : "#ef4444"};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            color: white;
          ">${apt.slots_available}</div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([apt.lat, apt.lng], { icon }).addTo(map);
      
      marker.bindPopup(`
        <div style="min-width: 200px; padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${apt.title}</h3>
          <p style="color: #666; margin-bottom: 4px;">📍 ${apt.location}</p>
          <p style="color: #666; margin-bottom: 4px;">📅 ${apt.date ? new Date(apt.date).toLocaleDateString("de-DE") : "N/A"}</p>
          <p style="color: ${apt.slots_available > 5 ? "green" : apt.slots_available > 0 ? "orange" : "red"}; font-weight: bold; margin-bottom: 8px;">
            ${apt.slots_available} slots available
          </p>
          <a href="${apt.link}" target="_blank" style="
            display: block;
            text-align: center;
            background: #2563eb;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
          ">Book Now →</a>
        </div>
      `);

      marker.on("click", () => onMarkerClick && onMarkerClick(apt));
    });
  }, [appointments, onMarkerClick]);

  // Update view when center changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, 10);
    }
  }, [center]);

  return (
    <div 
      ref={mapRef} 
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    />
  );
}
