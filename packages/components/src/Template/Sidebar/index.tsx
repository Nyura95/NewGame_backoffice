import React, { useCallback, useEffect } from 'react'

import LogoDark from '../assets/img/logo-ct-dark.png'
import Logo from '../assets/img/logo-ct.png'
import { TypeSidebar, TypeColor, ColorText } from '../enum'
import { Item } from './item'
import { Items } from './items'
import { Line } from './line'

interface IProps {
  body: string
  children?: React.ReactNode
  color?: TypeColor
  colorText?: ColorText
  mini?: boolean
  onClose?: () => void
  open?: boolean
  title: string
  type?: TypeSidebar
}

const Nav: React.FC<IProps> = ({
  colorText = ColorText.white,
  children,
  title,
  open,
  body,
  onClose,
  mini,
  type = TypeSidebar.dark,
  color = TypeColor.info,
}) => {
  useEffect(() => {
    const element = document.getElementById(body)
    if (element) {
      open
        ? element.classList.add('g-sidenav-pinned')
        : element.classList.remove('g-sidenav-pinned')
    }
  }, [open, body])

  useEffect(() => {
    const element = document.getElementById(body)
    if (element) {
      mini
        ? element.classList.add('g-sidenav-hidden')
        : element.classList.remove('g-sidenav-hidden')
    }
  }, [mini, body])

  const click = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      onClose && onClose()
    },
    [onClose],
  )

  return (
    <aside
      className={`sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ${type}`}
      style={{ overflowX: 'hidden' }}
      data-color={color}>
      <div className="sidenav-header">
        <i
          className={`fas fa-times p-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-xl-none ${colorText}`}
          aria-hidden="true"
          onClick={click}
        />
        <a className="navbar-brand m-0" role="button">
          <img
            src={colorText === ColorText.white ? Logo : LogoDark}
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span className={`ms-1 font-weight-bold ${colorText}`}>{title}</span>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div className="collapse navbar-collapse  w-auto h-auto">
        <ul className="navbar-nav" style={{ overflowX: 'hidden' }}>
          {children}
        </ul>
      </div>
    </aside>
  )
}

export const Sidebar = Object.assign(Nav, {
  Items: Items,
  Item: Item,
  Line: Line,
})
