import { TypeAlert } from '@cityscoot/components'

export type INotify = INotifyI18n | INotifyBasic

interface IBase {
  hash?: string
  timeout?: number
  type: TypeAlert
}

interface INotifyI18n extends IBase {
  i18n: string
}

export interface INotifyBasic extends IBase {
  message: string
  title: string
}
