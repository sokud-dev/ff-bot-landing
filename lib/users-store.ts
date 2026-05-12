import fs from 'fs'
import path from 'path'

export type StoredUser = {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] as StoredUser[] }, null, 2), 'utf-8')
  }
}

export function readUsers(): StoredUser[] {
  ensureDataFile()
  const raw = fs.readFileSync(USERS_FILE, 'utf-8')
  const parsed = JSON.parse(raw) as { users?: StoredUser[] }
  return Array.isArray(parsed.users) ? parsed.users : []
}

export function writeUsers(users: StoredUser[]) {
  ensureDataFile()
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf-8')
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const normalized = email.trim().toLowerCase()
  return readUsers().find((u) => u.email.toLowerCase() === normalized)
}

export function createUser(params: { email: string; passwordHash: string; name: string }): StoredUser {
  const users = readUsers()
  const normalizedEmail = params.email.trim().toLowerCase()
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error('USER_EXISTS')
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: params.name.trim(),
    passwordHash: params.passwordHash,
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  writeUsers(users)
  return user
}
