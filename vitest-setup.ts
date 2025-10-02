import { loadEnvConfig } from '@next/env'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

loadEnvConfig(process.cwd())

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
console.log('Vitest setup loaded, expect is:', expect)

expect.extend(matchers)

if (global.window) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  window.ResizeObserver = require('resize-observer-polyfill')
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
