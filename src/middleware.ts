import type { NextRequest } from 'next/server'
import { validateAcess } from './wiring/validate-access/middleware'

export async function middleware(req: NextRequest) {
  return await validateAcess(req)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
