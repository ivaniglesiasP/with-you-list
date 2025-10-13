import { mapListItems } from '@/api/mapping/map-list-items'
import { Database } from '@/api/supabase/database.types'
import { ListItem, UpdateItemResponse } from '@/domain/list'
import { SupabaseClient } from '@supabase/supabase-js'
import { Tables } from '@/api/supabase/database.types'
import { SupbaseProfilesItem } from '../user/user'
import en from '../../../../locales/en.json'

export type SupabaseListItem = Tables<'list'> & {
  profiles: SupbaseProfilesItem
}
export type SupbaseList = SupabaseListItem[]

const SUPABASE_ITEM_SELECT = `
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
    `

export const getList = async ({
  client,
}: {
  client: SupabaseClient<Database>
}): Promise<ListItem[]> => {
  const { data, error } = await client
    .from('list')
    .select(SUPABASE_ITEM_SELECT)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error || !data) {
    return []
  }

  return mapListItems(data)
}

export const updateListItem = async ({
  client,
  id,
  done,
  doneAt,
}: {
  client: SupabaseClient<Database>
  id: string
  done: boolean
  doneAt: string | null
}): Promise<UpdateItemResponse> => {
  const { data, error } = await client
    .from('list')
    .update({
      done,
      done_at: doneAt,
    })
    .eq('id', id)
    .select(SUPABASE_ITEM_SELECT)
    .single()

  if (error || !data) {
    console.error('Error updating list item:', error)
    return { updatedItem: null, errorMessage: en.list.error }
  }

  return { updatedItem: mapListItems([data])[0], errorMessage: null }
}
