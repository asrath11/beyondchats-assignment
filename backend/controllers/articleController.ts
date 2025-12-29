import { type Request, type Response } from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import { scrapeOldestArticles } from '../scraper/scraperArticle.js';
import { scrapeFullArticle } from '../scraper/scrapeContent.js';
import 'dotenv/config';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

// Create a new article
export async function createArticle(req: Request, res: Response) {
  try {
    const { title, link, content } = req.body;

    // Validation
    if (!title || !link || !content) {
      res.status(400).json({
        error: 'Validation failed',
        details: ['title, link, and content are required'],
      });
      return;
    }

    // Check for duplicate link
    const existing = await prisma.article.findUnique({ where: { link } });
    if (existing) {
      res.status(409).json({ error: 'Article with this link already exists' });
      return;
    }

    const article = await prisma.article.create({
      data: { title, link, originalContent: content },
    });

    res.status(201).json(article);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'Internal server error', message: error.message });
  }
}

// Get all articles
export async function getAllArticles(_req: Request, res: Response) {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(articles);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'Internal server error', message: error.message });
  }
}

// Get article by ID
export async function getArticleById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    res.json(article);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'Internal server error', message: error.message });
  }
}

// Update article
export async function updateArticle(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    const { title, link, content, enhancedContent, references } = req.body;

    // Check if article exists
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Validation - at least one field required
    if (!title && !link && !content && !enhancedContent && !references) {
      res.status(400).json({
        error: 'Validation failed',
        details: [
          'At least one field (title, link, content, enhancedContent, or references) is required',
        ],
      });
      return;
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(link && { link }),
        ...(content && { originalContent: content }),
        ...(enhancedContent && { enhancedContent }),
        ...(references && { references }),
      },
    });

    res.json(article);
  } catch (error: any) {
    res.status(500).json({ or: 'Internal server error', message: error.message });
  }
}

// Delete e
export async function deleteArticle(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    // Check if article exists
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    await prisma.article.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res
      .status(500)
      .json({ error: 'Internal server error', message: error.message });
  }
}

// Scrape and store articles from BeyondChats
export async function scrapeAndStore(_req: Request, res: Response) {
  try {
    const scrapedArticles = await scrapeOldestArticles();

    let created = 0;
    let skipped = 0;
    const newArticles: any[] = [];

    for (const article of scrapedArticles) {
      // Skip if link already exists
      const existing = await prisma.article.findUnique({
        where: { link: article.link },
      });

      if (existing) {
        skipped++;
        continue;
      }

      const content = await scrapeFullArticle(article.link);
      const newArticle = await prisma.article.create({
        data: {
          title: article.title,
          link: article.link,
          originalContent: content,
        },
      });
      newArticles.push(newArticle);
      created++;
    }

    res.json({
      message: 'Scraping completed',
      created,
      skipped,
      articles: newArticles,
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to scrape articles',
      message: error.message,
    });
  }
}
