import type { Metadata } from 'next'

import { Box } from '@mui/material'
import ThemeProviderClient from '@/providers/theme-provider.client'
import { SupabaseProvider } from '@/providers/supabase-provider'

export const metadata: Metadata = {
  title: 'With You List ❤️',
  description: 'Couple to-do list',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderClient>
          <SupabaseProvider>
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'grey.100',
              }}
            >
              <Box
                sx={{
                  maxWidth: 550,
                  height: '100vh',
                  maxHeight: 844,
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: 'hidden',
                }}
              >
                {children}
              </Box>
            </Box>
          </SupabaseProvider>
        </ThemeProviderClient>
      </body>
    </html>
  )
}
