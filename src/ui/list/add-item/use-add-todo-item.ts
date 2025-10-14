import { addListItem } from '@/api/services/list/list'
import { AddedListItemErrorMessage, ListItem } from '@/domain/list'
import { useSupabase } from '@/providers/supabase-provider'
import { InputField, validateField } from '@/validation'
import { useCallback, useState } from 'react'

type UseAddTodoItemProps = {
  updateListItems: (item: ListItem) => void
  onAddedItem: () => void
  userId: string
}
type UseAddTodoItemReturn = {
  description: InputField
  toDoHelpText: InputField
  error: AddedListItemErrorMessage | null
  loading: boolean
  handleDescriptionChange: (v: string) => void
  handleToDoHelpTextChange: (v: string) => void
  handleAddItemSubmit: (e: React.FormEvent) => Promise<void>
}

export const useAddTodoItem = ({
  userId,
  onAddedItem,
  updateListItems,
}: UseAddTodoItemProps): UseAddTodoItemReturn => {
  const supabaseCient = useSupabase()

  const [error, setError] = useState<AddedListItemErrorMessage | null>(null)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState<InputField>({
    value: '',
    error: '',
    kind: 'TEXT',
  })
  const [toDoHelpText, setToDoHelpText] = useState<InputField>({
    value: '',
    error: '',
    kind: 'TEXT',
  })

  const handleAddItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const descriptionError = validateField(description)
    const toDoHelpTextError = validateField(toDoHelpText)

    if (descriptionError || toDoHelpTextError) {
      setDescription((prev) => ({ ...prev, error: descriptionError }))
      setToDoHelpText((prev) => ({ ...prev, error: toDoHelpTextError }))
      setLoading(false)
      return
    }

    const addItemResponse = await addListItem({
      client: supabaseCient,
      description: description.value,
      toDoHelpText: toDoHelpText.value,
      userId,
    })

    if (addItemResponse.addedItem) {
      updateListItems(addItemResponse.addedItem)
      setLoading(false)
      onAddedItem()

      return
    }
    setLoading(false)

    setError(addItemResponse.errorMessage)
  }

  const handleDescriptionChange = useCallback(
    (inputValue: string) =>
      setDescription((prev) => ({ ...prev, value: inputValue })),

    [],
  )

  const handleToDoHelpTextChange = useCallback(
    (inputValue: string) =>
      setToDoHelpText((prev) => ({ ...prev, value: inputValue })),

    [],
  )

  return {
    error,
    loading,
    description,
    toDoHelpText,
    handleDescriptionChange,
    handleToDoHelpTextChange,
    handleAddItemSubmit,
  }
}
