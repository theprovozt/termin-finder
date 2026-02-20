"""
Base scraper class for German appointment sources
"""
import asyncio
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
from playwright.async_api import async_playwright, Browser, Page


@dataclass
class Appointment:
    """Represents an available appointment"""
    source: str
    category: str
    title: str
    location: str
    date: Optional[datetime]
    slots: int
    link: str
    last_updated: datetime


class BaseScraper(ABC):
    """Base class for all appointment scrapers"""
    
    def __init__(self):
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
    
    async def init_browser(self):
        """Initialize Playwright browser"""
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=True)
        self.page = await self.browser.new_page()
    
    async def close(self):
        """Close browser"""
        if self.browser:
            await self.browser.close()
    
    @abstractmethod
    async def scrape(self) -> List[Appointment]:
        """Scrape appointments - implement in subclass"""
        pass
    
    async def run(self) -> List[Appointment]:
        """Run the scraper"""
        try:
            await self.init_browser()
            results = await self.scrape()
            return results
        finally:
            await self.close()
