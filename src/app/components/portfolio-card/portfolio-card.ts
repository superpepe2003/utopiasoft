import { Component, Input, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-portfolio-card',
  imports: [CommonModule],
  templateUrl: './portfolio-card.html',
  styleUrl: './portfolio-card.scss'
})
export class PortfolioCardComponent implements OnDestroy {
  @Input({ required: true }) project!: Project;

  currentIndex = signal(0);
  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;

  hasImages = computed(() => this.project.images.length > 0);
  hasMultiple = computed(() => this.project.images.length > 1);

  currentImage = computed(() =>
    this.hasImages() ? this.project.images[this.currentIndex()] : null
  );

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    if (!this.hasMultiple()) return;
    this.autoPlayInterval = setInterval(() => this.next(), 3000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  next() {
    const total = this.project.images.length;
    this.currentIndex.update(i => (i + 1) % total);
  }

  prev() {
    const total = this.project.images.length;
    this.currentIndex.update(i => (i - 1 + total) % total);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}
