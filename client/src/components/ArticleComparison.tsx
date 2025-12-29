import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, FileText, Sparkles, Calendar, Link } from 'lucide-react';
import { type Article } from '@/types';

interface ArticleComparisonProps {
  original: Article;
  enhanced?: Article;
}

export function ArticleComparison({
  original,
  enhanced,
}: ArticleComparisonProps) {
  return (
    <div className='space-y-6'>
      {/* Article Header */}
      <div className='space-y-4'>
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold leading-tight'>{original.title}</h1>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                Created: {new Date(original.createdAt).toLocaleDateString()}
              </div>
              {enhanced && (
                <div className='flex items-center gap-1'>
                  <Sparkles className='h-4 w-4' />
                  Enhanced: {new Date(enhanced.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <Button variant='outline' className='gap-2' asChild>
            <a href={original.link} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='h-4 w-4' />
              View Source
            </a>
          </Button>
        </div>
        <Separator />
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue='original' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='original' className='flex items-center gap-2'>
            <FileText className='h-4 w-4' />
            Original Content
          </TabsTrigger>
          <TabsTrigger value='enhanced' className='flex items-center gap-2'>
            <Sparkles className='h-4 w-4' />
            Enhanced Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value='original' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-5 w-5' />
                Original Content
                <Badge variant='outline'>Source</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose prose-sm max-w-none'>
                <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                  {original.originalContent}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='enhanced' className='mt-6'>
          {enhanced?.enhancedContent ? (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Sparkles className='h-5 w-5' />
                  Enhanced Content
                  <Badge variant='default'>AI Enhanced</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='prose prose-sm max-w-none'>
                  <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                    {enhanced.enhancedContent}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className='border-dashed'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-muted-foreground'>
                  <Sparkles className='h-5 w-5' />
                  Enhanced Content
                  <Badge variant='secondary'>Not Available</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-center py-12 text-muted-foreground'>
                  <Sparkles className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p className='text-lg font-medium mb-2'>No Enhanced Version</p>
                  <p className='text-sm'>
                    This article hasn't been enhanced yet. Enhanced versions
                    provide AI-powered improvements to the original content.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* References Section */}
      {enhanced?.references && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Link className='h-5 w-5' />
              References & Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='prose prose-sm max-w-none'>
              <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                {enhanced.references}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
