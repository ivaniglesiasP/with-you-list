import { User } from './log-in'

export type ListItem = {
  id: string
  description: string
  toDoHelpText: string
  createdAt: string
  user: User
  done: boolean
  doneAt: string | null
}
