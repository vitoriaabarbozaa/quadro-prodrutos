# Quadro de Produtos

Painel semanal da programação ao vivo (BDPE, NE1, GE, Boletim, NE2, Jogo, GCO, Descomplica), pensado pra ficar exibido em tela e ser atualizado pelo Jornalismo.

## Funcionalidades

- **Visualização livre**, sem login — o quadro da semana fica visível pra qualquer um que abrir a página (ideal pra ficar espelhado em telas).
- **Modo Admin** (botão no cabeçalho): login com nome + senha libera criar, editar e excluir produtos da programação.
- Ao criar/editar um produto, dá pra montar a equipe marcando pessoas em caixinhas separadas por função (Apresentador(a), Câmera, Direção, Narrador, etc.), com opção de cadastrar gente ou função nova na hora.
- Os dados ficam salvos no `localStorage` do navegador — pensado pra rodar num único computador que fica sendo transmitido pra outras telas (não sincroniza entre dispositivos diferentes).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) instalado (versão LTS).

```bash
npm install
npm run dev
```

O terminal vai mostrar um link (por padrão `http://localhost:8443`). Se a porta estiver ocupada, rode com outra:

```bash
# Windows (PowerShell)
$env:PORT=3000; npm run dev

# macOS/Linux
PORT=3000 npm run dev
```

### Build de produção

```bash
npm run build
```

Gera os arquivos finais em `dist/`.

## Estrutura do projeto

```
src/
  App.tsx       # UI principal: grade semanal, modais, formulário de produto
  data.ts       # Tipos e geração do modelo padrão de programação
  storage.ts    # Persistência da programação (localStorage)
  roster.ts     # Tipos de produto, funções e pessoas pré-cadastradas
  auth.ts       # Contas e senhas de acesso ao Modo Admin
  hooks.ts      # Utilitários de hora/formatação
```

## Acesso de Admin

As contas com acesso de edição ficam em `src/auth.ts`, no array `ACCOUNTS`. Pra trocar a senha ou adicionar um novo setor com acesso, edite esse arquivo:

```ts
export const ACCOUNTS: Account[] = [
  { label: "Admin", password: "globoadmin", role: "admin" },
  // { label: "COT", password: "globocot", role: "admin" },
];
```

> **Atenção:** como é um projeto 100% front-end, essa senha fica visível no código-fonte pra quem tiver acesso ao repositório (e também no navegador, pra quem inspecionar a página). Não é uma segurança "à prova de bala" — serve pra evitar que qualquer pessoa mexa na programação sem querer, não pra proteger informação sigilosa. Se o repositório for público, considere isso antes de usar uma senha real de produção.

## Cadastrando pessoas e funções

As sugestões de pessoas por função (usadas nas caixinhas do formulário) ficam em `src/roster.ts`, no objeto `PEOPLE_BY_CATEGORY`. Também é possível adicionar pessoas e funções novas direto pela interface, no Modo Admin — elas ficam salvas no navegador a partir daí.
