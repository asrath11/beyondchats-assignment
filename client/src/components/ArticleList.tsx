import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import { type Article } from '@/types';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onArticleClick: (article: Article) => void;
}

export function ArticleList({
  articles,
  loading,
  error,
  onRefresh,
  onArticleClick,
}: ArticleListProps) {
  if (loading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-3 w-1/2' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-20 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertDescription className='flex items-center justify-between'>
          <span>{error}</span>
          <Button variant='outline' size='sm' onClick={onRefresh}>
            <RefreshCw className='h-4 w-4 mr-2' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (articles.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground mb-4'>No articles found</p>
        <Button onClick={onRefresh} variant='outline'>
          <RefreshCw className='h-4 w-4 mr-2' />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {articles.map((article) => (
        <Card
          key={article.id}
          className='cursor-pointer hover:shadow-lg transition-shadow'
          onClick={() => onArticleClick(article)}
        >
          <CardHeader>
            <div className='flex items-start justify-between gap-2'>
              <CardTitle className='text-lg line-clamp-2'>
                {article.title}
              </CardTitle>
              <div className='flex flex-col gap-1'>
                {article.enhancedContent && (
                  <Badge variant='default' className='text-xs'>
                    <Sparkles className='h-3 w-3 mr-1' />
                    Enhanced
                  </Badge>
                )}
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground line-clamp-3 mb-4'>
              {article.originalContent.substring(0, 150)}...
            </p>
            <div className='flex items-center justify-between'>
              <Button
                variant='ghost'
                size='sm'
                className='gap-2'
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(article.link, '_blank');
                }}
              >
                <ExternalLink className='h-4 w-4' />
                View Original
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
