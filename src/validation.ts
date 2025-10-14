import en from '../locales/en.json'

export const INPUT_FIELD_KIND = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  TEXT: 'TEXT',
  NOT_MANDATORY_TEXT: 'NOT_MANDATORY_TEXT',
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

const validateNotMandatoryTextText = ({
  text,
  minLength = 5,
}: {
  text: string
  minLength?: number
}) => {
  if (text.length <= minLength) return en.validation.tooShort
  return null
}

const validateText = ({
  text,
  minLength = 10,
}: {
  text: string
  minLength?: number
}) => {
  if (!isNotEmpty(text)) return en.validation.emptyField
  if (text.length <= minLength) return en.validation.tooShort
  return null
}

export const validateField = (inputField: InputField): string | null => {
  switch (inputField.kind) {
    case INPUT_FIELD_KIND.EMAIL:
      return validateEmail(inputField.value)
    case INPUT_FIELD_KIND.PASSWORD:
      return validatePassword(inputField.value)
    case INPUT_FIELD_KIND.TEXT:
      return validateText({ text: inputField.value })
    case INPUT_FIELD_KIND.NOT_MANDATORY_TEXT:
      return validateNotMandatoryTextText({ text: inputField.value })
    default:
      return null
  }
}
