# Projeto Back (Nest + Prisma)

Este repositório contém a API do curso usando NestJS e Prisma. O README foi simplificado e traduzido para português com os comandos essenciais para instalação e execução local.

## Pré-requisitos
- Git
- Node.js (recomendo LTS 18.x ou 20.x)
- nvm (recomendado para gerenciar versões do Node)

## Instalação (primeira vez)

1) Instalar/usar Node via `nvm` (opcional, recomendado):

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
```

2) Clonar o repositório e entrar na pasta:

```bash
git clone <repo-url>
cd back
```

3) Instalar dependências:

```bash
npm install
```

4) Variáveis de ambiente:

Crie um arquivo `.env` com a variável `DATABASE_URL`. Exemplo mínimo (SQLite):

```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

5) Gerar cliente Prisma e preparar banco:

```bash
npx prisma generate
npx prisma migrate deploy
# se as migrations causarem problemas, usar como alternativa:
# npx prisma db push
```

## Executar o projeto

Desenvolvimento (watch):

```bash
npm run start:dev
```

Produção (build):

```bash
npm run build
npm run start:prod
```

## Testes

```bash
npm test
npm run test:e2e
```

## Comandos úteis

```bash
npx prisma studio         # abrir interface do Prisma
npx prisma migrate status # verificar status das migrations
npx prisma generate       # regenerar client após mudanças no schema
npx @nestjs/cli info      # info do Nest CLI (usar npx se não instalado globalmente)
```

## Problemas comuns
- Erro de versão do Node: use `nvm` para trocar a versão.
- `nest` não encontrado: use `npx @nestjs/cli` ou instale globalmente `npm i -g @nestjs/cli`.
- Migrations falham: confira `DATABASE_URL` e tente `npx prisma db push`.
- Permissões no macOS: rode comandos com permissão apropriada ou ajuste permissões da pasta.

## Próximo passo (opcional)
- Posso gerar um `scripts/setup.sh` para automatizar os passos acima.
- Posso adicionar um `Makefile` com atalhos para os comandos.

Se quiser que eu gere o `scripts/setup.sh`, responda "gerar script" e eu crio o arquivo.

## Instalação (primeira vez)

Siga estes passos para preparar e executar o projeto localmente (macOS/Linux). Todos os comandos assumem que você está na raiz do repositório.

Pré-requisitos:
- Node.js (recomendo LTS 18.x / 20.x) — use `nvm` para gerenciar versões.
- Git

1) Instalar/usar Node via `nvm` (opcional, recomendado)

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
# reinicie o terminal ou carregue nvm no shell atual
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
```

Verifique versões:

```bash
node -v
npm -v
```

2) Clonar e entrar no projeto

```bash
git clone <repo-url>
cd back
```

3) Instalar dependências

```bash
npm install
```

4) Variáveis de ambiente

O projeto utiliza Prisma com SQLite. Verifique que existe um arquivo `.env` com a variável `DATABASE_URL` apontando para um arquivo sqlite local. O env-exemple já está correto, basta clonar dele.


5) Gerar cliente Prisma e aplicar migrations

```bash
npx prisma generate
# aplicar migrations previamente registradas (não interativo)
npx prisma migrate deploy
# se houver problemas com migrate deploy, como último recurso usar:
# npx prisma db push
```

6) Executar em modo desenvolvimento

```bash
npm run start:dev
```

7) Build e produção

```bash
npm run build
npm run start:prod
```

8) Testes

```bash
npm test
npm run test:e2e
```

Comandos úteis

```bash
npx prisma studio           # abrir Prisma Studio (UI)
npx prisma migrate status   # ver status das migrations
npx prisma generate         # regenerar client após mudanças no schema
```

Problemas comuns
- Erro de versão do Node: use `nvm` para ajustar a versão.
- Comando `nest` não encontrado: use `npx @nestjs/cli` ou instale globalmente `npm i -g @nestjs/cli`.
- Migrations falham: confirme `DATABASE_URL` e tente `npx prisma db push` para empurrar o schema sem aplicar migrations.

Se quiser, eu posso também:
- adicionar um `Makefile` com os comandos acima;
- adicionar um `scripts/setup.sh` que automatize a preparação do ambiente.

