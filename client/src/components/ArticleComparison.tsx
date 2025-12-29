import { type Article } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Calendar } from 'lucide-react';

interface ArticleComparisonProps {
  original: Article;
  enhanced?: Article;
}

export const ArticleComparison = ({
  original,
  enhanced,
}: ArticleComparisonProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-bold'>{original.title}</h2>
        {enhanced && (
          <Badge variant='default' className='gap-1'>
            <Sparkles className='h-3 w-3' />
            Enhanced Available
          </Badge>
        )}
      </div>

      <Tabs defaultValue='original' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='original' className='gap-2'>
            <FileText className='h-4 w-4' />
            Original
          </TabsTrigger>
          <TabsTrigger value='enhanced' className='gap-2' disabled={!enhanced}>
            <Sparkles className='h-4 w-4' />
            Enhanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value='original' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5' />
                Original Article
              </CardTitle>
              <CardDescription className='flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                Created: {formatDate(original.createdAt)}
                {original.updatedAt !== original.createdAt && (
                  <span>• Updated: {formatDate(original.updatedAt)}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='prose prose-gray max-w-none'>
                <div
                  className='whitespace-pre-wrap text-sm leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: original.originalContent }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='enhanced' className='space-y-4'>
          {enhanced ? (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Sparkles className='h-5 w-5' />
                  Enhanced Article
                </CardTitle>
                <CardDescription className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  Created: {formatDate(enhanced.createdAt)}
                  {enhanced.updatedAt !== enhanced.createdAt && (
                    <span>• Updated: {formatDate(enhanced.updatedAt)}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='prose prose-gray max-w-none'>
                  <div
                    className='whitespace-pre-wrap text-sm leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html:
                        enhanced.enhancedContent ||
                        'Enhanced content not available',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className='flex items-center justify-center py-12'>
                <div className='text-center text-muted-foreground'>
                  <Sparkles className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p className='text-lg font-medium'>
                    Enhanced version not available
                  </p>
                  <p className='text-sm'>
                    This article hasn't been enhanced yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
