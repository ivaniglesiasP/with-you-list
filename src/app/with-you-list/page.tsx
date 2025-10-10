import WithYouListPage from '@/ui/list/list-page'
import { handleWithYouListData } from '@/wiring/handle-with-you-list-data'

export default async function WithYouList() {
  const { listItems, loggedUser } = await handleWithYouListData()

  return <WithYouListPage listItems={listItems} loggedUser={loggedUser} />
}
