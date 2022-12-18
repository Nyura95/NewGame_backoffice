import React from 'react'

import { Loader } from '../Loader'
import { Body } from './Body'
import { Footer } from './Footer'
import { Group } from './Group'
import { Header } from './Header'

interface IProps {
  blur?: boolean
  children?: React.ReactNode
  className?: string
  isBusy?: boolean
  plain?: boolean
}

const Container: React.FC<IProps> = ({ blur, children, className, isBusy, plain }) => {
  return (
    <div
      className={`card${blur ? ' blur shadow-blur' : ''}${className ? ` ${className}` : ''}${
        plain ? ' card-plain' : ''
      }`}>
      {isBusy && <Loader show={isBusy} />}
      {children}
    </div>
  )
}

export const Card = Object.assign(Container, {
  Group: Group,
  Header: Header,
  Body: Body,
  Footer: Footer,
})
