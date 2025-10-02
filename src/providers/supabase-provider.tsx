'use client'

import { createContext, useContext, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseClientForBrowser } from '@/api/supabase/supabase-client-for-browser'

type SupabaseContextType = {
  supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined,
)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createSupabaseClientForBrowser())

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
