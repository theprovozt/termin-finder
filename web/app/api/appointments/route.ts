import { NextResponse } from 'next/server';

// Comprehensive appointment data for all of Germany
const allAppointments = [
  // ==================== LANGUAGE EXAMS ====================
  // Goethe-Institut - All major cities
  ...generateGoetheAppointments(),
  // Telc - All major cities  
  ...generateTelcAppointments(),
  // TestDaF
  ...generateTestDaFAppointments(),
  // ÖSD
  ...generateOSDAppointments(),
  // DSH
  ...generateDSHAppointments(),
  
  // ==================== CITIZENSHIP ====================
  ...generateBAMFAppointments(),
  ...generateAuslanderbehordeAppointments(),
  
  // ==================== BÜRGERAMT ====================
  ...generateBurgeramtAppointments(),
  
  // ==================== KFZ ====================
  ...generateKFZAppointments(),
  
  // ==================== GESUNDHEIT ====================
  ...generateGesundheitAppointments(),
  
  // ==================== BILDUNG ====================
  ...generateBildungAppointments(),
  
  // ==================== JOBCENTER ====================
  ...generateJobcenterAppointments(),
  
  // ==================== FINANZAMT ====================
  ...generateFinanzamtAppointments(),
];

function generateGoetheAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
    { name: "Duisburg", lat: 51.4344, lng: 6.7623 }, { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
    { name: "Essen", lat: 51.4556, lng: 7.0116 }, { name: "Bochum", lat: 51.4818, lng: 7.2162 },
    { name: "Wuppertal", lat: 51.2562, lng: 7.1508 }, { name: "Bielefeld", lat: 52.0302, lng: 8.5325 },
    { name: "Bonn", lat: 50.7374, lng: 7.0982 }, { name: "Münster", lat: 51.9607, lng: 7.6261 },
    { name: "Karlsruhe", lat: 49.0069, lng: 8.4037 }, { name: "Mannheim", lat: 49.4875, lng: 8.4660 },
    { name: "Augsburg", lat: 48.3705, lng: 10.8978 }, { name: "Wiesbaden", lat: 50.0826, lng: 8.2400 },
    { name: "Mönchengladbach", lat: 51.1805, lng: 6.4428 }, { name: "Gelsenkirchen", lat: 51.5177, lng: 7.0857 },
    { name: "Braunschweig", lat: 52.2689, lng: 10.5268 }, { name: "Chemnitz", lat: 50.8278, lng: 12.9214 },
    { name: "Kiel", lat: 54.3233, lng: 10.1228 }, { name: "Aachen", lat: 50.7753, lng: 6.0839 },
    { name: "Halle", lat: 51.4825, lng: 11.9697 }, { name: "Magdeburg", lat: 52.1205, lng: 11.6276 },
    { name: "Freiburg", lat: 47.9990, lng: 7.8421 }, { name: "Lübeck", lat: 53.8655, lng: 10.6866 },
    { name: "Oberhausen", lat: 51.4963, lng: 6.8516 }, { name: "Erfurt", lat: 50.9848, lng: 11.0299 },
    { name: "Mainz", lat: 49.9929, lng: 8.2473 }, { name: "Rostock", lat: 54.0887, lng: 12.1404 },
    { name: "Kassel", lat: 51.3127, lng: 9.4797 }, { name: "Hagen", lat: 51.3671, lng: 7.4632 },
    { name: "Hamm", lat: 51.6739, lng: 7.8150 }, { name: "Saarbrücken", lat: 49.2401, lng: 6.9969 },
    { name: "Mülheim", lat: 51.4344, lng: 6.8828 }, { name: "Potsdam", lat: 52.3906, lng: 13.0645 },
    { name: "Ludwigshafen", lat: 49.4775, lng: 8.4452 }, { name: "Oldenburg", lat: 53.1435, lng: 8.2146 },
    { name: "Leverkusen", lat: 51.0460, lng: 7.0192 }, { name: "Osnabrück", lat: 52.2799, lng: 8.0472 },
    { name: "Solingen", lat: 51.1652, lng: 7.0670 }, { name: "Heidelberg", lat: 49.3988, lng: 8.6724 },
    { name: "Herne", lat: 51.5388, lng: 7.2196 }, { name: "Neuss", lat: 51.1980, lng: 6.6865 },
    { name: "Darmstadt", lat: 49.8728, lng: 8.6826 }, { name: "Paderborn", lat: 51.7191, lng: 8.7544 },
    { name: "Regensburg", lat: 49.0134, lng: 12.1016 }, { name: "Würzburg", lat: 49.8019, lng: 9.9352 },
    { name: "Ingolstadt", lat: 48.7661, lng: 11.4257 }, { name: "Ulm", lat: 48.3984, lng: 9.9916 },
    { name: "Heilbronn", lat: 49.1424, lng: 9.2205 }, { name: "Pforzheim", lat: 48.8918, lng: 8.6228 },
    { name: "Wolfsburg", lat: 52.4209, lng: 10.7865 }, { name: "Göttingen", lat: 51.5410, lng: 9.9158 },
    { name: "Bottrop", lat: 51.5239, lng: 6.9256 }, { name: "Trier", lat: 49.7536, lng: 6.6391 },
    { name: "Reutlingen", lat: 48.4918, lng: 9.2064 }, { name: "Koblenz", lat: 50.3536, lng: 7.5788 },
    { name: "Marburg", lat: 50.8100, lng: 8.7701 }, { name: "Bielefeld", lat: 52.0302, lng: 8.5325 },
  ];
  
  const exams = [
    { name: "Goethe-Zertifikat A1", price: 120 },
    { name: "Goethe-Zertifikat A2", price: 130 },
    { name: "Goethe-Zertifikat B1", price: 150 },
    { name: "Goethe-Zertifikat B2", price: 180 },
    { name: "Goethe-Zertifikat C1", price: 220 },
    { name: "Goethe-Zertifikat C2", price: 280 },
  ];
  
  const appointments = [];
  let id = 1;
  
  for (const city of cities.slice(0, 30)) {
    for (const exam of exams) {
      const daysOffset = Math.floor(Math.random() * 45) + 7;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `goethe-${id++}`,
        source: "Goethe-Institut",
        category: "language-exam",
        title: exam.name,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 15),
        total_slots: 20,
        price: exam.price,
        currency: "EUR",
        language: "de",
        link: "https://www.goethe.de/de/sprache-kurse/pruefungen.html",
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateTelcAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
    { name: "Duisburg", lat: 51.4344, lng: 6.7623 }, { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
    { name: "Essen", lat: 51.4556, lng: 7.0116 }, { name: "Bonn", lat: 50.7374, lng: 7.0982 },
    { name: "Münster", lat: 51.9607, lng: 7.6261 }, { name: "Karlsruhe", lat: 49.0069, lng: 8.4037 },
    { name: "Mannheim", lat: 49.4875, lng: 8.4660 }, { name: "Augsburg", lat: 48.3705, lng: 10.8978 },
    { name: "Wiesbaden", lat: 50.0826, lng: 8.2400 }, { name: "Bielefeld", lat: 52.0302, lng: 8.5325 },
    { name: "Freiburg", lat: 47.9990, lng: 7.8421 }, { name: "Lübeck", lat: 53.8655, lng: 10.6866 },
    { name: "Kiel", lat: 54.3233, lng: 10.1228 }, { name: "Aachen", lat: 50.7753, lng: 6.0839 },
  ];
  
  const exams = [
    { name: "Telc A1", price: 110 }, { name: "Telc A2", price: 120 },
    { name: "Telc B1 Deutschtest für Zuwanderer", price: 140 },
    { name: "Telc B2", price: 160 }, { name: "Telc C1", price: 200 },
    { name: "Telc B1 Schule", price: 130 }, { name: "Telc B2 Schule", price: 150 },
  ];
  
  const appointments = [];
  let id = 100;
  
  for (const city of cities) {
    for (const exam of exams) {
      const daysOffset = Math.floor(Math.random() * 40) + 10;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `telc-${id++}`,
        source: "Telc",
        category: "language-exam",
        title: exam.name,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 20),
        total_slots: 25,
        price: exam.price,
        currency: "EUR",
        language: "de",
        link: "https://www.telc.net/sprachpruefungen/",
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateTestDaFAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Köln", lat: 50.9375, lng: 6.9603 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Stuttgart", lat: 48.7758, lng: 9.1829 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Bonn", lat: 50.7374, lng: 7.0982 }, { name: "Münster", lat: 51.9607, lng: 7.6261 },
    { name: "Freiburg", lat: 47.9990, lng: 7.8421 }, { name: "Heidelberg", lat: 49.3988, lng: 8.6724 },
  ];
  
  const appointments = [];
  let id = 200;
  
  for (const city of cities) {
    const daysOffset = Math.floor(Math.random() * 60) + 21;
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    
    appointments.push({
      id: `testdaf-${id++}`,
      source: "TestDaF",
      category: "language-exam",
      title: "TestDaF NTD",
      location: city.name,
      lat: city.lat,
      lng: city.lng,
      date: date.toISOString().split('T')[0],
      slots_available: Math.floor(Math.random() * 25),
      total_slots: 30,
      price: 195,
      currency: "EUR",
      language: "de",
      link: "https://www.testdaf.de/",
      lastUpdated: new Date().toISOString(),
    });
  }
  return appointments;
}

function generateOSDAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "München", lat: 48.1351, lng: 11.582 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Hannover", lat: 52.3759, lng: 9.732 },
  ];
  
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const appointments = [];
  let id = 300;
  
  for (const city of cities) {
    for (const level of levels) {
      const daysOffset = Math.floor(Math.random() * 50) + 14;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `osd-${id++}`,
        source: "ÖSD",
        category: "language-exam",
        title: `ÖSD Zertifikat ${level}`,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 15),
        total_slots: 20,
        price: 100 + (level.charCodeAt(0) - 65) * 20,
        currency: "EUR",
        language: "de",
        link: "https://www.osd.at/",
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateDSHAppointments() {
  const universities = [
    { name: "Berlin TU", lat: 52.5126, lng: 13.3267 }, { name: "München LMU", lat: 48.1500, lng: 11.5833 },
    { name: "Hamburg UH", lat: 53.5653, lng: 9.9810 }, { name: "Frankfurt Goethe", lat: 50.1167, lng: 8.6500 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Heidelberg", lat: 49.3988, lng: 8.6724 },
    { name: "Freiburg", lat: 47.9990, lng: 7.8421 }, { name: "Tübingen", lat: 48.5200, lng: 9.0556 },
    { name: "Göttingen", lat: 51.5410, lng: 9.9158 }, { name: "Münster", lat: 51.9607, lng: 7.6261 },
  ];
  
  const appointments = [];
  let id = 400;
  
  for (const uni of universities) {
    const daysOffset = Math.floor(Math.random() * 90) + 30;
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    
    appointments.push({
      id: `dsh-${id++}`,
      source: "DSH",
      category: "language-exam",
      title: `DSH-Prüfung ${uni.name}`,
      location: uni.name,
      lat: uni.lat,
      lng: uni.lng,
      date: date.toISOString().split('T')[0],
      slots_available: Math.floor(Math.random() * 20),
      total_slots: 30,
      price: 150,
      currency: "EUR",
      language: "de",
      link: `https://www.${uni.name.toLowerCase().replace(" ", "")}.de/dsh`,
      lastUpdated: new Date().toISOString(),
    });
  }
  return appointments;
}

function generateBAMFAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
    { name: "Duisburg", lat: 51.4344, lng: 6.7623 }, { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
    { name: "Essen", lat: 51.4556, lng: 7.0116 }, { name: "Bonn", lat: 50.7374, lng: 7.0982 },
  ];
  
  const testTypes = [
    "Einbürgerungstest (Celem)",
    "Einbürgerungstest (Leben in Deutschland)",
    "Einbürgerungstest - mündlich",
    "Einbürgerungstest - schriftlich",
  ];
  
  const appointments = [];
  let id = 500;
  
  for (const city of cities) {
    for (const testType of testTypes) {
      const daysOffset = Math.floor(Math.random() * 30) + 7;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `bamf-${id++}`,
        source: "BAMF",
        category: "citizenship",
        title: testType,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 15),
        total_slots: 25,
        price: 25,
        currency: "EUR",
        language: "de",
        link: "https://www.bamf.de/DE/Themen/Buergerschaft/buergerschaft-node.html",
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateAuslanderbehordeAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
  ];
  
  const services = [
    "Aufenthaltstitel beantragen",
    "Verlängerung Aufenthaltserlaubnis",
    "Niederlassungserlaubnis",
    "Arbeitserlaubnis",
    "Familiennachzug",
    "Visumverlängerung",
    "Blaufkarte EU",
    "Selbstständigkeit",
  ];
  
  const appointments = [];
  let id = 600;
  
  for (const city of cities) {
    for (const service of services.slice(0, 5)) {
      const daysOffset = Math.floor(Math.random() * 21) + 3;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `ausl-${id++}`,
        source: "Ausländerbehörde",
        category: "citizenship",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 8),
        total_slots: 10,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.${city.name.toLowerCase().replace("ü", "ue")}.de/auslaenderbehoerde`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateBurgeramtAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
    { name: "Duisburg", lat: 51.4344, lng: 6.7623 }, { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
    { name: "Essen", lat: 51.4556, lng: 7.0116 }, { name: "Bonn", lat: 50.7374, lng: 7.0982 },
    { name: "Münster", lat: 51.9607, lng: 7.6261 }, { name: "Karlsruhe", lat: 49.0069, lng: 8.4037 },
    { name: "Mannheim", lat: 49.4875, lng: 8.4660 }, { name: "Augsburg", lat: 48.3705, lng: 10.8978 },
    { name: "Wiesbaden", lat: 50.0826, lng: 8.2400 }, { name: "Bielefeld", lat: 52.0302, lng: 8.5325 },
    { name: "Freiburg", lat: 47.9990, lng: 7.8421 }, { name: "Lübeck", lat: 53.8655, lng: 10.6866 },
    { name: "Kiel", lat: 54.3233, lng: 10.1228 }, { name: "Aachen", lat: 50.7753, lng: 6.0839 },
    { name: "Halle", lat: 51.4825, lng: 11.9697 }, { name: "Magdeburg", lat: 52.1205, lng: 11.6276 },
  ];
  
  const services = [
    "Meldebescheinigung",
    "Personalausweis beantragen",
    "Reisepass beantragen",
    "Führungszeugnis",
    "Gewerbeanmeldung",
    "Parkausweis",
    "Anmeldung",
    "Abmeldung",
    "Aufenthaltsbescheinigung",
    "Behindertenparkausweis",
  ];
  
  const appointments = [];
  let id = 700;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 14) + 1;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `burgeramt-${id++}`,
        source: "Bürgeramt",
        category: "buergeramt",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 8),
        total_slots: 10,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.${city.name.toLowerCase().replace("ü", "ue")}.de/buergerservice/termin`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateKFZAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
    { name: "Duisburg", lat: 51.4344, lng: 6.7623 }, { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
    { name: "Essen", lat: 51.4556, lng: 7.0116 }, { name: "Bonn", lat: 50.7374, lng: 7.0982 },
  ];
  
  const services = [
    "KFZ-Zulassung",
    "KFZ-Abmeldung",
    "Führerschein beantragen",
    "Führerschein verlängern",
    "Internationaler Führerschein",
    "PKW-Ummeldung",
    "Motorrad-Zulassung",
    "KFZ-Wunschkennzeichen",
    "Feinstaubplakette",
    "Abschlepp-Plakette",
  ];
  
  const appointments = [];
  let id = 800;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 10) + 1;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `kfz-${id++}`,
        source: "KFZ-Stelle",
        category: "kfz",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 10),
        total_slots: 15,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.${city.name.toLowerCase().replace("ü", "ue")}.de/verkehr/kfz`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateGesundheitAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
    { name: "Hannover", lat: 52.3759, lng: 9.732 }, { name: "Bremen", lat: 53.0793, lng: 8.8017 },
  ];
  
  const services = [
    "Impftermin (COVID/Influenza)",
    "Facharzttermin",
    "Vorsorgeuntersuchung",
    "Laboruntersuchung",
    "Krebsvorsorge",
    "Psychotherapeutische Sprechstunde",
    "Kindervorsorge U1-U9",
    "Reisemedizinische Beratung",
  ];
  
  const appointments = [];
  let id = 900;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 21) + 1;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `gesundheit-${id++}`,
        source: "Gesundheitsamt",
        category: "gesundheit",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 15),
        total_slots: 20,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.${city.name.toLowerCase().replace("ü", "ue")}.de/gesundheit`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateBildungAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
  ];
  
  const services = [
    "Schulanmeldung",
    "Kindergartenplatz",
    "Krippenplatz",
    "Universitätsbewerbung",
    "Studienplatzwechsel",
    "Weiterbildungsberatung",
    "Bildungsberatung",
    "Beratung Berufsausbildung",
  ];
  
  const appointments = [];
  let id = 1000;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 45) + 7;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `bildung-${id++}`,
        source: "Bildungsamt",
        category: "bildung",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 25),
        total_slots: 30,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.${city.name.toLowerCase().replace("ü", "ue")}.de/bildung`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateJobcenterAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
    { name: "Leipzig", lat: 51.3397, lng: 12.3731 }, { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
  ];
  
  const services = [
    "Arbeitslosengeld Antrag",
    "Beratungstermin",
    "Qualifizierungsberatung",
    "Bewerbungsmappe-Check",
  ];
  
  const appointments = [];
  let id = 1100;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 14) + 1;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `jobcenter-${id++}`,
        source: "Jobcenter",
        category: "buergeramt",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 5),
        total_slots: 8,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.jobcenter.${city.name.toLowerCase().replace("ü", "ue")}.de`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

function generateFinanzamtAppointments() {
  const cities = [
    { name: "Berlin", lat: 52.52, lng: 13.405 }, { name: "München", lat: 48.1351, lng: 11.582 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 }, { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    { name: "Köln", lat: 50.9375, lng: 6.9603 }, { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 }, { name: "Dresden", lat: 51.0504, lng: 13.7373 },
  ];
  
  const services = [
    "Steuerberatung",
    "Einkommensteuererklärung",
    "Umsatzsteuer-Voranmeldung",
    "Gewerbesteuer",
  ];
  
  const appointments = [];
  let id = 1200;
  
  for (const city of cities) {
    for (const service of services) {
      const daysOffset = Math.floor(Math.random() * 21) + 3;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      appointments.push({
        id: `finanzamt-${id++}`,
        source: "Finanzamt",
        category: "buergeramt",
        title: service,
        location: city.name,
        lat: city.lat,
        lng: city.lng,
        date: date.toISOString().split('T')[0],
        slots_available: Math.floor(Math.random() * 6),
        total_slots: 10,
        price: null,
        currency: "EUR",
        language: "de",
        link: `https://www.finanzamt.${city.name.toLowerCase().replace("ü", "ue")}.de`,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
  return appointments;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');
  const source = searchParams.get('source');
  const search = searchParams.get('search');

  let filtered = [...allAppointments];

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
    totalCount: allAppointments.length,
    data: filtered,
    lastUpdated: new Date().toISOString(),
  });
}
