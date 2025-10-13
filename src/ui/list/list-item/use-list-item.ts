'use client'

import { updateListItem } from '@/api/services/list/list'
import { ListItem, UpdateListItemErrorMessage } from '@/domain/list'
import { useSupabase } from '@/providers/supabase-provider'
import { getCurrentISOStringDate } from '@/utils/utils'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

type UseListItemProps = {
  listItem: ListItem
}
type UseListItemReturn = {
  item: ListItem
  error: UpdateListItemErrorMessage | null
  showConfirmModal: boolean
  cleanError: () => void
  handleDoneToggle: (itemId: string, newDoneValue: boolean) => void
  confirmDoneRevert: () => void
  cancelDoneRevert: () => void
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>
}

export function useListItem({ listItem }: UseListItemProps): UseListItemReturn {
  const supabaseClient = useSupabase()
  const [item, setItem] = useState<ListItem>(listItem)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [error, setError] = useState<UpdateListItemErrorMessage | null>(null)
  const lastUpdatedDoneValue = useRef<boolean>(listItem.done)
  const debouncer = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const handleDoneToggle = useCallback(
    (itemId: string, newDoneValue: boolean) => {
      const doneAt = newDoneValue ? getCurrentISOStringDate() : null
      setItem((prev) => ({ ...prev, done: newDoneValue, doneAt }))

      const existingTimer = debouncer.current[itemId]
      if (existingTimer) {
        clearTimeout(existingTimer)
      }
      const timer = setTimeout(async () => {
        try {
          if (lastUpdatedDoneValue.current === newDoneValue) return
          const { updatedItem, errorMessage } = await updateListItem({
            client: supabaseClient,
            done: newDoneValue,
            id: itemId,
            doneAt,
          })
          if (updatedItem && !errorMessage) {
            setItem(updatedItem)
            lastUpdatedDoneValue.current = newDoneValue
            return
          }
          setError(errorMessage)
        } finally {
          delete debouncer.current[itemId]
        }
      }, 3000)
      debouncer.current[itemId] = timer
    },
    [lastUpdatedDoneValue, supabaseClient],
  )

  const confirmDoneRevert = () => {
    setShowConfirmModal(false)
    handleDoneToggle(listItem.id, false)
  }

  const cancelDoneRevert = () => setShowConfirmModal(false)

  const cleanError = () => setError(null)

  return {
    item,
    error,
    showConfirmModal,
    cleanError,
    handleDoneToggle,
    confirmDoneRevert,
    cancelDoneRevert,
    setShowConfirmModal,
  }
}
