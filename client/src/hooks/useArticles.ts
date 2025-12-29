import { useState, useEffect, useCallback } from 'react';
import { apiService, type Article } from '@/services/api';

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await apiService.getAllArticles();
            setArticles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch articles');
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const refetch = useCallback(() => {
        fetchArticles();
    }, [fetchArticles]);

    return {
        articles,
        loading,
        error,
        refetch,
    };
}