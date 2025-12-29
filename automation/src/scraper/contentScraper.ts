// src/scraper/contentScraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeArticleContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // Common article content selectors
    const selectors = [
      'article',
      '.post-content',
      '.article-content',
      'main',
      '.content',
      '.entry-content',
    ];

    for (const selector of selectors) {
      const content = $(selector).first().text().trim();
      if (content.length > 300) {
        return content;
      }
    }

    return $('body').text().trim();
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return '';
  }
}
