import { type Article } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, EyeOff } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  showEnhanced?: boolean;
  onToggleEnhanced?: () => void;
  hasEnhanced?: boolean;
}

export const ArticleCard = ({
  article,
  showEnhanced = false,
  onToggleEnhanced,
  hasEnhanced = false,
}: ArticleCardProps) => {
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

  return (
    <Card className='w-full transition-shadow hover:shadow-lg'>
      <CardHeader>
        <div className='flex justify-between items-start gap-2'>
          <CardTitle className='text-lg line-clamp-2'>{article.title}</CardTitle>
          <div className='flex gap-2 shrink-0'>
            {hasEnhanced && (
              <Badge variant={showEnhanced ? 'default' : 'secondary'}>
                {showEnhanced ? 'Enhanced' : 'Original'}
              </Badge>
            )}
            {onToggleEnhanced && (
              <Button
                variant='outline'
                size='sm'
                onClick={onToggleEnhanced}
                className='h-8 w-8 p-0'
              >
                {showEnhanced ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            )}
          </div>
        </div>
        <CardDescription className='flex items-center gap-2 text-sm'>
          <Calendar className='h-4 w-4' />
          {formatDate(article.createdAt)}
          {article.updatedAt !== article.createdAt && (
            <span className='text-xs text-muted-foreground'>
              • Updated {formatDate(article.updatedAt)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='prose prose-sm max-w-none'>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {truncateContent(article.originalContent)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
