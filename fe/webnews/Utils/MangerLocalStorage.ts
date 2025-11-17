// ...existing code...
export type User = {
  id: number | string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export type AuthData = {
  token?: string;
  user: User;
  expiresAt?: number;
};

const LS_KEY = "webnews_auth_v1";

export function saveAuth(data: AuthData) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

export function getAuth(): AuthData | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthData;
    // expire check
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      clearAuth();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearAuth() {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

export function isAuthenticated(): boolean {
  return getAuth() !== null;
}

export function hasRole(expected: string | string[]): boolean {
  const auth = getAuth();
  if (!auth || !auth.user) return false;
  const role = auth.user.role;
  if (!role) return false;
  if (Array.isArray(expected)) return expected.includes(role);
  return role === expected;
}

export function updateUser(partial: Partial<User>): User | null {
  const auth = getAuth();
  if (!auth) return null;
  auth.user = { ...auth.user, ...partial };
  saveAuth(auth);
  return auth.user;
}

export function saveAuthWithTTL(data: AuthData, ttlMinutes: number) {
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
  saveAuth({ ...data, expiresAt });
}
