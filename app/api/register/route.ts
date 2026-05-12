import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { signUserToken } from '@/lib/auth-token'
import { createUser, findUserByEmail } from '@/lib/users-store'

export const runtime = 'nodejs'

type RegisterBody = {
  email?: string
  login?: string
  password?: string
  name?: string
}

export async function POST(request: Request) {
  let body: RegisterBody
  try {
    body = (await request.json()) as RegisterBody
  } catch {
    return NextResponse.json({ success: false, error: 'Некорректное тело запроса' }, { status: 400 })
  }

  const emailRaw = typeof body.email === 'string' ? body.email : body.login
  const email = emailRaw?.trim() ?? ''
  const password = body.password
  const name = typeof body.name === 'string' ? body.name.trim() : ''

  if (!email) {
    return NextResponse.json({ success: false, error: 'Укажите email' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Некорректный email' }, { status: 400 })
  }

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ success: false, error: 'Укажите пароль' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, error: 'Пароль не короче 6 символов' }, { status: 400 })
  }

  if (!name) {
    return NextResponse.json({ success: false, error: 'Укажите имя' }, { status: 400 })
  }

  if (findUserByEmail(email)) {
    return NextResponse.json(
      { success: false, error: 'Пользователь с таким email уже зарегистрирован' },
      { status: 409 },
    )
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = createUser({ email, passwordHash, name })
    const token = signUserToken(user.id, user.email)

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name, role: 'USER' as const },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_EXISTS') {
      return NextResponse.json({ success: false, error: 'Пользователь уже существует' }, { status: 409 })
    }
    console.error('[api/register]', error)
    return NextResponse.json({ success: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
