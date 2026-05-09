# PhishGuard — Phishing Awareness Platform

> Plataforma de simulación de phishing para entrenar a empleados en ciberseguridad. Permite a administradores lanzar campañas de phishing simulado, medir resultados en tiempo real y formar a los usuarios que caen en la trampa.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Versión](https://img.shields.io/badge/versión-0.1.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20FastAPI%20%7C%20PostgreSQL-purple)

---

## Aviso legal

Este proyecto está diseñado **únicamente para entornos autorizados y educativos**. Nunca se almacenan credenciales reales. El uso fuera de entornos autorizados puede ser ilegal.

---

## Descripción

PhishGuard permite a equipos de seguridad lanzar campañas de phishing simulado de forma controlada. Los empleados reciben emails falsos realistas y, si hacen clic, son redirigidos a una página educativa que explica el error y ofrece formación inmediata.

**Diferencias frente a GoPhish o KnowBe4:**
- Interfaz moderna tipo SaaS con dashboard en tiempo real
- Feed de actividad live via WebSockets
- Módulo de formación inmediata post-clic
- Gamificación con rankings y badges
- Generación de emails con IA

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14, Tailwind CSS, shadcn/ui, Recharts |
| Backend | FastAPI, PostgreSQL, Redis, Celery |
| Infra | Docker Compose, Nginx, GitHub Actions |

---

## Instalación

```bash
git clone https://github.com/hectorabad636-spec/Phishguard.git
cd phishguard
docker-compose up -d
```

Frontend:
```bash
cd frontend && npm install && npm run dev
```

Backend:
```bash
cd backend && pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- Web: http://localhost:3000
- API docs: http://localhost:8000/docs

---

## Roadmap

**Fase 1 — MVP**
- [x] Dashboard con métricas
- [ ] Autenticación JWT
- [ ] CRUD de campañas
- [ ] Envío de emails simulados
- [ ] Tracking de clics
- [ ] Landing page educativa

**Fase 2 — Profesional**
- [ ] Gráficos con Recharts
- [ ] WebSockets tiempo real
- [ ] Templates de phishing
- [ ] Roles RBAC
- [ ] Reportes PDF
- [ ] Celery para envío masivo

**Fase 3 — Empresa**
- [ ] Deploy VPS + Docker + Nginx
- [ ] CI/CD GitHub Actions
- [ ] Gamificación
- [ ] Emails con IA

---

> Desarrollado con fines educativos. Úsalo responsablemente.