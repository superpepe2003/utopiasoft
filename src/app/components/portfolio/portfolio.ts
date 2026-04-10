import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioCardComponent } from '../portfolio-card/portfolio-card';
import { PROJECTS } from '../../data/projects.data';
import { Project, ProjectCategory } from '../../models/project.model';

interface FilterOption {
  label: string;
  value: ProjectCategory;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, PortfolioCardComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class PortfolioComponent {
  readonly filters: FilterOption[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Fullstack', value: 'fullstack' },
    { label: 'Municipal', value: 'municipal' },
    { label: 'Frontend', value: 'frontend' },
  ];

  activeFilter = signal<ProjectCategory>('all');

  filteredProjects = computed<Project[]>(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  });

  setFilter(cat: ProjectCategory) {
    this.activeFilter.set(cat);
  }
}
