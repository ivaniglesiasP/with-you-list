import { mapListItems } from '@/api/mapping/map-list-items'
import { Database } from '@/api/supabase/database.types'
import { ListItem } from '@/domain/list'
import { SupabaseClient } from '@supabase/supabase-js'
import { Tables } from '@/api/supabase/database.types'
import { SupbaseProfilesItem } from '../user/user'

export type SupabaseListItem = Tables<'list'> & {
  profiles: SupbaseProfilesItem
}
export type SupbaseList = SupabaseListItem[]

export const getList = async ({
  client,
}: {
  client: SupabaseClient<Database['public']>
}): Promise<ListItem[]> => {
  const { data, error } = await client
    .from('list')
    .select(
      `
      id,
      description,
      to_do_help_text,
      created_at,
      done,
      done_at,
      user_id,
      profiles (
        id,
        name,
        last_name,
        created_at,
        picture_url
      )
    `,
    )
    .order('created_at', { ascending: false })
    .limit(5)

  if (error || !data) {
    return []
  }

  return mapListItems(data)
}
