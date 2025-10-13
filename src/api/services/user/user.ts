import { mapUser } from '@/api/mapping/map-user'
import { Database, Tables } from '@/api/supabase/database.types'
import { User } from '@/domain/log-in'
import { SupabaseClient } from '@supabase/supabase-js'
import { permanentRedirect } from 'next/navigation'

export type SupbaseProfilesItem = Tables<'profiles'>

export const getUser = async ({
  client,
}: {
  client: SupabaseClient<Database>
}): Promise<User> => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error || !user) return permanentRedirect('/login')

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) permanentRedirect('/login')

  return mapUser(profile)
}
