# Quadro de Produtos

Painel semanal da programação ao vivo (BDPE, NE1, GE, Boletim, NE2, Jogo, GCO, Descomplica, Evento), pensado pra ficar exibido em tela e ser atualizado pelo Jornalismo.

## Funcionalidades

- **Visualização livre**, sem login — o quadro da semana fica visível pra qualquer um que abrir a página (ideal pra ficar espelhado em telas).
- **Modo Admin** (botão no cabeçalho): login com nome + senha libera criar, editar e excluir produtos da programação.
- Ao criar/editar um produto, dá pra montar a equipe marcando pessoas em caixinhas por função. Programas de rotina (BDPE, NE1, GE, Boletim, NE2, GCO, Descomplica) e Eventos só pedem Apresentador(a); Jogo pede Narrador, Comentarista e Ao vivo em campo. Dá pra cadastrar gente ou função nova na hora.
- **EVENTO**: tipo de produto pra coisas fora da rotina normal (ex: coberturas especiais). Tem horário início/fim, estúdio/local, status e apresentador(a), igual aos programas.
- **Dados compartilhados em tempo real** (Firestore): quem edita num computador, qualquer outra pessoa vendo o site já enxerga a atualização na hora, sem precisar recarregar a página. Veja a seção **Configurando o Firebase** abaixo — é obrigatório configurar antes do site funcionar de verdade.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Firebase Firestore (banco de dados compartilhado, gratuito)

## Configurando o Firebase (obrigatório)

Sem isso, o quadro fica em branco/sem salvar nada — é o "banco de dados" que faz todo mundo ver a mesma programação.

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e crie um projeto novo (é grátis, não pede cartão pro plano usado aqui).
2. No menu lateral, vá em **Build → Firestore Database** → **Criar banco de dados**. Pode escolher a região mais próxima (ex: `southamerica-east1`) e começar em **modo de produção**.
3. Na aba **Regras** do Firestore, cole isto e publique (libera leitura pra todo mundo ver o quadro, e escrita — a proteção de quem edita já é feita pela senha do Modo Admin dentro do site):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /schedule/{date} {
         allow read, write: if true;
       }
     }
   }
   ```
4. Volte em **Configurações do projeto** (ícone de engrenagem) → aba **Geral** → role até "Seus apps" → clique no ícone `</>` (Web) pra criar um app da Web. Dê qualquer apelido.
5. O Firebase vai mostrar um bloco `firebaseConfig` com `apiKey`, `authDomain`, etc. Copie esses valores pro arquivo `src/firebase.ts` do projeto, substituindo os `"COLE_AQUI"`.
6. Salve, rode `npm run dev` (ou publique de novo no GitHub Pages) — pronto, o quadro já fica salvo e sincronizado.

> Esses valores do `firebaseConfig` não são segredo (é normal e esperado que apareçam no código do site) — a única coisa que "protege" o banco são as Regras do passo 3. Como está liberado tanto leitura quanto escrita, tecnicamente qualquer pessoa com acesso ao endereço do Firestore poderia editar direto por fora do site — igual já acontece hoje com a senha do Modo Admin, não é uma segurança de nível bancário, é pra uso interno de confiança.

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) instalado (versão LTS) e o Firebase já configurado (seção acima).

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
  data.ts       # Tipos e modelo padrão de programação (usado só pra semear dias novos)
  storage.ts    # Persistência da programação no Firestore (tempo real)
  firebase.ts   # Configuração de conexão com o Firebase — cole suas chaves aqui
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

As sugestões de pessoas por função (usadas nas caixinhas do formulário) ficam em `src/roster.ts`, no objeto `PEOPLE_BY_CATEGORY`. Também é possível adicionar pessoas e funções novas direto pela interface, no Modo Admin — por enquanto isso fica salvo só no navegador de quem cadastrou (diferente da programação em si, que já é compartilhada pelo Firestore). Se quiser que essas listas também sejam compartilhadas entre todo mundo, é só pedir.

