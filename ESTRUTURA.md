# 📂 Estrutura do Projeto

Este projeto está em modo Somente Frontend (mock). As APIs em src/backend/api simulam o backend; não há conexão real ativa. O design e a UI permanecem idênticos.

## 🏗️ Arquitetura

```
projeto/
└── src/                        # Código fonte principal
    ├── backend/                # APIs com lógica de negócio
    │   └── api/               # Módulos de API
    │       ├── index.ts                 # Autenticação (login/logout)
    │       ├── usuarios.ts              # CRUD de usuários
    │       ├── empresas.ts              # CRUD de empresas
    │       ├── equipes.ts               # CRUD de equipes
    │       ├── metas.ts                 # CRUD de metas
    │       ├── comissoes.ts             # CRUD de comissões
    │       ├── produtos.ts              # CRUD de produtos
    │       ├── clientes.ts              # CRUD de clientes
    │       ├── links.ts                 # CRUD de links
    │       ├── premiacoes.ts            # CRUD de premiações
    │       ├── lancamentos.ts           # CRUD de lançamentos
    │       ├── home.ts                  # Dados do Dashboard (Home)
    │       └── dashboard_comissoes.ts   # Dashboard de Comissões
    │
    ├── components/             # Componentes React
    ├── pages/                  # Páginas da aplicação
    │   ├── Landing.tsx         # Página inicial (antes do login)
    │   ├── Auth.tsx            # Autenticação
    │   ├── Index.tsx           # Dashboard principal
    │   ├── Cadastros.tsx       # Gestão de cadastros
    │   ├── Lancamento.tsx      # Lançamentos de vendas
    │   ├── Comissoes.tsx       # Dashboard de comissões
    │   ├── Resultado.tsx       # Resultados e análises
    │   └── ...
    ├── hooks/                  # React Hooks customizados
    ├── integrations/
    │   └── supabase/          # Integração Lovable Cloud
    │       ├── client.ts       # Cliente Supabase (auto-gerado)
    │       └── types.ts        # Tipos do banco (auto-gerado)
    └── ...
```

## 🔄 Fluxo de Dados

### Frontend (src/pages, src/components, src/hooks)
- Interface do usuário com React + TypeScript
- Formulários e validações
- React Query para gerenciamento de estado e cache
- Integração interna via APIs mock em src/backend/api

### Backend (Mock/Simulado)
- Sem conexão real (somente funções mock)
- Dados não são persistidos
- Substitua as funções em `src/backend/api` pelos seus endpoints MySQL
- Mantém a mesma interface para facilitar a migração

## 📡 Como Funciona

### Autenticação
```
[Usuário acessa o site]
         ↓
[Landing page é exibida]
         ↓
[Usuário faz cadastro/login]
         ↓
[Login mock valida credenciais (src/backend/api/index.ts)]
         ↓
[Sessão salva em localStorage]
         ↓
[ProtectedRoute verifica autenticação]
         ↓
[Usuário acessa o dashboard]
```

### Operações CRUD
```
[Usuário interage com formulário]
         ↓
[Frontend valida dados]
         ↓
[Chama API em src/backend/api (mock)]
          ↓
[Seu backend (quando integrar) valida e processa]
          ↓
[Dados persistidos no seu MySQL]
          ↓
         ↓
[Frontend recebe resposta]
         ↓
[UI atualizada automaticamente]
```

## 🎯 Funcionalidades Implementadas

✅ **Frontend Completo**
- Formulários de cadastro com validação
- Tabelas de listagem com filtros
- Modais de edição e criação
- Confirmações de exclusão
- Mensagens de feedback (toasts)
- Dashboard com métricas em tempo real
- Sistema de ranking de vendas
- Gerenciamento de comissões e metas

✅ **Backend Simulado (Mock)**
- Autenticação simulada (login/logout em src/backend/api/index.ts)
- Sem persistência real de dados
- Pronto para substituir por seus endpoints MySQL mantendo a mesma interface
- Exemplo de ponto único para SELECTs: use `listarEmpresas`, `listarEquipes`, `listarUsuarios`, etc.

✅ **Módulos Implementados**
- Usuários (com níveis de acesso)
- Empresas e Equipes
- Produtos/Serviços e Clientes
- Metas (individual, equipe, empresa)
- Comissões (automáticas por nível)
- Lançamentos de vendas
- Links personalizados
- Premiações com upload de imagens
- Dashboards e relatórios

## 📝 Convenções de Código

### Frontend
- Hooks customizados em `src/hooks/`
- Componentes reutilizáveis em `src/components/`
- Páginas em `src/pages/`
- TypeScript obrigatório
- Design system com tokens semânticos (index.css)
- Componentes Shadcn/ui customizados

### Backend
- APIs em `src/backend/api/` (interface com Supabase)
- Sempre retornar `{ success, data?, error? }`
- Logs com prefixo 🔵 Backend
- RLS policies para todas as tabelas
- Triggers para lógica automática
- Soft delete (campo `ativo`) em vez de DELETE

## 🔍 Debug

Todos os logs do backend aparecem com o prefixo **🔵 Backend**:
```
🔵 Backend - Cadastrar usuário: {...}
🔵 Backend - Editar empresa: {...}
🔵 Backend - Excluir equipe com ID: xxx
```

Logs do frontend aparecem com o prefixo **🔵 Frontend**:
```
🔵 Frontend - Obtendo ID Ascora do usuário logado
🔵 Frontend - Tentando fazer login: {...}
```

## 🛠️ Tecnologias

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **TanStack Query** - Gerenciamento de estado e cache
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **React Router** - Navegação
- **Zod** - Validação de schemas

### Backend
- **Lovable Cloud (Supabase)** - Plataforma completa
- **PostgreSQL** - Banco de dados relacional
- **Supabase Auth** - Autenticação
- **Row Level Security** - Segurança de dados
- **Triggers & Functions** - Lógica de negócio

## 🔐 Segurança

- Autenticação obrigatória em todas as rotas protegidas
- RLS policies garantem isolamento de dados por `id_ascora`
- Senha hasheada automaticamente pelo Supabase Auth
- Roles diferentes para controle de acesso (master, admin, vendedor)
- Soft delete para auditoria de dados

## 📊 Estrutura do Banco de Dados

**Tabelas Principais:**
- `profiles` - Perfis de usuário
- `user_roles` - Roles e permissões
- `usuarios` - Vendedores e equipes
- `empresas` - Empresas cadastradas
- `equipes` - Equipes de vendas
- `produtos` - Produtos/serviços
- `clientes` - Clientes cadastrados
- `metas` - Metas (individual, equipe, empresa)
- `comissoes` - Estrutura de comissões
- `lancamentos` - Vendas registradas
- `links` - Links personalizados
- `premiacoes` - Premiações

**Lógica Automática:**
- Meta de empresa é distribuída automaticamente entre vendedores
- Comissões são aplicadas automaticamente aos vendedores
- Timestamps atualizados via trigger
- Campo `id_ascora` preenchido automaticamente

---

**Sistema completo com backend integrado via Lovable Cloud.**
