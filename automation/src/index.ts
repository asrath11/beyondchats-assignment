import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_BASE_URL)


import { scrapeArticleContent } from './scraper/contentScraper';
import { getAllArticles, updateArticle } from './services/apiService';
import { searchGoogle } from './services/googleSearchService';
import { enhanceArticleWithLLM } from './services/llmService';

async function scrapeReferenceContent(links: string[]): Promise<string[]> {
  const referenceContents: string[] = [];

  for (const link of links) {
    console.log(`📄 Scraping: ${link}`);
    const content = await scrapeArticleContent(link);
    if (content) {
      referenceContents.push(`Source: ${link}\n\n${content}`);
    }
  }

  return referenceContents;
}

async function processArticle(article: any): Promise<void> {
  // Search for reference links
  const links = await searchGoogle(article.title);
  console.log(`🔗 Found ${links.length} reference links`);

  if (links.length === 0) {
    console.log('⚠️ No reference articles found, skipping...');
    return;
  }

  // Scrape reference content
  const referenceContents = await scrapeReferenceContent(links);

  if (referenceContents.length === 0) {
    console.log('⚠️ No content scraped from references, skipping...');
    return;
  }

  // Enhance with AI
  console.log('🤖 Enhancing article with AI...');
  const enhancedResult = await enhanceArticleWithLLM(article.content, referenceContents);

  // Save to database
  console.log('💾 Saving enhanced article...');
  const updatedArticle = await updateArticle(article.id, {
    content: enhancedResult.enhancedContent
  });

  if (!updatedArticle) {
    throw new Error('Failed to save enhanced article');
  }

  console.log('✅ Article enhanced and saved successfully!');
}

async function main() {
  const articles = await getAllArticles();
  if (!articles || articles.length === 0) {
    console.log('❌ No articles found in database');
    return;
  }

  for (const article of articles) {
    try {
      await processArticle(article);
    } catch (error) {
      console.error(`❌ Error processing article "${article.title}":`, error);
    }
  }

  console.log('\n🎉 Article enhancement process completed!');
}

main().catch(console.error);
