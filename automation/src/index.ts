import dotenv from "dotenv";
dotenv.config();


import { searchGoogle } from "./googleSearch";
import { getAllArticles } from "./apiService";


(async () => {
    const articles = await getAllArticles()
    if (!articles) {
        console.log('there is no articles present')
        return;
    }
    for (const article of articles) {
        const links = await searchGoogle(article.title)
        console.log(links)
    }
})()