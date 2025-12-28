import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://beyondchats.com/blogs/";

export interface ScrapedArticle {
    title: string;
    link: string;
    content: string;
}

export async function getLastPage(): Promise<number> {
    const res = await axios.get(BASE_URL);
    const $ = cheerio.load(res.data);

    let last = 1;

    $(".page-numbers").each((_i, el) => {
        const n = parseInt($(el).text(), 10);
        if (!isNaN(n)) last = Math.max(last, n);
    });

    return last;
}

export async function getArticlesFromPage(page: number): Promise<ScrapedArticle[]> {
    const url = page === 1 ? BASE_URL : `${BASE_URL}page/${page}/`;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const articles: ScrapedArticle[] = [];

    $("article").each((_i, el) => {
        const title = $(el).find("h2 a").text().trim();
        const link = $(el).find("h2 a").attr("href") || "";
        const content = $(el).find("p").first().text().trim();

        if (title && link) {
            articles.push({ title, link, content });
        }
    });

    return articles;
}

export async function scrapeOldestArticles(): Promise<ScrapedArticle[]> {
    const lastPage = await getLastPage();
    const result: ScrapedArticle[] = [];

    let page = lastPage;

    while (result.length < 5 && page >= 1) {
        const pageArticles = await getArticlesFromPage(page);

        // Oldest are at the bottom — reverse the list
        pageArticles.reverse();

        for (const a of pageArticles) {
            if (result.length < 5) result.push(a);
        }

        page--;
    }

    return result;
}
