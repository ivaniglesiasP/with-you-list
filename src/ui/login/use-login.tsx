'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logIn } from '@/api/services/login'
import { useSupabase } from '@/providers/supabase-provider'

type UseLoginReturn = {
  email: string
  password: string
  setEmail: (v: string) => void
  setPassword: (v: string) => void
  loading: boolean
  error: string | null
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

const saveAccessTokenInCookie = (token: string) =>
  (document.cookie = `access_token=${token}; max-age=${
    60 * 60 * 24
  }; path=/; SameSite=Lax`)

export function useLogin(): UseLoginReturn {
  const supabaseCient = useSupabase()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const loginResponse = await logIn({
      client: supabaseCient,
      email,
      password,
    })

    setLoading(false)
    if (loginResponse.status === 'INVALID') {
      setError(loginResponse.errorMessage)
      return
    }

    saveAccessTokenInCookie(loginResponse.accessToken)
    console.log('loggued')
    router.push('/')
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleSubmit,
  }
}
