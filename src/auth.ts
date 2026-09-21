// ── Autenticação ──────────────────────────────────────────────────────────────
// Autenticação simples, só de front-end (sem servidor). Serve para liberar a
// edição do quadro apenas para quem tem a senha — não é uma segurança "à prova
// de bala", mas é suficiente para controlar quem mexe na programação.

export interface Account {
  /** Nome do setor/conta, só para referência. */
  label: string;
  /** Senha de acesso. */
  password: string;
  /** "admin" pode criar/editar/excluir produtos. */
  role: "admin";
}

// Contas cadastradas. Por enquanto só existe o admin (Jornalismo), que edita
// o quadro inteiro. Quando souber o nome oficial do setor e quiser trocar a
// senha, é só editar a linha abaixo.
//
// Para adicionar um novo setor com acesso de admin no futuro (ex.: COT),
// basta incluir outra linha, por exemplo:
//   { label: "COT", password: "globocot", role: "admin" },
export const ACCOUNTS: Account[] = [
  { label: "Admin", password: "globoadmin", role: "admin" },
];

const SESSION_KEY = "qp_admin_session";

export interface AdminSession {
  name: string;
  label: string;
}

/** Confere a senha digitada contra as contas cadastradas. */
export function checkPassword(password: string): Account | null {
  const found = ACCOUNTS.find(a => a.password === password);
  return found ?? null;
}

/** Tenta logar. `name` é só o nome de quem está usando (exibido na tela), livre. */
export function login(name: string, password: string): AdminSession | null {
  const account = checkPassword(password.trim());
  if (!account) return null;
  const session: AdminSession = { name: name.trim() || account.label, label: account.label };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage indisponível — segue logado só nesta sessão de memória
  }
  return session;
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function getSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
