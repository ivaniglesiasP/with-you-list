import en from '../locales/en.json'

export const INPUT_FIELD_KIND = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
}
export type InputFiledKind = keyof typeof INPUT_FIELD_KIND

export type InputField = {
  value: string
  error: string | null
  kind: InputFiledKind
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

const validateEmail = (email: string): string | null => {
  if (!isNotEmpty(email)) return en.validation.emptyField
  if (!isValidEmail(email)) return en.validation.email.emailError
  return null
}

const validatePassword = (password: string): string | null => {
  if (!isNotEmpty(password)) return en.validation.emptyField
  return null
}

export const validateField = (inputField: InputField): string | null => {
  switch (inputField.kind) {
    case INPUT_FIELD_KIND.EMAIL:
      return validateEmail(inputField.value)
    case INPUT_FIELD_KIND.PASSWORD:
      return validatePassword(inputField.value)
    default:
      return null
  }
}
