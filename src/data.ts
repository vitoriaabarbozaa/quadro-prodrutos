export type Status = "confirmado" | "previsto" | "alterado" | "cancelado";
export type ProductType = "programa" | "jogo";

export interface TeamMember {
  role: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  type: ProductType;
  startTime: string;
  endTime: string;
  studio: string;
  status: Status;
  team: TeamMember[];
  notes?: string;
  channel?: string;
}

export interface DaySchedule {
  date: string; // "YYYY-MM-DD"
  products: Product[];
  note?: string; // e.g. "São João — Edição Especial"
}

let _id = 1;
function id() { return String(_id++); }

function prog(
  name: string, shortName: string,
  start: string, end: string,
  studio: string, status: Status,
  team: TeamMember[], notes?: string
): Product {
  return { id: id(), name, shortName, type: "programa", startTime: start, endTime: end, studio, status, team, notes };
}

function game(
  name: string,
  start: string, end: string,
  studio: string, status: Status,
  team: TeamMember[], channel?: string, notes?: string
): Product {
  return { id: id(), name, shortName: "JOGO", type: "jogo", startTime: start, endTime: end, studio, status, team, channel, notes };
}

export function getWeekDates(referenceDate: Date): string[] {
  const d = new Date(referenceDate);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(d);
    dd.setDate(dd.getDate() + i);
    return dd.toISOString().slice(0, 10);
  });
}

export function buildSchedule(weekDates: string[]): DaySchedule[] {
  const [seg, ter, qua, qui, sex, sab, dom] = weekDates;

  return [
    {
      date: seg,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Rodrigo Câmara" },
          { role: "Apresentadora", name: "Fernanda Melo" },
          { role: "Direção", name: "Cláudio Torres" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Letícia Nunes" },
          { role: "Técnico de Áudio", name: "Ricardo Viana" },
        ]),
        prog("NE1", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Sílvia Rocha" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
          { role: "Técnico de Áudio", name: "Ricardo Viana" },
          { role: "Grafismo", name: "Isabela Costa" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
          { role: "Repórter", name: "Bianca Ferreira" },
          { role: "Direção", name: "Sílvia Rocha" },
        ]),
        prog("Boletim", "BOLETIM", "13:30", "13:45", "Estúdio 1", "confirmado", [
          { role: "Apresentador", name: "Marcos Tenório" },
          { role: "Câmera", name: "Letícia Nunes" },
        ]),
        prog("NE2", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Carlos Freitas" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
          { role: "Técnico de Áudio", name: "Ricardo Viana" },
          { role: "Grafismo", name: "Isabela Costa" },
        ]),
        game("Náutico x Operário", "21:00", "23:30", "Cabine — Estádio dos Aflitos", "confirmado", [
          { role: "Narrador", name: "Nilson César" },
          { role: "Comentarista", name: "Edilson Pereira" },
          { role: "Comentarista", name: "Evandro Ferreira" },
          { role: "Repórter de Campo", name: "Bianca Ferreira" },
          { role: "Repórter de Vestiário", name: "Rodrigo Câmara" },
          { role: "Produtor", name: "André Maia" },
          { role: "Técnico de Áudio", name: "Fábio Lima" },
        ], "SporTV", "Série B — Brasileirão. Pré-jogo a partir das 20h45."),
      ],
    },
    {
      date: ter,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Rodrigo Câmara" },
          { role: "Apresentadora", name: "Fernanda Melo" },
          { role: "Direção", name: "Cláudio Torres" },
          { role: "Câmera 1", name: "Paulo Souza" },
        ]),
        prog("NE1", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Sílvia Rocha" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
          { role: "Direção", name: "Sílvia Rocha" },
        ]),
        prog("NE2", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Carlos Freitas" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
          { role: "Técnico de Áudio", name: "Ricardo Viana" },
        ]),
      ],
    },
    {
      date: qua,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "previsto", [
          { role: "Apresentador", name: "Rodrigo Câmara" },
          { role: "Apresentadora", name: "Fernanda Melo" },
          { role: "Direção", name: "Cláudio Torres" },
        ], "Confirmação de pauta pendente"),
        prog("NE1", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Débora Santos" },
          { role: "Apresentador", name: "Paulo Henrique" },
          { role: "Direção", name: "Sílvia Rocha" },
          { role: "Câmera 1", name: "Marco Alves" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "alterado", [
          { role: "Apresentador", name: "Felipe Andrade" },
          { role: "Direção", name: "Sílvia Rocha" },
        ], "Horário reduzido por inserção de rede"),
        prog("Boletim", "BOLETIM", "17:00", "17:15", "Estúdio 1", "previsto", [
          { role: "Apresentador", name: "Marcos Tenório" },
          { role: "Câmera", name: "Letícia Nunes" },
        ]),
        prog("NE2", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Carlos Freitas" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
        ]),
        prog("GCO", "GCO", "20:00", "20:30", "Estúdio 1", "confirmado", [
          { role: "Apresentadora", name: "Carla Vieira" },
          { role: "Direção", name: "André Maia" },
          { role: "Câmera 1", name: "Letícia Nunes" },
        ]),
      ],
    },
    {
      date: qui,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Rodrigo Câmara" },
          { role: "Apresentadora", name: "Fernanda Melo" },
          { role: "Direção", name: "Cláudio Torres" },
        ]),
        prog("NE1", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Sílvia Rocha" },
          { role: "Câmera 1", name: "Paulo Souza" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
          { role: "Direção", name: "Sílvia Rocha" },
        ]),
        prog("Descomplica PE", "DESCOMPLICA", "14:00", "15:00", "Estúdio 3", "previsto", [
          { role: "Apresentadora", name: "Carla Vieira" },
          { role: "Direção", name: "André Maia" },
          { role: "Câmera 1", name: "Letícia Nunes" },
          { role: "Câmera 2", name: "Marco Alves" },
          { role: "Sonoplasta", name: "Fábio Lima" },
        ], "Pauta: Transporte público no Grande Recife"),
        prog("NE2", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
        prog("GCO", "GCO", "20:00", "20:30", "Estúdio 1", "confirmado", [
          { role: "Apresentadora", name: "Carla Vieira" },
          { role: "Direção", name: "André Maia" },
        ]),
      ],
    },
    {
      date: sex,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Rodrigo Câmara" },
          { role: "Apresentadora", name: "Fernanda Melo" },
          { role: "Direção", name: "Cláudio Torres" },
        ]),
        prog("NE1", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Sílvia Rocha" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
        ]),
        prog("Boletim Saúde", "BOLETIM", "15:00", "15:30", "Estúdio 1", "cancelado", [
          { role: "Apresentador", name: "Marcos Tenório" },
        ], "Cancelado — falha técnica de satélite"),
        prog("NE2", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "João Brandão" },
          { role: "Apresentadora", name: "Ana Lima" },
          { role: "Direção", name: "Carlos Freitas" },
          { role: "Câmera 1", name: "Paulo Souza" },
          { role: "Câmera 2", name: "Marco Alves" },
        ]),
        game("Sport x CRB", "21:30", "23:45", "Cabine — Ilha do Retiro", "previsto", [
          { role: "Narrador", name: "Nilson César" },
          { role: "Comentarista", name: "Edilson Pereira" },
          { role: "Repórter de Campo", name: "Bianca Ferreira" },
          { role: "Produtor", name: "André Maia" },
        ], "SporTV 2", "Aguardando confirmação de credenciamento"),
      ],
    },
    {
      date: sab,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "confirmado", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Apresentador", name: "Paulo Henrique" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
        prog("NE1 Fim de Semana", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Apresentador", name: "Paulo Henrique" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
        ]),
        game("Náutico x Botafogo-PB", "16:00", "18:30", "Cabine — Estádio dos Aflitos", "confirmado", [
          { role: "Narrador", name: "Nilson César" },
          { role: "Comentarista", name: "Edilson Pereira" },
          { role: "Comentarista", name: "Evandro Ferreira" },
          { role: "Repórter de Campo", name: "Rodrigo Câmara" },
          { role: "Produtor", name: "André Maia" },
          { role: "Técnico de Áudio", name: "Fábio Lima" },
        ], "Premiere", "Copa do Nordeste"),
        prog("NE2 Fim de Semana", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
      ],
    },
    {
      date: dom,
      products: [
        prog("Bom Dia PE", "BDPE", "06:00", "08:45", "Estúdio 2", "previsto", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
        prog("Descomplica PE", "DESCOMPLICA", "10:00", "11:00", "Estúdio 3", "confirmado", [
          { role: "Apresentadora", name: "Carla Vieira" },
          { role: "Direção", name: "André Maia" },
          { role: "Câmera 1", name: "Marco Alves" },
        ]),
        prog("NE1 Fim de Semana", "NE1", "12:00", "13:00", "Estúdio 2", "confirmado", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Apresentador", name: "Paulo Henrique" },
          { role: "Direção", name: "Carlos Freitas" },
        ]),
        prog("Globo Esporte PE", "GE", "13:00", "13:30", "Estúdio 2", "confirmado", [
          { role: "Apresentador", name: "Felipe Andrade" },
        ]),
        prog("NE2 Fim de Semana", "NE2", "19:00", "20:00", "Estúdio 2", "confirmado", [
          { role: "Apresentadora", name: "Débora Santos" },
          { role: "Direção", name: "Carlos Freitas" },
          { role: "Câmera 1", name: "Marco Alves" },
        ]),
      ],
    },
  ];
}

export const PRODUCT_COLORS: Record<string, string> = {
  BDPE:        "#eab308", // amarelo
  NE1:         "#f59e0b", // âmbar / amarelo-laranja
  GE:          "#f97316", // laranja
  BOLETIM:     "#60a5fa", // azul claro
  NE2:         "#1d4ed8", // azul escuro
  JOGO:        "#dc2626", // vermelho
  GCO:         "#ec4899", // rosa
  DESCOMPLICA: "#7c3aed", // roxo
};
