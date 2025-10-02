import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const LOGIN_PATH = '/login'
const LIST_PATH = '/with-you-list'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const supabase = createMiddlewareClient({ req, res: NextResponse.next() })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (pathname === LOGIN_PATH) {
    if (user) {
      return NextResponse.redirect(new URL(LIST_PATH, req.url))
    }
    return NextResponse.next()
  }

  if (pathname === LIST_PATH) {
    if (user) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
  }

  if (user) {
    return NextResponse.redirect(new URL(LIST_PATH, req.url))
  }
  return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
