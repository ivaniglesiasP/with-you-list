export type LogInResponse =
  | {
      status: 'SUCCESS'
      accessToken: string
    }
  | { status: 'INVALID'; errorMessage: string }

export type User = {
  id: string
  name: string
  lastName: string
  pictureUrl: string | null
}
