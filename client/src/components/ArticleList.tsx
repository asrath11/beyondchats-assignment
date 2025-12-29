import { type Article } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Sparkles, Calendar, RefreshCw } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onArticleClick?: (article: Article) => void;
}

export const ArticleList = ({
  articles,
  loading,
  error,
  onRefresh,
  onArticleClick,
}: ArticleListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const hasEnhancedVersion = (article: Article) => {
    return article.updatedAt !== article.createdAt;
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
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
      <Card className='border-destructive'>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <div className='text-center text-destructive'>
            <p className='text-lg font-medium mb-2'>Error loading articles</p>
            <p className='text-sm text-muted-foreground mb-4'>{error}</p>
            <Button onClick={onRefresh} variant='outline' className='gap-2'>
              <RefreshCw className='h-4 w-4' />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <div className='text-center text-muted-foreground'>
            <FileText className='h-12 w-12 mx-auto mb-4 opacity-50' />
            <p className='text-lg font-medium'>No articles found</p>
            <p className='text-sm'>
              Start by adding some articles to see them here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      {articles.map((article) => (
        <Card
          key={article.id}
          className='transition-shadow hover:shadow-lg cursor-pointer'
          onClick={() => onArticleClick?.(article)}
        >
          <CardHeader>
            <div className='flex justify-between items-start gap-2'>
              <CardTitle className='text-lg line-clamp-2'>
                {article.title}
              </CardTitle>
              <div className='flex gap-2 shrink-0'>
                {hasEnhancedVersion(article) && (
                  <Badge variant='default'>
                    <Sparkles className='h-3 w-3 mr-1' />
                    Enhanced
                  </Badge>
                )}
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              {formatDate(article.createdAt)}
              {article.updatedAt !== article.createdAt && (
                <span className='text-xs'>
                  • Updated {formatDate(article.updatedAt)}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='prose prose-sm max-w-none'>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {truncateContent(article.originalContent)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
