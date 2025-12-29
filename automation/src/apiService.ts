import { api } from "./lib/axio.js";

// Article types
export interface Article {
    id: string;
    title: string;
    link: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateArticleData {
    title: string;
    link: string;
    content: string;
}

export interface UpdateArticleData {
    title?: string;
    link?: string;
    content?: string;
}

// Get all articles
export const getAllArticles = async (): Promise<Article[]> => {
    const response = await api.get('/articles');
    return response.data;
};

// Get article by ID
export const getArticleById = async (id: string): Promise<Article> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
};

// Create a new article
export const createArticle = async (data: CreateArticleData): Promise<Article> => {
    const response = await api.post('/articles', data);
    return response.data;
};

// Update an article
export const updateArticle = async (id: string, data: UpdateArticleData): Promise<Article> => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
};

// Delete an article
export const deleteArticle = async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
};

// Scrape and store articles
export const scrapeAndStoreArticles = async () => {
    const response = await api.post('/articles/scrape');
    return response.data;
};
