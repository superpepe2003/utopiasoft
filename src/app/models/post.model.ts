export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  image?: string;
}

export interface Post extends PostMeta {
  content: string; // HTML ya renderizado desde markdown
}
