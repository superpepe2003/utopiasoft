import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap, map, catchError, of } from 'rxjs';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { Post, PostMeta } from '../models/post.model';

marked.use(markedHighlight({
  emptyLangClass: 'hljs',
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

marked.setOptions({
  gfm: true,
  breaks: true,
});

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  /** Obtiene la lista de posts desde el índice JSON */
  getPosts(): Observable<PostMeta[]> {
    return this.http.get<PostMeta[]>('content/posts/posts-index.json').pipe(
      map(posts => posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
      catchError(() => of([]))
    );
  }

  /** Obtiene los últimos N posts */
  getLatestPosts(count = 3): Observable<PostMeta[]> {
    return this.getPosts().pipe(map(posts => posts.slice(0, count)));
  }

  /** Obtiene un post completo por slug */
  getPost(slug: string): Observable<Post | null> {
    return this.getPosts().pipe(
      switchMap(allMeta => {
        const indexMeta = allMeta.find(p => p.slug === slug);
        return this.http.get(`content/posts/${slug}.md`, { responseType: 'text' }).pipe(
          switchMap(rawContent => {
            const { meta, body } = this.parseFrontmatter(rawContent);
            // Si el .md no tiene frontmatter con fecha, usamos la del índice
            const resolvedMeta = {
              ...meta,
              title: meta.title || indexMeta?.title || '',
              date: meta.date || indexMeta?.date || '',
              tags: meta.tags.length ? meta.tags : (indexMeta?.tags ?? []),
              excerpt: meta.excerpt || indexMeta?.excerpt || '',
              image: meta.image ?? indexMeta?.image,
            };
            return from(Promise.resolve(marked.parse(body))).pipe(
              map(html => ({ ...resolvedMeta, slug, content: html as string }) as Post)
            );
          }),
          catchError(() => of(null))
        );
      }),
      catchError(() => of(null))
    );
  }

  /** Extrae el frontmatter YAML del markdown */
  private parseFrontmatter(raw: string): { meta: Omit<PostMeta, 'slug'>; body: string } {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      return {
        meta: { title: '', date: '', tags: [], excerpt: '' },
        body: raw,
      };
    }

    const frontmatter = match[1];
    const body = match[2];
    const meta: Partial<PostMeta> = {};

    for (const line of frontmatter.split('\n')) {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();

      if (key === 'tags') {
        // Formato: ["tag1", "tag2"] o tag1, tag2
        meta.tags = value.startsWith('[')
          ? JSON.parse(value)
          : value.split(',').map(t => t.trim().replace(/^"|"$/g, ''));
      } else if (key === 'title' || key === 'date' || key === 'excerpt' || key === 'image') {
        (meta as Record<string, string>)[key] = value.replace(/^"|"$/g, '');
      }
    }

    return {
      meta: {
        title: meta.title ?? '',
        date: meta.date ?? '',
        tags: meta.tags ?? [],
        excerpt: meta.excerpt ?? '',
        image: meta.image,
      },
      body,
    };
  }
}
