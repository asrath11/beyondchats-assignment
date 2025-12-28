import express from 'express';
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    scrapeAndStore
} from '../controllers/articleController.js';

const router = express.Router();

// POST /articles/scrape - Scrape and store articles (must be before /:id)
router.post('/scrape', scrapeAndStore);

// POST /articles - Create new article
router.post('/', createArticle);

// GET /articles - Get all articles
router.get('/', getAllArticles);

// GET /articles/:id - Get article by ID
router.get('/:id', getArticleById);

// PUT /articles/:id - Update article
router.put('/:id', updateArticle);

// DELETE /articles/:id - Delete article
router.delete('/:id', deleteArticle);

export default router;
