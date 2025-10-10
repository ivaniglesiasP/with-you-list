import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { validateAcess } from './middleware'

// --- Mock Supabase SSR client ---------------------------------------
vi.mock('@supabase/ssr', () => {
  return {
    createServerClient: vi.fn(),
  }
})

// A helper to access the mocked function with proper typing
const mockCreateServerClient = vi.mocked(createServerClient)

// --- Utilities -------------------------------------------------------

function makeRequest(path: string): NextRequest {
  const absoluteURL = `http://localhost:3000${path}`
  const req = {
    nextUrl: new URL(absoluteURL),
    url: absoluteURL,
    cookies: {
      getAll: vi.fn(() => []),
      set: vi.fn(),
    },
  } as unknown as NextRequest
  return req
}

function mockSupabaseUser(user: object | null) {
  const mockClient = {
    auth: {
      getUser: vi.fn(async () => ({ data: { user } })),
    },
  } as unknown as SupabaseClient

  mockCreateServerClient.mockReturnValueOnce(mockClient)
}

// --- Tests -----------------------------------------------------------

describe('validateAccess middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allows unauthenticated user to access /login', async () => {
    mockSupabaseUser(null)
    const req = makeRequest('/login')
    const res = await validateAcess(req)
    expect(res instanceof NextResponse).toBe(true)
    expect(res.headers.get('location')).toBeNull()
  })

  it('redirects authenticated user from /login to /with-you-list', async () => {
    mockSupabaseUser({ id: '123' })
    const req = makeRequest('/login')
    const res = await validateAcess(req)
    expect(res.headers.get('location')).toStrictEqual(
      'http://localhost:3000/with-you-list',
    )
  })

  it('redirects unauthenticated user from /with-you-list to /login', async () => {
    mockSupabaseUser(null)
    const req = makeRequest('/with-you-list')
    const res = await validateAcess(req)
    expect(res.headers.get('location')).toStrictEqual(
      'http://localhost:3000/login',
    )
  })

  it('allows authenticated user to stay on /with-you-list', async () => {
    mockSupabaseUser({ id: '123' })
    const req = makeRequest('/with-you-list')
    const res = await validateAcess(req)
    expect(res.headers.get('location')).toBeNull()
  })

  it('redirects unauthenticated user from other routes to /login', async () => {
    mockSupabaseUser(null)
    const req = makeRequest('/dashboard')
    const res = await validateAcess(req)
    expect(res.headers.get('location')).toStrictEqual(
      'http://localhost:3000/login',
    )
  })

  it('redirects authenticated user from other routes to /with-you-list', async () => {
    mockSupabaseUser({ id: 'abc' })
    const req = makeRequest('/dashboard')
    const res = await validateAcess(req)
    expect(res.headers.get('location')).toStrictEqual(
      'http://localhost:3000/with-you-list',
    )
  })
})
