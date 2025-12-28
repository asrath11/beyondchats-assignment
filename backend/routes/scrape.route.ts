import express from 'express'
import { scrapeArticle } from '../scraper/scraperArticle'

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { url } = req.body;
        const article = await scrapeArticle(url);
        res.json(article);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default router