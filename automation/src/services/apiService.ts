import { api } from "../lib/axio";
import axios from "axios";

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

// Error handling helper
const handleApiError = (error: unknown, operation: string) => {
    // Non-Axios errors
    if (!axios.isAxiosError(error)) {
        console.error(`❌ ${operation} failed:`, error);
        return null;
    }

    // Connection refused
    if (error.code === "ECONNREFUSED") {
        console.error(`❌ ${operation} failed: Backend server is not running`);
        console.error("💡 Run: cd backend && npm start");
        return null;
    }

    // API responded with a status
    if (error.response) {
        console.error(
            `❌ ${operation} failed: ${error.response.status} ${error.response.statusText}`
        );
        console.error("📝 Error details:", error.response.data);
        return null;
    }

    // Axios error without response
    console.error(`❌ ${operation} failed: ${error.message}`);
    return null;
};
// Get all articles
export const getAllArticles = async (): Promise<Article[] | null> => {
    try {
        const response = await api.get('/articles');
        console.log('✅ Successfully fetched articles');
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Get all articles');
    }
};

// Get article by ID
export const getArticleById = async (id: string): Promise<Article | null> => {
    try {
        const response = await api.get(`/articles/${id}`);
        console.log(`✅ Successfully fetched article ${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Get article ${id}`);
    }
};

// Create a new article
export const createArticle = async (data: CreateArticleData): Promise<Article | null> => {
    try {
        const response = await api.post('/articles', data);
        console.log('✅ Successfully created article');
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Create article');
    }
};

// Update an article
export const updateArticle = async (id: string, data: UpdateArticleData): Promise<Article | null> => {
    try {
        const response = await api.put(`/articles/${id}`, data);
        console.log(`✅ Successfully updated article ${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Update article ${id}`);
    }
};

// Delete an article
export const deleteArticle = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`/articles/${id}`);
        console.log(`✅ Successfully deleted article ${id}`);
        return true;
    } catch (error) {
        handleApiError(error, `Delete article ${id}`);
        return false;
    }
};

// Scrape and store articles
export const scrapeAndStoreArticles = async () => {
    try {
        const response = await api.post('/articles/scrape');
        console.log('✅ Successfully scraped and stored articles');
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Scrape and store articles');
    }
};