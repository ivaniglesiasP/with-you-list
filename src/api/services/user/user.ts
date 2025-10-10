import { mapUser } from '@/api/mapping/map-user'
import { Database, Tables } from '@/api/supabase/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export type SupbaseProfilesItem = Tables<'profiles'>

export const getUser = async ({
  client,
}: {
  client: SupabaseClient<Database['public']>
}) => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error || !user) return

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) return

  //TODO: improve error handling

  return mapUser(profile)
}
