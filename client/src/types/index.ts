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

export interface ArticleComparison {
  original: Article;
  enhanced?: Article;
}
