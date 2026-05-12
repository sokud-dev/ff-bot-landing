import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { signUserToken } from '@/lib/auth-token'
import { findUserByEmail } from '@/lib/users-store'

export const runtime = 'nodejs'

type LoginBody = {
  email?: string
  login?: string
  password?: string
}

export async function POST(request: Request) {
  let body: LoginBody
  try {
    body = (await request.json()) as LoginBody
  } catch {
    return NextResponse.json({ success: false, error: 'Некорректное тело запроса' }, { status: 400 })
  }

  const emailRaw = typeof body.email === 'string' ? body.email : body.login
  const email = emailRaw?.trim() ?? ''
  const password = body.password

  if (!email) {
    return NextResponse.json({ success: false, error: 'Укажите email' }, { status: 400 })
  }

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ success: false, error: 'Укажите пароль' }, { status: 400 })
  }

  const user = findUserByEmail(email)
  if (!user) {
    return NextResponse.json({ success: false, error: 'Неверный email или пароль' }, { status: 401 })
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash)
  if (!passwordOk) {
    return NextResponse.json({ success: false, error: 'Неверный email или пароль' }, { status: 401 })
  }

  const token = signUserToken(user.id, user.email)

  return NextResponse.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, name: user.name, role: 'USER' as const },
  })
}
