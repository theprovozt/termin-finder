"""
Appointments data model
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List
from enum import Enum


class AppointmentCategory(Enum):
    LANGUAGE_EXAM = "language-exam"
    CITIZENSHIP = "citizenship"
    KFZ = "kfz"
    BURGERAMT = "buergeramt"
    AUSLANDERBEHORDE = "auslaenderbehoerde"
    OTHER = "other"


class ExamLevel(Enum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"


@dataclass
class Appointment:
    """Represents an available appointment slot"""
    id: str
    source: str  # e.g., "goethe", "telc", "bamf"
    category: AppointmentCategory
    title: str  # e.g., "Goethe-Zertifikat B1"
    description: Optional[str] = None
    location: str  # City name
    address: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    date: Optional[datetime] = None
    time: Optional[str] = None  # e.g., "10:00"
    slots_available: int = 0
    total_slots: int = 0
    price: Optional[float] = None
    currency: str = "EUR"
    language: str = "de"
    link: str = ""  # Direct booking URL
    booking_notes: Optional[str] = None
    last_updated: datetime = field(default_factory=datetime.now)
    is_active: bool = True
    
    def to_dict(self):
        return {
            "id": self.id,
            "source": self.source,
            "category": self.category.value,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "address": self.address,
            "lat": self.lat,
            "lng": self.lng,
            "date": self.date.isoformat() if self.date else None,
            "time": self.time,
            "slots_available": self.slots_available,
            "total_slots": self.total_slots,
            "price": self.price,
            "currency": self.currency,
            "language": self.language,
            "link": self.link,
            "booking_notes": self.booking_notes,
            "last_updated": self.last_updated.isoformat(),
            "is_active": self.is_active,
        }


@dataclass
class ExamCenter:
    """Represents a testing/booking center"""
    id: str
    name: str
    source: str
    location: str
    address: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    is_active: bool = True
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "source": self.source,
            "location": self.location,
            "address": self.address,
            "lat": self.lat,
            "lng": self.lng,
            "phone": self.phone,
            "email": self.email,
            "website": self.website,
            "is_active": self.is_active,
        }
