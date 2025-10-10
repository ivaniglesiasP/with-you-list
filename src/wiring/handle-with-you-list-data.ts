import { getList } from '@/api/services/list/list'
import { getUser } from '@/api/services/user/user'
import { supabaseServerClient } from '@/api/supabase/supabase-client-for-server'
import { ListItem } from '@/domain/list'

export const handleWithYouListData = async () => {
  const client = await supabaseServerClient()

  const loggedUser = await getUser({ client })
  const listItems: ListItem[] = await getList({ client })

  return {
    listItems,
    loggedUser,
  }
}
