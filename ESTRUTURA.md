# 📂 Estrutura do Projeto

Este projeto foi organizado separando claramente o **Frontend** e o **Backend** para facilitar o desenvolvimento e manutenção.

## 🏗️ Arquitetura

```
projeto/
└── src/                 # Código fonte principal
    ├── backend/         # APIs e rotas simuladas
    │   └── api/        # Endpoints de cada módulo
    │       ├── usuarios.ts
    │       ├── empresas.ts
    │       ├── equipes.ts
    │       ├── metas.ts
    │       ├── comissoes.ts
    │       ├── produtos.ts
    │       ├── clientes.ts
    │       ├── links.ts
    │       ├── lancamentos.ts
    │       └── home.ts       # Rotas do Dashboard (Home)
    │
    ├── components/      # Componentes React
    ├── pages/          # Páginas da aplicação
    ├── hooks/          # React Hooks customizados
    └── ...
```

## 🔄 Fluxo de Dados

### Frontend (src/pages, src/components, src/hooks)
- Interface do usuário
- Formulários e validações
- Chamadas às APIs do backend
- Gerenciamento de estado local

### Backend (src/backend/api)
- Rotas de API simuladas
- Estrutura preparada para lógica de negócio
- Pontos de integração com banco de dados (TODO)

## 📡 Como Funciona

### 1. Cadastrar Dados
```
[Usuário preenche formulário]
         ↓
[Frontend valida dados]
         ↓
[Chama função do backend/api]
         ↓
[Backend registra no console]
         ↓
[TODO: Backend salva no banco]
         ↓
[Retorna sucesso/erro]
         ↓
[Frontend exibe mensagem]
```

### 2. Listar Dados
```
[Frontend solicita dados]
         ↓
[Chama função listar do backend]
         ↓
[TODO: Backend busca no banco]
         ↓
[Retorna array de dados]
         ↓
[Frontend renderiza na tabela]
```

### 3. Editar Dados
```
[Usuário clica em editar]
         ↓
[Frontend abre modal com dados]
         ↓
[Usuário modifica e salva]
         ↓
[Chama função editar do backend com ID]
         ↓
[TODO: Backend atualiza no banco]
         ↓
[Retorna sucesso/erro]
         ↓
[Frontend atualiza lista]
```

### 4. Excluir Dados
```
[Usuário clica em excluir]
         ↓
[Frontend exibe confirmação]
         ↓
[Usuário confirma]
         ↓
[Chama função excluir com ID]
         ↓
[TODO: Backend faz soft delete]
         ↓
[Retorna sucesso]
         ↓
[Frontend remove da lista]
```

## 🎯 Funcionalidades Prontas

✅ **Frontend Completo**
- Formulários de cadastro
- Tabelas de listagem
- Modais de edição
- Confirmação de exclusão
- Validações de campos
- Mensagens de feedback (toasts)

✅ **Rotas de API Estruturadas**
- CRUD completo para todos os módulos
- Retornos padronizados
- Logs no console para debug
- TypeScript com tipagem

⏳ **Pendente (TODO)**
- Conexão com banco de dados
- Lógica de autenticação real
- Validações server-side
- Regras de negócio
- Testes automatizados

## 🚀 Próximos Passos

1. **Configurar Banco de Dados**
   ```bash
   # Instalar cliente do banco (exemplo PostgreSQL)
   npm install pg
   ```

2. **Implementar Lógica no Backend**
   - Abrir arquivos em `src/backend/api/`
   - Substituir os `TODO` por código real
   - Conectar ao banco de dados

3. **Adicionar Autenticação**
   - Implementar JWT ou sessões
   - Proteger rotas sensíveis
   - Validar permissões

4. **Testar Integrações**
   - Testar cada endpoint
   - Verificar fluxo completo
   - Corrigir bugs

## 📝 Convenções de Código

### Frontend
- Hooks customizados em `src/hooks/`
- Componentes em `src/components/`
- Páginas em `src/pages/`
- APIs simuladas em `src/backend/api/`
- Use TypeScript sempre que possível

### Backend
- Uma função para cada operação CRUD
- Sempre retornar `{ success, data?, error? }`
- Adicionar logs descritivos
- Validar todos os inputs

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
- React 18
- TypeScript
- TanStack Query (React Query)
- Tailwind CSS
- Shadcn/ui

### Backend (Preparado para)
- Node.js
- PostgreSQL / MySQL / MongoDB
- Express / Fastify
- TypeScript

---

**Nota**: Esta estrutura foi criada para facilitar a migração de um sistema com banco de dados. Todo o frontend está funcional e pronto para integração real com backend.
