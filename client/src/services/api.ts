import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Article {
    id: string;
    title: string;
    link: string;
    originalContent: string;
    enhancedContent?: string;
    references?: string;
    createdAt: string;
    updatedAt: string;
}

class ApiService {
    private api: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
        this.api = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getAllArticles(): Promise<Article[]> {
        const response = await this.api.get<Article[]>('/api/articles');
        return response.data;
    }

    async getArticleById(id: string): Promise<Article> {
        const response = await this.api.get<Article>(`/api/articles/${id}`);
        return response.data;
    }

    async createArticle(data: {
        title: string;
        link: string;
        content: string;
    }): Promise<Article> {
        const response = await this.api.post<Article>('/api/articles', data);
        return response.data;
    }

    async updateArticle(
        id: string,
        data: Partial<{
            title: string;
            link: string;
            content: string;
            enhancedContent: string;
            references: string;
        }>
    ): Promise<Article> {
        const response = await fetch(`${this.baseUrl}/api/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to update article: ${response.statusText}`);
        }
        return response.json();
    }

    async deleteArticle(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/api/articles/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete article: ${response.statusText}`);
        }
    }

    async scrapeAndStore(): Promise<{
        message: string;
        created: number;
        skipped: number;
        articles: Article[];
    }> {
        const response = await fetch(`${this.baseUrl}/api/articles/scrape`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error(`Failed to scrape articles: ${response.statusText}`);
        }
        return response.json();
    }
}

export const apiService = new ApiService();