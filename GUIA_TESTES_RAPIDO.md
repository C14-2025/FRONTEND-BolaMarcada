# 🚀 GUIA RÁPIDO - Testar Integração Frontend + Backend

## ⚡ COMANDOS RÁPIDOS

### 1️⃣ **Backend - Configuração Inicial**

```bash
# Copiar .env de exemplo
copy .env.example .env

# Editar .env com suas credenciais (abrir no notepad)
notepad .env

# Gerar SECRET_KEY segura
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Criar banco de dados (se não existir)
psql -U postgres
CREATE DATABASE bola_marcada;
\q

# Rodar migrações
alembic upgrade head

# Iniciar backend
python main.py
```

✅ **Backend rodando em:** http://127.0.0.1:8000  
✅ **Swagger disponível em:** http://127.0.0.1:8000/docs

---

### 2️⃣ **Frontend - Configuração Inicial**

```bash
# Criar .env.local
echo NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1 > .env.local

# Instalar dependências
npm install

# Iniciar frontend
npm run dev
```

✅ **Frontend rodando em:** http://localhost:3000

---

## 🧪 FLUXO DE TESTES COMPLETO

### **Teste 1: Criar Conta**
1. Acesse: http://localhost:3000/rotas/login
2. Clique em "Criar Conta"
3. Preencha:
   - Nome: `Teste Usuario`
   - Email: `teste@example.com`
   - Senha: `Senha123!`
   - CPF: `12345678901`
   - Telefone: `11999999999`
4. Clique em "Cadastrar"

✅ **Deve:** Criar conta e fazer login automaticamente

---

### **Teste 2: Login**
1. Acesse: http://localhost:3000/rotas/login
2. Preencha:
   - Email: `teste@example.com`
   - Senha: `Senha123!`
3. Clique em "Entrar"

✅ **Deve:** Redirecionar para `/rotas/profile`

---

### **Teste 3: Criar Centro Esportivo**
1. Acesse: http://localhost:3000/rotas/cadastrar-centro
2. Preencha:
   - Nome: `Arena Teste`
   - CNPJ: `12345678901234`
   - Latitude: `-23.550520`
   - Longitude: `-46.633308`
   - Descrição: `Centro de testes`
3. Clique em "Criar Centro Esportivo"

✅ **Deve:** Criar centro e redirecionar para criar campo

---

### **Teste 4: Criar Campo**
1. Acesse: http://localhost:3000/rotas/cadastrar-campo
2. Preencha formulário
3. Sistema deve buscar automaticamente o `sports_center_id`

✅ **Deve:** Criar campo sem pedir centro manualmente

---

### **Teste 5: Ver Campo com Endereço**
1. Acesse página de detalhes do campo
2. Sistema deve converter lat/long em endereço via geocoding

✅ **Deve:** Mostrar endereço formatado (ex: "Av. Paulista, São Paulo")

---

## 🐛 PROBLEMAS COMUNS

### ❌ Erro CORS
**Solução:** Verificar se backend está em `127.0.0.1:8000` (não `localhost:8000`)

### ❌ Erro 401 Unauthorized
**Solução:** Verificar se token está no localStorage (F12 → Application → Local Storage)

### ❌ "Você precisa criar um centro esportivo primeiro"
**Solução:** Ir em `/rotas/cadastrar-centro` e criar um centro

### ❌ Erro 500 no backend
**Solução:** Ver logs do terminal do backend, pode ser problema no banco

---

## 📝 TESTAR NO SWAGGER (Recomendado)

Antes de testar no frontend, teste no Swagger:

1. Acesse: http://127.0.0.1:8000/docs
2. Teste na ordem:
   - POST `/users/signup` → Criar usuário
   - POST `/users/signin` → Fazer login (copie o `access_token`)
   - Click no botão `Authorize` → Cole o token
   - GET `/users/me` → Buscar dados do usuário
   - POST `/sports_center/create` → Criar centro
   - GET `/sports_center/me` → Listar centros
   - POST `/field` → Criar campo
   - GET `/field/{id}` → Buscar campo (deve vir com `sports_center`)
   - GET `/field/{id}/availabilities` → Listar horários

---

## 🎯 CHECKLIST FINAL

- [ ] Backend rodando em http://127.0.0.1:8000
- [ ] Frontend rodando em http://localhost:3000
- [ ] Banco de dados PostgreSQL online
- [ ] Arquivo `.env` configurado no backend
- [ ] Arquivo `.env.local` configurado no frontend
- [ ] Migrações rodadas (`alembic upgrade head`)
- [ ] CORS funcionando (sem erros no console)
- [ ] Consegue criar conta
- [ ] Consegue fazer login
- [ ] Token salvo no localStorage
- [ ] Consegue criar centro esportivo
- [ ] Consegue criar campo
- [ ] Campo vem com dados do sports_center
- [ ] Geocoding funciona (converte lat/long)

---

**🎊 Se todos os itens acima funcionarem, a integração está 100% completa!**
