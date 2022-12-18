import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import { IErrorHandler } from '../interface'
import { IResponseAPI } from './interface'

export const errorHandlerAuth = (response: FetchBaseQueryError): IErrorHandler => {
  const data = response.data as IResponseAPI<string>

  if (data) {
    return {
      status: response.status,
      comment: data.Comment,
      i18n_message: data.I18nComment,
      i18n_path: 'login',
    }
  }

  return {
    status: response.status,
    comment: 'Failed',
    i18n_message: `${response.status}`,
    i18n_path: 'login',
  }
}
