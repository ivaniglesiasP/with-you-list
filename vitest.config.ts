import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  define: process.env.VITEST ? {} : { global: window },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssr: {
    noExternal: ['@bosch-bshg-cloud/d2c-component-fonts'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.unit.spec.*', 'src/**/*.ui-unit.spec.*'],
    exclude: ['**/*.snap'],
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/app/**/page.tsx', 'src/**/index.ts', 'src/**/*.d.ts'],
    },
    workspace: [
      {
        extends: true,
        test: {
          include: ['src/**/*.ui-unit.spec.*'],
          environment: 'jsdom',
        },
      },
    ],
    setupFiles: './vitest-setup.ts',
  },
})
