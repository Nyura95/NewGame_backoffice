import React, { useCallback } from 'react'

import { ButtonRow } from './ButtonRow'

type IObject = { [key: string]: string }

interface IProps<T> {
  children?: React.ReactNode
  className?: string
  form: T
  onSubmit: (form: T) => void
}

const Forms = <T extends IObject>({
  children,
  className,
  onSubmit,
  form,
}: React.PropsWithChildren<IProps<T>>) => {
  const submit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      for (const name in form) {
        const input = (e.target as never)[name] as HTMLInputElement | undefined
        if (input) {
          if (input.type === 'checkbox') {
            form[name] = `${input.checked}` as T[Extract<keyof T, string>]
          }
          if (input.type === undefined) {
            const radios = input as unknown as RadioNodeList
            form[name] = radios.value as T[Extract<keyof T, string>]
          }
          if (
            input.type === 'text' ||
            input.type === 'hidden' ||
            input.type === 'password' ||
            input.type === 'email'
          ) {
            form[name] = input.value as T[Extract<keyof T, string>]
          }
        }
      }
      onSubmit(form)
    },
    [onSubmit, form],
  )

  return (
    <form className={className} onSubmit={e => submit(e)}>
      {children}
    </form>
  )
}

export const Form = Object.assign(Forms, {
  ButtonRow: ButtonRow,
})
