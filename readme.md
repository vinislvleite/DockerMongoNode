# Projeto Container Feichas

CRUD de usuarios com Node.js, TypeScript, React e MongoDB rodando em container Docker.

## Estrutura do projeto

```
ProjetoContainerFeichas/
  backend/    -> API em Node.js + Express + TypeScript + Mongoose
  frontend/   -> Interface em React + TypeScript (Vite)
  mongodb/    -> docker-compose do banco de dados
```

## Pre-requisitos

- Node.js instalado
- Docker instalado

## 1. Subir o banco de dados (MongoDB)

Entre na pasta do banco:

```bash
cd mongodb
```

Copie o arquivo de exemplo de variaveis de ambiente:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e defina um usuario e senha:

```
MONGO_USER=admin
MONGO_PASSWORD=sua_senha_aqui
```

Suba o container:

```bash
docker compose up -d
```

Isso cria o MongoDB na porta 27017.

## 2. Configurar e rodar o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependencias:

```bash
npm install
```

Copie o arquivo de exemplo de variaveis de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` com o usuario e senha definidos no passo anterior:

```
MONGO_URI=mongodb://usuario:senha@localhost:27017/meubanco?authSource=admin
PORT=3001
```

Observacao: se a senha tiver caracteres especiais (como `@`), eles precisam ser codificados na URI. Exemplo: `@` vira `%40`.

Rode o servidor:

```bash
npm run dev
```

Se tudo estiver certo, o terminal deve mostrar:

```
Mongo conectado
Rodando na 3001
```

## 3. Configurar e rodar o frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependencias:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

O terminal vai mostrar o endereco local, normalmente:

```
http://localhost:5173
```

## 4. Usando o sistema

Acesse `http://localhost:5173` no navegador. A tela mostra o total de usuarios cadastrados e permite adicionar, editar e remover usuarios (nome, email, cpf e descricao).

## Rotas da API

| Metodo | Rota              | Descricao                  |
|--------|-------------------|-----------------------------|
| GET    | /api/users        | Lista todos os usuarios     |
| GET    | /api/users/count  | Retorna o total de usuarios |
| POST   | /api/users        | Cria um usuario             |
| PUT    | /api/users/:id    | Atualiza um usuario         |
| DELETE | /api/users/:id    | Remove um usuario           |
