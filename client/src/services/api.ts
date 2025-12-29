import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const articleService = {
  // Get all articles
  getAll: async (): Promise<Article[]> => {
    const response = await api.get('/articles');
    return response.data;
  },

  // Get article by ID
  getById: async (id: string): Promise<Article> => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  // Create article
  create: async (
    article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article> => {
    const response = await api.post('/articles', article);
    return response.data;
  },

  // Update article
  update: async (id: string, article: Partial<Article>): Promise<Article> => {
    const response = await api.put(`/articles/${id}`, article);
    return response.data;
  },

  // Delete article
  delete: async (id: string): Promise<void> => {
    await api.delete(`/articles/${id}`);
  },
};
