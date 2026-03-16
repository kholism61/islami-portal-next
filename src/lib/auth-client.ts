export type PortalRole = "admin" | "member";

export type PortalSessionUser = {
  id: string;
  name: string;
  email: string;
  role: PortalRole;
  picture?: string;
  createdAt: string;
  lastLoginAt?: string;
};

type StoredUser = PortalSessionUser & {
  password?: string;
};

const STORAGE_KEYS = {
  users: "islamiPortalUsers",
  session: "islamiPortalSession",
  audit: "islamiPortalAudit",
  legacyUser: "user",
} as const;

const ADMIN_EMAILS = ["nurcholism51@gmail.com"];

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeEmail(email: unknown) {
  return String(email || "").trim().toLowerCase();
}

function inferRole(email: string): PortalRole {
  return ADMIN_EMAILS.includes(normalizeEmail(email)) ? "admin" : "member";
}

function defaultUserName(email: string) {
  const base = email.includes("@") ? email.split("@")[0] : "Portal User";
  return base || "Portal User";
}

function normalizeUser(user: Partial<StoredUser>): StoredUser {
  const email = normalizeEmail(user.email);
  const createdAt = user.createdAt || new Date().toISOString();

  return {
    id: user.id || `user-${Date.now()}`,
    name: user.name || defaultUserName(email),
    email,
    role: inferRole(email),
    picture: user.picture || "",
    createdAt,
    password: user.password || "",
    lastLoginAt: user.lastLoginAt,
  };
}

function ensureSeedUsers() {
  const existing = safeParse<StoredUser[]>(localStorage.getItem(STORAGE_KEYS.users), []);
  if (Array.isArray(existing) && existing.length > 0) return;

  const seedAdmin: StoredUser = normalizeUser({
    id: "seed-admin",
    name: "Nurcholism Admin",
    email: "nurcholism51@gmail.com",
    password: "Admin123!",
    role: "admin",
    picture: "",
    createdAt: "2026-03-10T09:00:00.000Z",
  });

  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([seedAdmin]));
}

export function getUsers(): StoredUser[] {
  ensureSeedUsers();
  const users = safeParse<StoredUser[]>(localStorage.getItem(STORAGE_KEYS.users), []);
  return Array.isArray(users) ? users.map(normalizeUser) : [];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users.map(normalizeUser)));
}

export function getSession(): PortalSessionUser | null {
  ensureSeedUsers();

  const session = safeParse<PortalSessionUser | null>(localStorage.getItem(STORAGE_KEYS.session), null);
  if (!session?.email) return null;

  const normalized = normalizeUser(session);
  const nextSession: PortalSessionUser = {
    id: normalized.id,
    name: normalized.name,
    email: normalized.email,
    role: normalized.role,
    picture: normalized.picture,
    createdAt: normalized.createdAt,
    lastLoginAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(nextSession));
  localStorage.setItem(
    STORAGE_KEYS.legacyUser,
    JSON.stringify({
      name: nextSession.name,
      email: nextSession.email,
      picture: nextSession.picture || "",
      role: nextSession.role,
    })
  );

  return nextSession;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.session);
  localStorage.removeItem(STORAGE_KEYS.legacyUser);
}

export function signup(payload: { name: string; email: string; password: string; confirmPassword: string }) {
  const name = String(payload.name || "").trim();
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");
  const confirmPassword = String(payload.confirmPassword || "");

  if (name.length < 3) throw new Error("Name must be at least 3 characters.");
  if (!email.includes("@")) throw new Error("Invalid email address.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");
  if (password !== confirmPassword) throw new Error("Password confirmation does not match.");

  const users = getUsers();
  if (users.some((user) => normalizeEmail(user.email) === email)) {
    throw new Error("Email is already registered. Please sign in.");
  }

  const newUser = normalizeUser({
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    picture: "",
  });

  users.unshift(newUser);
  saveUsers(users);

  const sessionUser: PortalSessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    picture: newUser.picture,
    createdAt: newUser.createdAt,
    lastLoginAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
  localStorage.setItem(
    STORAGE_KEYS.legacyUser,
    JSON.stringify({
      name: sessionUser.name,
      email: sessionUser.email,
      picture: sessionUser.picture || "",
      role: sessionUser.role,
    })
  );

  return sessionUser;
}

export function login(payload: { email: string; password: string }) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email || !password) throw new Error("Email and password are required.");

  const users = getUsers();
  const user = users.find((item) => normalizeEmail(item.email) === email);
  if (!user) throw new Error("Account not found. Please sign up first.");
  if (!user.password) throw new Error("This older account has no password yet.");
  if (user.password !== password) throw new Error("Incorrect password.");

  const sessionUser: PortalSessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: inferRole(user.email),
    picture: user.picture,
    createdAt: user.createdAt,
    lastLoginAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
  localStorage.setItem(
    STORAGE_KEYS.legacyUser,
    JSON.stringify({
      name: sessionUser.name,
      email: sessionUser.email,
      picture: sessionUser.picture || "",
      role: sessionUser.role,
    })
  );

  return sessionUser;
}

export const AuthStorageKeys = STORAGE_KEYS;
export const AdminEmails = ADMIN_EMAILS;
