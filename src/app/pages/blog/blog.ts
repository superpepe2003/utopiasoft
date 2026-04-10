import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostMeta } from '../../models/post.model';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);

  allPosts = signal<PostMeta[]>([]);
  activeTag = signal<string | null>(null);
  loading = signal(true);

  filteredPosts = computed(() => {
    const tag = this.activeTag();
    if (!tag) return this.allPosts();
    return this.allPosts().filter(p => p.tags.includes(tag));
  });

  allTags = computed(() => {
    const tagSet = new Set<string>();
    this.allPosts().forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  });

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      this.allPosts.set(posts);
      this.loading.set(false);
    });
  }

  setTag(tag: string | null) {
    this.activeTag.set(tag);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
