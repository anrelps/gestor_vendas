<div align="center">

# Gestor de Vendas

**Gestão de vendas, clientes e pagamentos para pequenas empresas.**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## Visão Geral

Gestor de Vendas é uma aplicação full-stack para gerenciar vendas, clientes, produtos e pagamentos. Oferece relatórios financeiros visuais, geração de PDFs, modo demo com dados de exemplo e controle por empresa — tudo em uma interface limpa e responsiva.

---

## Funcionalidades

**Dashboard**
- Resumo de receita do mês atual vs. meses anteriores com variação percentual
- Gráfico de barras de receita semanal
- Visão geral de vendas recebidas vs. pendentes do mês e total pendente geral

**Vendas**
- Criar e editar vendas com múltiplos produtos, cliente vinculado e observações
- Pagamento rápido individual ou pagamento em lote para múltiplas vendas
- Histórico de pagamentos por venda
- Geração de PDF de comprovante e listagem geral de vendas

**Clientes e Produtos**
- CRUD completo de clientes e produtos por empresa

**Pagamentos**
- Histórico paginado de todos os registros de pagamento da empresa

**Empresa e Perfil**
- Dados da empresa com upload de logotipo
- Atualização de senha e informações do usuário

**Auth e Demo**
- Autenticação via Laravel Sanctum (token Bearer)
- Modo demo — explore com dados pré-populados sem criar conta

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, Vite, Redux Toolkit, Tailwind CSS v4 |
| UI | Headless UI, Lucide React, react-hot-toast, date-fns |
| Backend | Laravel 12, PHP 8.4 |
| Geração de PDF | barryvdh/laravel-dompdf |
| Banco de dados | PostgreSQL |
| Auth | Laravel Sanctum (token-based) |
| Deploy | Vercel (frontend) · Railway (backend + DB) |

---

## Arquitetura

```
backend/app/
├── Http/
│   ├── Controllers/        # Thin controllers, delegam para services
│   └── Resources/          # API response transformers
├── Models/                 # Eloquent models (Venda, Cliente, Produto…)
├── Services/               # Regras de negócio por domínio
└── Traits/                 # ApiResponse, helpers compartilhados

frontend/src/
├── features/               # Módulos de UI (dashboard, vendas, clientes…)
├── components/             # Componentes compartilhados e gráficos
├── redux/                  # Slices + chamadas de serviço à API
├── services/               # Instância axios + services por recurso
└── pages/                  # Componentes de rota
```

---

## Como Rodar Localmente

### Pré-requisitos

- PHP 8.4 + Composer
- Node.js 20+ + npm
- PostgreSQL

### Backend

```bash
cd backend

composer install
cp .env.example .env
php artisan key:generate

# Configure o banco em .env, depois:
php artisan migrate

php artisan serve
```

API disponível em `http://localhost:8000`.

### Frontend

```bash
cd frontend

npm install
npm run dev
```

App disponível em `http://localhost:5173`.

> Configure `VITE_API_URL=http://localhost:8000/api/v1` no `frontend/.env`.

---

## Variáveis de Ambiente

### Backend — `backend/.env`

```env
APP_KEY=                    # php artisan key:generate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seu-dominio.railway.app

DB_CONNECTION=pgsql
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

FRONTEND_URL=https://seu-app.vercel.app
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=https://seu-dominio.railway.app/api/v1
```

---

## Deploy

| Serviço | Uso |
|---|---|
| [Railway](https://railway.app) | Laravel API + PostgreSQL |
| [Vercel](https://vercel.com) | React SPA |

---

## API

Base URL: `/api/v1`

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/login` | Autenticar |
| `POST` | `/register` | Criar conta |
| `POST` | `/demo-login` | Sessão demo |
| `GET` | `/me` | Usuário atual |
| `GET` | `/user/logout` | Revogar token |
| `GET/POST` | `/{empresa}/vendas` | Listar / criar vendas |
| `GET/PUT/DELETE` | `/{empresa}/vendas/:id` | Gerenciar venda |
| `POST` | `/{empresa}/vendas/:id/quick-pay` | Pagamento rápido |
| `PUT` | `/{empresa}/vendas/pay-multiple-sales` | Pagamento em lote |
| `GET/POST` | `/{empresa}/clientes` | Listar / criar clientes |
| `GET/POST` | `/{empresa}/produtos` | Listar / criar produtos |
| `GET` | `/{empresa}/pagamentos` | Histórico de pagamentos |
| `GET` | `/charts/lucro-semanal` | Receita semanal |
| `GET` | `/charts/resumo-financeiro` | Recebido vs pendente |
| `GET` | `/charts/resumo-mes` | Resumo mensal |
| `GET` | `/{empresa}/relatorios/pdf/vendas` | PDF geral de vendas |
| `GET` | `/{empresa}/relatorios/pdf/vendas/:id` | PDF de venda individual |

Rotas autenticadas exigem `Authorization: Bearer <token>`.

---

## Licença

MIT — veja [LICENSE](LICENSE) para detalhes.
