import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { SafeHtmlDirective } from '../../shared/directives/safe-html.directive';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterLink, SafeHtmlDirective],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss'
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post = signal<Post | null>(null);
  loading = signal(true);
  notFound = signal(false);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.blogService.getPost(slug).subscribe(post => {
      if (!post) {
        this.notFound.set(true);
      } else {
        this.post.set(post);
      }
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
