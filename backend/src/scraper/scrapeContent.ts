import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeFullArticle(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // adjust selector after inspecting HTML
  const paragraphs = $('#content p')
    .map((_, el) => $(el).text().trim())
    .get();

  return paragraphs.join('\n\n');
}
