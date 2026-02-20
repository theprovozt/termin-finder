"""
Base scraper class with common functionality
"""
import asyncio
import random
from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional, Dict, Any
from playwright.async_api import async_playwright, Browser, Page, BrowserContext

from models import Appointment, AppointmentCategory, ExamCenter


class BaseScraper(ABC):
    """Base class for all appointment scrapers"""
    
    def __init__(self, config: Optional[Dict[str, Any]] = None):
        self.config = config or {}
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None
        self.results: List[Appointment] = []
        
    async def init_browser(self, headless: bool = True):
        """Initialize Playwright browser with stealth settings"""
        playwright = await async_playwright().start()
        
        # Launch with stealth settings to avoid detection
        self.browser = await playwright.chromium.launch(
            headless=headless,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
            ]
        )
        
        # Create context with realistic browser settings
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale='de-DE',
            timezone_id='Europe/Berlin',
        )
        
        # Add stealth script to avoid detection
        await self.context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """)
        
        self.page = await self.context.new_page()
        
        # Set default timeout
        self.page.set_default_timeout(30000)
        
        return playwright
    
    async def close(self):
        """Close browser"""
        if self.browser:
            await self.browser.close()
    
    async def wait_for_selector(self, selector: str, timeout: int = 30000):
        """Wait for selector with error handling"""
        try:
            await self.page.wait_for_selector(selector, timeout=timeout)
            return True
        except Exception as e:
            print(f"Wait failed for {selector}: {e}")
            return False
    
    async def random_delay(self, min_ms: int = 500, max_ms: int = 2000):
        """Random delay to mimic human behavior"""
        delay = random.randint(min_ms, max_ms) / 1000
        await asyncio.sleep(delay)
    
    async def click_randomly(self, selectors: List[str]):
        """Click a random element from list"""
        for selector in selectors:
            try:
                if await self.page.is_visible(selector):
                    await self.page.click(selector)
                    await self.random_delay(300, 800)
                    return True
            except:
                continue
        return False
    
    @abstractmethod
    async def scrape(self) -> List[Appointment]:
        """Scrape appointments - implement in subclass"""
        pass
    
    async def run(self) -> List[Appointment]:
        """Run the scraper"""
        playwright = None
        try:
            playwright = await self.init_browser(headless=True)
            self.results = await self.scrape()
            return self.results
        except Exception as e:
            print(f"Scraper error: {e}")
            raise
        finally:
            if playwright:
                await playwright.stop()
            await self.close()
    
    def generate_id(self, prefix: str, *parts) -> str:
        """Generate a unique ID"""
        import hashlib
        content = f"{prefix}:{':'.join(str(p) for p in parts)}"
        return hashlib.md5(content.encode()).hexdigest()[:12]


class SimpleScraper(BaseScraper):
    """Simple scraper that works with existing page structures"""
    
    async def scrape(self) -> List[Appointment]:
        """Override in subclass"""
        return []
    
    async def fetch_json(self, url: str) -> Optional[Dict]:
        """Fetch JSON from API endpoint"""
        try:
            response = await self.page.goto(url)
            if response and response.ok:
                return await self.page.evaluate("() => JSON.parse(document.body.textContent)")
        except Exception as e:
            print(f"JSON fetch failed: {e}")
        return None
    
    async def get_all_links(self, selector: str = "a") -> List[str]:
        """Get all links on page"""
        try:
            return await self.page.eval_on_selector_all(selector, "els => els.map(e => e.href)")
        except:
            return []
