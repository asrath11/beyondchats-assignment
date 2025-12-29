export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleComparison {
  original: Article;
  enhanced?: Article;
}
