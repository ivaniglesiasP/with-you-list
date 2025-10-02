import { FunctionComponent, ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import ThemeProviderClient from '@/providers/theme-provider.client'
import { SupabaseProvider } from '@/providers/supabase-provider'

type WrapperProps = {
  children: ReactNode
}

export const render = async (ui: ReactElement) => {
  const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
    return (
      <ThemeProviderClient>
        <SupabaseProvider>{children}</SupabaseProvider>
      </ThemeProviderClient>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper })
}
