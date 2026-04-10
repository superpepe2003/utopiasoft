---
title: "Deploy de NestJS con Docker: guía paso a paso"
date: "2026-03-20"
tags: ["nestjs", "docker", "devops"]
excerpt: "Aprende a containerizar tu API NestJS con Docker y docker-compose, con configuración para desarrollo y producción en un solo repositorio."
image: null
---

# Deploy de NestJS con Docker

Docker cambió la forma en que deployeo APIs. Ya no hay más "en mi máquina funciona". Acá te muestro cómo containerizar un proyecto NestJS de forma correcta.

## El Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
```

La clave está en el **multi-stage build**: el primer stage compila, el segundo solo copia lo necesario. El resultado es una imagen mucho más liviana.

## docker-compose para el proyecto completo

```yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## Variables de entorno

Nunca hardcodees credenciales. Usá un archivo `.env` y la librería `@nestjs/config`:

```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
```

---

*¿Dudas sobre el setup? [Contactame](mailto:contacto@utopiasoft.net.ar).*
