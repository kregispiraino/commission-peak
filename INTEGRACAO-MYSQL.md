# 🔗 Guia Completo de Integração com MySQL

Este guia detalha **TODOS** os pontos do código que precisam ser alterados para conectar o sistema ao seu banco de dados MySQL.

## 📋 Índice
1. [Configuração do Banco de Dados](#1-configuração-do-banco-de-dados)
2. [Autenticação](#2-autenticação)
3. [APIs de Cadastros](#3-apis-de-cadastros)
4. [Hooks e Estado](#4-hooks-e-estado)
5. [Páginas e Componentes](#5-páginas-e-componentes)
6. [Checklist Final](#checklist-final)

---

## 1. Configuração do Banco de Dados

### 📁 Criar arquivo de conexão MySQL

Crie `src/lib/mysql.ts`:

```typescript
import mysql from 'mysql2/promise';

// Configuração da conexão MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ascora_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = pool;

// Helper para queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

// Helper para queries únicas
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] || null;
}
```

### 📦 Instalar dependência MySQL

```bash
npm install mysql2
```

---

## 2. Autenticação

### 📁 `src/backend/api/index.ts`

**Linhas a alterar: 33-76**

```typescript
// ANTES (mock)
export async function realizarLogin(credentials: LoginCredentials): Promise<LoginResponse> {
  console.log('🔵 Backend - 🔐 Tentativa de login:', { email: credentials.email });
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (credentials.email === 'admin@ascora.com' && credentials.senha === '123456') {
    // ... mock response
  }
}

// DEPOIS (MySQL)
import { queryOne } from '@/lib/mysql';
import bcrypt from 'bcrypt';

export async function realizarLogin(credentials: LoginCredentials): Promise<LoginResponse> {
  console.log('🔵 Backend - 🔐 Tentativa de login:', { email: credentials.email });
  
  try {
    // Buscar usuário no banco
    const usuario = await queryOne<any>(
      'SELECT * FROM usuarios WHERE email = ? AND ativo = 1',
      [credentials.email]
    );
    
    if (!usuario) {
      return {
        success: false,
        message: 'Credenciais inválidas'
      };
    }
    
    // Validar senha (assumindo que está hasheada com bcrypt)
    const senhaValida = await bcrypt.compare(credentials.senha, usuario.senha);
    
    if (!senhaValida) {
      return {
        success: false,
        message: 'Credenciais inválidas'
      };
    }
    
    // Retornar dados do usuário
    return {
      success: true,
      message: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        acesso: usuario.acesso,
        id_ascora: usuario.id_ascora
      }
    };
  } catch (error) {
    console.error('Erro no login:', error);
    return {
      success: false,
      message: 'Erro ao processar login'
    };
  }
}
```

**Linhas a alterar: 85-96**

```typescript
// ANTES (mock)
export async function realizarLogout(): Promise<{ success: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
}

// DEPOIS (MySQL - se necessário registrar logout)
export async function realizarLogout(): Promise<{ success: boolean }> {
  try {
    // Opcional: registrar logout no banco
    // await query('INSERT INTO logs_acesso (usuario_id, acao, data) VALUES (?, ?, NOW())', [userId, 'logout']);
    return { success: true };
  } catch (error) {
    console.error('Erro no logout:', error);
    return { success: false };
  }
}
```

**Linhas a alterar: 105-134**

```typescript
// ANTES (mock)
export async function verificarSessao(): Promise<{
  autenticado: boolean;
  usuario?: LoginResponse['usuario'];
}> {
  const usuarioString = localStorage.getItem('usuario_logado');
  // ... mock logic
}

// DEPOIS (MySQL)
export async function verificarSessao(): Promise<{
  autenticado: boolean;
  usuario?: LoginResponse['usuario'];
}> {
  const usuarioString = localStorage.getItem('usuario_logado');
  
  if (!usuarioString) {
    return { autenticado: false };
  }
  
  try {
    const usuario = JSON.parse(usuarioString);
    
    // Validar se o usuário ainda existe e está ativo no banco
    const usuarioDB = await queryOne<any>(
      'SELECT id, nome, email, acesso, id_ascora FROM usuarios WHERE id = ? AND ativo = 1',
      [usuario.id]
    );
    
    if (!usuarioDB) {
      localStorage.removeItem('usuario_logado');
      return { autenticado: false };
    }
    
    return {
      autenticado: true,
      usuario: usuarioDB
    };
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return { autenticado: false };
  }
}
```

---

## 3. APIs de Cadastros

### 📁 `src/backend/api/usuarios.ts`

**Linhas a alterar: 20-28** (listarUsuarios)

```typescript
// ANTES (mock)
export async function listarUsuarios(idAscora: string): Promise<Usuario[]> {
  console.log('🔵 Backend - GET Listar usuários para id_ascora:', idAscora);
  await new Promise(resolve => setTimeout(resolve, 300));
  return [];
}

// DEPOIS (MySQL)
import { query } from '@/lib/mysql';

export async function listarUsuarios(idAscora: string): Promise<Usuario[]> {
  console.log('🔵 Backend - GET Listar usuários para id_ascora:', idAscora);
  
  try {
    const usuarios = await query<Usuario>(
      `SELECT id, nome, email, acesso, empresa_id, equipe_id, 
              comissao_percentual, meta_individual, is_vendedor, 
              id_ascora, ativo 
       FROM usuarios 
       WHERE id_ascora = ? AND ativo = 1`,
      [idAscora]
    );
    return usuarios;
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    throw error;
  }
}
```

**Linhas a alterar: 38-48** (cadastrarUsuario)

```typescript
// ANTES (mock)
export async function cadastrarUsuario(usuario: Usuario): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Cadastrar usuário:', usuario);
  return {
    success: true,
    data: { ...usuario, id: 'temp-id-' + Date.now() }
  };
}

// DEPOIS (MySQL)
import bcrypt from 'bcrypt';

export async function cadastrarUsuario(usuario: Usuario): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Cadastrar usuário:', usuario);
  
  try {
    // Hash da senha
    const senhaHash = await bcrypt.hash(usuario.senha || '', 10);
    
    const [result]: any = await query(
      `INSERT INTO usuarios (nome, email, senha, acesso, empresa_id, equipe_id, 
                             comissao_percentual, meta_individual, is_vendedor, 
                             id_ascora, ativo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        usuario.nome,
        usuario.email,
        senhaHash,
        usuario.acesso,
        usuario.empresa_id || null,
        usuario.equipe_id || null,
        usuario.comissao_percentual || 0,
        usuario.meta_individual || 0,
        usuario.is_vendedor || false,
        usuario.id_ascora
      ]
    );
    
    return {
      success: true,
      data: { ...usuario, id: result.insertId.toString() }
    };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return {
      success: false,
      error: 'Erro ao cadastrar usuário'
    };
  }
}
```

**Linhas a alterar: 57-70** (editarUsuario)

```typescript
// ANTES (mock)
export async function editarUsuario(id: string, usuario: Partial<Usuario>): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Editar usuário:', { id, usuario });
  return {
    success: true,
    data: { ...usuario, id } as Usuario
  };
}

// DEPOIS (MySQL)
export async function editarUsuario(id: string, usuario: Partial<Usuario>): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Editar usuário:', { id, usuario });
  
  try {
    const campos: string[] = [];
    const valores: any[] = [];
    
    // Construir query dinâmica apenas com campos fornecidos
    if (usuario.nome !== undefined) {
      campos.push('nome = ?');
      valores.push(usuario.nome);
    }
    if (usuario.email !== undefined) {
      campos.push('email = ?');
      valores.push(usuario.email);
    }
    if (usuario.acesso !== undefined) {
      campos.push('acesso = ?');
      valores.push(usuario.acesso);
    }
    if (usuario.empresa_id !== undefined) {
      campos.push('empresa_id = ?');
      valores.push(usuario.empresa_id);
    }
    if (usuario.equipe_id !== undefined) {
      campos.push('equipe_id = ?');
      valores.push(usuario.equipe_id);
    }
    if (usuario.comissao_percentual !== undefined) {
      campos.push('comissao_percentual = ?');
      valores.push(usuario.comissao_percentual);
    }
    if (usuario.meta_individual !== undefined) {
      campos.push('meta_individual = ?');
      valores.push(usuario.meta_individual);
    }
    if (usuario.is_vendedor !== undefined) {
      campos.push('is_vendedor = ?');
      valores.push(usuario.is_vendedor);
    }
    
    valores.push(id);
    
    await query(
      `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );
    
    return {
      success: true,
      data: { ...usuario, id } as Usuario
    };
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    return {
      success: false,
      error: 'Erro ao editar usuário'
    };
  }
}
```

**Linhas a alterar: 79-88** (excluirUsuario)

```typescript
// ANTES (mock)
export async function excluirUsuario(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir usuário com ID:', id);
  return { success: true };
}

// DEPOIS (MySQL - soft delete)
export async function excluirUsuario(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir usuário com ID:', id);
  
  try {
    await query('UPDATE usuarios SET ativo = 0 WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return {
      success: false,
      error: 'Erro ao excluir usuário'
    };
  }
}
```

### 📁 `src/backend/api/empresas.ts`

**Aplicar mesmo padrão:**
- **Linha 13-20**: `listarEmpresas` → SELECT com WHERE id_ascora
- **Linha 23-32**: `cadastrarEmpresa` → INSERT
- **Linha 35-44**: `editarEmpresa` → UPDATE
- **Linha 47-55**: `excluirEmpresa` → UPDATE ativo = 0

### 📁 `src/backend/api/equipes.ts`

**Aplicar mesmo padrão:**
- **Linha 13-20**: `listarEquipes` → SELECT
- **Linha 23-32**: `cadastrarEquipe` → INSERT
- **Linha 35-44**: `editarEquipe` → UPDATE
- **Linha 47-55**: `excluirEquipe` → UPDATE ativo = 0

### 📁 `src/backend/api/produtos.ts`

**Aplicar mesmo padrão:**
- **Linha 16-23**: `listarProdutos` → SELECT
- **Linha 26-35**: `cadastrarProduto` → INSERT
- **Linha 38-47**: `editarProduto` → UPDATE
- **Linha 50-58**: `excluirProduto` → UPDATE ativo = 0

### 📁 `src/backend/api/clientes.ts`

**Aplicar mesmo padrão:**
- **Linha 16-23**: `listarClientes` → SELECT
- **Linha 26-35**: `cadastrarCliente` → INSERT
- **Linha 38-47**: `editarCliente` → UPDATE
- **Linha 50-58**: `excluirCliente` → UPDATE ativo = 0

### 📁 `src/backend/api/metas.ts`

**Aplicar mesmo padrão:**
- **Linha 15-22**: `listarMetas` → SELECT
- **Linha 25-34**: `cadastrarMeta` → INSERT
- **Linha 37-46**: `editarMeta` → UPDATE
- **Linha 49-57**: `excluirMeta` → UPDATE ativo = 0

### 📁 `src/backend/api/comissoes.ts`

**Aplicar mesmo padrão:**
- **Linha 15-22**: `listarComissoes` → SELECT
- **Linha 25-34**: `cadastrarComissao` → INSERT
- **Linha 37-46**: `editarComissao` → UPDATE
- **Linha 49-57**: `excluirComissao` → UPDATE ativo = 0

### 📁 `src/backend/api/links.ts`

**Aplicar mesmo padrão:**
- **Linha 14-21**: `listarLinks` → SELECT
- **Linha 24-33**: `cadastrarLink` → INSERT
- **Linha 36-45**: `editarLink` → UPDATE
- **Linha 48-56**: `excluirLink` → UPDATE ativo = 0

### 📁 `src/backend/api/premiacoes.ts`

**Aplicar mesmo padrão:**
- **Linha 12-22**: `listarPremiacoes` → SELECT
- **Linha 25-35**: `cadastrarPremiacao` → INSERT (+ upload de foto)
- **Linha 38-48**: `editarPremiacao` → UPDATE
- **Linha 51-61**: `excluirPremiacao` → UPDATE ativo = 0
- **Linha 64-74**: `uploadFotoPremiacao` → Implementar upload real (ex: AWS S3, Cloudinary)

### 📁 `src/backend/api/lancamentos.ts`

**Linhas principais:**
- **Linha 29-68**: `listarLancamentosPendentes` → SELECT WHERE status = 'pendente'
- **Linha 73-92**: `cadastrarLancamento` → INSERT
- **Linha 97-113**: `aprovarLancamento` → UPDATE status = 'aprovado'
- **Linha 118-134**: `negarLancamento` → UPDATE status = 'negado'
- **Linha 139-157**: `aprovarTodosLancamentos` → UPDATE múltiplo
- **Linha 162-180**: `negarTodosLancamentos` → UPDATE múltiplo

---

## 4. Hooks e Estado

### 📁 `src/hooks/useCadastros.ts`

**Linhas a alterar: 14-23** (useIdAscora)

```typescript
// ANTES (mock)
export const useIdAscora = () => {
  return useQuery({
    queryKey: ['id-ascora'],
    queryFn: async () => {
      console.log('🔵 Frontend - Obtendo ID Ascora do usuário logado');
      return 'ASC0001';
    },
  });
};

// DEPOIS (pegar do localStorage)
export const useIdAscora = () => {
  return useQuery({
    queryKey: ['id-ascora'],
    queryFn: async () => {
      const usuarioString = localStorage.getItem('usuario_logado');
      if (!usuarioString) {
        throw new Error('Usuário não autenticado');
      }
      
      const usuario = JSON.parse(usuarioString);
      return usuario.id_ascora;
    },
  });
};
```

**Restante do arquivo:** Manter como está - os hooks já chamam as funções corretas do backend.

### 📁 `src/hooks/useCadastrosExtended.ts`

**Não precisa alterar** - já está correto, usa as funções do backend.

---

## 5. Páginas e Componentes

### 📁 `src/pages/Auth.tsx`

**Linhas 17-60** - Já está correto, chama `realizarLogin` do backend.

### 📁 `src/components/ProtectedRoute.tsx`

**Linhas 8-26** - Já está correto, chama `verificarSessao` do backend.

### 📁 `src/components/AppSidebar.tsx`

**Linhas 65-87** - Já está correto, chama `realizarLogout` do backend.

### 📁 `src/pages/Lancamento.tsx`

**Linhas 58-87** - Já está correto, chama `listarUsuarios`, `listarClientes`, `listarProdutos`.

### 📁 `src/pages/Cadastros.tsx`

**Não precisa alterar** - usa os hooks que já chamam o backend.

### 📁 `src/pages/Index.tsx` (Dashboard)

**Arquivo:** `src/components/Dashboard.tsx`
**Linha 20:** Importa de `@/backend/api/home`

Você precisará implementar as funções em `src/backend/api/home.ts` seguindo o mesmo padrão MySQL.

### 📁 `src/pages/Comissoes.tsx`

**Linha 29:** Importa de `@/backend/api/dashboard_comissoes`

Você precisará implementar as funções em `src/backend/api/dashboard_comissoes.ts` seguindo o mesmo padrão MySQL.

---

## 6. Dashboard APIs (home.ts e dashboard_comissoes.ts)

### 📁 `src/backend/api/home.ts`

**Funções a implementar com MySQL:**

```typescript
import { query, queryOne } from '@/lib/mysql';

// Linha 58-88: buscarEstatisticasGerais
export async function buscarEstatisticasGerais(): Promise<ApiResponse<DashboardStats>> {
  try {
    // Exemplo de queries agregadas
    const totalVendas = await queryOne<{ total: number }>(
      'SELECT SUM(valor) as total FROM lancamentos WHERE status = "aprovado"'
    );
    
    const vendedoresAtivos = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM usuarios WHERE is_vendedor = 1 AND ativo = 1'
    );
    
    // ... mais queries conforme necessário
    
    return {
      success: true,
      data: {
        totalSales: totalVendas?.total || 0,
        activeSellers: vendedoresAtivos?.count || 0,
        // ... outros campos
      }
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return { success: false, error: 'Erro ao buscar estatísticas' };
  }
}

// Linha 90-116: listarEmpresasFiltro
export async function listarEmpresasFiltro(): Promise<ApiResponse<Company[]>> {
  try {
    const empresas = await query<Company>(
      `SELECT e.id, e.nome,
              COUNT(DISTINCT l.id) as salesCount,
              COUNT(DISTINCT u.id) as sellersCount
       FROM empresas e
       LEFT JOIN lancamentos l ON l.empresa_id = e.id AND l.status = 'aprovado'
       LEFT JOIN usuarios u ON u.empresa_id = e.id AND u.is_vendedor = 1
       WHERE e.ativo = 1
       GROUP BY e.id, e.nome`
    );
    
    return { success: true, data: empresas };
  } catch (error) {
    console.error('Erro ao listar empresas:', error);
    return { success: false, error: 'Erro ao listar empresas' };
  }
}

// Continue com as outras funções seguindo o mesmo padrão
```

### 📁 `src/backend/api/dashboard_comissoes.ts`

**Aplicar mesmo padrão de MySQL** para todas as funções (linhas 63-384).

---

## Checklist Final

### ✅ Passo 1: Configuração
- [ ] Criar `src/lib/mysql.ts`
- [ ] Instalar `npm install mysql2 bcrypt`
- [ ] Configurar variáveis de ambiente MySQL

### ✅ Passo 2: Autenticação
- [ ] Implementar `realizarLogin` com MySQL (linha 33-76)
- [ ] Implementar `verificarSessao` com MySQL (linha 105-134)
- [ ] Implementar `realizarLogout` se necessário (linha 85-96)

### ✅ Passo 3: APIs CRUD
- [ ] `usuarios.ts` - 4 funções (listar, cadastrar, editar, excluir)
- [ ] `empresas.ts` - 4 funções
- [ ] `equipes.ts` - 4 funções
- [ ] `produtos.ts` - 4 funções
- [ ] `clientes.ts` - 4 funções
- [ ] `metas.ts` - 4 funções
- [ ] `comissoes.ts` - 4 funções
- [ ] `links.ts` - 4 funções
- [ ] `premiacoes.ts` - 5 funções (+ upload)
- [ ] `lancamentos.ts` - 6 funções

### ✅ Passo 4: Dashboards
- [ ] `home.ts` - Implementar queries agregadas
- [ ] `dashboard_comissoes.ts` - Implementar queries de comissões

### ✅ Passo 5: Hooks
- [ ] Atualizar `useIdAscora` em `useCadastros.ts`

### ✅ Passo 6: Testes
- [ ] Testar login/logout
- [ ] Testar cada módulo de cadastro
- [ ] Testar dashboards
- [ ] Testar lançamentos

---

## 📌 Observações Importantes

1. **Soft Delete**: Todas as exclusões são soft delete (campo `ativo = 0`)
2. **ID Ascora**: Usado para isolar dados por conta/cliente
3. **Segurança**: Senhas devem ser hasheadas com bcrypt
4. **Transações**: Para operações complexas, use transações MySQL
5. **Validações**: Adicione validações nos endpoints conforme necessário
6. **Logs**: Mantenha os console.log para debug

---

## 🎯 Estrutura de Tabelas MySQL Sugerida

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  acesso ENUM('master', 'administrador', 'vendedor') DEFAULT 'vendedor',
  empresa_id INT NULL,
  equipe_id INT NULL,
  comissao_percentual DECIMAL(5,2) DEFAULT 0,
  meta_individual DECIMAL(10,2) DEFAULT 0,
  is_vendedor BOOLEAN DEFAULT TRUE,
  id_ascora VARCHAR(50) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_id_ascora (id_ascora),
  INDEX idx_email (email)
);

-- Repita estrutura similar para outras tabelas:
-- empresas, equipes, produtos, clientes, metas, comissoes, links, premiacoes, lancamentos
```

---

**Sistema 100% pronto para integração MySQL. Todos os pontos documentados e mapeados!**
