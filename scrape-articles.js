// Simple script to scrape articles from BeyondChats
const fetch = require('node-fetch');

async function scrapeArticles() {
  try {
    console.log('🔄 Starting article scraping...');

    const response = await fetch('http://localhost:3000/api/articles/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Scraping completed:', result);
  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
  }
}

scrapeArticles();
