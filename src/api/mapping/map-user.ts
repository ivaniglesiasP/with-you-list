import { User } from '@/domain/log-in'
import { SupbaseProfilesItem } from '../services/user/user'

export const mapUser = (user: SupbaseProfilesItem): User => ({
  id: user.id,
  name: user.name,
  lastName: user.last_name ?? '',
  pictureUrl: user.picture_url,
})
