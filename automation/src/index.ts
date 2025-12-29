import dotenv from 'dotenv';
dotenv.config();

import { scrapeArticleContent } from './scraper/contentScraper';
import { getAllArticles } from './services/apiService';
import { searchGoogle } from './services/googleSearchService';

(async () => {
  const articles = await getAllArticles();
  if (!articles) {
    console.log('there is no articles present');
    return;
  }
  for (const article of articles) {
    // const links = await searchGoogle(article.title)
    const content = await scrapeArticleContent(article.link);
    console.log(content);
  }
})();
