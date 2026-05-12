import jwt from 'jsonwebtoken'

function getJwtSecret() {
  return process.env.JWT_SECRET ?? 'ff-bot-landing-dev-only-change-JWT_SECRET-in-production'
}

export function signUserToken(userId: string, email: string): string {
  return jwt.sign({ sub: userId, email }, getJwtSecret(), { expiresIn: '7d' })
}
