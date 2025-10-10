import { Database } from '@/api/supabase/database.types'
import { createBrowserClient } from '@supabase/ssr'

export const createSupabaseClientForBrowser = () =>
  createBrowserClient<Database['public']>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
