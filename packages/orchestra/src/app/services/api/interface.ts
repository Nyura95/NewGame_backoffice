export interface IResponseAPI<T> {
  Comment: string
  Data: T
  Hash: string
  I18nComment: string
  Reason: number
  ServerTime: string
  StatusCode: number
  Success: boolean
  Version: string
}

export interface IOauthResponse {
  RefreshToken: string
  Token: string
}
