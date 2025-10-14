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

export type UpdateListItemErrorMessage = string

export type UpdateItemResponse =
  | {
      updatedItem: ListItem
      errorMessage: null
    }
  | {
      updatedItem: null
      errorMessage: UpdateListItemErrorMessage
    }

export type AddedListItemErrorMessage = string

export type AddedItemResponse =
  | {
      addedItem: ListItem
      errorMessage: null
    }
  | {
      addedItem: null
      errorMessage: AddedListItemErrorMessage
    }
