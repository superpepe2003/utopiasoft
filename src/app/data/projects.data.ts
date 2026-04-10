import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'fijamom',
    title: 'Fijamom',
    description: 'Ecommerce y CRM de ventas mayoristas con gestión de clientes, pedidos y catálogo de productos.',
    stack: ['React', 'NestJS', 'Docker'],
    images: [
      'assets/screenshots/fijamo01.png',
      'assets/screenshots/fijamo02.png',
      'assets/screenshots/fijamo03.png',
    ],
    url: 'https://www.fijamom.com.ar/',
    category: 'fullstack',
  },
  {
    id: 'autosenlaweb',
    title: 'Autos en la Web',
    description: 'Plataforma de publicación y búsqueda de autos usados y nuevos con filtros avanzados y panel de concesionarias.',
    stack: ['Angular', 'NestJS', 'Docker'],
    images: [
      'assets/screenshots/autosenlaweb01.png',
      'assets/screenshots/autosenlaweb02.png',
      'assets/screenshots/autosenlaweb03.png',
    ],
    url: 'https://www.autosenlaweb.com.ar/inicio',
    category: 'fullstack',
  },
  {
    id: 'tiendamp',
    title: 'Tienda MP',
    description: 'Marketplace municipal para el Municipio de Marcos Paz — permite a comercios locales publicar y vender sus productos.',
    stack: ['Angular', '.NET Core', 'Docker'],
    images: [
      'assets/screenshots/tiendamp01.png',
      'assets/screenshots/tiendamp02.png',
    ],
    url: 'https://tienda-mp.marcospazdigital.gob.ar/web/home',
    category: 'municipal',
  },
  {
    id: 'taskmanager',
    title: 'App de Tareas',
    description: 'Aplicación web de gestión de tareas personales con tablero Kanban, etiquetas y seguimiento de progreso.',
    stack: ['Angular', 'NestJS', 'Docker'],
    images: [
      'assets/screenshots/taskmanager01.png',
      'assets/screenshots/taskmanager02.png',
    ],
    url: 'https://todo.utopiasoft.net.ar/dashboard',
    category: 'fullstack',
  },
  {
    id: 'controlgasto',
    title: 'App Control de Gastos',
    description: 'Sistema de seguimiento de gastos e ingresos personales con categorías, gráficos y reportes mensuales.',
    stack: ['Angular', 'NestJS', 'MySQL', 'Docker'],
    images: [
      'assets/screenshots/controlgasto01.png',
      'assets/screenshots/controlgasto02.png',
      'assets/screenshots/controlgasto03.png',
    ],
    url: 'https://control.utopiasoft.net.ar/',
    category: 'fullstack',
  },
  {
    id: 'emergencias',
    title: 'Sistema de Emergencias',
    description: 'Sistema de gestión y despacho de emergencias para el Municipio de Marcos Paz — operación en tiempo real.',
    stack: ['Angular', '.NET Core', 'PostgreSQL'],
    images: [],
    category: 'municipal',
  },
  {
    id: 'reclamos',
    title: 'Reclamos Ciudadanos',
    description: 'Plataforma de reclamos y solicitudes ciudadanas para el Municipio de Marcos Paz con seguimiento de estado.',
    stack: ['Angular', '.NET Core', 'PostgreSQL'],
    images: [],
    category: 'municipal',
  },
];
