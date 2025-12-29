import { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import { ArticleList } from '@/components/ArticleList';
import { ArticleComparison } from '@/components/ArticleComparison';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Sparkles, RefreshCw, Globe } from 'lucide-react';
import { type Article } from '@/types';

function App() {
  const { articles, loading, error, refetch } = useArticles();
  console.log(articles);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Ensure articles is always an array
  const safeArticles = Array.isArray(articles) ? articles : [];

  const selectedArticleData = safeArticles.find(
    (article) => article.id === selectedArticle
  );

  const hasEnhancedVersion = (article: Article) => {
    return article.updatedAt !== article.createdAt;
  };

  const enhancedArticles = safeArticles.filter(hasEnhancedVersion);

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Globe className='h-8 w-8 text-primary' />
                <h1 className='text-3xl font-bold'>BeyondChats</h1>
              </div>
              <Badge variant='secondary' className='hidden sm:inline-flex'>
                Article Enhancement Platform
              </Badge>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-sm text-muted-foreground hidden sm:block'>
                {safeArticles.length} articles • {enhancedArticles.length}{' '}
                enhanced
              </div>
              <Button
                onClick={refetch}
                variant='outline'
                size='sm'
                className='gap-2'
              >
                <RefreshCw className='h-4 w-4' />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        {selectedArticleData ? (
          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                onClick={() => setSelectedArticle(null)}
                className='gap-2'
              >
                ← Back to Articles
              </Button>
              <div className='flex items-center gap-2'>
                <Badge variant='outline'>
                  <FileText className='h-3 w-3 mr-1' />
                  Original
                </Badge>
                {hasEnhancedVersion(selectedArticleData) && (
                  <Badge variant='default'>
                    <Sparkles className='h-3 w-3 mr-1' />
                    Enhanced Available
                  </Badge>
                )}
              </div>
            </div>
            <ArticleComparison
              original={selectedArticleData}
              enhanced={
                hasEnhancedVersion(selectedArticleData) &&
                selectedArticleData.enhancedContent
                  ? selectedArticleData
                  : undefined
              }
            />
          </div>
        ) : (
          <Tabs defaultValue='all' className='w-full'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='all' className='gap-2'>
                <FileText className='h-4 w-4' />
                All Articles ({safeArticles.length})
              </TabsTrigger>
              <TabsTrigger value='enhanced' className='gap-2'>
                <Sparkles className='h-4 w-4' />
                Enhanced ({enhancedArticles.length})
              </TabsTrigger>
              <TabsTrigger value='original' className='gap-2'>
                <FileText className='h-4 w-4' />
                Original Only ({safeArticles.length - enhancedArticles.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value='all' className='space-y-6'>
              <div className='text-center space-y-4'>
                <h2 className='text-2xl font-bold'>All Articles</h2>
                <p className='text-muted-foreground'>
                  Browse all articles, both original and enhanced versions
                </p>
              </div>
              <ArticleList
                articles={safeArticles}
                loading={loading}
                error={error}
                onRefresh={refetch}
                onArticleClick={(article: Article) =>
                  setSelectedArticle(article.id)
                }
              />
            </TabsContent>

            <TabsContent value='enhanced' className='space-y-6'>
              <div className='text-center space-y-4'>
                <h2 className='text-2xl font-bold'>Enhanced Articles</h2>
                <p className='text-muted-foreground'>
                  Articles that have been enhanced with AI-powered improvements
                </p>
              </div>
              <ArticleList
                articles={enhancedArticles}
                loading={loading}
                error={error}
                onRefresh={refetch}
                onArticleClick={(article: Article) =>
                  setSelectedArticle(article.id)
                }
              />
            </TabsContent>

            <TabsContent value='original' className='space-y-6'>
              <div className='text-center space-y-4'>
                <h2 className='text-2xl font-bold'>Original Articles Only</h2>
                <p className='text-muted-foreground'>
                  Articles that haven't been enhanced yet
                </p>
              </div>
              <ArticleList
                articles={safeArticles.filter(
                  (article) => !hasEnhancedVersion(article)
                )}
                loading={loading}
                error={error}
                onRefresh={refetch}
                onArticleClick={(article: Article) =>
                  setSelectedArticle(article.id)
                }
              />
            </TabsContent>
          </Tabs>
        )}

        {!selectedArticle && safeArticles.length > 0 && (
          <div className='mt-8 text-center'>
            <p className='text-sm text-muted-foreground'>
              Click on any article to view both original and enhanced versions
              side by side
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
