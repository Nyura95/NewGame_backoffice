import React from 'react'

import { LayoutLogin } from '@cityscoot/components'

interface IProps {
  bg?: string
  children?: React.ReactNode
  footer: React.ReactNode
  text: string
}

const Layout: React.FC<IProps> = ({ bg, children, footer, text }) => {
  return (
    <>
      <LayoutLogin.Navbar text={text} />
      <LayoutLogin style={{ backgroundImage: `url(${bg})` }} footer={footer}>
        {children}
      </LayoutLogin>
    </>
  )
}

export default Layout
