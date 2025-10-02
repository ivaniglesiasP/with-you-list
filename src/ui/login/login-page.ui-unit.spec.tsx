import { describe } from 'node:test'
import { expect, it, vi } from 'vitest'
import en from '../../../locales/en.json'
import LoginPage from './login-page'
import { render } from '@/test-setup/test-setup'

describe('Login Page', () => {
  vi.mock('./use-login', () => {
    return {
      useLogin: vi.fn().mockReturnValue({
        setPassword: vi.fn(),
        setEmail: vi.fn(),
        handleSubmit: vi.fn(),
        email: '',
        password: '',
        loading: true,
      }),
    }
  })
  it('should render login page', async () => {
    const { findByText } = await render(<LoginPage />)
    const email = await findByText(en.login.emailLabel)
    const password = await findByText(en.login.passwordLabel)
    const loginButton = await findByText(en.login.logInButton)
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
})
