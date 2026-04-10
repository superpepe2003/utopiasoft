import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostMeta } from '../../models/post.model';

@Component({
  selector: 'app-blog-preview',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-preview.html',
  styleUrl: './blog-preview.scss'
})
export class BlogPreviewComponent implements OnInit {
  private blogService = inject(BlogService);

  posts = signal<PostMeta[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.blogService.getLatestPosts(3).subscribe(posts => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
