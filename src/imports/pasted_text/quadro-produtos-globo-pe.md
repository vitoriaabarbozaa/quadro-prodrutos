Atue como um Engenheiro de Software Sênior e Especialista em UI/UX para Sistemas de Operação de Televisão (Broadcast & Master Control). Desenvolva uma aplicação web interna moderna, profissional e de alta legibilidade chamada “Quadro de Produtos — Rede Globo Pernambuco”.

O sistema é um painel operacional em tempo real para redação, switcher, técnica e coordenação de estúdios, permitindo acompanhar com precisão a ocupação de estúdios, cabines de locução, horários no ar e escala de talentos.

----------------------------------------------------------------------
1. ESTRUTURA VISUAL E REGRAS DE LOCAIS OPERACIONAIS (SEM ALUCINAÇÕES)
----------------------------------------------------------------------
A TV Globo Pernambuco opera exclusivamente com os seguintes locais físicos no sistema:
• Estúdio 1 (E1) — Badge com cor Indigo/Azul Royal (#2563EB)
• Estúdio 3 (E3) — Badge com cor Violeta/Roxo (#7C3AED)
• Cabine de Locução 1 (CAB 1) — Badge com cor Ciano/Teal (#0891B2)
• Cabine de Locução 2 (CAB 2) — Badge com cor Esmeralda/Verde Petróleo (#0D9488)
• Estádio / Externa — Badge com cor Âmbar/Laranja (#D97706) (utilizado quando a transmissão tem equipe in loco no estádio, ex: Ilha do Retiro, Arruda, Aflitos, Arena de PE). Obs: mochilas LiveU e detalhes de UMs não entram neste quadro.

*Importante: NÃO utilizar "Estúdio 2". Todos os programas de estúdio devem estar alocados exclusivamente no Estúdio 1 ou Estúdio 3, e transmissões esportivas/off-tube nas Cabines 1 ou 2 (ou Cabine + Estádio).*

----------------------------------------------------------------------
2. VISÃO SEMANAL (TELA PRINCIPAL COM 7 COLUNAS: SEG A DOM)
----------------------------------------------------------------------
Priorizar desktop com os 7 dias (SEG, TER, QUA, QUI, SEX, SÁB, DOM) sempre visíveis lado a lado.
O dia atual (Hoje) deve ter destaque visual (borda azul Globo, fundo levemente contrastante e tag "Hoje").

Em vez de simples pílulas apenas com o nome, cada dia deve conter MINI-CARDS OPERACIONAIS estruturados, permitindo leitura rápida sem abrir o dia:
1. Horário de exibição (ex: 12:00 - 13:00) em tipografia monospace/destacada;
2. Nome/Sigla do produto com tag de cor correspondente (BDPE, NE1, GE, NE2, BOLETIM, JOGO);
3. Tag clara do Local Operacional com cor padronizada: [E1], [E3], [CAB 1], [CAB 2] ou [Estádio];
4. Para JOGOS e transmissões esportivas: BADGE DE TALENTOS destacado no próprio card semanal:
   • Exemplo: "🎙️ 3 talentos" (somatório de Narrador + Comentaristas escalados);
5. Status do produto (Confirmado, Previsto, Alterado, Cancelado);
6. Alerta de Conflito Operacional (⚠️): se dois produtos estiverem marcados no mesmo estúdio/cabine no mesmo horário ou com sobreposição, exibir ícone pulsante de conflito visual no card.
7. Rodapé de cada coluna: contador total de produtos e link "Ver detalhes >" que abre a Visão Diária.

----------------------------------------------------------------------
3. BARRA SUPERIOR (HEADER EM TEMPO REAL)
----------------------------------------------------------------------
No topo da interface:
• Logo/Identidade: "Rede Globo Pernambuco — Quadro de Produtos" com ícone de switcher/broadcast;
• Horário oficial de Recife em tempo real (fuso UTC-3 / Horário de Brasília) no formato HH:MM:SS com segundos correndo;
• Data completa atual e botão "Hoje" para resetar a navegação;
• Controles de navegação semanal (< Semana Anterior / Próxima Semana >) e label do período (ex: "14 de set — 20 de set");
• Card de Status em Tempo Real:
  - Indicador 🟢 "EM EXIBIÇÃO": nome do produto, horário de término e local (ou "--" se nenhum);
  - Indicador 🔵 "PRÓXIMO PRODUTO": nome, horário de início, estúdio/cabine e CONTAGEM REGRESSIVA dinâmica (ex: "em 1h 18m 22s");
• Barra de Filtros rápidos e Busca:
  - Filtro por Local: Todos | Estúdio 1 | Estúdio 3 | Cabine 1 | Cabine 2 | Externa;
  - Filtro por Tipo: Todos | Jornalismo | Esporte/Jogos | Boletins;
  - Filtro por Status: Todos | Confirmado | Alterado | Previsto | Cancelado;
  - Campo de busca textual rápida (filtra tanto por nome do programa quanto por nome do talento/apresentador, ex: "Brandão", "Nilson César").

----------------------------------------------------------------------
4. VISÃO DIÁRIA (TIMELINE CRONOLÓGICA DO DIA)
----------------------------------------------------------------------
Ao clicar em um dia específico, abrir uma tela dedicada com timeline vertical cronológica:
• Cabeçalho com botão "< Voltar para a Semana", nome do dia e data formatada ("Terça-feira, 15 de setembro"), com badge "Hoje" se aplicável;
• Linha vermelha "AGORA — HH:MM:SS" posicionada em tempo real na coordenada vertical correspondente ao horário do dia (apenas visível no dia atual);
• Cartões da Timeline com hierarquia de informação de TV:
  - Bloco esquerdo: Horário de início e término com ponto da timeline colorido;
  - Bloco central:
    * Nome do Produto com tipografia bold;
    * Badge de Local em alto destaque (ex: [Estúdio 1], [Estúdio 3], [Cabine 1 - Ilha do Retiro]);
    * Seção de Talentos:
      - Para programas: "Apresentador(a): Nome" e "Direção: Nome";
      - Para jogos: badge visual destacado "🎙️ 3 Talentos no Ar" e listagem nominal direta do Narrador e Comentaristas;
    * Tag de Status:
      - Confirmado (verde)
      - Previsto (azul)
      - Alterado (laranja com aviso da alteração, ex: horário ou apresentador mudou)
      - Cancelado (vermelho com texto riscado e opacidade reduzida);
  - Destaque dinâmico: o card que estiver no ar agora recebe borda verde suave e badge "🟢 EM EXIBIÇÃO"; o próximo recebe borda azul e "🔵 PRÓXIMO".

----------------------------------------------------------------------
5. MODAL / PAINEL DE DETALHES DO PRODUTO (NO CLIQUE DO CARD)
----------------------------------------------------------------------
Ao clicar em qualquer card (na semana ou na timeline), abrir modal modal rico:
• Cabeçalho com o tipo (JORNALISMO ou JOGO), canal/veículo (Globo, SporTV, Premiere, ge), nome completo do evento, horário completo e botão de fechar;
• Badge em destaque do Local Físico: Estúdio 1, Estúdio 3, Cabine de Locução 1 ou Cabine de Locução 2 (+ local do estádio se jogo);
• Bloco 1: EQUIPE DE TALENTOS NO AR (destaque principal):
  - Badge numérico: "🎙️ [X] Talentos Escalados";
  - Listagem dos talentos com suas funções:
    * Programas: Apresentador Titular, Apresentadora / Co-apresentador(a), Comentarista fixo;
    * Jogos: Narrador, Comentarista 1, Comentarista 2, Repórter de Campo, Repórter de Vestiário;
  - Alerta de pendência: se algum talento obrigatório estiver em aberto, exibir badge de aviso ("⚠️ Falta escalar Comentarista 2");
• Bloco 2: EQUIPE TÉCNICA E OPERACIONAL:
  - Editor(a)-Chefe / Direção de Imagem / Produção / Técnico de Áudio / Switcher;
• Bloco 3: RECURSOS E OBSERVAÇÕES:
  - Rodapé com detalhes da transmissão (ex: "Série B — Brasileirão. Pré-jogo a partir das 20h45. Entrada ao vivo no NE2 às 19h45 direto da cabine.");
• Alerta Operacional no modal: se houver sobreposição de uso do Estúdio 1 ou 3 com outro produto, indicar explicitamente o conflito de horário.

----------------------------------------------------------------------
6. DADOS FICTÍCIOS REALISTAS PARA DEMONSTRAÇÃO (GLOBO PE)
----------------------------------------------------------------------
Alimente a aplicação com dados realistas da grade da TV Globo Pernambuco:
• Segunda a Sexta:
  - 06:00 - 08:30: Bom Dia PE (Estúdio 1) | Apresentadores: Rodrigo Câmara e Fernanda Melo
  - 12:00 - 13:00: NE1 (Estúdio 1) | Apresentadores: João Brandão e Ana Lima
  - 13:00 - 13:25: Globo Esporte PE (Estúdio 3) | Apresentador: Felipe Andrade | Direção: Sílvia Rocha
  - 17:15 - 17:25: Boletim G1 / Notícias (Estúdio 3) | Apresentador: Marcos Tenório
  - 19:10 - 19:55: NE2 (Estúdio 1) | Apresentador: João Brandão
• Quarta-feira à noite (Exemplo de Transmissão):
  - 21:30 - 23:45: Sport x Ceará (Cabine 1 — Ilha do Retiro · SporTV) | 🎙️ 3 talentos (Narrador: Nilson César; Comentaristas: Edilson Pereira e Evandro Ferreira; Campo: Bianca Ferreira)
• Sexta-feira à noite:
  - 21:00 - 23:15: Náutico x Operário (Cabine 2 — Estádio dos Aflitos · Premiere) | 🎙️ 3 talentos (Narrador: Rembrandt Júnior; Comentaristas: Cabral Neto e Danny Morais)
• Sábado e Domingo:
  - Sábado 12:00: NE1 Especial (Estúdio 1)
  - Sábado 13:00: Globo Esporte PE (Estúdio 3)
  - Domingo 16:00: Santa Cruz x Retrô (Cabine 1 — Arruda · TV Globo / SporTV) | 🎙️ 4 talentos
• Status variados distribuídos na semana: a maioria "Confirmado", um "Alterado" (ex: GE PE na quarta com ajuste de horário para 13h10) e um "Cancelado" (ex: Boletim Especial na sexta-feira).

----------------------------------------------------------------------
7. TECNOLOGIA E DESIGN SYSTEM
----------------------------------------------------------------------
• Stack sugerida: React / Next.js / TypeScript com Tailwind CSS e Lucide Icons (ou HTML/CSS/JS moderno standalone);
• Tema: Interface com design profissional de emissora de TV — fundo limpo cinza-claro (#F8FAFC / #F1F5F9), cards brancos com elevação suave, tipografia nítida (Inter ou Roboto), cantos arredondados modernos (rounded-xl) e alto contraste para visualização em telões e monitores de controle;
• Relógio em tempo real calculando dinamicamente "EM EXIBIÇÃO" e "PRÓXIMO" a cada segundo baseado no relógio do sistema.