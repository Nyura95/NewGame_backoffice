import React from 'react'

import { Outlet } from 'react-router-dom'

import { LayoutBasic } from '@cityscoot/components'

import { Navbar } from './Navbar'
import { Plugins } from './Plugin'
import { Side } from './Sidebar'

const Layout: React.FC = () => {
  return (
    <>
      <Plugins />
      <Side />
      <LayoutBasic>
        <Navbar />
        <LayoutBasic.Container>
          <Outlet />
        </LayoutBasic.Container>
      </LayoutBasic>
    </>
  )
}

export default Layout
