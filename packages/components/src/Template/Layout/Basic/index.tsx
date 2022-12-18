import React from 'react'

import { Container } from './Container'
import { Navbar } from './Navbar'

interface IProps {
  children?: React.ReactNode
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      {children}
    </main>
  )
}

export const LayoutBasic = Object.assign(Layout, {
  Navbar: Navbar,
  Container: Container,
})
