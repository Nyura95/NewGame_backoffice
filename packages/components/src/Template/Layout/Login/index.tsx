import React from 'react'

import { Navbar } from './Navbar'

interface IProps {
  children?: React.ReactNode
  footer?: React.ReactNode
  style?: React.CSSProperties
}

const Layout: React.FC<IProps> = ({ children, style, footer }) => {
  return (
    <main className="main-content  mt-0">
      <div className="page-header align-items-start min-vh-100" style={style}>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">{children}</div>
        <footer className="footer position-absolute bottom-2 py-2 w-100">
          <div className="container">
            <span className="mask opacity-6"></span>
            <div className="container my-auto">{footer}</div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export const LayoutLogin = Object.assign(Layout, {
  Navbar: Navbar,
})
