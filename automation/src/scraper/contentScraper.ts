import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeArticleContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    $('script, style, nav, header, footer, noscript').remove();

    const selectors = [
      'article',
      '.post-content',
      '.article-content',
      'main',
      '.content',
      '#content',
      '.entry-content',
    ];

    const extractParagraphs = (root: cheerio.Cheerio<any>) =>
      root
        .find('p')
        .map((_, el) => $(el).text().trim())
        .get()
        .filter(text => text.length > 0)
        .join('\n\n');

    for (const selector of selectors) {
      const el = $(selector).first();
      if (!el.length) continue;

      const text = extractParagraphs(el);
      if (text.length > 300) return text.slice(0, 50000);
    }

    const fallback = extractParagraphs($('body'));
    return fallback.slice(0, 5000);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`❌ Failed to fetch ${url}:`, error.message);
    } else {
      console.error(`❌ Error scraping ${url}:`, error);
    }
    return '';
  }
}
