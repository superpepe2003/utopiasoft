import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services-section',
  imports: [CommonModule],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss'
})
export class ServicesSectionComponent {
  readonly services: Service[] = [
    {
      icon: '🌐',
      title: 'Desarrollo Web a Medida',
      description: 'Sitios institucionales, e-commerce y sistemas web construidos con las tecnologías más modernas.',
    },
    {
      icon: '📱',
      title: 'Aplicaciones Móviles',
      description: 'Apps PWA e híbridas que funcionan en cualquier dispositivo, con experiencia nativa.',
    },
    {
      icon: '🤖',
      title: 'Agentes de IA y Chatbots',
      description: 'Chatbots inteligentes y agentes conversacionales impulsados por LLMs para automatizar tu negocio.',
    },
    {
      icon: '⚡',
      title: 'Automatizaciones con LLMs',
      description: 'Flujos de trabajo automatizados que integran modelos de lenguaje en tus procesos existentes.',
    },
    {
      icon: '🏛️',
      title: 'Sistemas para Municipios',
      description: 'Plataformas de gestión ciudadana, reclamos, emergencias y servicios gubernamentales digitales.',
    },
    {
      icon: '🏗️',
      title: 'Consultoría y Arquitectura',
      description: 'Diseño de arquitectura de software, revisión de código y consultoría técnica para proyectos complejos.',
    },
    {
      icon: '🔗',
      title: 'Integración Blockchain',
      description: 'Contratos inteligentes, tokenización y soluciones descentralizadas para distintos sectores.',
    },
  ];
}
