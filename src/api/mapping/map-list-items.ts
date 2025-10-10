import { ListItem } from '@/domain/list'
import { SupbaseList } from '../services/list/list'
import { mapUser } from './map-user'

export const mapListItems = (list: SupbaseList): ListItem[] =>
  list.map(({ id, profiles, created_at, description, to_do_help_text }) => ({
    id,
    createdAt: created_at,
    description,
    toDoHelpText: to_do_help_text ?? '',
    user: mapUser(profiles),
  }))
