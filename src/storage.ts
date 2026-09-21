import { buildSchedule, type Product, type DaySchedule } from "./data";
import { toMinutes } from "./hooks";

// ── Persistência do quadro ────────────────────────────────────────────────────
// O quadro é só front-end: a programação editada pelo admin fica salva no
// localStorage do navegador daquele computador (não sincroniza com outros
// dispositivos). Na primeira vez que um dia é aberto, ele é "semeado" com o
// modelo padrão (buildSchedule); a partir daí, qualquer edição do admin fica
// gravada e passa a valer para aquele dia específico.

const STORAGE_KEY = "qp_schedule_v1";

type StoredSchedule = Record<string, Product[]>; // "YYYY-MM-DD" -> produtos

function loadStore(): StoredSchedule {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStore(store: StoredSchedule) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* localStorage indisponível — edições não serão persistidas */
  }
}

function sortByStart(products: Product[]): Product[] {
  return [...products].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
}

function seedFromTemplate(date: string, weekDates: string[]): Product[] {
  const templateWeek = buildSchedule(weekDates);
  const day = templateWeek.find(d => d.date === date);
  return (day?.products ?? []).map((p, i) => ({ ...p, id: `${date}-t${i}` }));
}

/** Retorna a programação efetiva da semana, semeando no storage os dias novos. */
export function getSchedule(weekDates: string[]): DaySchedule[] {
  const store = loadStore();
  let changed = false;

  const result: DaySchedule[] = weekDates.map(date => {
    if (!store[date]) {
      store[date] = seedFromTemplate(date, weekDates);
      changed = true;
    }
    return { date, products: store[date] };
  });

  if (changed) saveStore(store);
  return result;
}

/** Garante que o dia existe no storage (usado antes de mexer nele isoladamente). */
function ensureDay(store: StoredSchedule, date: string, weekDatesHint?: string[]) {
  if (store[date]) return;
  store[date] = weekDatesHint ? seedFromTemplate(date, weekDatesHint) : [];
}

export function addProduct(date: string, product: Omit<Product, "id">, weekDatesHint?: string[]): Product {
  const store = loadStore();
  ensureDay(store, date, weekDatesHint);
  const newProduct: Product = { ...product, id: `${date}-c${Date.now()}` };
  store[date] = sortByStart([...store[date], newProduct]);
  saveStore(store);
  return newProduct;
}

export function updateProduct(date: string, id: string, updated: Omit<Product, "id">, weekDatesHint?: string[]) {
  const store = loadStore();
  ensureDay(store, date, weekDatesHint);
  store[date] = sortByStart(store[date].map(p => (p.id === id ? { ...updated, id } : p)));
  saveStore(store);
}

export function deleteProduct(date: string, id: string) {
  const store = loadStore();
  if (!store[date]) return;
  store[date] = store[date].filter(p => p.id !== id);
  saveStore(store);
}
