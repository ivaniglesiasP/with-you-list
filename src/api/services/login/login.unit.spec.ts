import { describe, expect, it, vi } from 'vitest'
import { SupabaseClient } from '@supabase/supabase-js'
import { logIn } from './login'
import { Database } from '@/api/supabase/database.types'

describe('logIn', () => {
  it('it shoul return success login', async () => {
    const mockedClient = {
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session: { access_token: 'test' } },
          error: null,
        }),
      },
    } as unknown as SupabaseClient<Database['public']>

    const result = await logIn({
      client: mockedClient,
      email: 'test@test.com',
      password: 'test',
    })
    expect(result).toStrictEqual({ status: 'SUCCESS', accessToken: 'test' })
  })
  it('it shoul return invalid login with error message', async () => {
    const mockedClient = {
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Invalid credentials' },
        }),
      },
    } as unknown as SupabaseClient<Database['public']>

    const result = await logIn({
      client: mockedClient,
      email: 'test@test.com',
      password: 'test',
    })
    expect(result).toStrictEqual({
      status: 'INVALID',
      errorMessage: 'Invalid credentials',
    })
  })
})
