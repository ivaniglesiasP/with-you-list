'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logIn } from '@/api/services/login/login'
import { useSupabase } from '@/providers/supabase-provider'
import { InputField, validateField } from '@/validation'

type UseLoginReturn = {
  email: InputField
  password: InputField
  handleEmailChange: (v: string) => void
  handlePasswordChange: (v: string) => void
  loading: boolean
  error: string | null
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export function useLogin(): UseLoginReturn {
  const supabaseCient = useSupabase()
  const router = useRouter()

  const [email, setEmail] = useState<InputField>({
    value: '',
    error: '',
    kind: 'EMAIL',
  })
  const [password, setPassword] = useState<InputField>({
    value: '',
    error: '',
    kind: 'PASSWORD',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const emailError = validateField(email)
    const passwordError = validateField(password)

    if (emailError || passwordError) {
      setEmail((prev) => ({ ...prev, error: emailError }))
      setPassword((prev) => ({ ...prev, error: passwordError }))
      setLoading(false)
      return
    }

    const loginResponse = await logIn({
      client: supabaseCient,
      email: email.value,
      password: password.value,
    })

    setLoading(false)
    if (loginResponse.status === 'INVALID') {
      setError(loginResponse.errorMessage)
      return
    }

    router.push('/')
  }

  const handleEmailChange = useCallback(
    (inputValue: string) =>
      setEmail((prev) => ({ ...prev, value: inputValue })),

    [],
  )

  const handlePasswordChange = useCallback(
    (inputValue: string) =>
      setPassword((prev) => ({ ...prev, value: inputValue })),

    [],
  )

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    loading,
    error,
    handleSubmit,
  }
}
