import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mapUser } from '@/api/mapping/map-user'
import { permanentRedirect } from 'next/navigation'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/api/supabase/database.types'
import type { User } from '@/domain/log-in'
import { getUser, SupbaseProfilesItem } from './user'

// --- Mocks ---------------------------------------------------------
vi.mock('@/api/mapping/map-user', () => ({
  mapUser: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  permanentRedirect: vi.fn(),
}))

const mockMapUser = vi.mocked(mapUser)
const mockPermanentRedirect = vi.mocked(permanentRedirect)

// Helper to build a fake Supabase client
const createMockClient = (
  user?: { id: string },
  profile?: SupbaseProfilesItem,
  opts?: { userError?: boolean; profileError?: boolean },
): SupabaseClient<Database['public']> => {
  return {
    auth: {
      getUser: vi.fn(async () => ({
        data: { user: opts?.userError ? null : user || null },
        error: opts?.userError ? new Error('auth error') : null,
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(async () => ({
        data: opts?.profileError ? null : profile || null,
        error: opts?.profileError ? new Error('profile error') : null,
      })),
    })),
  } as unknown as SupabaseClient<Database['public']>
}

describe('getUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to /login if no user is authenticated', async () => {
    const client = createMockClient()
    const result = await getUser({ client })
    expect(result).toBeUndefined()
    expect(mockPermanentRedirect).toHaveBeenCalled()
  })

  it('redirects to /login if profile fetch fails', async () => {
    const client = createMockClient({ id: 'u1' }, undefined, {
      profileError: true,
    })
    await getUser({ client })
    expect(mockPermanentRedirect).toHaveBeenCalledWith('/login')
  })

  it('redirects to /login if profile is null', async () => {
    const client = createMockClient({ id: 'u1' })
    await getUser({ client })
    expect(mockPermanentRedirect).toHaveBeenCalledWith('/login')
  })

  it('returns mapped user when profile exists', async () => {
    const profile: SupbaseProfilesItem = {
      id: 'u1',
      name: 'Alice',
      last_name: 'Johnson',
      picture_url: 'https://example.com/alice.png',
      created_at: '',
    }

    const mappedUser: User = {
      id: 'u1',
      name: 'Alice',
      lastName: 'Johnson',
      pictureUrl: 'https://example.com/alice.png',
    }

    const client = createMockClient({ id: 'u1' }, profile)
    mockMapUser.mockReturnValueOnce(mappedUser)

    const result = await getUser({ client })

    expect(result).toEqual(mappedUser)
    expect(mockMapUser).toHaveBeenCalledWith(profile)
    expect(mockPermanentRedirect).not.toHaveBeenCalled()
  })
})
