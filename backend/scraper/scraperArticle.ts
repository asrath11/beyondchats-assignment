import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url: string) {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const posts: any = [];

    $(".entry-card").each((_i, el) => {
        const title = $(el).find("h2, h3, h4").text().trim();
        const link = $(el).find("a").attr("href");
        const content = $(el).find("p").text().trim();
        posts.push({ title, link, content });
    });

    return posts;
}

