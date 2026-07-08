import crypto from "node:crypto";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  passwordHash: string;
  salt: string;
};

const sessionSecret = process.env.SESSION_SECRET ?? "aurora-local-development-secret";

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function sign(value: string) {
  return crypto.createHmac("sha256", sessionSecret).update(value).digest("hex");
}

function encode(input: unknown) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

function decode<T>(input: string): T {
  return JSON.parse(Buffer.from(input, "base64url").toString("utf8")) as T;
}

const demoSalt = "aurora-demo-salt";

const users: User[] = [
  {
    id: "usr_jordan",
    name: "Jordan Rivera",
    email: "jordan@aurora.test",
    role: "Finance Director",
    salt: demoSalt,
    passwordHash: hashPassword("Aurora@2026", demoSalt)
  }
];

export type SessionUser = Pick<User, "id" | "name" | "email" | "role">;

export function authenticate(email: string, password: string) {
  const user = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  if (!user || hashPassword(password, user.salt) !== user.passwordHash) {
    const error = new Error("Invalid email or password") as Error & { status?: number };
    error.status = 401;
    throw error;
  }

  return createSession(user);
}

export function createSession(user: User) {
  const sessionUser: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const payload = encode({
    user: sessionUser,
    expiresAt: Date.now() + 1000 * 60 * 60 * 8
  });
  const token = `${payload}.${sign(payload)}`;

  return { token, user: sessionUser };
}

export function verifySession(token?: string) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;

  const session = decode<{ user: SessionUser; expiresAt: number }>(payload);
  if (session.expiresAt < Date.now()) return null;

  return session.user;
}
