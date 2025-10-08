# Backend API - Estrutura de Rotas

Esta pasta contém as rotas de API simuladas para integração futura com banco de dados.

## 📁 Estrutura

```
backend/
└── api/
    ├── usuarios.ts      # CRUD de usuários
    ├── empresas.ts      # CRUD de empresas
    ├── equipes.ts       # CRUD de equipes
    ├── metas.ts         # CRUD de metas
    ├── comissoes.ts     # CRUD de comissões
    ├── produtos.ts      # CRUD de produtos
    ├── clientes.ts      # CRUD de clientes
    └── links.ts         # CRUD de links
```

## 🔄 Fluxo de Dados

### Frontend → Backend
1. Usuário preenche formulário no frontend
2. Frontend chama função da API (ex: `cadastrarUsuario`)
3. Função registra no console e retorna sucesso/erro simulado

### Backend → Frontend
1. Backend processa requisição (TODO: adicionar lógica real)
2. Retorna objeto com:
   - `success: boolean` - Status da operação
   - `data?: any` - Dados retornados (em caso de sucesso)
   - `error?: string` - Mensagem de erro (em caso de falha)

## 📝 Exemplo de Uso

### Cadastrar Usuário
```typescript
// Frontend chama:
const resultado = await cadastrarUsuario({
  nome: 'João Silva',
  email: 'joao@example.com',
  senha: '123456',
  acesso: 'vendedor',
  id_ascora: 'ASC0001'
});

// Backend retorna:
{
  success: true,
  data: { id: 'temp-id-123', nome: 'João Silva', ... }
}
```

### Editar Usuário
```typescript
// Frontend chama:
const resultado = await editarUsuario('user-id-123', {
  nome: 'João Silva Updated',
  email: 'joao.novo@example.com'
});

// Backend retorna:
{
  success: true,
  data: { id: 'user-id-123', nome: 'João Silva Updated', ... }
}
```

### Excluir Usuário
```typescript
// Frontend chama:
const resultado = await excluirUsuario('user-id-123');

// Backend retorna:
{
  success: true
}
```

## ⚠️ TODO - Próximos Passos

Para cada arquivo de API, você precisa implementar:

1. **Conexão com Banco de Dados**
   - Configurar client do banco (PostgreSQL, MySQL, MongoDB, etc.)
   - Adicionar variáveis de ambiente para conexão

2. **Lógica de Negócio**
   - Validações de dados
   - Regras de negócio específicas
   - Tratamento de erros

3. **Segurança**
   - Autenticação de usuário
   - Autorização baseada em roles
   - Validação de id_ascora
   - Sanitização de inputs

4. **Otimizações**
   - Cache de queries frequentes
   - Paginação de resultados
   - Índices no banco de dados

## 🔒 Segurança

Pontos importantes a implementar:

- ✅ Validar todos os inputs do usuário
- ✅ Usar queries parametrizadas (SQL injection prevention)
- ✅ Verificar permissões antes de cada operação
- ✅ Implementar rate limiting
- ✅ Logs de auditoria para operações sensíveis
- ✅ Criptografar senhas com bcrypt/argon2

## 📊 Logs

Atualmente, todas as operações são registradas no console com o prefixo `🔵 Backend`.
Exemplo:
```
🔵 Backend - Cadastrar usuário: { nome: 'João', email: 'joao@example.com', ... }
🔵 Backend - Editar usuário: { id: 'user-123', nome: 'João Updated' }
🔵 Backend - Excluir usuário com ID: user-123
```

## 🚀 Como Começar

1. Escolha seu banco de dados (PostgreSQL recomendado)
2. Configure as credenciais de acesso
3. Implemente as funções TODO em cada arquivo
4. Teste cada endpoint individualmente
5. Integre com o frontend

---

**Nota**: Esta estrutura foi criada para facilitar a migração futura. O frontend já está preparado para usar estas rotas.
