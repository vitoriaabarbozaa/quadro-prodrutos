// ── Roster ────────────────────────────────────────────────────────────────────
// Funções (papéis) e pessoas pré-cadastradas para montar a equipe de cada
// produto. O admin pode usar as sugestões abaixo (extraídas da programação
// atual) ou cadastrar nomes/funções novas na hora — o que for adicionado fica
// salvo no navegador para as próximas vezes.

export type ProductKindKey =
  | "BDPE" | "NE1" | "GE" | "BOLETIM" | "NE2" | "JOGO" | "GCO" | "DESCOMPLICA";

export interface ProductKind {
  key: ProductKindKey;
  label: string;
  type: "programa" | "jogo";
  defaultStudio: string;
}

export const PRODUCT_KINDS: ProductKind[] = [
  { key: "BDPE",        label: "Bom Dia PE",       type: "programa", defaultStudio: "Estúdio 2" },
  { key: "NE1",         label: "NE1",              type: "programa", defaultStudio: "Estúdio 2" },
  { key: "GE",          label: "Globo Esporte PE", type: "programa", defaultStudio: "Estúdio 2" },
  { key: "BOLETIM",     label: "Boletim",          type: "programa", defaultStudio: "Estúdio 1" },
  { key: "NE2",         label: "NE2",              type: "programa", defaultStudio: "Estúdio 2" },
  { key: "JOGO",        label: "Jogo",             type: "jogo",     defaultStudio: "Estúdio 3" },
  { key: "GCO",         label: "GCO",              type: "programa", defaultStudio: "Estúdio 1" },
  { key: "DESCOMPLICA", label: "Descomplica PE",   type: "programa", defaultStudio: "Estúdio 3" },
];

// Funções sugeridas por tipo de produto (o admin pode adicionar outras na hora).
export const ROLE_PRESETS: Record<ProductKindKey, string[]> = {
  BDPE:        ["Apresentador", "Apresentadora", "Direção", "Câmera 1", "Câmera 2", "Técnico de Áudio"],
  NE1:         ["Apresentador", "Apresentadora", "Direção", "Câmera 1", "Câmera 2", "Técnico de Áudio", "Grafismo"],
  GE:          ["Apresentador", "Apresentadora", "Repórter", "Direção"],
  BOLETIM:     ["Apresentador", "Apresentadora", "Câmera"],
  NE2:         ["Apresentador", "Apresentadora", "Direção", "Câmera 1", "Câmera 2", "Técnico de Áudio", "Grafismo"],
  JOGO:        ["Narrador", "Comentarista", "Repórter de Campo", "Repórter de Vestiário", "Produtor", "Técnico de Áudio"],
  GCO:         ["Apresentador", "Apresentadora", "Direção", "Câmera 1"],
  DESCOMPLICA: ["Apresentador", "Apresentadora", "Direção", "Câmera 1", "Câmera 2", "Sonoplasta"],
};

// Pessoas pré-cadastradas, já separadas por função (serve de ponto de partida
// para os checkboxes — são nomes de exemplo, ajuste à vontade).
export const PEOPLE_BY_CATEGORY: Record<string, string[]> = {
  "Apresentador(a)":   ["Rodrigo Câmara", "Fernanda Melo", "Ana Lima", "Sílvia Rocha", "Isabela Costa", "Débora Santos"],
  "Direção":           ["Cláudio Torres", "Marco Alves", "Nilson César"],
  "Câmera":            ["Paulo Souza", "Ricardo Viana", "Felipe Andrade", "Carlos Freitas", "Fábio Lima"],
  "Técnico de Áudio":  ["Letícia Nunes", "Edilson Pereira"],
  "Grafismo":          ["Bianca Ferreira", "Marcos Tenório"],
  "Repórter":          ["João Brandão", "André Maia", "Paulo Henrique"],
  "Narrador":          ["Evandro Ferreira"],
  "Comentarista":      ["Carla Vieira"],
  "Produtor":          [],
  "Sonoplasta":        [],
};

// Mapeia variações de nome de função (como aparecem em ROLE_PRESETS) para a
// categoria de pessoas correspondente em PEOPLE_BY_CATEGORY. Funções que não
// estiverem aqui viram sua própria categoria (útil para funções customizadas
// que o admin cadastrar na hora).
const ROLE_TO_CATEGORY: Record<string, string> = {
  "Apresentador":          "Apresentador(a)",
  "Apresentadora":         "Apresentador(a)",
  "Direção":               "Direção",
  "Câmera":                "Câmera",
  "Câmera 1":              "Câmera",
  "Câmera 2":              "Câmera",
  "Técnico de Áudio":      "Técnico de Áudio",
  "Grafismo":              "Grafismo",
  "Repórter":              "Repórter",
  "Repórter de Campo":     "Repórter",
  "Repórter de Vestiário": "Repórter",
  "Narrador":              "Narrador",
  "Comentarista":          "Comentarista",
  "Produtor":              "Produtor",
  "Sonoplasta":            "Sonoplasta",
};

/** Categoria de pessoas correspondente a uma função. */
export function categoryForRole(role: string): string {
  return ROLE_TO_CATEGORY[role] ?? role;
}

const PEOPLE_KEY = "qp_roster_people";
const ROLES_KEY  = "qp_roster_extra_roles";

function loadList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveList(key: string, list: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

/** Pessoas sugeridas para uma função específica (padrão da categoria + extras cadastradas). */
export function getPeopleForRole(role: string): string[] {
  const category = categoryForRole(role);
  const base  = PEOPLE_BY_CATEGORY[category] ?? [];
  const extra = loadList(`${PEOPLE_KEY}_${category}`);
  return Array.from(new Set([...base, ...extra])).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/** Cadastra uma pessoa nova numa função/categoria (idempotente). */
export function addPerson(role: string, name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const category = categoryForRole(role);
  const key = `${PEOPLE_KEY}_${category}`;
  const extra = loadList(key);
  if (!getPeopleForRole(role).includes(trimmed)) {
    saveList(key, [...extra, trimmed]);
  }
}

/** Todas as pessoas conhecidas, de todas as categorias juntas. */
export function getAllPeople(): string[] {
  const all = Object.keys(PEOPLE_BY_CATEGORY).flatMap(getPeopleForRole);
  return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/** Todas as funções conhecidas para um tipo de produto (padrão + extras cadastradas). */
export function getRolesFor(kind: ProductKindKey): string[] {
  const extraKey = `${ROLES_KEY}_${kind}`;
  const extra = loadList(extraKey);
  return Array.from(new Set([...ROLE_PRESETS[kind], ...extra]));
}

/** Cadastra uma função nova para um tipo de produto (idempotente). */
export function addRole(kind: ProductKindKey, role: string) {
  const trimmed = role.trim();
  if (!trimmed) return;
  const extraKey = `${ROLES_KEY}_${kind}`;
  const extra = loadList(extraKey);
  if (!getRolesFor(kind).includes(trimmed)) {
    saveList(extraKey, [...extra, trimmed]);
  }
}