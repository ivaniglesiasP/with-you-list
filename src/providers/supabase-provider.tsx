'use client'

import { createContext, useContext, useMemo } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseClientForBrowser } from '@/api/supabase/supabase-client-for-browser'
import { Database } from '@/api/supabase/database.types'

type SupabaseContextType = {
  supabase: SupabaseClient<Database>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined,
)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseClientForBrowser(), [])

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context.supabase
}
