import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const LOGIN_PATH = '/login'
const LIST_PATH = '/with-you-list'

const createSupabaseClientForMiddlware = (req: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: req,
  })
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )
  return { supabaseResponse, supabaseClient }
}

const redirectWithRefreshedCookies = (
  request: NextRequest,
  supabaseResponse: NextResponse,
  targetPath: string,
): NextResponse => {
  const redirectResponse = NextResponse.redirect(
    new URL(targetPath, request.url),
  )
  supabaseResponse.cookies.getAll().forEach(({ name, value }) => {
    redirectResponse.cookies.set(name, value)
  })
  return redirectResponse
}

export const validateAcess = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const { supabaseClient, supabaseResponse } =
    createSupabaseClientForMiddlware(request)

  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  if (pathname === LOGIN_PATH) {
    if (!user) {
      return NextResponse.next()
    }
    return redirectWithRefreshedCookies(request, supabaseResponse, LIST_PATH)
  }
  if (pathname === LIST_PATH) {
    if (!user) {
      return redirectWithRefreshedCookies(request, supabaseResponse, LOGIN_PATH)
    }
    return supabaseResponse
  }
  if (!user) {
    return redirectWithRefreshedCookies(request, supabaseResponse, LOGIN_PATH)
  }
  return redirectWithRefreshedCookies(request, supabaseResponse, LIST_PATH)
}
