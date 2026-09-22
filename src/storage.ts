import {
  collection, doc, getDoc, setDoc, onSnapshot,
  query, where, documentId,
} from "firebase/firestore";
import { db } from "./firebase";
import { buildSchedule, type Product, type DaySchedule } from "./data";
import { toMinutes } from "./hooks";

// ── Persistência do quadro (Firestore) ────────────────────────────────────────
// A programação fica salva na nuvem, num documento por dia
// (coleção "schedule", id = "YYYY-MM-DD"). Qualquer pessoa que abrir o site
// vê os mesmos dados, e quem estiver com a tela aberta recebe atualizações em
// tempo real (onSnapshot) — não precisa nem dar F5.

const COLLECTION = "schedule";

function sortByStart(products: Product[]): Product[] {
  return [...products].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
}

/** Remove chaves com valor `undefined` — o Firestore rejeita documentos que as contenham. */
function stripUndefined<T extends object>(obj: T): T {
  const clone = { ...obj } as Record<string, unknown>;
  Object.keys(clone).forEach(k => {
    if (clone[k] === undefined) delete clone[k];
  });
  return clone as T;
}

function seedFromTemplate(date: string, weekDates: string[]): Product[] {
  const templateWeek = buildSchedule(weekDates);
  const day = templateWeek.find(d => d.date === date);
  return (day?.products ?? []).map((p, i) => ({ ...p, id: `${date}-t${i}` }));
}

/** Garante que o documento do dia existe no Firestore (semeando com o modelo padrão, se preciso). */
async function ensureDay(date: string, weekDatesHint?: string[]): Promise<Product[]> {
  const ref = doc(db, COLLECTION, date);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return (snap.data().products ?? []) as Product[];
  }
  const seeded = weekDatesHint ? seedFromTemplate(date, weekDatesHint) : [];
  await setDoc(ref, { products: seeded });
  return seeded;
}

/**
 * Assina a programação de uma semana em tempo real. Chama `callback` sempre
 * que algo mudar (na hora, em qualquer dispositivo). Retorna uma função pra
 * cancelar a assinatura (chame no cleanup do useEffect).
 */
export function subscribeToSchedule(
  weekDates: string[],
  callback: (schedule: DaySchedule[]) => void,
): () => void {
  const current = new Map<string, Product[]>();
  let cancelled = false;

  function emit() {
    if (cancelled) return;
    callback(weekDates.map(date => ({ date, products: current.get(date) ?? [] })));
  }

  // Garante que todos os dias da semana existem (semeados), sem travar a
  // primeira renderização — os listeners abaixo já vão receber os dados.
  weekDates.forEach(date => { void ensureDay(date, weekDates); });

  const q = query(collection(db, COLLECTION), where(documentId(), "in", weekDates));
  const unsubscribe = onSnapshot(q, snap => {
    snap.forEach(docSnap => {
      current.set(docSnap.id, sortByStart((docSnap.data().products ?? []) as Product[]));
    });
    emit();
  }, err => {
    console.error("Erro ao sincronizar programação:", err);
  });

  return () => {
    cancelled = true;
    unsubscribe();
  };
}

/** Leitura pontual (sem assinatura), útil pra operações de escrita. */
async function getDay(date: string, weekDatesHint?: string[]): Promise<Product[]> {
  return ensureDay(date, weekDatesHint);
}

export async function addProduct(date: string, product: Omit<Product, "id">, weekDatesHint?: string[]): Promise<Product> {
  const products = await getDay(date, weekDatesHint);
  const newProduct: Product = stripUndefined({ ...product, id: `${date}-c${Date.now()}` });
  const updated = sortByStart([...products, newProduct]).map(stripUndefined);
  await setDoc(doc(db, COLLECTION, date), { products: updated });
  return newProduct;
}

export async function updateProduct(date: string, id: string, updated: Omit<Product, "id">, weekDatesHint?: string[]): Promise<void> {
  const products = await getDay(date, weekDatesHint);
  const next = sortByStart(products.map(p => (p.id === id ? { ...updated, id } : p))).map(stripUndefined);
  await setDoc(doc(db, COLLECTION, date), { products: next });
}

export async function deleteProduct(date: string, id: string): Promise<void> {
  const ref = doc(db, COLLECTION, date);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const products = ((snap.data().products ?? []) as Product[]).filter(p => p.id !== id);
  await setDoc(ref, { products });
}
