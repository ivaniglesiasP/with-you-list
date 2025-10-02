export type LogInResponse =
  | {
      status: 'SUCCESS'
      accessToken: string
    }
  | { status: 'INVALID'; errorMessage: string }
