---
title: "Cómo estructuro mis proyectos Angular en 2025"
date: "2026-04-10"
tags: ["angular", "typescript", "arquitectura"]
excerpt: "Una guía práctica sobre cómo organizo la estructura de carpetas, lazy loading y separación de responsabilidades en proyectos Angular reales."
image: null
---

# Cómo estructuro mis proyectos Angular en 2025

Después de trabajar en múltiples proyectos Angular —desde e-commerces hasta sistemas municipales— fui desarrollando una estructura que me funciona bien para escalar sin caer en el caos. Acá la comparto.

## La estructura base

```
src/
  app/
    components/       ← Componentes reutilizables
    pages/            ← Una carpeta por ruta
    services/         ← Lógica de negocio e integración HTTP
    models/           ← Interfaces y tipos
    data/             ← Datos estáticos o configuración
  content/            ← Posts, textos, etc.
  styles.scss         ← Variables globales y reset
```

La clave está en **separar componentes de presentación de los de lógica**.

## Standalone Components + Lazy Loading

Desde Angular 17, los componentes standalone son la norma. Combinados con lazy loading en las rutas, logramos bundles iniciales mucho más pequeños:

```typescript
export const routes: Routes = [
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent),
  },
];
```

Esto hace que la página de blog solo se cargue cuando el usuario la visita.

## Signals para estado local

En lugar de usar un store global para todo, prefiero usar signals de Angular para el estado local de cada componente:

```typescript
import { signal, computed } from '@angular/core';

// Estado local
const activeFilter = signal<string>('all');

// Derivado reactivo
const filteredItems = computed(() => {
  const f = activeFilter();
  return f === 'all' ? allItems : allItems.filter(i => i.category === f);
});
```

Simple, predecible y sin boilerplate innecesario.

## Reglas que sigo

1. **Un componente = una responsabilidad**. Si un componente hace dos cosas, divido.
2. **Los servicios son los únicos que hablan con la API**. Los componentes consumen el servicio.
3. **Sin `any`**. TypeScript estricto en todo momento.
4. **Lazy loading en todas las rutas de primer nivel**.
5. **CSS Variables para el tema**, no hardcode de colores.

## Conclusión

No existe la estructura perfecta, pero sí existe la que le sirve a tu equipo y a tu proyecto. Esta me ha funcionado bien para proyectos de tamaño mediano a grande. Si empezás un proyecto nuevo, te recomiendo adoptarla desde el principio —refactorizar una estructura mal planteada es costoso.

---

*¿Tenés preguntas o usás otra estrategia? Escribime por [email](mailto:pablofretes@gmail.com).*
