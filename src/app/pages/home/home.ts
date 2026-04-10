import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesSectionComponent } from '../../components/services-section/services-section';
import { PortfolioComponent } from '../../components/portfolio/portfolio';
import { BlogPreviewComponent } from '../../components/blog-preview/blog-preview';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesSectionComponent,
    PortfolioComponent,
    BlogPreviewComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-services-section />
    <app-portfolio />
    <app-blog-preview />
    <app-contact />
  `,
})
export class HomeComponent {}
