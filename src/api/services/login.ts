import { LogInResponse } from '@/domain/log-in'
import { SupabaseClient } from '@supabase/supabase-js'

export const logIn = async ({
  email,
  password,
  client,
}: {
  email: string
  password: string
  client: SupabaseClient
}): Promise<LogInResponse> => {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (data.session?.access_token && !error) {
    return { status: 'SUCCESS', accessToken: data.session.access_token }
  }

  return { status: 'INVALID', errorMessage: error?.message ?? '' }
}
